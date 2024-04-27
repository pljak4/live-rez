import useMatchStore from "./store";

describe("useMatchStore", () => {
  describe("Given that user is on the app (logged in :D)", () => {
    const { startMatch, matches } = useMatchStore.getState();

    it("When user starts the match", () => {
      startMatch("Home Team", "Away Team");
    });

    it("Then the match should be started and live", () => {
      const newMatch = matches[0];
      expect(newMatch).toBeDefined();
      expect(newMatch.homeTeam).toBe("Home Team");
      expect(newMatch.awayTeam).toBe("Away Team");
      expect(newMatch.status).toBe("live");
    });
  });

  describe("Given that user started the match", () => {
    const { startMatch, updateScore, matches } = useMatchStore.getState();
    startMatch("Home Team", "Away Team");
    const matchId = matches[0].id;

    it("When user updates the match", () => {
      updateScore(matchId, 1, 0);
    });

    it("Then the match should be updated and still live", () => {
      const updatedMatch = matches.find((match) => match.id === matchId);

      expect(updatedMatch?.homeScore).toBe(1);
      expect(updatedMatch?.awayScore).toBe(0);
      expect(updatedMatch?.status).toBe("live");
    });
  });
});
