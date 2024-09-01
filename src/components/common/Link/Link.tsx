import './Link.css';
import { MouseEventHandler } from "react";

interface ButtonProps {
    value: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
    return (
        <button type="reset" className="Link" onClick={props.onClick}>{props.value}</button>
    );
}

export default Button;
