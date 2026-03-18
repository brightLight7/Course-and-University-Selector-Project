import { FormWrapper } from "../FormWrapper";
import question1Image from "../../../assets/page-pictures/question1-image.jpg";

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
  actions: React.ReactNode;
};

export function Question1Form({
  question1Answer,
  updateFields,
  actions,
}: QuestionFormProps) {
  return (
    <FormWrapper
      title="What matters most to you when choosing a course?"
      imageSrc={question1Image}
      imageAlt="Students looking at a laptop together"
      actions={actions}
    >
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
