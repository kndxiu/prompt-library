import { useState } from "react";
import type { Prompt } from "../../../../../shared/types";
import { useNavigation } from "../../../../context/shared";
import styles from "./PromptEdit.css?inline";
import {
  addPrompt,
  updatePrompt,
} from "../../../../../store/slices/promptsSlice";
import { useAppDispatch } from "../../../../../store/hooks";

interface PromptEditProps {
  prompt?: Prompt;
}

export default function PromptEdit({ prompt }: PromptEditProps) {
  const { popView } = useNavigation();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(prompt?.title || "");
  const [tags, setTags] = useState(prompt?.tags || []);
  const [content, setContent] = useState(prompt?.content || "");

  const handleSave = () => {
    if (!title || !content) return;

    if (prompt) {
      dispatch(
        updatePrompt({
          id: prompt.id,
          title,
          tags,
          content,
          createdAt: prompt.createdAt,
          updatedAt: Date.now(),
        })
      );
    } else {
      dispatch(
        addPrompt({
          id: crypto.randomUUID(),
          title,
          tags,
          content,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
      );
    }
    popView();
  };

  const handleCancel = () => {
    popView();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="prompt-edit-container">
        <div className="prompt-edit-input-wrapper">
          <label htmlFor="prompt-title" className="prompt-edit-label">
            Title
          </label>
          <div className="prompt-edit-input">
            <input
              type="text"
              id="prompt-title"
              placeholder="Prompt title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="prompt-edit-input-wrapper">
          <label htmlFor="prompt-tags" className="prompt-edit-label">
            Tags
          </label>
          <div className="prompt-edit-input">
            <input
              type="text"
              id="prompt-tags"
              placeholder="Prompt tags (comma separated)"
              value={tags.join(", ")}
              onChange={(e) =>
                setTags(e.target.value.split(",").map((tag) => tag.trim()))
              }
            />
          </div>
        </div>
        <div className="prompt-edit-input-wrapper">
          <label htmlFor="prompt-content" className="prompt-edit-label">
            Content
          </label>
          <div className="prompt-edit-input">
            <textarea
              id="prompt-content"
              placeholder="Prompt content"
              value={content}
              rows={4}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="prompt-edit-actions">
          <button className="btn" onClick={handleSave}>
            Save
          </button>
          <button className="btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
