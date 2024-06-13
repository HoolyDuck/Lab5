import styles from "./Input.module.css";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value?: string | number;
  placeholder?: string;
}

function Input({ label, type, placeholder, name, value }: InputProps) {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={value}
      />
    </div>
  );
}

export default Input;
