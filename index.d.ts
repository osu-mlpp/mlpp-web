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
}