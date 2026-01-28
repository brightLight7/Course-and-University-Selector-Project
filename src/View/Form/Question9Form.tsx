import { FormWrapper } from "../FormWrapper";

type QuestionData = {
  question9Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
};

export function Question9Form({
  question9Answer,
  updateFields,
}: QuestionFormProps) {
  return (
    <FormWrapper title="How important are fees and cost of living in your decision?">
      <label>Answer</label>
      <input
        required
        type="answer"
        value={question9Answer}
        onChange={(e) => updateFields({ question9Answer: e.target.value })}
      />
    </FormWrapper>
  );
}
