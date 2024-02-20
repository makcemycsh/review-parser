import { useCallback, useEffect } from 'react';

export enum DataTye {
  Loading = 'loading',
  Reviews = 'reviews',
}

export function useHandlePostMessage<Data>(cb: (data: Data) => void, dataType: DataTye) {
  const handlePostMessage = useCallback(
    (event: MessageEvent) => {
      if (
        event.type !== 'message' ||
        event.origin !== 'https://yandex.ru' ||
        !event.data ||
        event.data.dataType !== dataType
      ) {
        return;
      }

      cb(event.data.data as Data);
    },
    [cb, dataType]
  );

  useEffect(() => {
    window.addEventListener('message', handlePostMessage, false);
    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, [handlePostMessage]);
}
