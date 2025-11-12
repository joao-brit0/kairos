import { useContext, useEffect, useRef, useState } from "react";
import ChineseRoomEngine from "./ChineseRoomEngine";
import SymbolsComponent from "./SymbolsComponent";
import { Context } from "../Context";
import TransitionComponent from "./TransitionComponent";
import DateTimeComponent from "./DateTimeComponent";
import InputSymbols from "./InputSymbols";
import analiticGif from "../assets/baixados.gif"
import manu1 from "../assets/manu-1.jpg"
import manu2 from "../assets/manu-2.jpg"
import manu3 from "../assets/manu-3.jpg"
import manu4 from "../assets/manu-4.jpg"
import manu5 from "../assets/manu-5.jpg"

export default function StartedGame() {
  const {
    simId,               
    simList,             
    addToSelectionList,  
    clearSelectionList,
    rendTransition,      
    symbolsIcon,
    addConsoleMessage,
    incrementTentativas,
    increaseConscience,
    setLastResult          
  } = useContext(Context);

  const manualimgsArr = [manu1, manu2, manu3, manu4, manu5]

  const [selectSim, setSelectSim] = useState([]); 
  const [isComplete, setIsComplete] = useState(false);
  const engineRef = useRef(null);
  const [manualOpen, setManualOpen] = useState(false)
  const [imgManual, setimgManual] = useState(0)

  
  const handleUserPick = (id) => {
    const step = engineRef.current?.getCurrentStep()?.step;
    if (!step) return;

    setSelectSim((prev) => [...prev, id]);

    addToSelectionList(id);
  };

  const handleResponder = () => {
    const info = engineRef.current?.getCurrentStep();
    if (!info) return;

    const step = info.step;

    if (step.expectedSeq) {
      const need = step.expectedSeq.length;
      const have = simList.length;

      if (have !== need) {
        //console.warn(`Seleção incompleta AAAAAA ${need}, tem ${have}`, simList);
        return;
      }

      engineRef.current?.submitAnswer([...simList]);
      clearAllSelections();
      return;
    }

    if (step.expected !== undefined) {
      
      const lastSelected = selectSim.length > 0 ? selectSim[selectSim.length - 1] : undefined;
      const answerId = lastSelected !== undefined ? lastSelected : simId;

      if (answerId === undefined || answerId === null) {
        return;
      }

      engineRef.current?.submitAnswer(answerId);
      clearAllSelections();
      return;
    }

  };

  const clearAllSelections = () => {
    clearSelectionList();
    setSelectSim([]);
  };

 
  const handleStepChange = (info) => {
    clearAllSelections();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 1900);
    return () => clearTimeout(timer);
  }, []);

 
  if (!isComplete) return null;

  const selectedSymbols = selectSim.map(
    (id) => symbolsIcon.find((s) => s.id === id)?.src
  );

  function handleManual(direction){
    if(direction == "right" && imgManual < manualimgsArr.length - 1){
      setimgManual(imgManual + 1)
    }
    if (direction == "left" && imgManual > 0) {
      setimgManual(imgManual - 1)
    }
  }

  return (
    <div className="text-green-400 fade-in">
      
      <div className="p-2 text-sm font-medium text-center border-b border-green-400/50">
        <h2>Sistema K-AI-ROS</h2>
      </div>

      
      <section className="flex justify-between">
        <div className="border-r border-green-400/50 w-3/4 relative flex flex-col justify-center items-center">
          
          <button className="absolute top-2 right-2 text-2xl cursor-pointer hover:scale-105 transition" onClick={() => setManualOpen(true)}><ion-icon name="newspaper-outline"></ion-icon></button>
          {manualOpen && 
          <div className="absolute bg-black w-full h-full z-10 scale-up-tr flex justify-center">
            <button className="text-3xl cursor-pointer hover:scale-105" onClick={() => handleManual("left")}><ion-icon name="caret-back-outline"></ion-icon></button>
            <img src={manualimgsArr[imgManual]} className=""/>
            <button className="text-3xl cursor-pointer hover:scale-105" onClick={() => handleManual("right")}><ion-icon name="caret-forward-outline"></ion-icon></button>
            <button className="absolute top-2 right-2 text-2xl cursor-pointer hover:scale-105 transition" onClick={() => setManualOpen(false)}><ion-icon name="close-circle-outline"></ion-icon></button>
          </div>
          }
          
          <div className="absolute text-[10px] flex items-center top-0 left-0">
            <p>System Status : OK</p>
            <img src={analiticGif} alt="" className="w-20 ml-5"/>
          </div>
          <ChineseRoomEngine
            ref={engineRef}
            onStepChange={handleStepChange}
            onCorrect={(info) => {
              incrementTentativas();
              increaseConscience(0.7);
              setLastResult("correct");}}
            onWrong={(info) => {
              incrementTentativas();
              setLastResult("wrong");
            }}
            onFinish={() => {{addConsoleMessage("Sistema completo — todos os protocolos executados.")}}}
          />

          
          {rendTransition === "transitionInGame" && <TransitionComponent />}

          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleResponder}
              className="bg-green-500 text-green-950 font-bold py-1 px-3 rounded cursor-pointer hover:bg-green-400 transition-all"
            >
              Responder
            </button>

            <button
              onClick={clearAllSelections}
              className=" font-bold py-1 px-3 rounded cursor-pointer border hover:border-green-400/30 transition-all"
            >
              Limpar
            </button>
          </div>
        </div>

        
        <div className="flex items-center w-35">
          <SymbolsComponent onPick={handleUserPick} />
        </div>
      </section>

      
      <div className="w-full border-t border-green-400/50">
        <p className="text-sm">Input system:</p>

        
        {selectSim.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 h-10 scrollCustom overflow-auto">
            {selectedSymbols.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Selecionado ${idx}`}
                className="w-10 h-10 object-contain border border-green-400/50 rounded"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
