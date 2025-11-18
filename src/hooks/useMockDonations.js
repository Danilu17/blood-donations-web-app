import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { MOCK_DONATIONS } from "../mocks/donations.mocks";

export function useMockDonations() {
  const user = useSelector((state) => state.user);
  const [selectedDonationId, setSelectedDonationId] = useState(null);

  const donations = useMemo(() => {
    return MOCK_DONATIONS.filter((d) => d.donorId === user.id);
  }, [user]);

  const selectedDonation = useMemo(() => {
    return donations.find((d) => d.id === selectedDonationId) || null;
  }, [donations, selectedDonationId]);

  const handleSelect = (row) => {
    setSelectedDonationId(row.id);
  };

  return {
    donations,
    selectedDonation,
    handleSelect,
  };
}
