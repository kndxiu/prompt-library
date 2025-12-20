import { useAppDispatch, useAppSelector } from "@store/hooks";
import { updateLastUsed } from "../../store/promptsSlice";
import { useNavigation } from "@shared/contexts";
import styles from "./PromptDetails.css?inline";
import PromptEdit from "../PromptEdit/PromptEdit";

interface PromptDetailsProps {
  promptId: string;
}

export default function PromptDetails({ promptId }: PromptDetailsProps) {
  const { insertPrompt, pushView, open } = useNavigation();
  const dispatch = useAppDispatch();
  const prompt = useAppSelector((state) =>
    state.prompts.items.find((p) => p.id === promptId)
  );

  if (!prompt) {
    return (
      <div className="prompt-details-container">
        <div className="prompt-details-content">Prompt not found</div>
      </div>
    );
  }

  const handleInsert = () => {
    insertPrompt(prompt.content);
    dispatch(updateLastUsed(prompt.id));
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
      <div className="prompt-details-container">
        <div className="prompt-details-sidebar">
          <div className="prompt-details-sidebar-item">
            <span className="prompt-details-sidebar-item-label">
              Created at:
            </span>
            <span className="prompt-details-sidebar-item-value">
              {new Intl.DateTimeFormat(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              }).format(prompt.createdAt)}
            </span>
          </div>
          <div className="prompt-details-sidebar-item">
            <span className="prompt-details-sidebar-item-label">
              Last updated:
            </span>
            <span className="prompt-details-sidebar-item-value">
              {new Intl.DateTimeFormat(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              }).format(prompt.updatedAt)}
            </span>
          </div>
          <div className="prompt-details-sidebar-item">
            <span className="prompt-details-sidebar-item-label">
              Last used:
            </span>
            <span className="prompt-details-sidebar-item-value">
              {prompt.lastUsedAt
                ? new Intl.DateTimeFormat(undefined, {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(prompt.lastUsedAt)
                : "-"}
            </span>
          </div>
          <div className="prompt-details-sidebar-item">
            <span className="prompt-details-sidebar-item-label">Tags:</span>
            <span className="prompt-details-sidebar-item-value">
              {prompt.tags.join(", ")}
            </span>
          </div>
        </div>
        <div className="prompt-details-content">
          <div className="prompt-details-content-title">{prompt.title}</div>
          <div className="prompt-details-content-content">{prompt.content}</div>
          <div className="prompt-details-content-actions">
            <button className="btn" onClick={handleInsert}>
              Insert
            </button>
            <button className="btn-secondary" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
