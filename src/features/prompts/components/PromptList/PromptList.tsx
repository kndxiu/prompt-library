import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadPrompts } from "../../store/promptsSlice";
import styles from "./PromptList.css?inline";
import { PlusIcon, Search } from "lucide-react";
import PromptCard from "../PromptCard/PromptCard";
import { useNavigation } from "@shared/contexts";
import PromptEdit from "../PromptEdit/PromptEdit";

export default function PromptList() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.prompts);
  const { pushView, open } = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter(
      (prompt) =>
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [items, searchQuery]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPrompts());
    }
  }, [dispatch, status]);

  const handleAdd = () => {
    pushView({
      title: "New prompt",
      content: <PromptEdit />,
      hasBackBtn: true,
    });
    open();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="prompt-list-container">
        <div className="prompt-list-search">
          <input
            id="prompt-serch"
            type="text"
            placeholder="Search prompts..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="prompt-list-search-icon" size={20} />
        </div>
        {searchQuery.length > 0 ? (
          <>
            <div className="prompt-list-label">Search results</div>

            {filteredItems.length > 0 ? (
              <div className="prompt-list-prompts">
                {filteredItems.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            ) : (
              <div className="prompt-list-no-results">No results</div>
            )}
          </>
        ) : (
          <>
            <div className="prompt-list-label">All prompts</div>
            <div className="prompt-list-prompts">
              {items.length > 0 ? (
                items.map((prompt, index) => {
                  const isOdd = items.length % 2 !== 0;
                  const threshold = isOdd ? 1 : 2;
                  const shouldBeTop =
                    items.length >= 5 && index >= items.length - threshold;

                  return (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      placement={shouldBeTop ? "top" : "bottom"}
                    />
                  );
                })
              ) : (
                <div className="prompt-list-no-results">No prompts</div>
              )}
            </div>
            <button className="btn" onClick={handleAdd}>
              Add prompt <PlusIcon size={18} />
            </button>
          </>
        )}
      </div>
    </>
  );
}
