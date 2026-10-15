export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex h-8 items-center justify-between gap-2 px-2">
      <h3 className="min-w-0 flex-1 truncate-fade text-subhead font-medium text-label-secondary">
        {title}
      </h3>
      {action}
    </div>
  );
}
