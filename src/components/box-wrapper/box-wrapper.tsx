import { FC } from 'react';

import './box-wrapper.scss';

export const BoxWrapper: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="box-wrapper">{children}</div>;
};
