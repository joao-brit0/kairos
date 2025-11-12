import { useContext, useEffect } from 'react'
import transitionGif from '../assets/transition.gif'
import { Context } from '../Context';

export default function TransitionComponent() {

    const { rendTransition, setrendTransition } = useContext(Context)
    useEffect(() => {
        setTimeout(() => {
            console.log("CHEGOU NA TRANSIÇÃO")
            setrendTransition("inGame")
        }, 1700);
    }, [rendTransition])
  return (
    <div className='absolute top-0'>
        <img src={transitionGif}/>
    </div>
  )
}
