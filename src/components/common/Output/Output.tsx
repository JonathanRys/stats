import './Output.css';

interface InputProps {
  id: string;
  label?: string;
  value: string;
}

const Output = (props: InputProps) => {
    const {id, label, value} = props;

  return (
    <fieldset className='OutputFieldset'>
      <label className="Label">{label}</label>
      <output className="Output" id={`output-${id}`}>{value}</output>
    </fieldset>
  )
}

export default Output;
