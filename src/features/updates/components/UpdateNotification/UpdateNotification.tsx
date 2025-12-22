import Markdown from "react-markdown";
import type { ReleaseInfo } from "@shared/services/updateChecker";
import { dismissUpdate } from "@shared/services/updateChecker";
import { useNavigation } from "@shared/contexts";
import styles from "./UpdateNotification.css?inline";
import { HowToDownload } from "../HowToDownload/HowToDownload";

interface UpdateNotificationProps {
  release: ReleaseInfo;
}

export function UpdateNotification({ release }: UpdateNotificationProps) {
  const { close, pushView } = useNavigation();

  const handleDownload = () => {
    window.open(release.url, "_blank");
  };

  const handleDismiss = async () => {
    await dismissUpdate();
    close();
  };

  const handleHowTo = () => {
    pushView({
      title: "Help",
      content: <HowToDownload />,
      hasBackBtn: true,
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="update-notification">
        <div className="update-notification__header">
          <h2>New Version Available</h2>
          <div className="update-notification__description">
            <p>Version {release.version} is ready to download</p>
            <button className="update-notification__link" onClick={handleHowTo}>
              How to download?
            </button>
          </div>
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
