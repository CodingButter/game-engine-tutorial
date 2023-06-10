import Field from "./Field"
import type Component from "titan/Component"

interface ComponentMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    component: Component
}

const ComponentMenu = ({ component }:ComponentMenuProps) => {
    return (
        <div className="flex flex-col w-full bg-surface pb-2">
            <div className="flex p-content capitalize">{component.constructor.name}</div>
            <div className="Component flex flex-col gap-2 w-full">
                {component.getEditableFields().map((field, index) => <Field key={`${field.name}-${index}`} component={component} name={field.name} value={field.value} />)}
            </div>
        </div>
    ) 
}

export default ComponentMenu