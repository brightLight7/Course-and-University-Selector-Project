import { FormWrapper } from "../../FormWrapper";
import question9Image from "../../../assets/PagePictures/question9-image.jpg";

const importanceLevels = [
  "Not important",
  "Slightly important",
  "No Preference",
  "Important",
  "Very important",
];

type QuestionData = {
  question9Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
  actions: React.ReactNode;
};

export function Question9Form({
  question9Answer,
  updateFields,
  actions,
}: QuestionFormProps) {
  return (
    <FormWrapper
      title="How important are fees and cost of living in your decision?"
      imageSrc={question9Image}
      actions={actions}
    >
      <fieldset id="question-options-group">
        <legend className="sr-only">Choose your top priority</legend>

        {importanceLevels.map((priority) => (
          <label className="question-option" key={priority}>
            <input
              required
              type="radio"
              name="question9Answer"
              value={priority}
              checked={question9Answer === priority}
              onChange={(e) =>
                updateFields({ question9Answer: e.target.value })
              }
            />
            <span>{priority}</span>
          </label>
        ))}
      </fieldset>
    </FormWrapper>
  );
}
