import styles from "./Select.module.css";

type SelectProps = {
  label: string;
} & React.HTMLProps<HTMLSelectElement>;

export const Select = ({ children, ...props }: SelectProps) => {
  return (
    <div className={styles.select}>
      <label>{props.label}</label>
      <select {...props}>{children}</select>
    </div>
  );
};
