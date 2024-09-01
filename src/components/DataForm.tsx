import DataSet from '../stats/core.ts'
import Input from './common/Input/Input.tsx'
import Button from './common/Button/Button.tsx'
import Link from './common/Link/Link.tsx'
import { useState, useRef, MouseEventHandler, ChangeEventHandler } from 'react'

const DataForm = () => {
  const [formData, setFormData] = useState({});
  const [dataSet, setDataSet] = useState<DataSet>(new DataSet([]))
  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (!inputRef?.current?.value) {
        return;
    }

    dataSet.add(parseInt(inputRef.current.value || "0"))
  }

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) =>  {
    const newValue = e.target.value;
    const targetId = e.target.id;
    setFormData({...formData, [targetId]: newValue})
  };

  console.log(formData)
  const resetData = () => {
    setDataSet(new DataSet([]))
  }

  return (
    <form className="DataForm">
      <Input id="one" onChange={changeHandler} inputref={inputRef} label="Test1" type="text"/>
      <Input id="two" onChange={changeHandler} inputref={inputRef} label="Test2" type="number"/>
      <Input id="tre" onChange={changeHandler} inputref={inputRef} label="Test3" type="text"/>
      <div className="DataFormControls">
        <Link onClick={resetData} value="Reset" />
        <Button onClick={clickHandler} value="OK" />
      </div>
    </form>
  )
}

export default DataForm
