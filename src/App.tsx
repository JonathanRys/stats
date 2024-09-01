import DataSet from './stats/core.ts'
import DataForm from './components/DataForm.tsx'
// import { formatInverseKey } from './stats/util.ts'

const App = () => {
  const dataSet = new DataSet([19.25, 21.25, 23.25])

  return (
    <div id="app" className="App">
      <div>{dataSet.zScore(23)}</div>
      <div>{DataSet.zTable(dataSet.zScore(23))}</div>
      <div>{dataSet.zScore(26)}</div>
      <div>{DataSet.zTable(dataSet.zScore(26))}</div>
      <hr/>
      test
      {/* <div>{formatInverseKey(.1)}</div> */}
      <div>{DataSet.inverseZ(0.9913)}</div>
      <DataForm />
    </div>
  )
}

export default App
