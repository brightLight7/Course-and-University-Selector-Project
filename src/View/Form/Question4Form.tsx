import { FormWrapper } from "../FormWrapper";

type QuestionData = {
  question4Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
};

export function Question4Form({
  question4Answer,
  updateFields,
}: QuestionFormProps) {
  return (
    <FormWrapper title="Which skills do you feel strongest in?">
      <label>Answer</label>
      <input
        required
        type="answer"
        value={question4Answer}
        onChange={(e) => updateFields({ question4Answer: e.target.value })}
      />
    </FormWrapper>
  );
}
