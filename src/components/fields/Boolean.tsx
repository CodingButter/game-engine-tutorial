import React, { useState } from "react";

interface BooleanProps {
    update: (value: any) => void
    name: string
    value: any
}

const Bool = ({ name, value, update }: BooleanProps) => {
    const [currentValue, setCurrentValue] = useState<boolean>(value);

    const updateValue = (newValue: boolean) => {
        setCurrentValue(newValue);
        update(newValue);
    };
    return (<div className='flex p-content gap-2 justify-between'>
            <label className="capitalize">{name}:</label>
            <div className="font-thin flex justify-center items-center overflow-hidden rounded-sm gap-[2px] align-middle">
                <button onClick={() => updateValue(!currentValue)} className={`bg-field text-center align-middle px-2 active:bg-hovered hover:font-bold hover:bg-surface ${currentValue ? "font-bold" : ""}`}>{currentValue ? "true" : "false"}</button>
            </div>
        </div>);
}

export default Bool;