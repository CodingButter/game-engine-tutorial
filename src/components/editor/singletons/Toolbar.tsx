import classNames from "classnames"
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import LanguageIcon from '@mui/icons-material/Language';
import { TfiMagnet } from 'react-icons/tfi';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import LightModeIcon from '@mui/icons-material/LightMode';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PublishIcon from '@mui/icons-material/Publish';
import HelpIcon from '@mui/icons-material/Help';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import TuneIcon from '@mui/icons-material/Tune';

const Toolbar = () => {
    return (
        <ul id="Toolbar" className="flex flex-col justify-center items-center text-2xl font-bold">
            <Button className="bg-neutral-400 text-neutral-100 text-xl hover:bg-brand-500"><span>T.T</span></Button>
            <Button className="bg-neutral-500 text-neutral-200"><ZoomOutMapIcon/></Button>
            <Button className="bg-neutral-650 text-neutral-150"><AutorenewIcon/></Button>
            <Button className="bg-neutral-500 text-neutral-200"><OpenInFullIcon/></Button>
            <Button className="bg-neutral-500 text-neutral-200"><FullscreenIcon/></Button>
            <Button className="bg-neutral-650 text-neutral-150"><LanguageIcon/></Button>
            <Button className="bg-neutral-400 text-neutral-200"><TfiMagnet/></Button>
            <Button className="bg-neutral-500 text-neutral-200"><RemoveRedEyeIcon/></Button>
            <Button className="bg-neutral-500 text-neutral-200"><UndoIcon/></Button>
            <Button className="bg-neutral-500 text-neutral-200"><RedoIcon/></Button>
            <Button className="bg-neutral-450 text-neutral-150"><LightModeIcon/></Button>
            <Button className="bg-neutral-450 text-neutral-150"><BorderColorIcon/></Button>
            <Button className="bg-neutral-450 text-neutral-150"><PublishIcon/></Button>
            <Button className="bg-neutral-650 text-neutral-150"><HelpIcon/></Button>
            <Button className="bg-neutral-600 text-neutral-150"><KeyboardIcon/></Button>
            <Button className="bg-neutral-600 text-neutral-150"><RateReviewIcon/></Button>
            <Button className="bg-neutral-600 text-neutral-150"><TuneIcon/></Button>
        </ul>
    )
}

const Button = ({ children, className, ...rest }:any) => {
    return (
        <li className={classNames('flex justify-center items-center aspect-square w-full p-2 hover:bg-neutral-550', className)}>
                {children}
        </li>
    )
}

export default Toolbar