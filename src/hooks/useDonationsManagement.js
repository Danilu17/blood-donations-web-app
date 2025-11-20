// src/hooks/useDonationsManagement.js
import { useMemo, useCallback } from "react";
import {
  useGetDonationsQuery,
  useCompleteDonationMutation,
  useGenerateDonationCertificateMutation,
} from "../apis/donations.api";

export function useDonationsManagement(campaignId) {
  const { data, isLoading, isError, refetch } = useGetDonationsQuery();

  const [completeDonation, { isLoading: isCompleting }] =
    useCompleteDonationMutation();
  const [generateCertificate] = useGenerateDonationCertificateMutation();

  const donations = useMemo(() => {
    const raw = data?.data ?? data ?? [];

    return raw
      .filter((donation) =>
        campaignId ? donation?.campaign?.id === campaignId : true,
      )
      .map((donation) => ({
        id: donation.id,
        donorName:
          donation?.donor?.first_name && donation?.donor?.last_name
            ? `${donation.donor.first_name} ${donation.donor.last_name}`
            : donation?.donor?.full_name || "Sin nombre",
        donorEmail: donation?.donor?.email ?? "Sin correo",
        bloodType:
          donation?.donor?.blood_type && donation?.donor?.rh_factor
            ? `${donation.donor.blood_type}${donation.donor.rh_factor}`
            : (donation?.blood_type ?? "-"),
        eligibilityStatus: donation?.donor?.eligibility_status ?? "DESCONOCIDO",
        registrationDate: donation?.scheduled_date
          ? `${donation.scheduled_date} ${donation.scheduled_time || ""}`
          : donation?.created_at
            ? new Date(donation.created_at).toLocaleString()
            : "-",
        donationStatus: donation?.status ?? "PENDING",
      }));
  }, [data, campaignId]);

  // newStatus se ignora por ahora, para no romper DonationStatusDetails
  const updateStatus = useCallback(
    async (id, _newStatus) => {
      const quantity_ml = 450; // valor por defecto

      await completeDonation({ id, quantity_ml }).unwrap();
      await generateCertificate(id).unwrap();
      await refetch();
    },
    [completeDonation, generateCertificate, refetch],
  );

  return {
    donations,
    isLoading: isLoading || isCompleting,
    isError,
    updateStatus,
  };
}
