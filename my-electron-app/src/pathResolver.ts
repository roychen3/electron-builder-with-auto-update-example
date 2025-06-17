import path from 'path';

export const getAppUiPath = (restPath = '') =>
  path.join(__dirname, '../ui/', restPath);
