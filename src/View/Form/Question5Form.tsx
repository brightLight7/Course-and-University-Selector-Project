import { FormWrapper } from "../FormWrapper";

type QuestionData = {
  question5Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
};

export function Question5Form({
  question5Answer,
  updateFields,
}: QuestionFormProps) {
  return (
    <FormWrapper title="How confident are you about meeting entry requirements?">
      <label>Answer</label>
      <input
        required
        type="answer"
        value={question5Answer}
        onChange={(e) => updateFields({ question5Answer: e.target.value })}
      />
    </FormWrapper>
  );
}
