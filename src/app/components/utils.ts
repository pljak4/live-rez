export interface Match {
  id: number;
  startDateTime: Date;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: "live" | "finished";
}

export interface MatchStore {
  matches: Match[];
  startMatch: (
    homeTeam: string,
    awayTeam: string,
    startDateTime?: Date,
    homeScore?: number,
    awayScore?: number,
    status?: "live"
  ) => void;
  updateScore: (matchId: number, homeScore: number, awayScore: number) => void;
}
