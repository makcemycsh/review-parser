import { FC } from 'react';

import './organization-info.scss';

export const OrganizationInfo: FC<{ name: string; addresss: string }> = ({ name, addresss }) => {
  return (
    <div className="organization-info">
      <div className="organization-info__name">{name}</div>
      <div className="organization-info__address">{addresss}</div>
    </div>
  );
};
