import { FormWrapper } from "../../FormWrapper";

const coursePriorities = [
  "Career outcomes",
  "Teaching style",
  "Assessment methods",
  "Flexibility",
  "Location",
];
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
    <FormWrapper title="1. What matters most to you when choosing a course?">
      <fieldset id="question-options-group">
        {coursePriorities.map((priority) => (
          <label className="question-option" key={priority}>
            <input
              required
              type="radio"
              name="question1Answer"
              value={priority}
              checked={question1Answer === priority}
              onChange={(e) =>
                updateFields({ question1Answer: e.target.value })
              }
            />
            <span>{priority}</span>
          </label>
        ))}
      </fieldset>
    </FormWrapper>
  );
}
