import { useMemo, useState } from "react";
import { MOCK_REGISTRATIONS } from "../mocks/registrations.mocks";

export function useCampaignRegistrations(campaignId) {
  const [attendedIds, setAttendedIds] = useState([]);

  const registrations = useMemo(() => {
    return MOCK_REGISTRATIONS.filter((reg) => reg.campaignId === campaignId);
  }, [campaignId]);

  const toggleAttendance = (id) => {
    setAttendedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const updatedRegs = registrations.map((reg) => ({
    ...reg,
    attended: attendedIds.includes(reg.id) || reg.attended,
  }));

  return {
    registrations: updatedRegs,
    toggleAttendance,
  };
}
