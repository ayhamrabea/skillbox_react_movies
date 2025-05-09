type MoviesErrorProps = {
  error: string | null;
};

export function ErrorFunction({ error }: MoviesErrorProps) {
  return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
}