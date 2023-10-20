"use client";

export default function TaskError({
  error,
}: {
  error: Error & { digset?: string };
}) {
  return (
    <div className="flex h-full items-center justify-center">
      {error.message}
    </div>
  );
}
