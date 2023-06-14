import classNames from 'classnames';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { useState } from 'react';

interface HierarchyProps extends React.HTMLAttributes<HTMLDivElement> {
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hierarchy = ({expanded,setExpanded}:HierarchyProps) => {
  const gameObjects:any[] = [];
    console.log("rendered Hierarchy")
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const addGameObject = () => { }
    

    return (
        <div className={classNames(
    "flex flex-col w-full h-full grow",
        !expanded && "bg-neutral-700"                
        )}>
            <div className={classNames("origin-bottom-left flex justify-between items-center bg-neutral-700 h-8 w-full select-none",
                "transition-all duration-100",
                !expanded && "rotate-90 -translate-y-8"
            )}>
                <div className="flex items-center gap-4 p-1 px-1 w-full justify-between">
                    <div className="flex items-center gap-2 pl-1">
                        <button className={classNames("transition-all duration-300 text-neutral-700 w-4 h-4 bg-primary-300 rounded-full flex justify-center items-center text-[12px] font-thin",
                            expanded?"rotate-0":"-rotate-180")}
                            onClick={toggleExpanded}>
                            <ArrowDropDownIcon />
                        </button>
                        <span className="text-neutral-100 capitalize font-bold text-xs tracking-wider cursor-pointer" onClick={toggleExpanded}>HIERARCHY</span>
                    </div>
                    <div className={classNames("flex justify-center items-center gap-1", !expanded && "hidden")}>
                        <button className="flex items-center justify-center rounded-sm shadow bg-neutral-600 text-[12px]" onClick={addGameObject}>
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
                      
                        return (
                            <GameObjectItem
                                key={index} 
                                className={"pl-2"}
                                isSelected={false}
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
        <div className={classNames("flex flex-col w-full justify-start items-start font-thin text-sm", className)} {...props}>
            <button className="text-neutral-100 w-full capitalize text-[13px] tracking-wider hover:bg-neutral-650 text-left p-px px-1" onClick={() => setExpanded(!expanded)}>{title}:</button>
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