import { FormWrapper } from "../../FormWrapper";
import question6Image from "../../../assets/PagePictures/question6-image.jpg";

const teachingStylePreference = [
  "Lectures",
  "Seminars",
  "Practical learning",
  "Project-based",
];

type QuestionData = {
  question6Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
  actions: React.ReactNode;
};

export function Question6Form({
  question6Answer,
  updateFields,
  actions,
}: QuestionFormProps) {
  return (
    <FormWrapper
      title="Which teaching style do you feel suits you best?"
      imageSrc={question6Image}
      actions={actions}
    >
      <fieldset id="question-options-group">
        <legend className="sr-only">Choose your top priority</legend>

        {teachingStylePreference.map((priority) => (
          <label className="question-option" key={priority}>
            <input
              required
              type="radio"
              name="question6Answer"
              value={priority}
              checked={question6Answer === priority}
              onChange={(e) =>
                updateFields({ question6Answer: e.target.value })
              }
            />
            <span>{priority}</span>
          </label>
        ))}
      </fieldset>
    </FormWrapper>
  );
}
