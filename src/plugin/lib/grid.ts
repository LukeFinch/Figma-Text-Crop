import {prompt} from './prompt';

export const roundToGrid = (number: number, gridSize: number) => {
  return Math.round(number / gridSize) * gridSize;
};

export const getGridSize = async () => {
  let gs = await figma.clientStorage.getAsync('gridSize');
  if (isNaN(gs)) {
    gs = await prompt(
      'Grid Size',
      'Set your grid size, use 0 for no rounding',
      1,
      false,
    );
    figma.clientStorage.setAsync('gridSize', gs);
    getGridSize();
  } else {
    return gs;
  }
};
