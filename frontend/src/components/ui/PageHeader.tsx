import { theme } from "../../styles/theme";

type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className={theme.text.title}>{title}</h1>

      {description && (
        <p className={`mt-1 ${theme.text.subtitle}`}>{description}</p>
      )}
    </div>
  );
}
