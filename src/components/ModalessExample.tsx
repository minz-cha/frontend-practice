import { useState } from "react";
import { useDrag } from "react-use-gesture";
import { useRecoilState } from "recoil";
import { modalPosState } from "../utils/stateStore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position: { x: number; y: number };
  setModalPos: (pos: { x: number; y: number }) => void;
}

function Modal({
  isOpen,
  onClose,
  children,
  position,
  setModalPos,
}: ModalProps) {
  const bind = useDrag(({ offset }) => {
    setModalPos({ x: offset[0], y: offset[1] });
  });

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        {...bind()}
        style={{
          cursor: "move",
          borderRadius: "4px",
          marginBottom: "10px",
          width: "fit-content",
        }}
      >
        <DragIndicatorIcon />
      </div>
      {children}
      <button onClick={handleClose}>Close</button>
    </div>
  );
}

export default function ModalessExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPos, setModalPos] = useRecoilState(modalPosState);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px" }}>Modal</h1>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        position={modalPos}
        setModalPos={setModalPos}
      >
        <h2>Modal Title</h2>
        <p>This is a non-modal content.</p>
      </Modal>

      <div style={{ marginTop: "20px" }}></div>
    </div>
  );
}
