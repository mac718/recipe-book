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
  deleteWarn: boolean;
}

const ModalOverlay = ({ children, onClose, deleteWarn }: ModalOverlayProps) => {
  return (
    <div
      className={styles.modal}
      style={deleteWarn ? { height: "fit-content", top: "30%" } : {}}
    >
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
  deleteWarn: boolean;
}

const Modal = ({ onClose, children, deleteWarn }: ModalProps) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <ModalOverlay onClose={onClose} deleteWarn={deleteWarn}>
        {children}
      </ModalOverlay>
    </>
  );
};

export default Modal;
