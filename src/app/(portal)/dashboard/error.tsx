"use client";

import { ErrorScreen } from "@/shared/layout";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  return <ErrorScreen error={error} retry={retry} />;
}
