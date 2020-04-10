export const EXPONENTIAL_DOMAIN = { max: 1, min: -1 };

// this function assumes a minimum of -1 and a maximum of 1
// offsetAmount represents how skewed the x intercept is from 0
// see the README for more information
export const createScaleFunction = (offsetAmount) => {
  // k and a are constants used for the curve calculation
  const k = Math.log(Math.sqrt((Math.exp(offsetAmount) + 1) / (Math.exp(offsetAmount) - 1)));
  const a = Math.sqrt((Math.exp(offsetAmount) + 1) * (Math.exp(offsetAmount) - 1));

  return {
    x: (x) => a * Math.exp(k * x) - Math.exp(offsetAmount),
    y: (y) => (1 / k) * Math.log((y + Math.exp(offsetAmount)) / a), // inverse of x
  };
};
