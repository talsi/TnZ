export interface ISoundCloudTrack {
  id: number;
  title: string;
  displayName: string;
  duration: number;
  created_at: string;
  isCompilation: boolean;
  stream_url: string;
  lastPosition?: number
}
