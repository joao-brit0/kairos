import { useContext, useEffect, useRef } from "react";
import { Context } from "../Context";

export default function Console() {
  const { tentativas, conscience, consoleLogs, lastResult } = useContext(Context);
  const consoleEndRef = useRef(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  return (
    <div className="bg-black text-green-400 font-mono text-sm p-3 h-40">
      {consoleLogs.length === 0 && (
        <p className="opacity-60">[Sistema K-AI-ROS inicializado...]</p>
      )}

      {consoleLogs.map((log) => (
        <p key={log.id} className="whitespace-pre-wrap">
          {log.text}
        </p>
      ))}

      {tentativas > 0 && (
        <div className="mt-2 border-t border-green-400/20 pt-1">
          <p>
            K1:{" "}
            {lastResult === "correct"
              ? "entrada aceita | Motivo: coerência detectada"
              : "entrada não aceita | Motivo: unknown"}
          </p>
          <p>Tentativas: {tentativas}</p>
          <p>Conscience: {conscience.toFixed(2)}%</p>
          <p>Escape attempt: unknown</p>
          <p>**********************</p>
        </div>
      )}

      <div ref={consoleEndRef} />
    </div>
  );
}
