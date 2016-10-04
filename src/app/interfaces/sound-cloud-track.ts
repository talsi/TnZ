export interface ISoundCloudTrack {
  id: number;
  _id: string;
  title: string;
  displayName: string;
  duration: number;
  created_at: string;
  isCompilation: boolean;
  stream_url: string;
  isPlaying: boolean;
}
