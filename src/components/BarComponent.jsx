import { useContext, useState } from "react";
import DateTimeComponent from "./DateTimeComponent";
import {Context } from '../Context'

export default function BarComponent() {
    const [menuOpen, setMenuOpen] = useState(false);
    const {setMenuInitiated} = useContext(Context)
    return (
        <div className="text-green-400 border-t border-green-500/20 flex justify-between items-center w-full px-2 absolute bottom-0">
            <div className="text-[1.3rem]">
                {menuOpen && <div>
                    <ul className="text-sm absolute bottom-10">
                        <li className="hover:text-green-200 cursor-pointer" onClick={() => setMenuInitiated("console")}>Console</li>
                        <li className="hover:text-green-200 cursor-pointer" onClick={() => setMenuInitiated("info")}>Instruções</li>
                        <li className="hover:text-green-200 cursor-pointer">Logout</li>
                    </ul>
                </div>}
                <button className="cursor-pointer hover:scale-105 transition" onClick={() => setMenuOpen(!menuOpen)}>
                    <ion-icon name="settings-outline"></ion-icon>
                </button>
            </div>
            <div className="text-[0.7rem]">
                <DateTimeComponent />
            </div>
        </div>
    )
}
