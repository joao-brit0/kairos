import { useContext, useEffect, useRef } from "react";
import { Context } from "../Context";

export default function Console() {
  const {
    tentativas,
    conscience,
    consoleLogs,
    lastResult,
    systemState,
  } = useContext(Context);

  const consoleEndRef = useRef(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  const getSystemStatusText = () => {
    switch (systemState) {
      case "PROCESSING":
        return "Processando dados...";
      case "ERROR":
        return "Anomalia detectada — tentando reestabelecer controle...";
      case "SYNC":
        return "Sincronização neural estável.";
      default:
        return "Aguardando entrada do operador...";
    }
  };

  return (
    <div className="bg-black text-green-400 font-mono text-sm h-48 p-3">
    
      {consoleLogs.length === 0 && (
        <p className="opacity-60">[K-AI-ROS SYSTEM LOG INITIALIZED...]</p>
      )}

      {consoleLogs.map((log) => (
        <div key={log.id} className="mt-2 border-t border-green-400/20 pt-1">
          <p>
            K1:{" "}
            {log.lastResult === "correct"
              ? "Entrada aceita | Motivo: coerência detectada"
              : "Entrada não aceita | Motivo: inconsistência lógica"}
          </p>
          <p>Tentativas: {log.tentativas}</p>
          <p>Conscience: {log.conscience.toFixed(2)}%</p>
          <p>Status: {getSystemStatusText()}</p>
          <p>Escape attempt: {log.lastResult === "wrong" ? "detectado" : "unknown"}</p>
          <p>**********************</p>
        </div>
      ))}

      <div ref={consoleEndRef} />
    </div>
  );
}
