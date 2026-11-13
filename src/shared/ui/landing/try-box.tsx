"use client";

import { useId, useState } from "react";
import "./landing.css";

type Props = {
  /** 이 상자로 바로 갈 수 있는 앵커 (#diagnosis 등) */
  id: string;
  title: string;
  label: string;
  placeholder: string;
  kind?: "input" | "textarea";
  inputType?: "url" | "text";
  button: string;
  /** 상자 아래 작은 안내 (무료 횟수, 고지 등) */
  notes?: readonly string[];
  /** 기능이 붙기 전까지 누르면 보이는 안내 */
  pending: string;
};

/**
 * 첫 화면에서 바로 써 보는 상자 (진단 주소 입력, 광고 문구 검사 등).
 * 실제 기능을 연결하기 전이라 제출하면 "준비 중" 안내만 보여 준다.
 */
export function TryBox({
  id,
  title,
  label,
  placeholder,
  kind = "input",
  inputType = "text",
  button,
  notes = [],
  pending,
}: Props) {
  const fieldId = useId();
  const [message, setMessage] = useState("");

  return (
    <form
      id={id}
      className="tb"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(pending);
      }}
    >
      <p className="tb-title">{title}</p>
      <label htmlFor={fieldId} className="tb-label">
        {label}
      </label>
      {kind === "textarea" ? (
        <textarea
          id={fieldId}
          className="tb-input tb-textarea"
          placeholder={placeholder}
          rows={6}
        />
      ) : (
        <input id={fieldId} type={inputType} className="tb-input" placeholder={placeholder} />
      )}
      <button type="submit" className="tb-btn">
        {button}
      </button>
      <p className="tb-status" role="status" aria-live="polite">
        {message}
      </p>
      {notes.length > 0 ? (
        <ul className="tb-notes">
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
