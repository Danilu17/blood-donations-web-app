import { useMemo, useState } from "react";
import { MOCK_ORGANIZER_CAMPAIGNS } from "../mocks/organizer-campaigns.mocks";

export function useOrganizerCampaigns() {
  const [selectedId, setSelectedId] = useState(null);

  const campaigns = useMemo(() => [...MOCK_ORGANIZER_CAMPAIGNS], []);

  const selectedCampaign = useMemo(() => {
    return campaigns.find((c) => c.id === selectedId) || null;
  }, [campaigns, selectedId]);

  const handleSelect = (row) => {
    setSelectedId(row.id);
  };

  return {
    campaigns,
    selectedCampaign,
    handleSelect,
  };
}
