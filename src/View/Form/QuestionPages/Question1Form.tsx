import { FormWrapper } from "../../FormWrapper";

type QuestionData = {
  question1Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
};

export function Question1Form({
  question1Answer,
  updateFields,
}: QuestionFormProps) {
  return (
    <FormWrapper title="What matters most to you when choosing a course?">
      <label>Answer</label>

      <input
        required
        type="answer"
        value={question1Answer}
        onChange={(e) => updateFields({ question1Answer: e.target.value })}
      />
    </FormWrapper>
  );
}
