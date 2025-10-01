import TasksClient from "@/components/custom-ui/TaskClient";


export default async function TasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TasksClient eventId={id} />;
}
