import { FC, ReactNode } from 'react';

import './title.scss';

export const Title: FC<{ children?: ReactNode }> = ({ children }) => {
  return <div className="title">{children}</div>;
};
