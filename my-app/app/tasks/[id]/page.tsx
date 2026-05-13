export default async function taskDetails({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  return <div>{id}</div>;
}
