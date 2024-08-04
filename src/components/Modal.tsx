import { useRecoilValue } from "recoil";
import { modalPosState } from "../utils/stateStore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalPos = useRecoilValue(modalPosState);

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      style={{
        position: "absolute",
        // top: "50%",
        // left: "50%",
        top: modalPos.y,
        left: modalPos.x,
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      <button onClick={handleClose}>Close</button>
    </div>
  );
}
