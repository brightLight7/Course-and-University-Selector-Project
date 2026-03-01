import { FormWrapper } from "../../FormWrapper";

type QuestionData = {
  question7Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
};

export function Question7Form({
  question7Answer,
  updateFields,
}: QuestionFormProps) {
  return (
    <FormWrapper title="Which assessment style do you prefer?">
      <label>Answer</label>
      <input
        required
        type="answer"
        value={question7Answer}
        onChange={(e) => updateFields({ question7Answer: e.target.value })}
      />
    </FormWrapper>
  );
}
