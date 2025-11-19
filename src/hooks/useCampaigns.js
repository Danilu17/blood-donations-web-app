// src/hooks/useCampaigns.js
import { useState, useEffect } from "react";
import { getCampaigns } from "../services/campaignService";

export default function useCampaigns(filters = {}) {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getCampaigns(filters);
        setCampaigns(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [JSON.stringify(filters)]);

  return { campaigns, isLoading, error };
}
