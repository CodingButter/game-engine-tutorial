import { useTitan } from 'hooks/useTitan';
import classNames from 'classnames';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import Scene from 'titan/Scene';
import { useState } from 'react';

interface HierarchyProps extends React.HTMLAttributes<HTMLDivElement> {
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hierarchy = ({expanded,setExpanded}:HierarchyProps) => {
    const { scene, selectedObjects, selectObjects } = useTitan() as {scene:Scene,selectedObjects:any[],selectObjects:React.Dispatch<React.SetStateAction<any[]>>};
    const gameObjects = scene?.getGameObjects() || [];

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={classNames(
    "flex flex-col w-full h-full grow",
        !expanded && "bg-neutral-700"                
        )}>
            <div className={classNames("origin-bottom-left flex justify-between items-center bg-neutral-700 h-8 w-full",
                "transition-all duration-100",
                !expanded && "rotate-90 -translate-y-8"
            )}>
                <div className="flex items-center gap-4 p-1 px-1 w-full justify-between">
                    <div className="flex items-center gap-2 pl-1">
                        <button className={classNames("transition-all duration-300 text-neutral-700 w-4 h-4 bg-brand-300 rounded-full flex justify-center items-center text-[12px] font-thin",
                            expanded?"rotate-0":"-rotate-180")}
                            onClick={toggleExpanded}>
                            <ArrowDropDownIcon />
                        </button>
                        <span className="text-neutral-100 capitalize font-bold text-xs tracking-wider">HIERARCHY</span>
                    </div>
                    <div className={classNames("flex justify-center items-center gap-1", !expanded && "hidden")}>
                        <button className="flex items-center justify-center rounded-sm shadow bg-neutral-600 text-[12px]">
                            <AddIcon className="scale-75"/>
                        </button>
                        <button className="flex items-center justify-center rounded-sm shadow bg-neutral-600 text-[10px]">
                            <CopyAllIcon  className="scale-75"/>
                        </button>
                        <button className="flex items-center justify-center rounded-sm shadow bg-neutral-600">
                            <AddIcon className="scale-75"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={classNames("flex flex-col items-start justify-start w-full",
                !expanded && "hidden"
            )}>
                    <ExpandableMenu title="Root">
                    {gameObjects?.map((gameObject, index) => {
                        const isSelected = selectedObjects?.includes?.(gameObject);
                        return (
                            <GameObjectItem
                                key={index} 
                                className={"pl-2"}
                                isSelected={isSelected}
                                onClick={() => {
                                    if (selectedObjects.includes(gameObject))
                                        selectedObjects.splice(selectedObjects.indexOf(gameObject), 1);
                                    else
                                        selectedObjects.push(gameObject);
                                    selectObjects([...selectedObjects]);
                                }}
                            >
                                {gameObject.getName()}
                            </GameObjectItem>
                            )
                    })
                    }
                    </ExpandableMenu>
            </div>                        
        </div>
    )
}

const ExpandableMenu = ({ children, title, className, ...props }: any) => {
    const [expanded, setExpanded] = useState(false); 

    return (
        <div className={classNames("flex flex-col w-full justify-start items-start", className)} {...props}>
            <button className="text-neutral-100 w-full capitalize font-bold text-xs tracking-wider hover:bg-neutral-650 text-left px-2 py-1" onClick={() => setExpanded(!expanded)}>{title}:</button>
            <ul className={classNames(!expanded && "hidden","flex flex-col w-full justify-start items-start")}>
                {children}
            </ul>
        </div>
    )
}

const GameObjectItem = ({ children, className, isSelected,...props }: any) => (
    <button className={classNames("pl-2 text-neutral-100 w-full capitalize font-bold text-xs tracking-wider hover:bg-neutral-650 text-left px-2 py-1", isSelected && "bg-neutral-650",className)} {...props}>{children}</button>
)
export default Hierarchy