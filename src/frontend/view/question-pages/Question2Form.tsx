import { FormWrapper } from "../FormWrapper";
import question2Image from "../../../assets/page-pictures/question2-image.jpg";

const coursePreference = ["Broad", "Specialised", "General"];

type QuestionData = {
  question2Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
  actions: React.ReactNode;
};

export function Question2Form({
  question2Answer,
  updateFields,
  actions,
}: QuestionFormProps) {
  return (
    <FormWrapper
      title="What type of course do you prefer?"
      imageSrc={question2Image}
      actions={actions}
    >
      <fieldset id="question-options-group">
        <legend className="sr-only">Choose your top priority</legend>

        {coursePreference.map((priority) => (
          <label className="question-option" key={priority}>
            <input
              required
              type="radio"
              name="question2Answer"
              value={priority}
              checked={question2Answer === priority}
              onChange={(e) =>
                updateFields({ question2Answer: e.target.value })
              }
            />
            <span>{priority}</span>
          </label>
        ))}
      </fieldset>
    </FormWrapper>
  );
}
