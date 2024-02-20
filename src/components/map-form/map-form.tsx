import { FC } from 'react';

import { OrganizationReviewContainer } from '../../containers/organization-review-container';
import { useOrganizationId } from '../../hooks/use-organization-id';
import { BoxWrapper } from '../box-wrapper/box-wrapper';
import { Divider } from '../divider/divider';
import { Title } from '../title/title';

import { NoOrgIdStep } from './__internal/no-org-id-step';

import './map-form.scss';

export const MapForm: FC = () => {
  const orgId = useOrganizationId();
  const isValidOrgId = !!orgId?.trim().length;

  return (
    <BoxWrapper>
      <div className="map-form">
        <Title>
          Отзывы о компании с <span style={{ color: 'red' }}>Я</span>ндекс карт
        </Title>
        <Divider />
        {isValidOrgId ? <OrganizationReviewContainer /> : <NoOrgIdStep />}
      </div>
    </BoxWrapper>
  );
};
