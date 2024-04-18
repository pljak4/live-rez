import { create } from "zustand";
import { MatchStore, Match } from "../utils";

const useMatchStore = create<MatchStore>((set) => {
  let nextMatchId = 0;
  const matches: Match[] = [];
  const timers: NodeJS.Timeout[] = [];
  const pauseAt45: boolean[] = [];

  const startMatch = (homeTeam: string, awayTeam: string) => {
    const startDate = new Date();
    const newMatch: Match = {
      id: nextMatchId++,
      startDateTime: startDate,
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      minute: 0,
      status: "live",
    };

    matches.push(newMatch);
    pauseAt45.push(false);

    const timer = setInterval(() => {
      const matchIndex = matches.findIndex((match) => match.id === newMatch.id);
      if (matchIndex !== -1) {
        const match = matches[matchIndex];
        const newMinute = match.minute + 1;

        if (newMinute === 46 && !pauseAt45[matchIndex]) {
          clearInterval(timers[matchIndex]);
          pauseAt45[matchIndex] = true;

          setTimeout(() => {
            timers[matchIndex] = setInterval(() => {
              const resumedMatch = matches[matchIndex];
              const resumedMinute = resumedMatch.minute + 1;

              if (resumedMinute >= 90) {
                resumedMatch.status = "finished";
                clearInterval(timers[matchIndex]);
              }

              resumedMatch.minute = resumedMinute;
              set((state) => {
                const updatedMatches = [...state.matches];
                updatedMatches[matchIndex] = resumedMatch;
                return { matches: updatedMatches };
              });
            }, 1000);

            pauseAt45[matchIndex] = false;
          }, 15000);
        } else if (newMinute >= 90) {
          match.status = "finished";
          clearInterval(timers[matchIndex]);
          setMatches([...matches]);
        } else {
          match.minute = newMinute;
          set((state) => {
            const updatedMatches = [...state.matches];
            updatedMatches[matchIndex] = match;
            return { matches: updatedMatches };
          });
        }
      }
    }, 1000);

    timers.push(timer);
  };

  const updateScore = (
    matchId: number,
    homeScore: number,
    awayScore: number
  ) => {
    const matchIndex = matches.findIndex((match) => match.id === matchId);
    if (matchIndex !== -1) {
      const match = matches[matchIndex];
      if (match.status === "live" && match.minute !== 45) {
        matches[matchIndex] = {
          ...match,
          homeScore: homeScore,
          awayScore: awayScore,
        };
        setMatches([...matches]);
      }
    }
  };

  const setMatches = (updatedMatches: Match[]) =>
    set({ matches: updatedMatches });

  return {
    matches,
    startMatch,
    updateScore,
  };
});

export default useMatchStore;
