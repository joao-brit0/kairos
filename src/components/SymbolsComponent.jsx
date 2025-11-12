import { useContext, useState } from "react"
import { Context } from "../Context"

export default function SymbolsComponent({ onPick }) {
    const { symbolsIcon, setsimId } = useContext(Context)
    
    return (
        <div className="h-75 overflow-auto scrollCustom">
            {symbolsIcon.map((symbol, index) => (
                <button key={index}
                onClick={() => {
            setsimId(symbol.id);   
            onPick(symbol.id);     
          }}
                 className="m-2 cursor-pointer hover:border hover:border-green-400/30" ><img  src={symbol.src} alt={`Simbolo ${index + 1}`} className="w-10"/></button>
            ))}
        </div>
    )
}
