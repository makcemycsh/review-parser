import { FC } from 'react';

import './map-widget.scss';

export const MapWidget: FC<{ orgId: string }> = ({ orgId }) => {
  return (
    <div className="map-widget">
      <iframe className="map-widget__iframe" src={`https://yandex.ru/maps-reviews-widget/${orgId}?comments`}></iframe>
    </div>
  );
};
