import './DataDisplay.css';
import DataSet from '../../stats/core';
import Output from '../common/Output/Output.tsx';

interface DataDisplayProps {
  dataSet: DataSet;
}

const formatData = (dataPoint: number, precision: number = 2) => {
    // Convert to a number to trim extra zeros
    return Number(dataPoint.toFixed(precision)).toString();
}

const formatDataSet = (data: DataSet) => {
    const dataInRange = data.removeOutliers();
    const formattedDataSet = data.dataSet.map((value, i) => {
        let newValue = <>{value}</>
        if (data.length > 3) {
            // Don't show outliers unless the IQR is relevant
            newValue = <span className="red">{value}</span>
        }

        const formattedValue = dataInRange.includes(value) ? value : newValue;
        return <span key={`item-${i}`}>{i ? <>, {formattedValue}</> : formattedValue}</span>;
    })

    return <>{'[ '}{formattedDataSet}{' ]'}</>
}

const DataDisplay = (props: DataDisplayProps) => {
    const {dataSet} = props;

    return (
        <div className="DataDisplay">
            {
                dataSet.length ? (
                    <>
                        <div className='Group'>
                            <Output id="mean" label="Mean" value={formatData(dataSet.mean())} />
                            <Output id="median" label="Median" value={formatData(dataSet.median())} />
                            <Output id="mode" label="Mode" value={formatData(dataSet.mode())} />
                        </div>
                        {
                            dataSet.length > 1 ? (
                                <>
                                    <div className='Group'>
                                        <Output id="range" label="Range" value={formatData(dataSet.range())} />
                                        {
                                            dataSet.length > 3 ? (
                                                <Output id="iqr" label="IQR" value={formatData(dataSet.iqr())} />
                                            ) : null
                                        }
                                        <Output id="mad" label="Mean Abs. Deviation" value={formatData(dataSet.mad())} />
                                    </div>
                                    <div className='Group'>
                                        <Output id="variance" label="Variance" value={formatData(dataSet.varianceS(), 4)} />
                                        <Output id="std-deviation" label="Std. Deviation" value={formatData(dataSet.stdDevS(), 4)} />
                                    </div>
                                </>
                            ) : null
                        }
                        <hr />
                        <div className="DataSet">{formatDataSet(dataSet)}</div>
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