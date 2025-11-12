import { useEffect, useState } from "react"
import completeGif from "../assets/completeGif.gif"
export default function FinalScreen() {
    const [runGif, setRunGif] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setRunGif(false)
        }, 5000);
    }, [])

  return (
    <div className="bg-black absolute overflow-auto h-full px-2 py-4 z-20 scrollCustom fade-in">
        {runGif === true ? <div className="flex flex-col items-center text-2xl"><img src={completeGif} alt="" /><h2 className="">Experiência completa. Aguarde...</h2></div> : 
        <div className="fade-in">
            <p className="mb-5">O que você acabou de experienciar foi uma simulação interativa de um dos mais famosos experimentos mentais da filosofia moderna, conhecido como o Argumento do Quarto Chinês, proposto pelo filósofo John Searle em 1980. <br/> Naquela época, com a ascensão dos computadores, muitos acreditavam na tese da "Inteligência Artificial Forte", que afirmava que um computador devidamente programado não estaria apenas simulando uma mente, mas literalmente teria uma mente, com compreensão e consciência genuínas. Searle discordava e criou esta história para provar seu ponto: imagine um homem trancado em uma sala que não entende nada de chinês. Ele recebe pela fenda de entrada símbolos chineses, que são as perguntas, e dentro da sala ele possui um gigantesco livro de regras, um programa, que lhe diz exatamente quais símbolos enviar de volta pela fenda de saída. Para as pessoas do lado de fora, as respostas são perfeitas; elas estão convencidas de que a sala "entende" chinês. No entanto, o homem lá dentro, o processador, não entende uma palavra sequer; ele está apenas seguindo regras. Na sua experiência, você foi o homem no Quarto Chinês. Os símbolos que você recebeu, o manual que você consultou e o teclado que você usou foram as ferramentas para provar o argumento de Searle. A experiência demonstra a diferença crucial entre sintaxe, que é a manipulação de símbolos com base em regras formais (o que você fez), e semântica, que é a compreensão genuína do significado por trás desses símbolos (o que você não teve). A conclusão impactante de Searle é que, não importa o quão sofisticado um computador se torne em manipular a sintaxe, ele nunca poderá, apenas por esse processo, criar a semântica. O pensamento e a compreensão genuína, para Searle, não podem ser criados apenas seguindo regras.</p>
        <a href="./" className="bg-green-500 hover:bg-green-400 py-1 px-4 font-medium text-green-950 rounded mb-20">Início</a>
        </div>}
        
    </div>
  )
}
