import './DataForm.css'
import DataSet from '../stats/core.ts'
import DataDisplay from './DataDisplay/DataDisplay.tsx'
import Input from './common/Input/Input.tsx'
import Button from './common/Button/Button.tsx'
import Link from './common/Link/Link.tsx'
import { useState, useRef, MouseEventHandler, ChangeEventHandler, useEffect } from 'react'
import { stringKeyString } from '../../types/json.ts'

const ACTIVE_INPUT_ID = "data-input"; // This is the ID of the input that is used by the Add button

const DataForm = () => {
  const [formData, setFormData] = useState<stringKeyString>({});
  const [dataSet, setDataSet] = useState<DataSet>(new DataSet([]))
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { current } = inputRef;
    if (current !== null) {
      console.log('scrolling into view')
      current.scrollIntoView({behavior: "smooth"});
    }

  }, []);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (formData[ACTIVE_INPUT_ID] === undefined) {
        return;
    }

    const newDataSet = new DataSet(dataSet.dataSet)
    newDataSet.add(parseInt(formData[ACTIVE_INPUT_ID]))
    setDataSet(newDataSet)
    setFormData({...formData, [ACTIVE_INPUT_ID]: ''})
  }

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) =>  {
    const newValue = e.target.value;
    const targetId = e.target.id;
    setFormData({...formData, [targetId]: newValue.toString()})
  };

  const resetData: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setDataSet(new DataSet([]))
  }

  const numericInputs = [
    {
      id: ACTIVE_INPUT_ID,
      label: "Data Input"
    }
  ];

  return (
    <form className="DataForm">
      <DataDisplay dataSet={dataSet}/>
      {
        numericInputs.map(input => <Input 
          id={input.id}
          ref={inputRef}
          key={`input-${input.id}`}
          label={input.label}
          type="number"
          value={formData[input.id] || ''}
          onChange={changeHandler}
        />)
      }

      <div className="DataFormControls">
        <Link onClick={resetData} value="Reset" />
        <Button disabled={!formData[ACTIVE_INPUT_ID]} onClick={clickHandler} value="Add" />
      </div>
    </form>
  )
}

export default DataForm
