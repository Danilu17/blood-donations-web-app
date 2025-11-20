// src/pages/organizer/CreateCampaignView.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateCampaignMutation } from "../../apis/campaigns.api";
import CampaignForm from "./CampaignForm";

function CreateCampaignView() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      location: "",
      max_donors: 0,
    },
  });

  const [createCampaign, { isLoading }] = useCreateCampaignMutation();

  const handleCreateCampaign = async (values) => {
    try {
      await createCampaign(values).unwrap();
      // después de crear, lo mandás a donde quieras:
      navigate("/organizer/donations", { replace: true });
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "Ocurrió un error al crear la campaña.");
    }
  };

  return (
    <CampaignForm
      form={form}
      onSubmit={handleCreateCampaign}
      isSubmitting={isLoading}
    />
  );
}

export default CreateCampaignView;
