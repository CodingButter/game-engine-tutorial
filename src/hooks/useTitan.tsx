import { createContext, useContext, useState, useEffect } from "react";
import { default as Titan } from "titan/Window"


const TitanContext = createContext<any>(null);

export const useTitan = () => {
    return useContext(TitanContext);
}

interface TitanProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    canvasWrapper: React.RefObject<HTMLDivElement>
}

export const TitanProvider = ({ canvasWrapper, children }: TitanProviderProps) => {
    const [gameLoaded, setGameLoaded] = useState(false)
    const [selectedObjects, selectObjects] = useState<any[]>([]);

    const [scene, setScene] = useState<any>(null)

    const setGameWindowLoaded = () => {
        setGameLoaded(true)
    }

    const saveGame = () => {
        Titan.getScene().save()
    }

    const exportGame = () => {
        Titan.getScene().export()
    }

    const importGame = () => {
        Titan.getScene().import()
    }

    const handleSelectObjects = (objects: any[]) => {
        const obj = objects[0]
        selectObjects(objects)
        scene?.setActiveGameObject(obj)
        if (obj)
            obj.transform.position[0] += 50;
        
    }

    useEffect(() => {
        if(!canvasWrapper.current) return
        let window = Titan.get()
        setScene(Titan.getScene())
        window.addListener("loaded", setGameWindowLoaded)
        Titan.attachCanvas(canvasWrapper.current as HTMLDivElement)
        if(!gameLoaded) window.run()

        return () => {
        window.removeListener("loaded", setGameWindowLoaded);
        }

    }, [canvasWrapper,gameLoaded])
    
    return (
        <TitanContext.Provider value={{ Titan, scene, saveGame, exportGame, importGame, selectedObjects, selectObjects:handleSelectObjects }}>
            {children}
        </TitanContext.Provider>
    )
}