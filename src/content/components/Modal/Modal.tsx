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
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
      onKeyPress={(e) => e.stopPropagation()}
      onPaste={(e) => e.stopPropagation()}
    >
      <ModalContent />
    </div>
  );
}
