import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import gifScreen from "../assets/gif-second-screen.gif"

export default function SecondScreen() {
    const[text, setText] = useState ("...carregando manual");
    const {symbolsIcon} = useContext(Context)
    useEffect(() => {
        setTimeout(() => {
            setText(symbolsIcon);
        }, 2200);
    }, []);
  return (
    <div className="text-green-400 p-2">
        {text === "...carregando manual" ? <img src={gifScreen} className="rounded-2xl"/> : <div>
            <h2 className="font-medium"> ==INSTRUÇÕES DO SISTEMA K-AI-ROS==</h2>
            <p className="pt-2">Você participará de um experimento linguístico confidencial. O sistema enviará símbolos, fixos ou variáveis, e sua tarefa é manipulá-los corretamente, seguindo a lógica de cada sequência.</p>
        </div> }
    </div>
  )
}
