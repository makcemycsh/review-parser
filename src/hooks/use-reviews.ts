import { DataTye, useHandlePostMessage } from './use-handle-post-message';
import { useCallback, useEffect, useRef, useState } from 'react';

import { OrganizationReview } from '../types/organization-review';

export const useReviews = () => {
  const isStartLoadingReviews = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [reviews, updateReviews] = useState<Array<OrganizationReview>>([]);

  useEffect(() => {
    if (!isStartLoadingReviews.current) {
      isStartLoadingReviews.current = true;
      window.opener.postMessage('getReviews', 'https://yandex.ru/');
    }
  }, []);

  const handleUpdateReviews = useCallback((newReviews: Array<OrganizationReview>) => {
    updateReviews((prevReviews) => [
      ...prevReviews,
      ...newReviews.map(({ rating, text, updatedTime }) => ({ rating, text, updatedTime })),
    ]);
  }, []);

  useHandlePostMessage<boolean>(setIsLoading, DataTye.Loading);
  useHandlePostMessage<Array<OrganizationReview>>(handleUpdateReviews, DataTye.Reviews);

  return { isLoading, reviews };
};
