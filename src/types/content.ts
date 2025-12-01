/**
 * Content item interface for portfolio media
 */
export interface ContentItem {
  /** Unique identifier for the content item */
  id: string | number;
  /** Title or caption for the media */
  title: string;
  /** Relative URL path to the image (from /public folder) */
  imageUrl: string;
  /** Optional description or additional context */
  description?: string;
  /** Date string for the content (ISO format or display format) */
  date: string;
  /** Order number for sorting items */
  order: number;
}

/**
 * Props for the VideoPlayer component
 */
export interface VideoPlayerProps {
  /** URL path to the video file */
  videoUrl: string;
  /** Title of the video */
  title?: string;
  /** Optional description of the video */
  description?: string;
}
