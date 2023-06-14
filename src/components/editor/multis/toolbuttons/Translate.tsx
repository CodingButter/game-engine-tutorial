import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ToolButton from "components/editor/multis/ToolButton"
import { ButtonProps } from "components/editor/multis/Button"
import classNames from 'classnames';
export default function Translate({ className, ...rest }: ButtonProps) {
    return <ToolButton title="Translate" className={classNames(
        "bg-neutral-500 text-neutral-200",
        className)} {...rest}>
        <ZoomOutMapIcon />
    </ToolButton>
}