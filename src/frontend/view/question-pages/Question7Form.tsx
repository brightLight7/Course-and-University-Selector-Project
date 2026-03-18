import { FormWrapper } from "../FormWrapper";
import question7Image from "../../../assets/page-pictures/question7-image.jpg";

const assessmentStylePreference = ["Examination", "Coursework", "Projects"];

type QuestionData = {
  question7Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
  actions: React.ReactNode;
};

export function Question7Form({
  question7Answer,
  updateFields,
  actions,
}: QuestionFormProps) {
  return (
    <FormWrapper
      title="Which assessment style do you prefer?"
      imageSrc={question7Image}
      actions={actions}
    >
      <fieldset id="question-options-group">
        <legend className="sr-only">Choose your top priority</legend>

        {assessmentStylePreference.map((priority) => (
          <label className="question-option" key={priority}>
            <input
              required
              type="radio"
              name="question7Answer"
              value={priority}
              checked={question7Answer === priority}
              onChange={(e) =>
                updateFields({ question7Answer: e.target.value })
              }
            />
            <span>{priority}</span>
          </label>
        ))}
      </fieldset>
    </FormWrapper>
  );
}
