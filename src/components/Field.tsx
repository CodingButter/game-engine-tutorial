import React, { useState } from "react"
import Number from "./fields/Number"
import Boolean from "./fields/Boolean"
import Component from "titan/Component"
import FloatArray from "./fields/FloatArray"
import Transform from "titan/Transform"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
    component: Component | Transform
    name: string,
    value: any
}

const Field = ({ component, name, value }: FieldProps) => {
    const [valueState, setValueState] = useState<typeof value>(value)
    const update = (newValue: any) => {
        setValueState(newValue)
        component.setEditableField(name, newValue)
    }

    let FieldComponent = null
    if (value?.constructor.name === "Num") {
        FieldComponent = Number
    } else if (typeof value === "boolean") {
        FieldComponent = Boolean
    } else if (value?.constructor === Float32Array) {
        FieldComponent = FloatArray
    }

    

    return (<div className="flex flex-col Field bg-content">
        {
            FieldComponent && <FieldComponent name={name} value={valueState} update={update} />
        }
        </div>)
}
export default Field;