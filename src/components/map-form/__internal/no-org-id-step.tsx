import { useCallback, useState } from 'react';

import { OrganizationInfoContainer } from '../../../containers/organization-info-container';
import { useCopyPasteCode } from '../../../hooks/use-copy-paste-code';
import { Button } from '../../button/button';
import { Divider } from '../../divider/divider';
import { Input } from '../../input/input';
import { PasteCode } from '../../paste-code/paste-code';

export const NoOrgIdStep = () => {
  const [initialOrgId, setInitialOrgId] = useState<string>('');
  const { copy } = useCopyPasteCode(initialOrgId);

  const handleMapOpen = useCallback(() => {
    copy().then(() => {
      window.open(`https://yandex.ru/maps/org/${initialOrgId}/reviews`);
    });
  }, [copy, initialOrgId]);

  return (
    <>
      <div className="map-form__description">
        Парсер позволяет выгрузить <b>последние 600 отзывов</b> об организации на Яндекс картах
      </div>
      <Divider />
      <div className="map-form__controls">
        <Input placeholder="Organization ID" onChange={setInitialOrgId} value={initialOrgId} />
      </div>
      <div className="map-form__code">{<PasteCode orgId={initialOrgId} />}</div>
      <div className="map-form__description">
        Чтоб загрузить отзывы укажите <b>Organization ID</b> и запустите <b>код</b> в Консоле на Яндекс картах
      </div>
      <Divider />

      <div className="map-form__footer">
        <div className="map-form__org">
          <OrganizationInfoContainer orgId={initialOrgId} />
        </div>
        <Button disabled={!initialOrgId} onClick={handleMapOpen}>
          Перейти на Яндекс Карты
        </Button>
      </div>
    </>
  );
};
