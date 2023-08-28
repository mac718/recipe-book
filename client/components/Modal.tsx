import styles from "../styles/Modal.module.css";

interface BackDropProps {
  onClose: () => void;
}

export const Backdrop = ({ onClose }: BackDropProps) => {
  return <div className={styles.backdrop} onClick={onClose}></div>;
};

interface ModalOverlayProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
  return (
    <div className={styles.modal}>
      <span className={styles.close} onClick={onClose}>
        X
      </span>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <ModalOverlay onClose={onClose}>{children}</ModalOverlay>
    </>
  );
};

export default Modal;
