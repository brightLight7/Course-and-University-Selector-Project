import { FormWrapper } from "../../FormWrapper";
import question8Image from "../../../assets/PagePictures/question8-image.jpg";

const locationPreference = [
  // "London",
  // "Manchester",
  // "Birmingham",
  // "Liverpool",
  // "Brighton",
  // "Newcastle",
  // "Nottingham",
  // "Cardiff",
  // "Leeds",
  // "Sheffield",
  // "Bristol",
  // "Glasgow",
  // "Edinburgh",
  // "Cambridge",
  // "Oxford",
  // "Other",   Could be talked about more options in critical review
  "London",
  "Outside of London",
  "No preference",
];

type QuestionData = {
  question8Answer: string;
};

type QuestionFormProps = QuestionData & {
  updateFields: (fields: Partial<QuestionData>) => void;
  actions: React.ReactNode;
};

export function Question8Form({
  question8Answer,
  updateFields,
  actions,
}: QuestionFormProps) {
  return (
    <FormWrapper
      title="Where would you prefer to study?"
      imageSrc={question8Image}
      actions={actions}
    >
      <fieldset id="question-options-group">
        <legend className="sr-only">Choose your top priority</legend>

        {locationPreference.map((priority) => (
          <label className="question-option" key={priority}>
            <input
              required
              type="radio"
              name="question8Answer"
              value={priority}
              checked={question8Answer === priority}
              onChange={(e) =>
                updateFields({ question8Answer: e.target.value })
              }
            />
            <span>{priority}</span>
          </label>
        ))}
      </fieldset>
    </FormWrapper>
  );
}
