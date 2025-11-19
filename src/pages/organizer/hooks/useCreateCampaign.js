import { useForm } from "react-hook-form";

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
    centers: [], // TODO: traer centros del backend
    isLoading: false,
  };
}
