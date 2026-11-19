"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/shared/lib";

/** 견적 폼 드롭다운. 하나 고르기(기본)와 여러 개 고르기(multiple)를 같은 모양으로 쓴다 */
export function EstimateSelect({
  label,
  hint,
  options,
  value,
  onChange,
  onBlur,
  multiple = false,
  placeholder = "선택해 주세요",
  error,
  ref,
}: {
  label: string;
  hint?: string;
  options: readonly string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onBlur?: () => void;
  multiple?: boolean;
  placeholder?: string;
  error?: string;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function show() {
    const first = options.findIndex((o) => selected.includes(o));
    setActive(first < 0 ? 0 : first);
    setOpen(true);
  }

  function close(refocus = true) {
    setOpen(false);
    onBlur?.();
    if (refocus) buttonRef.current?.focus();
  }

  function pick(option: string) {
    if (multiple) {
      onChange(
        selected.includes(option) ? selected.filter((o) => o !== option) : [...selected, option],
      );
      return;
    }
    onChange(option);
    close();
  }

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") setActive((i) => Math.min(i + 1, options.length - 1));
    else if (e.key === "ArrowUp") setActive((i) => Math.max(i - 1, 0));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(options.length - 1);
    else if (e.key === "Enter" || e.key === " ") pick(options[active]);
    else if (e.key === "Escape") close();
    else if (e.key === "Tab") return close(false);
    else return;
    e.preventDefault();
  }

  const display = selected.length === 0 ? null : multiple ? selected.join(", ") : selected[0];

  return (
    <div ref={rootRef} className="relative space-y-1.5">
      <label htmlFor={`${id}-button`} className="block">
        {label}
      </label>
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        id={`${id}-button`}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onClick={() => (open ? close() : show())}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onKeyUp={(e) => {
          if (e.key === " ") e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (open) return onListKey(e);
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            show();
          }
        }}
        className={cn(
          "group flex h-12 w-full items-center gap-2 rounded-lg border bg-white pr-3 pl-4 text-left text-[0.9375rem]",
          "outline-none focus-visible:border-black focus-visible:ring-4 focus-visible:ring-black/5",
          "motion-safe:transition-[border-color,box-shadow]",
          open
            ? "border-black ring-4 ring-black/5"
            : error
              ? "border-red-500"
              : "border-neutral-300 hover:border-neutral-500",
        )}
      >
        <span
          className={cn("min-w-0 flex-1 truncate", display ? "text-black" : "text-neutral-400")}
        >
          {display ?? placeholder}
        </span>
        {multiple && selected.length > 1 ? (
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-black px-1.5 text-[0.6875rem] font-semibold text-white tabular-nums">
            {selected.length}
          </span>
        ) : null}
        <svg
          viewBox="0 0 20 20"
          aria-hidden
          className={cn(
            "size-5 shrink-0 text-neutral-500 motion-safe:transition-transform motion-safe:duration-200",
            open && "rotate-180 text-black",
          )}
        >
          <path
            d="m5.5 8 4.5 4.5L14.5 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full z-30 mt-2 origin-top overflow-hidden rounded-xl border border-neutral-200 bg-white",
          "shadow-[0_16px_40px_-12px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.04)]",
          "motion-safe:transition-[opacity,transform,visibility] motion-safe:duration-150 motion-safe:ease-out",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-[0.98] opacity-0",
        )}
      >
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-button`}
          aria-multiselectable={multiple || undefined}
          className="max-h-72 overflow-y-auto overscroll-contain p-1.5"
        >
          {options.map((option, i) => {
            const isSelected = selected.includes(option);
            return (
              <li
                key={option}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(option)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] select-none",
                  i === active && "bg-neutral-100",
                  isSelected ? "font-semibold text-black" : "text-neutral-700",
                )}
              >
                {multiple ? (
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-[18px] shrink-0 place-items-center rounded-[5px] border motion-safe:transition-colors",
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-neutral-300 bg-white",
                    )}
                  >
                    {isSelected ? <Check className="size-3" /> : null}
                  </span>
                ) : null}
                <span className="flex-1">{option}</span>
                {!multiple && isSelected ? <Check className="size-4 text-black" /> : null}
              </li>
            );
          })}
        </ul>
        {multiple ? (
          <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-2.5">
            <span className="text-sm text-neutral-500 tabular-nums">
              {selected.length ? `${selected.length}개 선택` : "여러 개 고를 수 있어요"}
            </span>
            <div className="flex items-center gap-1">
              {selected.length ? (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onChange([])}
                  className="rounded-md px-2.5 py-1.5 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-black"
                >
                  초기화
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => close()}
                className="rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                완료
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-foreground/60">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className}>
      <path
        d="m3.5 8.5 3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
