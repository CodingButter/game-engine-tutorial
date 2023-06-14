import { useContext, createContext, useState } from "react";

const ActionPanelContext = createContext<any>(null);

export const useActionPanel = () => {
    return useContext(ActionPanelContext);
}

export type MessageType = "error" | "success" | "warning" | "info" | "default";

export const ActionPanelProvider = ({ children }: any) => {
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageType>("info");

    const setAction = (message: string, type: MessageType):void=> {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <ActionPanelContext.Provider value={{ setAction, message, messageType }}>
            {children}
        </ActionPanelContext.Provider>
    )
}



const Error = ({ children }: any) => {
    return (
        <div className="text-[12px] text-error-500">
            {children}
        </div>
    )
}
    
const Success = ({ children }: any) => {
    return (
        <div className="text-[12px] text-success-500">
            {children}
        </div>
    )
}

const Warning = ({ children }: any) => {
    return (
        <div className="text-[12px] text-warning-500">
            {children}
        </div>
    )
}

const Info = ({ children }: any) => {
    return (
        <div className="text-[12px] text-info-500">
            {children}
        </div>
    )
}

const Neutral = ({ children }: any) => {
    return (
        <div className="text-[12px] text-neutral-200">
            {children}
        </div>
    )
}


const ActionPanel = () => {
    const { message, messageType } = useActionPanel();
    let Wrapper;
    switch (messageType) {
        case "error":
            Wrapper = Error;
            break;
        case "success":
            Wrapper = Success;
            break;
        case "warning":
            Wrapper = Warning;
            break;
        case "info":
            Wrapper = Info;
            break;
        default:
            Wrapper = Neutral
            break;
    }
        
    return (
        <Wrapper>
            {message}
        </Wrapper>
    )
}

export default ActionPanel;