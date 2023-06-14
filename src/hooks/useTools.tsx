import { createContext, useContext } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import defualtToolSettings from "defaults/toolSettings.json" ;
import { IconName } from '@fortawesome/free-regular-svg-icons';

export type Icon = {
    name: IconName,
    className: string
}

export type Tool = {
    label: string;
    description: string;
    icon: Icon;
    order: number;
}

type ToolSettings = {
    historyStorage: number;
    tools: Tool[];
}

type ToolContext = {
    activeTool: string;
    setActiveTool: (tool: string) => void;
    toolSettings: ToolSettings;
    setToolSettings: (tool:string, settings: Tool) => void;
    history: string[];
    undo: () => void;
    redo: () => void;
    addHistory: () => void;
}

const ToolsContext = createContext<ToolContext>({} as ToolContext);
const useTools = () => useContext(ToolsContext);



export const ToolsProvider = ({ children, ...rest }: React.PropsWithChildren<any>) => {
    const [activeTool, setActiveTool] = useLocalStorage("activeTool", "select");
    const [toolSettings, setToolSettings] = useLocalStorage("toolSettings", defualtToolSettings);
    const [history, setHistory] = useLocalStorage("history", []);
    const [historyIndex, setHistoryIndex] = useLocalStorage("historyIndex", -1);

    const addHistory = () => {
        //@TODO Get current state of scene
        const currentState = "";
        setHistory([...history, currentState]);
    }

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            //Reload State
        }
    }

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            //Reload State
        }
    }

    

    return (
        <ToolsContext.Provider value={{
            activeTool,
            setActiveTool,
            toolSettings,
            setToolSettings,
            history,
            undo,
            redo,
            addHistory
        }}>
            {children}
        </ToolsContext.Provider>
    )   
}


export default useTools;
