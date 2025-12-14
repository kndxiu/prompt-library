export interface Prompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  lastUsedAt?: number;
  isFavorite?: boolean;
}

export type SiteFeatures = {
  buttonType: "floating" | "inline";
};

export type SupportedSite = {
  name: string;
  match: (url: URL) => boolean;
  features: SiteFeatures;
};
