const host = 'https://yandex.ru/maps/api/business';

export const fetchOrganizationReviews = async (orgId: string, pageSize: number = 50): Promise<unknown> => {
  return fetch(
    `${host}/fetchReviews?ajax=1&businessId=${orgId}&locale=ru_RU&page=1&pageSize=${pageSize}&ranking=by_time`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,sr;q=0.6',
        'Referrer-Policy': 'unsafe-url',
        'sec-fetch-mode': 'no-cors',
      },
      body: null,
      method: 'GET',
      mode: 'same-origin',
      credentials: 'include',
    }
  ).then((data) => {
    console.log(data);
    return data.json();
  });
};
