import './Input.css';
import { ChangeEventHandler, Ref, useEffect } from 'react'

interface InputProps {
  id?: string;
  label?: string;
  type: string;
  value?: string | number;
  inputref: Ref<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Input = (props: InputProps) => {
  useEffect(() => {
    // props.inputref?.current?.focus()
  }, [])

  return (
    <fieldset className='Fieldset'>
      <label className="Label">{props.label}</label>
      <input className="Input" ref={props.inputref} {...props} />
    </fieldset>
  )
}

export default Input
