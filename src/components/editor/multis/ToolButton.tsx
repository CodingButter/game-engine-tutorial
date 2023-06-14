import classNames from "classnames"
import Button, { ButtonProps } from "components/editor/multis/Button"


const ToolButton = ({ children, className, ...rest }: ButtonProps) => {
    return (
            <Button size="sm" className={classNames("hover:bg-neutral-550 aspect-square grow shrink-0 w-full flex justify-center items-center",className)} {...rest}>{children}</Button>
    )
}

export default ToolButton