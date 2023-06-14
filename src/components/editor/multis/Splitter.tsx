import { useState } from "react";
import classNames from "classnames";

const Splitter = ({ id = 'drag-bar', dir, isDragging, ...props }: any) => {
    const [isFocused, setIsFocused] = useState(false)
    
    return (
        <div
            id={id}
            data-testid={id}
            tabIndex={0}
            className={
                classNames('z-40 transition-all duration-200 shrink-0 bg-neutral-650',
                dir === 'horizontal' ? 'h-[1px] w-full cursor-row-resize hover:h-2' : 'w-[1px] hover:w-2 cursor-col-resize',
                (isDragging || isFocused) && 'bg-primary-300')
            }
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    )
}

export default Splitter