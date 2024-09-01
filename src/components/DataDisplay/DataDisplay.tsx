import './DataDisplay.css';
import DataSet from '../../stats/core';
import Output from '../common/Output/Output.tsx';

interface DataDisplayProps {
  dataSet: DataSet;
}

const formatData = (data: number[]) => {
    if (data.length <= 1) return data;
    return data.reduce((acc, a, i) => { return acc + (i ? ', ' : '') + a}, '')
}

const DataDisplay = (props: DataDisplayProps) => {
    const {dataSet} = props;

    return (
        <div className="DataDisplay">
            {
                dataSet.length ? (
                    <>
                        <div className='Group'>
                            <Output id="mean" label="Mean" value={(dataSet.mean()).toString()} />
                            <Output id="median" label="Median" value={(dataSet.median()).toString()} />
                            <Output id="mode" label="Mode" value={(dataSet.mode()).toString()} />
                        </div>
                        {
                            dataSet.length > 1 ? (
                                <>
                                    <div className='Group'>
                                        <Output id="range" label="Range" value={(dataSet.range()).toString()} />
                                        {
                                            dataSet.length > 3 ? (
                                                <Output id="iqr" label="IQR" value={(dataSet.iqr()).toString()} />
                                            ) : null
                                        }
                                        <Output id="mad" label="Mean Abs. Deviation" value={(dataSet.mad()).toFixed(2)} />
                                    </div>
                                    <div className='Group'>
                                        <Output id="variance" label="Variance" value={(dataSet.varianceS()).toFixed(4)} />
                                        <Output id="std-deviation" label="Std. Deviation" value={(dataSet.stdDevS()).toFixed(4)} />
                                    </div>
                                </>
                            ) : null
                        }
                        <hr />
                        <div className="DataSet">{'[ '}{formatData(dataSet.dataSet)}{' ]'}</div>
                    </>
                ) : <div>No info to display.</div>
            }
        </div>
    )
}

export default DataDisplay


{/* <div>{dataSet.zScore(23)}</div>
<div>{DataSet.zTable(dataSet.zScore(23))}</div>
<div>{dataSet.zScore(26)}</div>
<div>{DataSet.zTable(dataSet.zScore(26))}</div>
<div>{DataSet.inverseZ(0.9913)}</div> */}