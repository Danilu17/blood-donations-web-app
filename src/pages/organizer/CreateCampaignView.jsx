import CampaignForm from "../../components/forms/CampaignForm.jsx";
function CreateCampaignView() {
  const fake = { form: {}, onSubmit: () => {}, isLoading: false };

  return (
    <CampaignForm
      form={fake.form}
      onSubmit={fake.onSubmit}
      isLoading={fake.isLoading}
      organizerId={"organizer-123"}
    />
  );
}

export default CreateCampaignView;
