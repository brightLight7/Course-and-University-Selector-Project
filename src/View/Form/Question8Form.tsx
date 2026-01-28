import { FormWrapper } from "../FormWrapper";

type QuestionData = {
  question8Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
};

export function Question8Form({
  question8Answer,
  updateFields,
}: QuestionFormProps) {
  return (
    <FormWrapper title="Where would you prefer to study?">
      <label>Answer</label>
      <input
        required
        type="answer"
        value={question8Answer}
        onChange={(e) => updateFields({ question8Answer: e.target.value })}
      />
    </FormWrapper>
  );
}
