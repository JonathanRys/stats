import './Input.css';
import { ChangeEventHandler, InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  label?: string;
  units?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, units } = props;



  return (
    <fieldset className='InputFieldset'>
      <label className="Label">{label}</label>
      {
        units ? 
        <span className={`label ${units}`}><input {...props} ref={ref} className="Input" /></span> : 
        <input {...props} ref={ref} className="Input" />
      }
    </fieldset>
  )
})

export default Input
