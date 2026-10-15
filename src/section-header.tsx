export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex h-8 items-center justify-between px-2">
      <h3 className="text-subhead font-medium text-label-secondary">{title}</h3>
      {action}
    </div>
  );
}
