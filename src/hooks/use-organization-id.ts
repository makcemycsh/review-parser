export const useOrganizationId = () => {
  const params = new URLSearchParams(document.location.search);
  const orgId = window.name === 'parser' ? params.get('orgId') || '' : '';

  return orgId;
};
