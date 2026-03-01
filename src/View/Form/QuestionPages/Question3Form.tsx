import { FormWrapper } from "../../FormWrapper";

type QuestionData = {
  question3Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
};

export function Question3Form({
  question3Answer,
  updateFields,
}: QuestionFormProps) {
  return (
    <FormWrapper title="Which outcome matters for you most post studies right now?">
      <label>Answer</label>
      <input
        required
        type="answer"
        value={question3Answer}
        onChange={(e) => updateFields({ question3Answer: e.target.value })}
      />
    </FormWrapper>
  );
}
