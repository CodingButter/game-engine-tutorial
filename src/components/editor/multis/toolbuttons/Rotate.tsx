import AutorenewIcon from '@mui/icons-material/Autorenew';
import ToolButton from "components/editor/multis/ToolButton"
import { ButtonProps } from "components/editor/multis/Button"
import classNames from 'classnames';
export default function Rotate({ className,...rest }: ButtonProps) {
    return <ToolButton title="scale"
        className={classNames("bg-neutral-500 text-neutral-200",
            className)}>
        <AutorenewIcon />
    </ToolButton>
}