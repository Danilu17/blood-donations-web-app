// src/pages/donor/hooks/useMyDonationsListView.jsx
import { useGetMyDonationsQuery } from "../../../apis/donations.api";

function useMyDonationsListView(filters = {}, page = 1, limit = 5) {
  const { data, isLoading, isError, error, refetch } = useGetMyDonationsQuery({
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    campaign: filters.campaign,
    center: filters.center,
    status: filters.status,
    page,
    limit,
  });

  const rawDonations = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  // 🔹 Normalizamos la estructura para que la tabla siempre tenga las mismas keys
  const donations = rawDonations.map((donation) => ({
    id: donation.id,
    date:
      donation.date ||
      donation.donation_date ||
      donation.created_at ||
      donation.createdAt,
    campaign_name:
      donation.campaign?.name ||
      donation.campaign_name ||
      donation.campaign?.title,
    center_name:
      donation.campaign?.center?.name ||
      donation.center?.name ||
      donation.center_name,
    donation_type: donation.donation_type || donation.type,
    volume_ml:
      donation.volume_ml ||
      donation.quantity_ml ||
      donation.volume ||
      donation.amount_ml,
    status: donation.status,
    certificate_url:
      donation.certificate_url ||
      donation.certificateUrl ||
      donation.certificate?.url,
  }));

  const totalCount = typeof data?.total === "number" ? data.total : -1; // para que el paginador muestre "of more than X"

  return {
    donations,
    totalCount,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export default useMyDonationsListView;
