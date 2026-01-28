import { FormWrapper } from "../FormWrapper";

type QuestionData = {
  question6Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
};

export function Question6Form({
  question6Answer,
  updateFields,
}: QuestionFormProps) {
  return (
    <FormWrapper title="Which teaching style do you feel suits you best?">
      <label>Answer</label>
      <input
        required
        type="answer"
        value={question6Answer}
        onChange={(e) => updateFields({ question6Answer: e.target.value })}
      />
    </FormWrapper>
  );
}
