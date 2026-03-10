import { FormWrapper } from "../../FormWrapper";
import question5Image from "../../../assets/PagePictures/question5-image.jpg";

const confidenceLevels = ["Low", "Medium", "High"];

type QuestionData = {
  question5Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
  actions: React.ReactNode;
};

export function Question5Form({
  question5Answer,
  updateFields,
  actions,
}: QuestionFormProps) {
  return (
    <FormWrapper
      title="How confident are you about meeting entry requirements?"
      imageSrc={question5Image}
      actions={actions}
    >
      <fieldset id="question-options-group">
        <legend className="sr-only">Choose your top priority</legend>

        {confidenceLevels.map((priority) => (
          <label className="question-option" key={priority}>
            <input
              required
              type="radio"
              name="question5Answer"
              value={priority}
              checked={question5Answer === priority}
              onChange={(e) =>
                updateFields({ question5Answer: e.target.value })
              }
            />
            <span>{priority}</span>
          </label>
        ))}
      </fieldset>
    </FormWrapper>
  );
}
