import './Output.css';

interface InputProps {
  id: string;
  label?: string;
  units?: string;
  value: string;
}

const Output = (props: InputProps) => {
    const {id, label, units, value} = props;

  return (
    <fieldset className={`OutputFieldset ${units}`}>
      <label className="Label">{label}</label>
      {
       
        <output className="Output" id={`output-${id}`}>{value}</output>
      }
    </fieldset>
  )
}

export default Output;
