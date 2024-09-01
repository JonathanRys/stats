import './Button.css';
import { MouseEventHandler } from "react";

interface ButtonProps {
    value: string;
    disabled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
    const { disabled, onClick, value} = props;
    return (
        <button disabled={disabled} className="Button" onClick={onClick}>{value}</button>
    );
}

export default Button;
