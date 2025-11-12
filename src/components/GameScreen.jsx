import screen from '../assets/screen.png';
import InitScreen from './InitScreen';
import SecondScreen from './SecondScreen';
import { useContext } from 'react';
import {Context } from '../Context'
import StartedGame from './StartedGame';
import Initransfer from './Initransfer';
import Console from './Console';


export default function GameScreen() {
    const {menuInitiated,gameScreens, setGameScreens, rendTransition} = useContext(Context)
  return (
    <div className='flex items-center justify-center relative'>
        <div className='bg-black absolute top-[15%] left-[31%] w-[40%] h-[48%]'>
            {gameScreens === "init" && <InitScreen />}
            {rendTransition === "transferInit" && <Initransfer />}
            {gameScreens === "started" && <StartedGame />}
        </div>
        <div className='bg-black absolute top-[60%] left-[9%] w-[17%] h-[20%] transform rotate-x-[17deg] rotate-y-[-20deg] rounded-2xl overflow-auto scrollCustom'>
            {menuInitiated === "info" && <SecondScreen />}
            {menuInitiated === "console" && <Console />}
        </div>
        <img src={screen} alt="Imagem de um monitor antigo" className='w-7xl'/>
    </div>
  )
}
