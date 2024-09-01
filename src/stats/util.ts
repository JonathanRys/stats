export const normalProbabilityDensity = (x: number): number => {
  const constant: number = 1.0 / Math.sqrt(Math.pow(2, Math.PI));
  return (constant * Math.pow(Math.E, Math.pow(-x, 2) / 2.0 ));
}

export const formatKey = (value: number): string => {
  // Will format a value for use as a key in the zScore.json
  if (value > 3.5 || value < -3.4) {
    throw new RangeError("Value must be between -3.4 and 3.5");
  }
  return value.toFixed(2).toString();
}
