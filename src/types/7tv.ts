export interface STVEmoteFile {
  name: "1x" | "2x" | "3x" | "4x";
  static_name: "1x" | "2x" | "3x" | "4x";
  width: number;
  height: number;
  size: number;
  format: "AVIF" | "WEBP";
}

export interface STVEmote {
  id: string;
  name: string;
  animated: boolean;
  owner?: {
    display_name: string;
  };
  host: {
    url: string;
    files?: STVEmoteFile[];
  };
}

export interface STVResponseGQL {
  data: {
    emotes: {
      count: number;
      items: STVEmote[];
    };
  };
  errors?: {
    message: string;
  }[];
}
