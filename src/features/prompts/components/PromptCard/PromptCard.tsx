import { EllipsisIcon, Pencil, Trash, CornerDownRight } from "lucide-react";
import type { Prompt } from "../../types";
import styles from "./PromptCard.css?inline";
import { useAppDispatch } from "@store/hooks";
import { deletePrompt, updateLastUsed } from "../../store/promptsSlice";
import { useNavigation } from "@shared/contexts";
import PromptDetails from "../PromptDetails/PromptDetails";
import PromptEdit from "../PromptEdit/PromptEdit";
import { useState, useRef, useEffect } from "react";

interface PromptCardProps {
  prompt: Prompt;
  placement?: "top" | "bottom";
}

export default function PromptCard({
  prompt,
  placement = "bottom",
}: PromptCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { pushView, open, insertPrompt } = useNavigation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const path = event.composedPath();
      if (optionsRef.current && !path.includes(optionsRef.current)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleDelete = () => {
    dispatch(deletePrompt(prompt.id));
    setIsOpen(false);
  };

  const handleView = () => {
    pushView({
      title: prompt.title,
      content: <PromptDetails promptId={prompt.id} />,
      hasBackBtn: true,
    });
    open();
  };

  const handleEdit = () => {
    pushView({
      title: "Editing: " + prompt.title,
      content: <PromptEdit prompt={prompt} />,
      hasBackBtn: true,
    });
    open();
    setIsOpen(false);
  };

  const handleInsert = () => {
    insertPrompt(prompt.content);
    dispatch(updateLastUsed(prompt.id));
    setIsOpen(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className={`prompt-card ${isOpen ? "is-open" : ""}`}>
        <button className="prompt-card-content" onClick={handleView}>
          <div className="prompt-card-title">{prompt.title}</div>
        </button>
        <div className="prompt-card-actions">
          <button className="modal-button" onClick={handleInsert}>
            <CornerDownRight size={18} />
          </button>
          <div className="prompt-card-options" ref={optionsRef}>
            <button
              className="modal-button"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <EllipsisIcon size={18} />
            </button>
            <div
              className={`prompt-card-options-list ${
                placement === "top" ? "prompt-card-options-top" : ""
              }`}
              style={{
                opacity: isOpen ? 1 : 0,
                visibility: isOpen ? "visible" : "hidden",
                pointerEvents: isOpen ? "all" : "none",
              }}
            >
              <button className="prompt-card-option" onClick={handleEdit}>
                <Pencil size={18} />
                Edit
              </button>
              <button
                className="prompt-card-option prompt-card-option-danger"
                onClick={handleDelete}
              >
                <Trash size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
