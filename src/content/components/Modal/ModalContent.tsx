import { ArrowLeft, X } from "lucide-react";
import { useNavigation } from "../../context/shared";

export default function ModalContent() {
  const { currentView, popView, close } = useNavigation();

  if (!currentView) return null;

  return (
    <div className="modal-content">
      <div className="modal-header">
        <button
          className="modal-button"
          onClick={popView}
          style={{
            opacity: currentView.hasBackBtn ? 1 : 0,
            visibility: currentView.hasBackBtn ? "visible" : "hidden",
            pointerEvents: currentView.hasBackBtn ? "auto" : "none",
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="modal-title">{currentView.title}</h2>
        <button className="modal-button" onClick={close}>
          <X size={18} />
        </button>
      </div>
      <div className="modal-body">{currentView.content}</div>
    </div>
  );
}
