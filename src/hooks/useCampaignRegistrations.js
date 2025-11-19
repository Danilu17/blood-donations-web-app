import { useMemo, useState } from "react";

export function useCampaignRegistrations(campaignId) {
  const [attendedIds, setAttendedIds] = useState([]);

  const registrations = useMemo(() => {
    // TODO: reemplazar por llamada a backend (enrollments)
    return []; // Por ahora sin datos
  }, [campaignId]);
}
