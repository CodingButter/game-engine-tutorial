import { useEffect, useState } from "react"
import ComponentMenu from "./ComponentMenu"
import Window from "titan/Window"
import type LevelEditorScene from "titan/LevelEditorScene"
import type GameObject from "titan/GameObject"
import type Component from "titan/Component"
import TransformMenu from "./TransformMenu"
    
const ObjectMenu = () => {
    const scene:LevelEditorScene = Window.getScene?.() as LevelEditorScene
    const [activeGameObject, setActiveGameObject] = useState<GameObject | null>(null)
    useEffect(() => {
        scene?.addListener?.("activeGameObjectChanged", setActiveGameObject)
        return () => {
            scene?.removeListener?.("activeGameObjectChanged", setActiveGameObject)
        }
    }, [scene])

    return (
        <div className="Object flex flex-col w-full">
            {
                activeGameObject && (
                    <>
                        <div className="uppercase p-content">{activeGameObject.getName()}</div>
                        <div className="ComponentList flex flex-col rounded-sm shadow-md gap-2">
                            <TransformMenu transform={activeGameObject.transform} />
                            {
                                activeGameObject.getComponents().map((component:Component, index:number) => (
                                    <ComponentMenu key={index} component={component} />
                                ))
                            }
                        </div>
                    </>
                ) 
            }
        </div>
    )
}

export default ObjectMenu