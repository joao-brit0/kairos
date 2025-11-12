import { useContext, useState } from "react";
import DateTimeComponent from "./DateTimeComponent";
import {Context } from '../Context'
import SettingsComponent from "./SettingsComponent";

export default function BarComponent() {
    return (
        <div className="text-green-400 border-t border-green-500/20 flex justify-between items-center w-full px-2 absolute bottom-0">
            <SettingsComponent rotate={"no"}/>
            <div className="text-[0.7rem]">
                <DateTimeComponent />
            </div>
        </div>
    )
}
