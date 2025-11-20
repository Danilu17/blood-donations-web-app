// src/hooks/useCampaignRegistrations.js
import { useMemo, useCallback } from "react";
import {
  useGetCampaignEnrollmentsQuery,
  useConfirmEnrollmentMutation,
  useCancelEnrollmentMutation,
} from "../apis/enrollments.api";

export function useCampaignRegistrations(campaignId) {
  const { data, isLoading, isError, refetch } = useGetCampaignEnrollmentsQuery(
    campaignId,
    {
      skip: !campaignId,
    },
  );

  const [confirmEnrollment, { isLoading: isConfirming }] =
    useConfirmEnrollmentMutation();
  const [cancelEnrollment, { isLoading: isCancelling }] =
    useCancelEnrollmentMutation();

  const registrations = useMemo(() => {
    const raw = data?.data ?? data ?? [];

    return raw.map((enrollment) => ({
      id: enrollment.id,
      donorName:
        enrollment?.donor?.first_name && enrollment?.donor?.last_name
          ? `${enrollment.donor.first_name} ${enrollment.donor.last_name}`
          : enrollment?.donor?.full_name || "Sin nombre",

      donorEmail: enrollment?.donor?.email ?? "Sin correo",

      bloodType:
        enrollment?.donor?.blood_type && enrollment?.donor?.rh_factor
          ? `${enrollment.donor.blood_type}${enrollment.donor.rh_factor}`
          : (enrollment?.blood_type ?? "-"),

      eligibilityStatus:
        enrollment?.eligibility_status ??
        enrollment?.donor?.eligibility_status ??
        "DESCONOCIDO",

      registrationDate: enrollment?.created_at
        ? new Date(enrollment.created_at).toLocaleString()
        : "-",

      status: enrollment?.status ?? "PENDING",
    }));
  }, [data]);

  const handleConfirm = useCallback(
    async (id) => {
      await confirmEnrollment(id).unwrap();
      await refetch();
    },
    [confirmEnrollment, refetch],
  );

  const handleCancel = useCallback(
    async (id) => {
      await cancelEnrollment(id).unwrap();
      await refetch();
    },
    [cancelEnrollment, refetch],
  );

  return {
    registrations,
    isLoading: isLoading || isConfirming || isCancelling,
    isError,
    handleConfirm,
    handleCancel,
  };
}
