import { useNavigation } from "@shared/contexts";
import styles from "./HowToDownload.css?inline";

export function HowToDownload() {
  const { popView } = useNavigation();

  return (
    <>
      <style>{styles}</style>
      <div className="how-to-download">
        <div className="how-to-download__header">
          <h2>How to update</h2>
          <p>
            Updating the extension in Developer Mode is quick and takes less
            than a minute.
          </p>
        </div>

        <div className="how-to-download__content">
          <p>To update Prompt Library:</p>
          <ul>
            <li>
              <p>
                Download the latest release from GitHub and unzip the files.
              </p>
            </li>
            <li>
              <p>
                Open the folder where Prompt Library is installed and replace
                its contents with the new files.
              </p>
            </li>
            <li>
              <p>
                Go to <strong>chrome://extensions</strong>, make sure Developer
                Mode is enabled, and click Reload on Prompt Library.
              </p>
            </li>
          </ul>
          <p>That's it - the extension is now up to date.</p>
          <p className="how-to-download__note">
            Chrome extensions installed in Developer Mode do not support
            automatic updates. Automatic updates will be available once the
            extension is published on the Chrome Web Store.
          </p>
        </div>

        <div className="how-to-download__actions">
          <button className="btn" onClick={popView}>
            Got it
          </button>
        </div>
      </div>
    </>
  );
}
