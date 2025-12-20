import {
  APP_VERSION,
  GITHUB_REPO,
  UPDATE_CHECK_INTERVAL_MS,
} from "@shared/constants";

export interface ReleaseInfo {
  version: string;
  changelog: string;
  url: string;
}

interface StoredUpdateCheck {
  lastCheck: number;
  latestVersion: string | null;
  changelog: string | null;
  url: string | null;
}

function compareVersions(current: string, latest: string): boolean {
  const extract = (v: string) => {
    const match = v.match(/(\d+\.\d+\.\d+)|(\d+\.\d+)/);
    return match ? match[0] : v.replace(/^v/, "");
  };

  const c = extract(current).split(".").map(Number);
  const l = extract(latest).split(".").map(Number);

  for (let i = 0; i < Math.max(c.length, l.length); i++) {
    const cv = c[i] || 0;
    const lv = l[i] || 0;
    if (lv > cv) return true;
    if (lv < cv) return false;
  }
  return false;
}

async function fetchLatestRelease(): Promise<ReleaseInfo | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`
    );
    if (!response.ok) return null;

    const data = await response.json();

    let rawVersion = data.tag_name;
    const hasVersionInTag = /(\d+\.\d+)/.test(rawVersion);

    if (!hasVersionInTag && data.name) {
      rawVersion = data.name;
    }

    return {
      version: rawVersion,
      changelog: data.body || "",
      url: data.html_url,
    };
  } catch {
    return null;
  }
}

export async function checkForUpdate(): Promise<ReleaseInfo | null> {
  const stored = await chrome.storage.local.get("updateCheck");
  const check = stored.updateCheck as StoredUpdateCheck | undefined;

  const now = Date.now();

  if (check && now - check.lastCheck < UPDATE_CHECK_INTERVAL_MS) {
    if (
      check.latestVersion &&
      compareVersions(APP_VERSION, check.latestVersion)
    ) {
      return {
        version: check.latestVersion,
        changelog: check.changelog || "",
        url: check.url || `https://github.com/${GITHUB_REPO}/releases`,
      };
    }
    return null;
  }

  const release = await fetchLatestRelease();

  const newCheck: StoredUpdateCheck = {
    lastCheck: now,
    latestVersion: release?.version || null,
    changelog: release?.changelog || null,
    url: release?.url || null,
  };
  await chrome.storage.local.set({ updateCheck: newCheck });

  if (release && compareVersions(APP_VERSION, release.version)) {
    return release;
  }

  return null;
}

export async function dismissUpdate(): Promise<void> {
  const stored = await chrome.storage.local.get("updateCheck");
  if (stored.updateCheck) {
    await chrome.storage.local.set({
      updateCheck: {
        ...stored.updateCheck,
        lastCheck: Date.now(),
      },
    });
  }
}
