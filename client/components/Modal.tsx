import styles from "../styles/Modal.module.css";

interface BackDropProps {
  onClose: () => void;
}

export const Backdrop = ({ onClose }: BackDropProps) => {
  return <div className={styles.backdrop} onClick={onClose}></div>;
};

interface ModalOverlayProps {
  children: React.ReactNode;
}

const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return (
    <div className={styles.modal}>
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
      <ModalOverlay>{children}</ModalOverlay>
    </>
  );
};

export default Modal;
