import { V1 } from 'osu-api-extended'

export interface ProcessEnv {
  [key: string]: string | undefined
}

type ChildrenProps = {
  children?: JSX.Element[]
}

type Rank =
  'XH' |
  'SH' |
  'X' |
  'S' |
  'A' |
  'B' |
  'C' |
  'D'

type Score = {
  score_id: number;
  beatmap_id: number;
  user_id: number;
  score: number;
  maxcombo: number;
  rank: Rank;
  count50: number;
  count100: number;
  count300: number;
  countmiss: number;
  countgeki: number;
  countkatu: number;
  perfect: 0 | 1;
  enabled_mods: number;
  date: Date;
  pp: number;
  replay: number;
  hidden: number;
  country_acronym: string;
  rank_score: number;
}

type ScoresResponse = {
  scores: Score[];
  beatmap: V1BeatmapObject|null;
}

interface V1BeatmapObject {
  id: {
    set: number;
    diff: number;
  };
  date: {
    submit: string;
    update: string;
    approved: string;
  };
  metadata: {
    artist: {
      original: string;
      unicode: string;
    };
    title: {
      original: string;
      unicode: string;
    };
    creator: IdNamed;
    favs: number;
    rating: number;
    source: string;
    genre_id: IdNamed;
    language_id: IdNamed;
    tags: string;
  };
  status: IdNamed;
  diff: DiffObject[];
  misc: {
    download_unavailable: boolean;
    audio_unavailable: boolean;
    storyboard: boolean;
    video: boolean;
    packs: string;
    bg: {
      full: string;
      raw: string;
      slim: {
        1: string;
        2: string;
      };
      cover: {
        1: string;
        2: string;
      };
      card: {
        1: string;
        2: string;
      };
      list: {
        1: string;
        2: string;
      };
    };
  };
}

interface DiffObject {
  id: number;
  diff: string;
  mode: IdNamed;
  file_md5: string;
  stats: {
    star: {
      pure: number;
      aim: number;
      speed: number;
    };
    ar: number;
    od: number;
    cs: number;
    hp: number;
    bpm: {
      avg: number;
    };
    combo: number;
    time: {
      full: number;
      drain: number;
    };
    objects: {
      all: number;
      circles: number;
      sliders: number;
      spinners: number;
    };
  };
  plays: number;
  pass: number;
}