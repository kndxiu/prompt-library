import { createPortal } from "react-dom";
import Modal from "./Modal/Modal";
import PromptList from "./Modal/views/PromptList/PromptList";
import { getModalRoot } from "../modal-root";
import { useNavigation } from "../context/shared";
import { BookOpen } from "lucide-react";

export default function PromptButton() {
  const { isOpen, open, close, pushView } = useNavigation();

  const handleClick = () => {
    pushView({
      title: "Prompt Library",
      content: <PromptList />,
      hasBackBtn: false,
    });
    open();
  };

  return (
    <>
      <button onClick={handleClick} className="prompt-button">
        <BookOpen size={18} />
      </button>
      {isOpen &&
        createPortal(<Modal isOpen={isOpen} onClose={close} />, getModalRoot())}
    </>
  );
}
