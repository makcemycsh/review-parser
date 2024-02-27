import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FC, memo, useMemo } from 'react';
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { OrganizationReview } from '../../types/organization-review';
import { ChartPallet } from '../../utils/chart-pallet';

import { ReviewTimelineChartTooltip } from './__internal/reviews-timeline-chart-tooltip';

export const ReviewsTimelineChart: FC<{ reviews?: Array<OrganizationReview> }> = memo(({ reviews = [] }) => {
  const timeLineChartData = useMemo(
    () =>
      Object.values(
        reviews.reduce<Record<number, Record<string, number>>>((acc, { updatedTime, rating }, index) => {
          const date = new Date(updatedTime);
          date.setHours(0, 0, 0, 0);
          const dateKey = date.getTime();

          if (!acc[dateKey]) {
            acc[dateKey] = {
              date: dateKey,
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              avg: 0,
              'avg-total': 0,
            };
          }

          acc[dateKey][rating] += 1;

          const ratingTotalSum =
            acc[dateKey][1] * 1 + acc[dateKey][2] * 2 + acc[dateKey][3] * 3 + acc[dateKey][4] * 4 + acc[dateKey][5] * 5;
          const ratingCount = acc[dateKey][1] + acc[dateKey][2] + acc[dateKey][3] + acc[dateKey][4] + acc[dateKey][5];
          const ratingAvg = Number((ratingTotalSum / ratingCount).toFixed(2));

          acc[dateKey]['avg-total'] = ratingAvg;
          acc[dateKey].avg = index
            ? Number(
                (Object.values(acc).reduce((sum, d) => (sum += d['avg-total']), 0) / Object.values(acc).length).toFixed(
                  2
                )
              )
            : ratingAvg;

          return acc;
        }, {})
      ),
    [reviews]
  );

  return (
    <ResponsiveContainer>
      <ComposedChart data={timeLineChartData}>
        <XAxis
          dataKey="date"
          scale="time"
          tickFormatter={(timestamp) => ` ${format(new Date(timestamp), 'dd MMM', { locale: ru })} `}
          tick={{ fill: 'var(--font-color)' }}
          tickMargin={10}
          tickSize={2}
          tickCount={5}
        />
        <YAxis domain={[0, 'dataMax']} width={30} tickLine={false} tick={{ fill: 'var(--font-color)' }} />
        <Tooltip content={<ReviewTimelineChartTooltip />} cursor={{ opacity: 0.35 }} position={{ y: -150 }} />

        <Area
          dataKey="avg-total"
          stroke={ChartPallet.AVG_TOTAL}
          fill={ChartPallet.AVG_TOTAL}
          type="monotone"
          opacity={0.3}
          activeDot={{ r: 3, strokeWidth: 1 }}
        />
        <Area
          dataKey="avg"
          stroke={ChartPallet.AVG}
          fill={ChartPallet.AVG}
          type="monotone"
          opacity={0.5}
          activeDot={{ r: 3, strokeWidth: 1 }}
        />
        <Line dataKey="1" stroke={ChartPallet.Rating_1} dot={false} activeDot={{ r: 3, strokeWidth: 1 }} />
        <Line dataKey="2" stroke={ChartPallet.Rating_2} dot={false} activeDot={{ r: 3, strokeWidth: 1 }} />
        <Line dataKey="3" stroke={ChartPallet.Rating_3} dot={false} activeDot={{ r: 3, strokeWidth: 1 }} />
        <Line dataKey="4" stroke={ChartPallet.Rating_4} dot={false} activeDot={{ r: 3, strokeWidth: 1 }} />
        <Line dataKey="5" stroke={ChartPallet.Rating_5} dot={false} activeDot={{ r: 3, strokeWidth: 1 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
});
