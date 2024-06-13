import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={onClose}
      />
      <div className={styles.content}>
        <div
          className={styles.closeButton}
          onClick={onClose}
        >
          <span>&times;</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
