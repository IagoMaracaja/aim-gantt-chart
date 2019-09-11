export function generateId(task) {
  return (
    task.name +
    '_' +
    Math.random()
      .toString(36)
      .slice(2, 12)
  );
}
