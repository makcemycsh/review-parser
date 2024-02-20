import { CSSProperties, FC } from 'react';

import { chartIdToColor } from '../../../utils/chart-pallet';

import './reviews-totals-chart-tooltip.scss';

interface CellType {
  dataKey: string;
  name: string;
  value: number;
}

export const ReviewsTotalsChartTooltip: FC<{
  label?: string;
  payload?: [{ payload: CellType }] | undefined;
}> = (props) => {
  const cellData = props.payload?.[0]?.payload;

  return (
    cellData && (
      <div className="reviews-totals-chart-tooltip">
        <div className="reviews-totals-chart-tooltip__label">
          <div
            className="reviews-totals-chart-tooltip__dot"
            style={{ '--color': chartIdToColor(cellData.dataKey) } as CSSProperties}
          />
          {cellData.dataKey === 'avg' ? (
            <>
              Средняя оценка - <b>{(cellData.value / 20).toFixed(2)}</b>
            </>
          ) : (
            <>
              {props.label} - {cellData?.value}%
            </>
          )}
        </div>
      </div>
    )
  );
};
