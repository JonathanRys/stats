import './Input.css';
import { ChangeEventHandler, InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label } = props;

  return (
    <fieldset className='InputFieldset'>
      <label className="Label">{label}</label>
      <input {...props} ref={ref} className="Input"  />
    </fieldset>
  )
})

export default Input
