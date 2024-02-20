import { FC } from 'react';

import { useCopyPasteCode } from '../../hooks/use-copy-paste-code';
import { IconCopy } from '../../icons/icon-copy';
import { getPasteCode } from '../../utils/get-paste-code';

import './paste-code.scss';

export const PasteCode: FC<{ orgId?: string }> = ({ orgId }) => {
  const { isCopied, copy } = useCopyPasteCode(orgId);
  console.log('isCopied', isCopied);

  return (
    <div className={['paste-code', orgId ? 'paste-code_active_yes' : 'paste-code_active_no'].join(' ')}>
      <span
        className={[
          'paste-code__success',
          isCopied ? 'paste-code__success_copied_yes' : 'paste-code__success_copied_no',
        ].join(' ')}
      >
        Скопировано
      </span>

      <span className="paste-code__copy" onClick={copy}>
        <IconCopy />
      </span>
      <code className="paste-code__code">{getPasteCode(orgId)}</code>
    </div>
  );
};
