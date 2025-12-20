import { EllipsisIcon, Pencil, Trash } from "lucide-react";
import type { Prompt } from "../../types";
import styles from "./PromptCard.css?inline";
import { useAppDispatch } from "@store/hooks";
import { deletePrompt } from "../../store/promptsSlice";
import { useNavigation } from "@shared/contexts";
import PromptDetails from "../PromptDetails/PromptDetails";
import PromptEdit from "../PromptEdit/PromptEdit";

interface PromptCardProps {
  prompt: Prompt;
  placement?: "top" | "bottom";
}

export default function PromptCard({
  prompt,
  placement = "bottom",
}: PromptCardProps) {
  const dispatch = useAppDispatch();
  const { pushView, open } = useNavigation();

  const handleDelete = () => {
    dispatch(deletePrompt(prompt.id));
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
  };

  return (
    <>
      <style>{styles}</style>
      <div
        className="prompt-card"
        onClick={handleView}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleView();
          }
        }}
      >
        <div className="prompt-card-title">{prompt.title}</div>
        <div
          className="prompt-card-options"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-button">
            <EllipsisIcon size={18} />
          </button>
          <div
            className={`prompt-card-options-list ${
              placement === "top" ? "prompt-card-options-top" : ""
            }`}
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
    </>
  );
}
