import { FormWrapper } from "../../FormWrapper";

type QuestionData = {
  question2Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
};

export function Question2Form({
  question2Answer,
  updateFields,
}: QuestionFormProps) {
  return (
    <FormWrapper title="Which type of course do you prefer?">
      <label>Answer</label>
      <input
        required
        type="answer"
        value={question2Answer}
        onChange={(e) => updateFields({ question2Answer: e.target.value })}
      />
    </FormWrapper>
  );
}
