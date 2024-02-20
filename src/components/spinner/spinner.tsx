import { CSSProperties, FC } from 'react';

import './spinner.scss';

export const Spinner: FC<{ className?: string; size?: number }> = ({ size = 36, className }) => {
  return <span className={`spinner ${className}`} style={{ '--spinner-size': `${size}px` } as CSSProperties} />;
};
