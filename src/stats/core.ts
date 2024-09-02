import zScoreJson from '../../data/zScores.json';
import { formatKey } from './util.js';
import type { numberKeyNumber, stringKeyNumber } from '../../types/json.js'

export default class DataSet {
    debug: boolean = true;
    dataSet: number[] = [];
    constructor(dataSet: number[]) {
        this.dataSet = [...dataSet].sort((a, b) => a - b);
    }

    get
    length(): number {
        return this.dataSet.length;
    }

    add(value: number): void {
        this.dataSet.push(value);
        this.dataSet = [...this.dataSet].sort((a, b) => a - b);
    }

    shift(margin: number = 1): number[] {
        return this.dataSet.map(x => x + margin)
    }

    scale(factor: number = 1): number[] {
        return this.dataSet.map(x => x * factor)
    }

    range(): number {
        return this.dataSet[this.dataSet.length - 1] - this.dataSet[0];
    }

    mean(): number {
        if (!this.dataSet.length) throw new RangeError('Cannot calculate the mean of an empty data set.');
        return this.dataSet.reduce((x, acc) => x + acc, 0) / this.dataSet.length;
    }

    median(): number {
        if (!this.dataSet.length) throw new RangeError('Cannot calculate the median of an empty data set.');
    
        const i: number = Math.floor(this.dataSet.length / 2);
        if (this.dataSet.length % 2 !== 0) {
            return this.dataSet[i];
        } else {
            return (this.dataSet[i - 1] + this.dataSet[i]) / 2
        }
    }

    mode(): number  {
        if (!this.dataSet.length) throw new RangeError('Cannot calculate the mode of an empty data set.');
        const freq: numberKeyNumber = {};
        let max: number = 0;
        let count: number = 0;
        let total: number = 0;
        for (const item of this.dataSet) {
            freq[item] ??= 0;
            freq[item] += 1;
            if (freq[item] > max) {
                max = freq[item]
            }
        }

        for (const i in freq) {
            if (freq[i] === max) {
                total += Number(i);
                count += 1
            }
        }

        if (!count) throw new RangeError('Divide by zero when calculating mode.')
    
        return total / count;
    }

    iqr(): number {
        // Inter-Quartile Range
        let q1Index: number = Math.floor(this.dataSet.length * 0.25);
        let q3Index: number = Math.floor(this.dataSet.length * 0.75);
        let q1: number = this.dataSet[q1Index];
        let q3: number = this.dataSet[q3Index];
    
        if (this.dataSet.length % 2 === 0) {
            if ((this.dataSet.length * 0.5) % 2 === 0) {
                q1 = (this.dataSet[q1Index - 1] + this.dataSet[q1Index]) * 0.5
                q3 = (this.dataSet[q3Index - 1] + this.dataSet[q3Index]) * 0.5
            }
        } else {
            if (((this.dataSet.length - 1) * 0.5) % 2 === 0) {
                q1 = (this.dataSet[q1Index - 1] + this.dataSet[q1Index]) * 0.5
                q3 = (this.dataSet[q3Index] + this.dataSet[q3Index + 1]) * 0.5
            }
        }
    
        return q3 - q1;
    }

    mad(): number {
        // Mean Absolute Deviation
        const _mean: number = this.mean();
        let total: number = 0;
        for (const item of this.dataSet) {
            total += Math.abs(_mean - item);
        }
        return total / this.dataSet.length;
    }
    
    varianceP(): number {
        // Population variance
        const _mean: number = this.mean();
        let total: number = 0;
        for (const item of this.dataSet) {
            total += Math.pow(_mean - item, 2);
        }
        return total / this.dataSet.length;
    }
    
    stdDevP(): number {
        // Standard deviation for a population
        return Math.sqrt(this.varianceP());
    }
    
    varianceS(): number {
        // Sample variance
        const _mean: number = this.mean();
        let total: number = 0;
        for (const item of this.dataSet) {
            total += Math.pow(_mean - item, 2);
        }
        return total / (this.dataSet.length - 1);
    }
    
    stdDevS(): number {
        // Standard deviation for a sample
        return Math.sqrt(this.varianceS());
    }
    
    removeOutliers(xIQR: number = 1.5): number[] {
        const _iqr: number = this.iqr();
        const _median: number = this.median();
        const limit: number = _iqr * xIQR;
        const lowerLimit: number = _median - (_iqr * 0.5) - limit;
        const upperLimit: number = _median + (_iqr * 0.5) + limit;
        return this.dataSet.filter(item => item > lowerLimit && item < upperLimit);
    }

    zScore(value: number): number {
        return (value - this.mean()) / this.stdDevS();
    }

    static zTable(_zScore: number): number {
        return (zScoreJson as stringKeyNumber)[formatKey(_zScore)];
    }

    static inverseZ(fraction: number): number {
        const sortedValues = Object.values(zScoreJson).sort((a, b) => a - b)
        const nearestValue = sortedValues.filter((val) => !(val < fraction))[0];
        const validKeys = Object.keys(zScoreJson).filter(key => (zScoreJson as stringKeyNumber)[key] === nearestValue)
        const sortedKeys = validKeys.sort((a, b) => parseFloat(a) - parseFloat(b))
        return parseFloat(sortedKeys[0])
    }
}
