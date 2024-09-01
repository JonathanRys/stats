import './Button.css';
import { MouseEventHandler } from "react";

interface ButtonProps {
    value: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
    return (
        <button className="Button" onClick={props.onClick}>{props.value}</button>
    );
}

export default Button;
