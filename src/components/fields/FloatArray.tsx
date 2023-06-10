import React, { useState } from "react"
interface FloatArrayProps {
    update: (value: any) => void
    name: string
    value: any
}
const indexNames = ["x", "y", "z", "w", "u", "v", "a", "b", "c", "d", "e", "f"]
const FloatArray = ({ name, value, update }: FloatArrayProps) => {
    const [currentValue, setCurrentValue] = useState<any>(value)
    console.log(currentValue)
    const updateValue = (newValue: number, key: string) => {
        value[key] = newValue
        const newVal = new Float32Array(value)
        update(newVal)
        setCurrentValue( {...newVal} )
    }

    return (
        <div className='flex flex-col jusitfy-center gap-2'>
            <label className="capitalize pl-content">{name}:</label>
            {
                Object.keys(currentValue)
                    .filter((key) => typeof currentValue[key] === "number")
                    .map((key, index) => (
                        <div key={`${key}`} className="flex justify-evenly py-2 bg-content">
                            <span className="capitalize pl-content">{indexNames[index]}:</span>
                            <input
                                type="number"
                                className="bg-field"
                                name={indexNames[index]}
                                value={currentValue[key]}
                                onChange={({ target }) => { updateValue(parseFloat(target.value), key) }} />
                        </div>
                    )
                )
            }

        </div>
    )
}

export default FloatArray