import { useForm } from "react-hook-form";
import { MOCK_CENTERS } from "../../../mocks/centers.mocks";

export function useCreateCampaign() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      centerId: "",
      date: "",
      startTime: "",
      endTime: "",
      minAge: "",
      maxAge: "",
      minWeight: "",
      requiredBloodTypes: [],
      slotsTotal: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Campaña creada (mock):", data);
    alert("Campaña creada correctamente (mock)");
  };

  return {
    form,
    onSubmit,
    centers: MOCK_CENTERS.map((c) => ({ label: c.name, value: c.id })),
    isLoading: false,
  };
}
