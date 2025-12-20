import { createPortal } from "react-dom";
import Modal from "./Modal/Modal";
import { PromptList } from "@features/prompts";
import { UpdateNotification } from "@features/updates";
import { getModalRoot } from "../modal-root";
import { useNavigation } from "@shared/contexts";
import { BookOpen } from "lucide-react";
import {
  checkForUpdate,
  type ReleaseInfo,
} from "@shared/services/updateChecker";
import { useState, useEffect } from "react";

export default function PromptButton() {
  const { isOpen, open, close, pushView } = useNavigation();
  const [pendingUpdate, setPendingUpdate] = useState<ReleaseInfo | null>(null);

  useEffect(() => {
    checkForUpdate().then(setPendingUpdate);
  }, []);

  const handleClick = async () => {
    pushView({
      title: "Prompt Library",
      content: <PromptList />,
      hasBackBtn: false,
    });

    if (pendingUpdate) {
      pushView({
        title: "Update Available",
        content: <UpdateNotification release={pendingUpdate} />,
        hasBackBtn: true,
      });
      setPendingUpdate(null);
    }

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
