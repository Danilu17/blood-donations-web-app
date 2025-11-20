import { useEffect } from "react";
import { useLazyGetCampaignsQuery } from "../apis/campaigns.api";

export default function useCampaigns(filters = {}) {
  const [trigger, { data, isLoading, error }] = useLazyGetCampaignsQuery();

  useEffect(() => {
    trigger(filters);
  }, [JSON.stringify(filters)]);

  return {
    campaigns: data?.data || data || [],
    isLoading,
    error,
  };
}
