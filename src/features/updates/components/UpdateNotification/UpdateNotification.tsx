import Markdown from "react-markdown";
import type { ReleaseInfo } from "@shared/services/updateChecker";
import { dismissUpdate } from "@shared/services/updateChecker";
import { useNavigation } from "@shared/contexts";
import styles from "./UpdateNotification.css?inline";

interface UpdateNotificationProps {
  release: ReleaseInfo;
}

export function UpdateNotification({ release }: UpdateNotificationProps) {
  const { close } = useNavigation();

  const handleDownload = () => {
    window.open(release.url, "_blank");
  };

  const handleDismiss = async () => {
    await dismissUpdate();
    close();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="update-notification">
        <div className="update-notification__header">
          <h2>New Version Available</h2>
          <p>Version {release.version} is ready to download</p>
        </div>

        <div className="update-notification__changelog">
          <Markdown>{release.changelog || "No changelog provided."}</Markdown>
        </div>

        <div className="update-notification__actions">
          <button className="btn" onClick={handleDownload}>
            Download
          </button>
          <button className="btn-secondary" onClick={handleDismiss}>
            Later
          </button>
        </div>
      </div>
    </>
  );
}
