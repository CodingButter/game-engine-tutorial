import Resizable from "react-resizable-layout";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    axis: "x" | "y"
}

const Panel = ({ children, axis }: PanelProps) => {
    return (
        <Resizable axis={axis}>
            {({ position,separatorProps }) => (
                 <div className="wrapper">
                    <div className="left-block" style={{ width: position }} />
                    <div {...separatorProps} />
                    <div className="right-block" />
                </div>
            )}
        </Resizable>
    )
}
    
export default Panel;