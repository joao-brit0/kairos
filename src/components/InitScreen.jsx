import { useContext } from 'react'
import dataImage from '../assets/datasGif.gif'
import { Context } from '../Context'
import BarComponent from './BarComponent'
export default function InitScreen() {
    const { setGameScreens, setrendTransition } = useContext(Context)
    function initGame(){
        setGameScreens('started')
        setrendTransition('transferInit')
    }
    return (
        <div className="text-green-400 relative h-full">
            <div className='relative z-10 bg-black/50 h-full flex flex-col items-center justify-center'>
                <h1 className='font-mono font-bold text-3xl'>K-AI-ROS</h1>
                <button className='border border-green-500/30 py-1 px-3 rounded-md mt-2 cursor-pointer hover:bg-green-500 hover:text-green-950 transition hover:scale-105' onClick={initGame}>Conversar</button>
                <BarComponent />
            </div>
            <img src={dataImage} className='blur-md absolute top-0' />
        </div>
    )
}
