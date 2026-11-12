import { buttonClassName, type ButtonSize, type ButtonVariant } from "./button-link";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** 공통 버튼. 네이티브 button props를 그대로 받는다. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return <button type={type} className={buttonClassName(variant, className, size)} {...rest} />;
}
