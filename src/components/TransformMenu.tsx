import Transform from "titan/Transform"
import Field from "./Field"

interface TransformMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    transform: Transform
}

const TransformMenu = ({ transform }:TransformMenuProps) => {
    return (
        <div className="flex flex-col w-full bg-surface pb-2">
            <div className="flex p-content capitalize">Transform</div>
            <div className="Component flex flex-col gap-2 w-full">
                {
                    transform.getEditableFields().map((field, index) =>
                        <Field key={`${field.name}-${index}`} component={transform} name={field.name} value={field.value} />
                    )}
            </div>
        </div>
    ) 
}

export default TransformMenu