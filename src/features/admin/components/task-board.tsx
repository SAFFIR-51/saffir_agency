"use client";

import Link from "next/link";
import type { Route } from "next";
import { startTransition, useOptimistic, useState } from "react";
import { cn } from "@/shared/lib";
import { moveTaskAction } from "../api/actions";

type BoardTask = {
  id: string;
  title: string;
  stage: string;
  assignee: string;
  due: string;
  status: Status;
  shared: boolean;
};
type Status = "할 일" | "진행 중" | "검토" | "완료" | "보류";

const COLUMNS: Status[] = ["할 일", "진행 중", "검토", "완료", "보류"];

/**
 * 작업 보드: 카드를 끌어다 다른 칸에 놓으면 상태가 바뀐다 (일정관리 도구의 칸반).
 * 키보드로는 카드의 ← → 버튼으로 옮긴다.
 */
export function TaskBoard({
  projectId,
  tasks,
  today,
  editHref,
}: {
  projectId: string;
  tasks: BoardTask[];
  today: string;
  editHref: string;
}) {
  const [items, move] = useOptimistic(
    tasks,
    (list, { id, status }: { id: string; status: Status }) =>
      list.map((t) => (t.id === id ? { ...t, status } : t)),
  );
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<Status | null>(null);

  function moveTo(id: string, status: Status) {
    const task = items.find((t) => t.id === id);
    if (!task || task.status === status) return;
    startTransition(async () => {
      move({ id, status });
      await moveTaskAction(projectId, id, status);
    });
  }

  return (
    <div className="grid gap-3 overflow-x-auto pb-2 lg:grid-cols-5">
      {COLUMNS.map((status, ci) => {
        const cards = items
          .filter((t) => t.status === status)
          .toSorted((a, b) => a.due.localeCompare(b.due));
        return (
          <section
            key={status}
            aria-label={status}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(status);
            }}
            onDragLeave={() => setOver((o) => (o === status ? null : o))}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData("text/plain");
              setOver(null);
              setDragging(null);
              if (id) moveTo(id, status);
            }}
            className={cn(
              "flex min-h-64 min-w-56 flex-col rounded-lg bg-neutral-100 p-2 motion-safe:transition-colors",
              over === status && "bg-neutral-200 ring-2 ring-black",
            )}
          >
            <h3 className="flex items-center justify-between px-2 pt-1 pb-2 text-sm font-bold">
              {status}
              <span className="text-xs font-semibold text-neutral-500 tabular-nums">
                {cards.length}
              </span>
            </h3>
            <ul className="flex flex-col gap-2">
              {cards.map((t) => {
                const late = t.status !== "완료" && t.status !== "보류" && t.due < today;
                return (
                  <li
                    key={t.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", t.id);
                      e.dataTransfer.effectAllowed = "move";
                      setDragging(t.id);
                    }}
                    onDragEnd={() => setDragging(null)}
                    className={cn(
                      "group cursor-grab rounded-md border border-neutral-200 bg-white p-3 text-sm shadow-[0_1px_0_rgba(0,0,0,0.04)] active:cursor-grabbing",
                      dragging === t.id && "opacity-40",
                      t.status === "완료" && "text-neutral-500",
                    )}
                  >
                    <p className={cn("font-semibold", t.status === "완료" && "line-through")}>
                      {t.title}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
                      <span>{t.stage}</span>
                      <span aria-hidden="true">·</span>
                      <span>{t.assignee || "담당 미정"}</span>
                      <span aria-hidden="true">·</span>
                      <span className={cn("tabular-nums", late && "font-semibold text-red-600")}>
                        {t.due.slice(5)}
                        {late ? " 지남" : ""}
                      </span>
                      {!t.shared ? (
                        <span className="rounded bg-neutral-100 px-1 text-neutral-500">비공개</span>
                      ) : null}
                    </div>
                    <div className="mt-2 flex items-center gap-1 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100">
                      <button
                        type="button"
                        disabled={ci === 0}
                        onClick={() => moveTo(t.id, COLUMNS[ci - 1]!)}
                        aria-label={`${t.title} 왼쪽 칸으로`}
                        className="h-6 rounded border border-neutral-300 px-1.5 text-xs disabled:opacity-30"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        disabled={ci === COLUMNS.length - 1}
                        onClick={() => moveTo(t.id, COLUMNS[ci + 1]!)}
                        aria-label={`${t.title} 오른쪽 칸으로`}
                        className="h-6 rounded border border-neutral-300 px-1.5 text-xs disabled:opacity-30"
                      >
                        →
                      </button>
                      <Link
                        href={`${editHref}&edit=t-${t.id}#tasks` as Route}
                        className="ml-auto text-xs text-neutral-500 underline underline-offset-4 hover:text-black"
                      >
                        수정
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
