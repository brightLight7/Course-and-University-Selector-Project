type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
};

export function FormWrapper({
  title,
  children,
  actions,
  imageSrc,
  imageAlt = "",
}: FormWrapperProps) {
  return (
    <section id="form-wrapper">
      <div id="form-layout">
        <div id="form-visual" aria-hidden="true">
          {imageSrc ? (
            <img className="media-panel-image" src={imageSrc} alt={imageAlt} />
          ) : null}
        </div>

        <div id="form-panel">
          <h1 id="form-title">{title}</h1>
          <div id="form-content">{children}</div>
          <div id="form-actions">{actions}</div>
        </div>
      </div>
    </section>
  );
}
