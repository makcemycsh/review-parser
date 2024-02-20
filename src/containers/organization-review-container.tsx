import { OrganizationReview } from '../components/organization-review/organization-review';
import { useOrganizationId } from '../hooks/use-organization-id';
import { useOrganizationInfo } from '../hooks/use-organization-info';
import { useReviews } from '../hooks/use-reviews';

export const OrganizationReviewContainer = () => {
  const orgId = useOrganizationId();
  const { organization } = useOrganizationInfo(orgId);

  const { isLoading, reviews } = useReviews();
  return <OrganizationReview isLoading={isLoading} reviews={reviews} organization={organization} />;
};
