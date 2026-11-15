"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/shared/lib";

export type PickerOption = { value: string; label: string; group?: string; hint?: string };

/**
 * 어드민 선택칸 (기본 select 대신): 버튼을 누르면 목록이 열리고, 그룹·설명·체크 표시가 붙는다.
 * 값은 숨은 input(name)으로 폼에 실린다. autoSubmit이면 고르는 즉시 폼을 보낸다.
 * 키보드: ↑↓로 이동, Enter로 고름, Esc로 닫음.
 */
export function Picker({
  name,
  options,
  defaultValue = "",
  id,
  label,
  autoSubmit,
  size = "md",
  tone,
  className,
}: {
  name: string;
  options: PickerOption[];
  defaultValue?: string;
  id?: string;
  /** 화면에 보이는 라벨이 없을 때 읽어 줄 이름 */
  label?: string;
  autoSubmit?: boolean;
  size?: "sm" | "md";
  /** 버튼 강조 (상태 표시용) */
  tone?: "strong" | "warn";
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [rect, setRect] = useState<{
    left: number;
    top: number;
    width: number;
    up: boolean;
  } | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const current = options.find((o) => o.value === value) ?? options[0];

  function show() {
    const r = button.current?.getBoundingClientRect();
    if (!r) return;
    const up = window.innerHeight - r.bottom < 300 && r.top > 300;
    setRect({ left: r.left, top: up ? r.top - 6 : r.bottom + 6, width: r.width, up });
    setActive(
      Math.max(
        0,
        options.findIndex((o) => o.value === value),
      ),
    );
    setOpen(true);
  }

  function choose(v: string) {
    setValue(v);
    setOpen(false);
    button.current?.focus();
    if (autoSubmit && v !== value) {
      const form = button.current?.form;
      // 숨은 input에 새 값이 그려진 뒤 보낸다
      setTimeout(() => form?.requestSubmit(), 0);
    }
  }

  useEffect(() => {
    if (!open) return;
    list.current?.focus();
    const close = (e: Event) => {
      if (e.type === "mousedown" && list.current?.contains(e.target as Node)) return;
      if (e.type === "mousedown" && button.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", close);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [open]);

  useEffect(() => {
    if (open)
      list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const o = options[active];
      if (o) choose(o.value);
    } else if (e.key === "Escape" || e.key === "Tab") {
      e.preventDefault();
      setOpen(false);
      button.current?.focus();
    }
  }

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <button
        ref={button}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={label ? `${label}: ${current?.label ?? ""}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            show();
          }
        }}
        className={cn(
          "inline-flex w-full items-center justify-between gap-2 rounded-lg border bg-white text-left text-sm whitespace-nowrap",
          "hover:border-neutral-500 focus-visible:border-black focus-visible:outline-none",
          size === "sm" ? "h-8 px-2.5" : "h-10 px-3",
          open ? "border-black" : "border-neutral-300",
          tone === "strong" && "border-black font-semibold",
          tone === "warn" && "border-amber-400 text-amber-700",
          className,
        )}
      >
        <span className={cn("truncate", !current?.value && "text-neutral-400")}>
          {current?.label ?? "선택"}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={cn(
            "size-3 shrink-0 text-neutral-500 motion-safe:transition-transform",
            open && "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && rect ? (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${listId}-${active}`}
          onKeyDown={onListKey}
          style={{
            left: rect.left,
            top: rect.top,
            minWidth: Math.max(rect.width, 176),
            transform: rect.up ? "translateY(-100%)" : undefined,
          }}
          className="fixed z-50 max-h-72 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 text-sm shadow-[0_8px_24px_rgba(0,0,0,0.12)] focus:outline-none"
        >
          {options.map((o, i) => {
            const heading = o.group && o.group !== options[i - 1]?.group ? o.group : null;
            const selected = o.value === value;
            return (
              <li key={`${o.group ?? ""}-${o.value}`} role="presentation">
                {heading ? (
                  <p className="px-2.5 pt-2 pb-1 text-[0.6875rem] font-semibold text-neutral-400">
                    {heading}
                  </p>
                ) : null}
                <div
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={selected}
                  data-index={i}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(o.value)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-4 rounded-md px-2.5 py-2",
                    i === active && "bg-neutral-100",
                    selected && "font-semibold",
                  )}
                >
                  <span className={cn(!o.value && "text-neutral-500")}>
                    {o.label}
                    {o.hint ? (
                      <span className="ml-1.5 text-xs text-neutral-400">{o.hint}</span>
                    ) : null}
                  </span>
                  {selected ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className="size-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        d="m2.5 6.5 2.5 2.5 4.5-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
