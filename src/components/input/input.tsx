import { ChangeEvent, FC, memo, useCallback } from 'react';

import { IconSearch } from '../../icons/icon-search';

import './input.scss';

export const Input: FC<{ value?: string; placeholder?: string; onChange: (value: string) => void }> = memo(
  ({ value, onChange, placeholder }) => {
    const handleInput = useCallback(
      (event: ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
      },
      [onChange]
    );

    return (
      <div className="input">
        <IconSearch className="input__icon" />
        <input
          type="search"
          className="input__control"
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          autoFocus
          maxLength={25}
        />
      </div>
    );
  }
);
