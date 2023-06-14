
import { createContext, useContext, useEffect, useState, useRef } from "react";

const MouseContext = createContext<any>(null);

export const useMouseManager = () => {
    return useContext(MouseContext);
}

export const MouseManagerProvider = ({ children }: any) => {
    const [mousePosition, setMousePosition] = useState<number[]>([0,0]);
    const [mouseDown, setMouseDown] = useState(false);
    const [mouseUp, setMouseUp] = useState(false);
    const [mouseIsDragging, setMouseIsDragging] = useState(false);
    const targetRef = useRef<any>(null);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            let x = e.clientX;
            let y = window.innerHeight - e.clientY;
            x -= window.innerWidth / 2;
            y -= window.innerHeight / 2;
            setMousePosition([x,y]);
            
        }

        const handleMouseDown = (e: MouseEvent) => {
            setMouseDown(true);
            setMouseUp(false);
            targetRef.current = e.target;
        }

        const handleMouseUp = (e: MouseEvent) => {
            setMouseUp(true);
            setMouseDown(false);
            targetRef.current = null;
        }

        const handleMouseScroll = ( e: Event) => {
        
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("wheel", handleMouseScroll);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        }
    }, [])
    
    useEffect(() => {
        if (mouseDown && targetRef.current) {
            targetRef.current.setPointerCapture(1);
            setMouseIsDragging(true);
        }
        if (mouseUp) {
            setMouseIsDragging(false);
        }
    }, [mouseDown, mouseUp])


    return (
        <MouseContext.Provider value={{ mousePosition, mouseDown, mouseUp, mouseIsDragging }}>
            {children}
        </MouseContext.Provider>
    )
}

export default MouseManagerProvider
