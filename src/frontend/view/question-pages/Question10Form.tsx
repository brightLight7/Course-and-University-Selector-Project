import { FormWrapper } from "../FormWrapper";
import question10Image from "../../../assets/page-pictures/question10-image.jpg";
const topThreePriorities = [
  "Course content",
  "University ranking",
  "Cost",
  "Supportive services",
  "Employability",
  "Student life",
  "Campus facilities",
  "Course workload and balance",
];

type QuestionData = {
  question10Answer: string[];
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
  actions: React.ReactNode;
};

export function Question10Form({
  question10Answer,
  updateFields,
  actions,
}: QuestionFormProps) {
  return (
    <FormWrapper
      title="Choose your top three priorities"
      imageSrc={question10Image}
      actions={actions}
    >
      <fieldset
        id="question-options-group"
        className="question10-options-group"
      >
        <legend className="sr-only">Choose your top priority</legend>

        {topThreePriorities.map((priority) => (
          <label className="question-option question10-option" key={priority}>
            <input
              required
              type="checkbox"
              name="question10Answer"
              value={priority}
              checked={question10Answer.includes(priority)}
              disabled={
                question10Answer.length >= 3 &&
                !question10Answer.includes(priority)
              }
              onChange={(e) => {
                const { value, checked } = e.target;
                if (checked) {
                  if (question10Answer.length >= 3) {
                    return;
                  }
                  updateFields({
                    question10Answer: [...question10Answer, value],
                  });
                  return;
                }

                updateFields({
                  question10Answer: question10Answer.filter((v) => v !== value),
                });
              }}
            />
            <span>{priority}</span>
          </label>
        ))}
      </fieldset>
    </FormWrapper>
  );
}
