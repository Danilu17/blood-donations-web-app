import CreateCampaignForm from "./CreateCampaignForm";
import { useCreateCampaign } from "./hooks/useCreateCampaign";

function CreateCampaignView() {
  const { form, onSubmit, centers, isLoading } = useCreateCampaign();

  return (
    <CreateCampaignForm
      form={form}
      onSubmit={onSubmit}
      centers={centers}
      isLoading={isLoading}
    />
  );
}

export default CreateCampaignView;
