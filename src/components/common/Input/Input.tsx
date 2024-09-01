import './Input.css';
import { ChangeEventHandler } from 'react'

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input = (props: InputProps) => {

  return (
    <fieldset className='InputFieldset'>
      <label className="Label">{props.label}</label>
      <input className="Input" {...props} />
    </fieldset>
  )
}

export default Input
