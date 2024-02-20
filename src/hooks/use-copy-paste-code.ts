import { useCallback, useRef, useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

import { getPasteCode } from '../utils/get-paste-code';

export const useCopyPasteCode = (orgId?: string) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isCopied, setIsCopied] = useState(false);
  const [, copy] = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsCopied(true);

    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return copy(getPasteCode(orgId));
  }, [copy, orgId]);

  return { copy: handleCopy, isCopied };
};
