export const getPasteCode = (orgId?: string): string => `(() => {
  // ##### ORG_ID #####
  const organizationId = '${orgId || '__YOUR_OTGANIZATION_ID__'}';

  const uiHost = '${window.location.origin}${window.location.pathname}';
  const popup = window.open(\`$\{uiHost}?orgId=$\{organizationId}\`, 'parser');

  const yandexHost = 'https://yandex.ru/maps/api/business';
  const yandexPageLimit = 12;

  const getReviews = async ({ csrfToken, retry = 1, pageSize = 50, page = 1 } = {}) => {
    if (retry > 2) {
      return [];
    }

    try {
      // #### REQUEST DATA ####
      const data = await fetch(
        \`$\{yandexHost}/fetchReviews?ajax=1&businessId=$\{organizationId}&locale=ru_RU&csrfToken=$\{csrfToken}&pageSize=$\{pageSize}&page=$\{page}&ranking=by_time\`,
        {
          body: null,
          method: 'GET',
        }
      );

      const dataJson = await data.json();

      // #### SET csrfToken ####
      if (dataJson.csrfToken) {
        return getReviews({ csrfToken: dataJson.csrfToken, retry: retry + 1, page });
      }

      // #### SEND DATA ####
      popup.postMessage({ dataType: 'reviews', data: dataJson.data.reviews }, uiHost);

      // #### HANDLE PAGE LIMIT ####
      if (page >= yandexPageLimit) {
        return dataJson.data.reviews;
      }

      await getReviews({ page: page + 1 });
    } catch (err) {
      // #### HANDLE RETRY ON ERROR ####
      return getReviews({ csrfToken, retry: retry + 1, page, pageSize });
    }
  };


  window.addEventListener('message', async (event) => {
    if (event.data === 'getReviews') {
        popup.postMessage({ dataType: 'loading', data: true }, uiHost);
        await getReviews();
        popup.postMessage({ dataType: 'loading', data: false }, uiHost);
    }
  })
})();
`;
