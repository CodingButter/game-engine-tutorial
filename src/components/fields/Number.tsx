import { useState } from "react"
import { Num } from "titan/util/DataTypes"
interface NumberProps {
    update: (value: any) => void
    name: string
    value: Num
}

const Number = ({ name, value, update }:NumberProps) => {
    const [currentValue, setCurrentValue] = useState<number>(value.value)
    const updateValue = (newValue: number) => {
        //if float parse as float if int parse as int
        //set precision to 2
        newValue = parseFloat(newValue.toFixed(value.precision))
        
        value.value = newValue
        setCurrentValue(newValue)
        update(value)
    }


    const decrementValue = () => {
        if (currentValue - value.step >= value.min) {
            updateValue(currentValue - value.step)
        }
    }

    const incrementValue = () => {
        if (currentValue + value.step <= value.max) {
            updateValue(currentValue + value.step)
        }
    }

    return (
        <div className='flex p-content gap-2 justify-between'>
            <label className="capitalize">{name}:</label>
            <div className="font-thin number-group flex justify-center items-center overflow-hidden rounded-sm gap-[2px] align-middle">
              <button onClick={decrementValue} className='bg-field text-center align-middle w-6 active:bg-hovered hover:font-bold hover:bg-surface'>-</button>
                <input className="bg-field font-bold text-surface pl-1 pr-0 outline-none no-spinners"
                    type="number"
                    min={value.min}
                    max={value.max}
                    step={value.step}
                    value={currentValue} onChange={({ target }) => updateValue(parseFloat(target.value))} />
              <button onClick={incrementValue} className='bg-field text-center align-middle w-6 active:bg-hovered hover:font-bold hover:bg-surface'>+</button>
            </div>
        </div>
    )
}

export default Number