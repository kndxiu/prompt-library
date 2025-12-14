import ModalContent from "./ModalContent";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <ModalContent />
    </div>
  );
}
