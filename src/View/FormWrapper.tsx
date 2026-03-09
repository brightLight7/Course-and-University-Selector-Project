type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <section id="form-wrapper">
      <div id="form-layout">
        <div id="form-visual" aria-hidden="true">
          <div id="form-visual-badge">Course Finder</div>
        </div>

        <div id="form-panel">
          <h1 id="form-title">{title}</h1>
          <div id="form-content">{children}</div>
        </div>
      </div>
    </section>
  );
}
