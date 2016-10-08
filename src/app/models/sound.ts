import { Observable } from "rxjs";
export interface SoundCloudObj {
  id: number
  title: string
  displayName: string
  duration: number
  created_at: string
  isCompilation: boolean
  stream_url: string
  waveform_url: string
}

export interface SoundManagerObj {
  play():  SoundManagerObj
  pause(): SoundManagerObj
  unload(): SoundManagerObj
  position: number
  buffering$: Observable<boolean>
  position$: Observable<number>
  lastPosition?: number
}

export interface Sound {
  sc: SoundCloudObj,
  sm?: SoundManagerObj
}
