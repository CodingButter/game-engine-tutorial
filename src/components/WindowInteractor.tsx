import { useRef, useEffect, useState } from 'react';
import { useMouseManager } from 'hooks/useMouseManager';
import { useActionPanel } from 'hooks/useActionPanel';
// make sure to offset object position by camera position

const WindowInteractor = (props: any) => {
    const frameRef = useRef<HTMLDivElement>(null);
    const { setAction } = useActionPanel();
    const { mousePosition , mouseDown, mouseUp, mouseIsDragging } = useMouseManager();
    const [startDragPosition, setStartDragPosition] = useState<number[]>([0,0]);
    useEffect(() => {
        if (!frameRef.current) return
       
        const frame = frameRef.current
        const handleMouseMove = (e: MouseEvent) => {
        }
        const handleMouseDown = (e: MouseEvent) => {
            setStartDragPosition(mousePosition)
        }
        const handleMouseUp = (e: MouseEvent) => {
            console.log("mouse up")
            
        }
        const handleDoubleClick = (e: MouseEvent) => {
             
        }

        const handleWheel = (e: WheelEvent) => {
            e.ctrlKey && e.preventDefault()
            if (e.ctrlKey) {}
        }

        frame.addEventListener("mousemove", handleMouseMove)
        frame.addEventListener("mousedown", handleMouseDown)
        frame.addEventListener("mouseup", handleMouseUp)
        frame.addEventListener("dblclick", handleDoubleClick)
        frame.addEventListener("wheel", handleWheel)
        return () => {
            frame?.removeEventListener("mousemove", handleMouseMove)
            frame?.removeEventListener("mousedown", handleMouseDown)
            frame?.removeEventListener("mouseup", handleMouseUp)
            frame?.removeEventListener("dblclick", handleDoubleClick)
            frame?.removeEventListener("wheel", handleWheel)
        }
    }, [ mouseIsDragging, mousePosition,setAction,startDragPosition, mouseDown, mouseUp]);

    return (<div ref={frameRef} className="w-full h-full flex shrink-0 grow justify-center items-center"></div>)
}

export default WindowInteractor