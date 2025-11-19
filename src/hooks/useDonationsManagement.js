import { useMemo, useState } from "react";

export function useDonationsManagement(campaignId) {
  const [updates, setUpdates] = useState({});

  const list = useMemo(() => {
    // TODO: reemplazar por llamada real al backend (donations de una campaña)
    return [];
  }, [campaignId, updates]);
}
