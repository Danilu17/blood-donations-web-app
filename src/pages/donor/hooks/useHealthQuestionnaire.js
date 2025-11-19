import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
//apis/questionnaire.api.js cuando tengas el módulo en backend.
export function useHealthQuestionnaire() {
  const user = useSelector((state) => state.user);

  const form = useForm({
    defaultValues: {
      weight: "",
      diseases: [],
      medications: [],
      lastDonation: "",
      bloodGroup: "",
      rhFactor: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Cuestionario enviado:", data);

    alert("Cuestionario guardado (mock). En backend se evaluaría aptitud.");
  };

  return {
    user,
    form,
    onSubmit,
    isLoading: false,
  };
}
