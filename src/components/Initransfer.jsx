import { useContext, useEffect } from 'react'
import interTransfe from '../assets/coonectGif.gif'
import { Context } from '../Context';

export default function Initransfer() {
    const { setrendTransition } = useContext(Context)
    useEffect(() => {
        setTimeout(() => {
            setrendTransition("none")
        }, 1900);  
    }, [])
  return (
    <div>
        <img src={interTransfe} alt="" className='absolute top-0 h-full w-full z-10 transition-all'/>
    </div>
  )
}
