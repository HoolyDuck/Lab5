import styles from "./ActionButton.module.css";
import editIcon from "../../assets/edit-icon.svg";
import deleteIcon from "../../assets/trash-icon.svg";

enum Action {
  EDIT = "EDIT",
  DELETE = "DELETE",
}

interface ActionButtonProps {
  action: Action;
  onClick: () => void;
}

function ActionButton({ action, onClick }: ActionButtonProps) {
  return (
    <button
      className={styles.actionButton}
      onClick={onClick}
    >
      <img
        src={action === Action.EDIT ? editIcon : deleteIcon}
        alt={action}
      />
    </button>
  );
}

export default ActionButton;
export { Action };
