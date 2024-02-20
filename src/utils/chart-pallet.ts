export enum ChartPallet {
  AVG = '#9080ff',
  AVG_TOTAL = '#050020',
  Rating_1 = '#ea5545',
  Rating_2 = '#ef9b20',
  Rating_3 = '#ede15b',
  Rating_4 = '#27aeef',
  Rating_5 = '#87bc45',
}

export const chartIdToColor = (id: string | number) => {
  return {
    avg: ChartPallet.AVG,
    'avg-total': ChartPallet.AVG_TOTAL,
    1: ChartPallet.Rating_1,
    2: ChartPallet.Rating_2,
    3: ChartPallet.Rating_3,
    4: ChartPallet.Rating_4,
    5: ChartPallet.Rating_5,
  }[id];
};
