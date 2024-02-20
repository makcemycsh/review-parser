import { FC, memo, useMemo } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { OrganizationReview } from '../../types/organization-review';
import { ChartPallet } from '../../utils/chart-pallet';

import { ReviewsTotalsChartTooltip } from './__internal/reviews-totals-chart-tooltip';

export const ReviewsTotalsChart: FC<{ reviews?: Array<OrganizationReview> }> = memo(({ reviews = [] }) => {
  const totalsChartData = useMemo(() => {
    const ratingTotals = Object.values(
      reviews.reduce<Record<number, { name: string; value: number; dataKey: string }>>(
        (acc, { rating }) => {
          if (acc[rating]) {
            acc[rating].value += 1;
          }

          return acc;
        },
        {
          1: { dataKey: '1', name: 'Оценка 1', value: 0 },
          2: { dataKey: '2', name: 'Оценка 2', value: 0 },
          3: { dataKey: '3', name: 'Оценка 3', value: 0 },
          4: { dataKey: '4', name: 'Оценка 4', value: 0 },
          5: { dataKey: '5', name: 'Оценка 5', value: 0 },
        }
      )
    ).map((d) => ({ ...d, value: Number(((d.value * 100) / reviews.length).toFixed(2)) }));

    ratingTotals.push({
      dataKey: 'avg',
      name: 'Среднее',
      value: Number(
        (
          (((ratingTotals[0].value * 1 +
            ratingTotals[1].value * 2 +
            ratingTotals[2].value * 3 +
            ratingTotals[3].value * 4 +
            ratingTotals[4].value * 5) /
            (ratingTotals[0].value +
              ratingTotals[1].value +
              ratingTotals[2].value +
              ratingTotals[3].value +
              ratingTotals[4].value)) *
            100) /
          5
        ).toFixed(2)
      ),
    });

    return ratingTotals;
  }, [reviews]);

  return (
    <ResponsiveContainer>
      <BarChart data={totalsChartData}>
        <XAxis
          tickMargin={10}
          tickSize={2}
          tickCount={5}
          type="category"
          dataKey={'name'}
          tick={{ fill: 'var(--font-color)' }}
        />
        <YAxis
          domain={[0, 100]}
          width={30}
          tickFormatter={(d) => `${d.toFixed(0)}%`}
          tickLine={false}
          tick={{ fill: 'var(--font-color)' }}
        />
        <Tooltip cursor={{ opacity: 0.1 }} content={<ReviewsTotalsChartTooltip />} />
        <Bar dataKey="value" fill="black" stroke="black" strokeWidth={0}>
          <Cell fill={ChartPallet.Rating_1} />
          <Cell fill={ChartPallet.Rating_2} />
          <Cell fill={ChartPallet.Rating_3} />
          <Cell fill={ChartPallet.Rating_4} />
          <Cell fill={ChartPallet.Rating_5} />
          <Cell fill={ChartPallet.AVG} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});
