import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import { Organization } from '../types/organization';

declare global {
  interface Window {
    ymaps: {
      findOrganization: (orgId: string) => Promise<{
        properties: {
          _data: Organization;
        };
      }>;

      ready: () => Promise<unknown>;
    };
  }
}

export const useOrganizationInfo = (orgId?: string) => {
  const [organization, setOrganization] = useState<Organization | undefined>();
  const [isLoading, changeIsLoading] = useState(false);
  const [debouncedValue, setValue] = useDebounceValue(orgId, 500);

  useEffect(() => {
    setValue(orgId);
  }, [orgId, setValue]);

  useEffect(() => {
    if (debouncedValue) {
      const fetchOrganization = async () => {
        changeIsLoading(true);
        try {
          await window.ymaps.ready();
          const { properties } = await window.ymaps.findOrganization(debouncedValue);
          setOrganization(properties._data);
        } catch (_) {
          setOrganization(undefined);
        }
        changeIsLoading(false);
      };
      fetchOrganization();
    } else {
      setOrganization(undefined);
    }
  }, [debouncedValue]);

  return { isLoading, organization };
};
