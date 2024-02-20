import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Organization } from '../../types/organization';
import { OrganizationReview as OrganizationReviewType } from '../../types/organization-review';
import { downloadCSV } from '../../utils/download-csv';
import { Button } from '../button/button';
import { DatePicker } from '../date-picker/date-picker';
import { Divider } from '../divider/divider';
import { OrganizationInfo } from '../organization-info/organization-info';
import { ReviewsTimelineChart } from '../reviews-timeline-chart/reviews-timeline-chart';
import { ReviewsTotalsChart } from '../reviews-totals-chart/reviews-totals-chart';
import { Spinner } from '../spinner/spinner';

import './organization-review.scss';

export const OrganizationReview: FC<{
  isLoading?: boolean;
  reviews: Array<OrganizationReviewType>;
  organization?: Organization;
}> = ({ isLoading, reviews = [], organization }) => {
  const today = new Date();

  const [startDate, setStartDate] = useState(new Date(today.setMonth(today.getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());

  const handleChangeDateRange = useCallback((range: [Date, Date]) => {
    setStartDate(range[0]);
    setEndDate(range[1]);
  }, []);

  const { maxDate, minDate } = useMemo(
    () => ({ maxDate: new Date(reviews[0]?.updatedTime), minDate: new Date(reviews[reviews.length - 1]?.updatedTime) }),
    [reviews]
  );

  useEffect(() => {
    setStartDate(minDate);
    setEndDate(maxDate);
  }, [minDate, maxDate]);

  const reviewsByDate = useMemo(() => {
    return reviews.filter(({ updatedTime }) => new Date(updatedTime) <= endDate && new Date(updatedTime) >= startDate);
  }, [endDate, startDate, reviews]);

  const handleDownloadCSV = useCallback(() => {
    downloadCSV(
      [
        ['data', 'rating', 'review'],
        ...reviewsByDate.map((data) => [
          new Date(data.updatedTime).toLocaleDateString(),
          data.rating.toString(),
          data.text,
        ]),
      ],
      `${organization?.name}-${organization?.id}__${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}`
    );
  }, [reviewsByDate, organization, startDate, endDate]);

  return (
    <div className="organization-review">
      {organization && <OrganizationInfo name={organization.name} addresss={organization.address} />}
      <Divider />

      {isLoading ? (
        <div className="organization-review__spinner">
          <Spinner />
        </div>
      ) : (
        <>
          <DatePicker
            onChange={handleChangeDateRange}
            startDate={startDate}
            endDate={endDate}
            maxDate={maxDate}
            minDate={minDate}
            disabled={isLoading}
          />
          <Divider />
          <div className="organization-review__charts">
            {!!reviewsByDate.length && (
              <div className="organization-review__chart">
                <ReviewsTimelineChart reviews={reviewsByDate} />
              </div>
            )}
            {!!reviewsByDate.length && (
              <div className="organization-review__chart">
                <ReviewsTotalsChart reviews={reviewsByDate} />
              </div>
            )}
          </div>
          <div className="organization-review__footer">
            <Button onClick={handleDownloadCSV}>Выгрузить в CSV ({reviewsByDate.length})</Button>
          </div>
        </>
      )}
    </div>
  );
};
