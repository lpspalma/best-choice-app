type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Carregando..." }: LoadingStateProps) {
  return <p className="text-app-muted">{message}</p>;
}
