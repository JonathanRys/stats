import './DataForm.css'
import DataSet from '../stats/core.ts'
import DataDisplay from './DataDisplay/DataDisplay.tsx'
import Input from './common/Input/Input.tsx'
import Button from './common/Button/Button.tsx'
import Link from './common/Link/Link.tsx'
import { useState, useRef, MouseEventHandler, ChangeEventHandler, useEffect } from 'react'
import { stringKeyString } from '../types/json.ts'
import { InputDefinition, DataLink } from '../types/data.ts'

const DataForm = () => {
  const [formData, setFormData] = useState<stringKeyString>({});
  const [dataSet, setDataSet] = useState<DataSet>(new DataSet([]))
  const addDataInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { current } = addDataInputRef;
    if (current !== null) {
      current.scrollIntoView({behavior: "smooth"});
    }
  }, [dataSet]);

  // TODO: Move this to a hook
  // This object represents an input and its associated action
  // This allows me to link an input or a form with a button
  const addData = {
    id: "data-input",
    clickCallback: (inputId: string) => {
      const newDataSet = new DataSet(dataSet.dataSet)
      newDataSet.add(parseInt(formData[inputId]))
      setDataSet(newDataSet)
      setFormData({...formData, [inputId]: ''})
    },
    validations: (inputId: string) => formData[inputId] !== undefined
  }
  const zScore = {
    id: 's-score',
    clickCallback: (inputId: string) => {
      //Update state
      setFormData({...formData, [inputId]: ''})
    }
  }

  const clickHandlerCreator = (dataLink: DataLink) => {
    // Click handler for a button given an input or form's id
    const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault();

      // Return if the associated input is empty
      if (dataLink.validations && !dataLink.validations(dataLink.id)) {
        return
      }

      dataLink.clickCallback(dataLink.id);
    }

    return clickHandler;
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

  const inputTransformer = (input: InputDefinition) => <Input 
    id={input.id}
    ref={addDataInputRef}
    key={`input-${input.id}`}
    label={input.label}
    type="number" // to support other types, create a wrapper
    value={formData[input.id] || ''}
    onChange={changeHandler}
  />

  return (
    <form className="DataForm">
      <DataDisplay dataSet={dataSet}/>
      {
        inputTransformer({
          id: addData.id,
          label: "Add data"
        })
      }
      <div className="DataFormControls">
        <Link onClick={resetData} value="Reset" />
        <Button disabled={!formData[addData.id]} onClick={clickHandlerCreator(addData)} value="Add" />
      </div>
      {
        // Only allow the user to use this input if there is enough data
        dataSet.length >= 2 && <> 
        {
          inputTransformer({
            id: zScore.id,
            label: "Find z-score of"
          })
        }
        <div className="DataFormControls">
          <Button disabled={!formData[zScore.id]} onClick={clickHandlerCreator(zScore)} value="Calculate" />
        </div>
      </>
      }

    </form>
  )
}

export default DataForm
