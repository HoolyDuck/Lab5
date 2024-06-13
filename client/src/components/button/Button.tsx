import styles from "./Button.module.css";

enum ButtonAppearance {
  PRIMARY = "primary",
  OUTLINE = "outline",
  DANGER = "danger",
}

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  appearance?: ButtonAppearance;
}

function Button({
  children,
  onClick,
  type,
  appearance = ButtonAppearance.PRIMARY,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[appearance]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
export { ButtonAppearance };