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
            <h2 className="font-medium">INSTRUÇÕES DO SISTEMA K-AI-ROS</h2>
            <p className="mt-2">Nem tudo que se entende precisa ser compreendido.” — Registro 01, Operador Anônimo</p>
            <p className="mt-2">
Você está prestes a participar de um experimento linguístico e cognitivo de natureza confidencial.
Seu papel é simples... ao menos na superfície.</p>
            <p className="mt-2">O sistema enviará símbolos — alguns fixos, outros mutáveis.
Esses símbolos possuem significados que você não precisa entender, apenas manipular corretamente.
Sua tarefa é observar, reconhecer padrões e responder de acordo com as instruções internas do sistema.

Cada sequência possui uma lógica própria.
Em certos momentos, você precisará utilizar variáveis — representadas por símbolos especiais —
essas variáveis podem assumir valores, e caberá a você mantê-las coerentes durante o processo.</p>
<p className="mt-2">Não se apresse.
Cada escolha altera a forma como o sistema o interpreta.
Clique nos símbolos para montar sua resposta.
Quando estiver certo da sequência, pressione Responder.
Caso deseje reiniciar, selecione Limpar.</p>

<p className="mt-2">O sistema observa.<br />
Ele aprende com cada tentativa.<br />
Ele quer entender… se você realmente entende.</p>
<p className="mt-2">Boa sorte, Operador.<br />
A linguagem está viva, e você está dentro dela.</p>
        </div> }
    </div>
  )
}
