import HealthQuestionnaireForm from "./components/HealthQuestionnaireForm";
import { useHealthQuestionnaire } from "./hooks/useHealthQuestionnaire";

const HealthQuestionnairePage = () => {
  const { form, onSubmit, isLoading } = useHealthQuestionnaire();

  return (
    <HealthQuestionnaireForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

export default HealthQuestionnairePage;
