import { createContext, useState } from "react";
export const Context = createContext();
import sim1 from './assets/Simbo/2.png'
import sim2 from './assets/Simbo/3.png'
import sim3 from './assets/Simbo/4.png'
import sim4 from './assets/Simbo/9.png'
import sim5 from './assets/Simbo/54.png'
import sim6 from './assets/Simbo/76.png'
import sim7 from './assets/Simbo/77.png'
import sim8 from './assets/Simbo/342.png'
import sim9 from './assets/Simbo/576.png'
import sim10 from './assets/Simbo/659.png'
import sim11 from './assets/Simbo/889.png'
import sim12 from './assets/Simbo/978.png'
import sim13 from './assets/Simbo/3424.png'
import sim14 from './assets/Simbo/3542.png'
import sim15 from './assets/Simbo/9089.png'
import sim16 from './assets/Simbo/Documento.png'
import sim17 from './assets/Simbo/w31.png'
import sim18 from './assets/Simbo/VAR_A.png'
import sim19 from './assets/Simbo/VAR_B.png'
import sim20 from './assets/Simbo/VAR_C.png'

const simboImages = [
    {
        id: 2,
        src: sim1
    },
    {
        id: 3,
        src: sim2
    },
    {
        id: 4,
        src: sim3
    },
    {
        id: 9,
        src: sim4
    },
    {
        id: 54,
        src: sim5
    },
    {
        id: 76,
        src: sim6
    },
    {
        id: 77,
        src: sim7
    },
    {
        id: 342,
        src: sim8
    },
    {
        id: 576,
        src: sim9
    },
    {
        id: 659,
        src: sim10
    },
    {
        id: 889,
        src: sim11
    },
    {
        id: 978,
        src: sim12
    },
    {
        id: 3424,
        src: sim13
    },
    {
        id: 3542,
        src: sim14
    },
    {
        id: 9089,
        src: sim15
    },
    {
        id: "Documento",
        src: sim16
    },
    {
        id: "w31",
        src: sim17
    },
    


];

export function StatesProvider({ children  }) {

    const [simList, setSimList] = useState([]);

function addToSelectionList(id) {
  setSimList(prev => [...prev, id]);
}

function clearSelectionList() {
  setSimList([]);
}
    const[menuInitiated, setMenuInitiated] = useState (false)
    const[gameScreens, setGameScreens] = useState ("init")
    const[symbolsIcon, setSymbolsIcon] = useState (simboImages)
    const[simId, setsimId] = useState(54)
    const[rendTransition, setrendTransition] = useState("inGame")
    const [tentativas, setTentativas] = useState(0);
    const [conscience, setConscience] = useState(0);
    const [consoleLogs, setConsoleLogs] = useState([]);
    const [lastResult, setLastResult] = useState(null);
    const [systemState, setSystemState] = useState("IDLE")
    const [geralSystemState, setGeralSystemState] = useState("OK")
    const [finalScreen, setFinalScreen] = useState(false)

    function addConsoleMessage(msg) {
    setConsoleLogs(prev => [
      ...prev,
      { id: Date.now(), text: msg },
    ]);
  }

  function addConsoleEntry(result) {
    setConsoleLogs((prev) => [
      ...prev,
      {
        id: Date.now(),
        lastResult: result, // "correct" ou "wrong"
        tentativas: tentativas + 1,
        conscience,
      },
    ]);
  }

  
  function incrementTentativas() {
    setTentativas(t => t + 1);
  }

  
  function increaseConscience(amount = 0.5) {
    setConscience(c => +(c + amount).toFixed(2));
  }
    
    return (
        <Context.Provider value={{menuInitiated, setMenuInitiated, gameScreens, setGameScreens, symbolsIcon, setSymbolsIcon, simId, setsimId, simList, setSimList, addToSelectionList, clearSelectionList,
            rendTransition, setrendTransition, tentativas, setTentativas, incrementTentativas,
      conscience, setConscience, increaseConscience,
      consoleLogs, addConsoleMessage, lastResult,
        setLastResult, systemState,
        setSystemState, addConsoleEntry, geralSystemState, setGeralSystemState, finalScreen, setFinalScreen
        }} >
            {children}
        </Context.Provider>
    )
}