const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

const normalizeUrl = (value: string) =>
  /^https?:\/\//i.test(value) ? value : `https://${value}`;

export const getYoutubeVideoId = (
  value?: string | null,
): string | null => {
  if (!value) return null;

  try {
    const url = new URL(normalizeUrl(value.trim()));
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    let candidate: string | null = null;

    if (hostname === "youtu.be") {
      candidate = url.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (
      hostname === "youtube.com" ||
      hostname.endsWith(".youtube.com")
    ) {
      const pathParts = url.pathname.split("/").filter(Boolean);
      if (url.pathname === "/watch") {
        candidate = url.searchParams.get("v");
      } else if (["embed", "shorts", "live"].includes(pathParts[0])) {
        candidate = pathParts[1] ?? null;
      }
    }

    return candidate && YOUTUBE_ID_PATTERN.test(candidate) ? candidate : null;
  } catch {
    return null;
  }
};

export const getYoutubeEmbedUrl = (value?: string | null) => {
  const videoId = getYoutubeVideoId(value);
  return videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : null;
};
