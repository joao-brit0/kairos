import { useContext, useState } from 'react'
import {Context } from '../Context'

export default function SettingsComponent({rotate}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const {setMenuInitiated} = useContext(Context)
    return (
        <div className="text-[1.3rem]">
            {menuOpen && rotate == "no" && <div>
                <ul className="text-sm absolute bottom-10">
                    <li className="hover:text-green-200 cursor-pointer" onClick={() => setMenuInitiated("console")}>Console</li>
                    <li className="hover:text-green-200 cursor-pointer" onClick={() => setMenuInitiated("info")}>Instruções</li>
                    <li className="hover:text-green-200 cursor-pointer" onClick={() => setMenuInitiated("logout")}>Logout</li>
                </ul>
            </div>}
            <button className="cursor-pointer hover:scale-105 transition" onClick={() => setMenuOpen(!menuOpen)}>
                <ion-icon name="settings-outline"></ion-icon>
            </button>
            {menuOpen && rotate == "yes" && <div className='absolute -left-2 z-10 font-normal text-left'>
                <ul className="text-sm  bg-black p-1 px-3">
                    <li className="hover:text-green-200 cursor-pointer" onClick={() => setMenuInitiated("console")}>Console</li>
                    <li className="hover:text-green-200 cursor-pointer" onClick={() => setMenuInitiated("info")}>Instruções</li>
                    <li className="hover:text-green-200 cursor-pointer" onClick={() => setMenuInitiated("logout")}>Logout</li>
                </ul>
            </div>}
        </div>
    )
}
