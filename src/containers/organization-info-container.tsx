import { FC } from 'react';

import { OrganizationInfo } from '../components/organization-info/organization-info';
import { useOrganizationInfo } from '../hooks/use-organization-info';

export const OrganizationInfoContainer: FC<{ orgId?: string }> = ({ orgId }) => {
  const { isLoading, organization } = useOrganizationInfo(orgId);

  if (isLoading || !organization) {
    return null;
  }

  return <OrganizationInfo name={organization.name} addresss={organization.address} />;
};
