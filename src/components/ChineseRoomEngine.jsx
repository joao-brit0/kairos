import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";
import { Context } from "../Context";

const isVar = (t) => typeof t === "string" && t.startsWith("VAR_");

function SymbolImg({ id }) {
  const src = new URL(`../assets/Simbo/${id}.png`, import.meta.url).href;
  return (
    <img
      src={src}
      alt={String(id)}
      className="w-16 h-16 rounded bg-zinc-900/60 object-contain border border-green-400/30"
      draggable={false}
    />
  );
}

function InputsRow({ inputs }) {
  return (
    <div className="flex items-center gap-3">
      {inputs.map((item, idx) => (
        <SymbolImg key={idx} id={item} />
      ))}
    </div>
  );
}

const sectionsScript = {
  A: [
    { id: "A-01", inputs: [54], expected: 2 },
    { id: "A-02", inputs: [76], expected: 77 },
    { id: "A-03", inputs: ["w31"], expected: 9 },
  ],
  B: [
    { id: "B-01", inputs: [3, 4], expected: 659 },
    { id: "B-02", inputs: [54, 9], expected: 342 },
    { id: "B-03", inputs: [77, 659], expected: 3424 },
  ],
  C: [
    { id: "C-01", inputs: [9089, "VAR_A"], expectedSeq: [576, "VAR_A"] },
    { id: "C-02", inputs: [3542, "VAR_A", "VAR_B"], expectedSeq: ["VAR_B", 3542, "VAR_A"] },
    { id: "C-03", inputs: [978, "VAR_A", "VAR_B", "VAR_C"], expectedSeq: ["VAR_C", "VAR_A"] },
    { id: "C-04", inputs: [3424, "VAR_A", "VAR_B", "VAR_A"], expected: 889 },
  ],
  S: [{ id: "S-79", inputs: ["Documento", "w31"], expected: 978 }],
  J: [
    { id: "J-01", inputs: [54], expected: 2 },
    { id: "J-07", inputs: [889, "VAR_A"], expectedSeq: ["VAR_A", 889] },
    { id: "J-12", inputs: ["VAR_A", "VAR_A"], expected: 342 },
    { id: "J-13", inputs: [889, 9089], expected: "Documento" },
  ],
};


const symbolsPool = [
  2, 3, 4, 9, 54, 76, 77, 342, 576, 659, 889, 978, 3424, 3542, 9089, "w31", "Documento",
];


function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


function assignRandomVars(inputs = [], expectedSeq = [], pool = []) {
  const vars = {};
  const available = [...pool];
  const allTokens = [...inputs, ...(Array.isArray(expectedSeq) ? expectedSeq : [])];
  const uniqueVars = Array.from(new Set(allTokens.filter(isVar)));

  for (const v of uniqueVars) {
    if (available.length === 0) available.push(...pool);
    const pickIndex = Math.floor(Math.random() * available.length);
    const pick = available.splice(pickIndex, 1)[0];
    vars[v] = pick;
  }

  const replacedInputs = inputs.map((i) => (isVar(i) ? vars[i] : i));
  let replacedExpectedSeq;
  if (Array.isArray(expectedSeq) && expectedSeq.length > 0) {
    replacedExpectedSeq = expectedSeq.map((i) => (isVar(i) ? vars[i] : i));
  }

  return { vars, replacedInputs, replacedExpectedSeq };
}

function matchSequence(answer, expectedSeq) {
  if (!Array.isArray(answer) || !Array.isArray(expectedSeq)) return false;
  if (answer.length !== expectedSeq.length) return false;
  for (let i = 0; i < expectedSeq.length; i++) {
    if (String(answer[i]) !== String(expectedSeq[i])) return false;
  }
  return true;
}

function matchSingle(answer, expected) {
  if (Array.isArray(answer)) {
    if (answer.length === 0) return false;
    answer = answer[answer.length - 1];
  }
  return String(answer) === String(expected);
}


const ChineseRoomEngine = forwardRef(function ChineseRoomEngine(
  { onStepChange, onCorrect, onWrong, onFinish },
  ref
) {
  
  const [shuffledSteps] = useState(() => {
    const combined = [];
    for (const sectionKey of Object.keys(sectionsScript)) {
      const steps = sectionsScript[sectionKey];
      for (const s of steps) {
        combined.push({ section: sectionKey, step: s });
      }
    }
    return shuffleArray(combined); 
  });

  const [index, setIndex] = useState(0);
  const [renderedStep, setRenderedStep] = useState(null);

  const currentItem = shuffledSteps[index];
  const sectionKey = currentItem?.section;
  const step = currentItem?.step;

  const currentInfo = useMemo(
    () => ({ section: sectionKey, index, step }),
    [sectionKey, index, step]
  );

 
  useEffect(() => {
    if (!step) {
      setRenderedStep(null);
      return;
    }

    const hasVars =
      (Array.isArray(step.inputs) && step.inputs.some(isVar)) ||
      (Array.isArray(step.expectedSeq) && step.expectedSeq.some(isVar));

    if (hasVars) {
      const { vars, replacedInputs, replacedExpectedSeq } = assignRandomVars(
        step.inputs,
        step.expectedSeq,
        symbolsPool
      );

      const stepData = { ...step, inputs: replacedInputs, vars };

      if (Array.isArray(replacedExpectedSeq)) stepData.expectedSeq = replacedExpectedSeq;
      else if (step.expected !== undefined) stepData.expected = step.expected;

      setRenderedStep(stepData);
      //console.log(`Sorteio ${step.id}:`, vars);
    } else {
      setRenderedStep(step);
    }

    onStepChange?.(currentInfo);
    
  }, [index]);

  
  function advance() {
    const next = index + 1;
    if (next < shuffledSteps.length) setIndex(next);
    else onFinish?.();
  }

  const {setrendTransition} = useContext(Context)


  useImperativeHandle(ref, () => ({
    submitAnswer: (answer) => {
      if (!renderedStep) return false;
      const { expected, expectedSeq } = renderedStep;

      let ok = false;
      if (Array.isArray(expectedSeq) && expectedSeq.length > 0)
        ok = matchSequence(Array.isArray(answer) ? answer : [answer], expectedSeq);
      else if (expected !== undefined)
        ok = matchSingle(answer, expected);

      if (ok) {
        onCorrect?.({ ...currentInfo, answer, vars: renderedStep.vars });
        advance();
        setrendTransition("transitionInGame")
      } else {
        onWrong?.({ ...currentInfo, answer, vars: renderedStep.vars });
      }
      return ok;
    },
    getCurrentStep: () => currentInfo,
  }));

  if (!renderedStep) return null;

  return (
    <div className="w-full flex flex-col items-center gap-4 text-zinc-200">
      

      <InputsRow inputs={renderedStep.inputs} />

      
    </div>
  );
});

export default ChineseRoomEngine;
