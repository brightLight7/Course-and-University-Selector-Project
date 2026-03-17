import { FormWrapper } from "../../FormWrapper";
import question3Image from "../../../assets/PagePictures/question3-image.jpg";
const outcomePreference = ["Career", "Further study", "Unsure"];
type QuestionData = {
  question3Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
  actions: React.ReactNode;
};

export function Question3Form({
  question3Answer,
  updateFields,
  actions,
}: QuestionFormProps) {
  return (
    <FormWrapper
      title="Which outcome matters for you most post-studies right now?"
      imageSrc={question3Image}
      actions={actions}
    >
      <fieldset id="question-options-group">
        <legend className="sr-only">Choose your top priority</legend>

        {outcomePreference.map((priority) => (
          <label className="question-option" key={priority}>
            <input
              required
              type="radio"
              name="question3Answer"
              value={priority}
              checked={question3Answer === priority}
              onChange={(e) =>
                updateFields({ question3Answer: e.target.value })
              }
            />
            <span>{priority}</span>
          </label>
        ))}
      </fieldset>
    </FormWrapper>
  );
}
