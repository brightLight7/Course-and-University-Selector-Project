import { FormWrapper } from "../FormWrapper";

type QuestionData = {
  question10Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
};

export function Question10Form({
  question10Answer,
  updateFields,
}: QuestionFormProps) {
  return (
    <FormWrapper title="Choose your top three priorities">
      <label>Answer</label>
      <input
        required
        type="answer"
        value={question10Answer}
        onChange={(e) => updateFields({ question10Answer: e.target.value })}
      />
    </FormWrapper>
  );
}
