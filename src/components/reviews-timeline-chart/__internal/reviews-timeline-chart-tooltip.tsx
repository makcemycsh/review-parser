import { CSSProperties, FC } from 'react';

import { chartIdToColor } from '../../../utils/chart-pallet';

import './reviews-timeline-chart-tooltip.scss';

interface DataType {
  dataKey: string;
  name: string;
  value: number;
}

const dataKeyToName: Record<string, string> = {
  'avg-total': 'За день',
  avg: 'С начала периода',
  1: 'Оценка 1',
  2: 'Оценка 2',
  3: 'Оценка 3',
  4: 'Оценка 4',
  5: 'Оценка 5',
};

export const ReviewTimelineChartTooltip: FC<{
  label?: number;
  payload?: Array<DataType>;
}> = ({ payload, label }) => {
  return (
    !!payload.length && (
      <div className="reviews-timeline-chart-tooltip">
        <div className="reviews-timeline-chart-tooltip__header">
          {label ? new Date(label).toLocaleDateString() : ''}
        </div>
        <div className="reviews-timeline-chart-tooltip__group">
          <div className="reviews-timeline-chart-tooltip__group-header">Средняя оценка</div>

          {[payload?.[0], payload?.[1]].filter(Boolean).map((item) => (
            <div className="reviews-timeline-chart-tooltip__item" key={item?.dataKey}>
              <div className="reviews-timeline-chart-tooltip__label">
                <div
                  className="reviews-timeline-chart-tooltip__dot"
                  style={{ '--color': chartIdToColor(item?.dataKey || '') } as CSSProperties}
                />
                {dataKeyToName[item?.dataKey || '']}
              </div>
              <b>{item?.value}</b>
            </div>
          ))}
        </div>
        <div className="reviews-timeline-chart-tooltip__group">
          <div className="reviews-timeline-chart-tooltip__group-header">Сумма</div>
          {[payload?.[2], payload?.[3], payload?.[4], payload?.[5], payload?.[6]]
            .filter((item) => item?.value)
            .map((item) => (
              <div className="reviews-timeline-chart-tooltip__item" key={item?.dataKey}>
                <div className="reviews-timeline-chart-tooltip__label">
                  <div
                    className="reviews-timeline-chart-tooltip__dot"
                    style={{ '--color': chartIdToColor(item?.dataKey || '') } as CSSProperties}
                  />
                  {dataKeyToName[item?.dataKey || '']}
                </div>
                <span>{item?.value}</span>
              </div>
            ))}
        </div>
      </div>
    )
  );
};
