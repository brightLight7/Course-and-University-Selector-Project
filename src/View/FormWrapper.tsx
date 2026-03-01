type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div>
      <h1 id="question-title-wrapper-styling">{title}</h1>
      <h2 id="title-form-wrapper-styling">{title}</h2>
      <div id="children-form-wrapper-styling">{children}</div>
    </div>
  );
}
