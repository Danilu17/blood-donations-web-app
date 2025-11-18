import { useMemo, useState } from "react";
import { MOCK_DONATION_MANAGEMENT } from "../mocks/donations-management.mocks";

export function useDonationsManagement(campaignId) {
  const [updates, setUpdates] = useState({});

  const list = useMemo(() => {
    return MOCK_DONATION_MANAGEMENT.filter(
      (d) => d.campaignId === campaignId,
    ).map((d) => ({
      ...d,
      donationStatus: updates[d.id] || d.donationStatus,
    }));
  }, [campaignId, updates]);

  const updateStatus = (id, status) => {
    setUpdates((prev) => ({ ...prev, [id]: status }));
  };

  return {
    donations: list,
    updateStatus,
  };
}
