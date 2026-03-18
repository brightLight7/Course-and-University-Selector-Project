import { FormWrapper } from "../FormWrapper";
import question4Image from "../../../assets/page-pictures/question4-image.jpg";
const skillsPreference = [
  "Maths",
  "Essay writing",
  "Programming",
  "Creativity",
  "Problem solving",
];

type QuestionData = {
  question4Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
  actions: React.ReactNode;
};

export function Question4Form({
  question4Answer,
  updateFields,
  actions,
}: QuestionFormProps) {
  return (
    <FormWrapper
      title="Which skills do you feel strongest in?"
      imageSrc={question4Image}
      actions={actions}
    >
      <fieldset id="question-options-group">
        <legend className="sr-only">Choose your top priority</legend>

        {skillsPreference.map((priority) => (
          <label className="question-option" key={priority}>
            <input
              required
              type="radio"
              name="question4Answer"
              value={priority}
              checked={question4Answer === priority}
              onChange={(e) =>
                updateFields({ question4Answer: e.target.value })
              }
            />
            <span>{priority}</span>
          </label>
        ))}
      </fieldset>
    </FormWrapper>
  );
}
