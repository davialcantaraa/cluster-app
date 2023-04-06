interface FileSkeletonProps {
  count: number;
}

export const FileSkeleton = ({ count }: FileSkeletonProps) => {
  for (let i = 0; i < count; i++) {
    return <div className="h-9 rounded-lg bg-gray-100 p-2 dark:text-white" />;
  }
  return null;
};
