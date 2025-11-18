import { useState, useMemo } from "react";
import { MOCK_CAMPAIGNS } from "../mocks/campaigns.mocks";

export function useMockCampaigns() {
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  const campaigns = useMemo(() => {
    return MOCK_CAMPAIGNS.filter((camp) => camp.status === "ACTIVE");
  }, []);

  const selectedCampaign = useMemo(() => {
    return campaigns.find((c) => c.id === selectedCampaignId) || null;
  }, [campaigns, selectedCampaignId]);

  const handleSelect = (row) => {
    setSelectedCampaignId(row.id);
  };

  return {
    campaigns,
    selectedCampaign,
    handleSelect,
  };
}
