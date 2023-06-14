import MouseManagerProvider from "hooks/useMouseManager"
import { ActionPanelProvider } from "hooks/useActionPanel"
import React from "react"


const Providers = ({ children , ...props }: React.PropsWithChildren<{}>) => {
    return (<MouseManagerProvider>
            <ActionPanelProvider>
                {children}
            </ActionPanelProvider>
        </MouseManagerProvider>)
}

export default Providers