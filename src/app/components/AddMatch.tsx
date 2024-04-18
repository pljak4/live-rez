import React, { useState } from "react";
import useMatchStore from "./hooks/store";

const AddMatch: React.FC = () => {
  const { startMatch, matches } = useMatchStore();

  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");

  const handleAddMatch = () => {
    if (!homeTeam || !awayTeam) {
      alert("Please enter both home team and away team");
      return;
    }

    if (homeTeam == awayTeam) {
      alert("You entered same team twice");
      return;
    }

    const existingLiveMatch = matches.find(
      (match) =>
        match.status === "live" &&
        (match.homeTeam === homeTeam || match.awayTeam === awayTeam)
    );

    if (existingLiveMatch) {
      alert("A live match with one of these teams already exists");
      return;
    }

    startMatch(homeTeam, awayTeam);

    setHomeTeam("");
    setAwayTeam("");

    alert("MATCH CREATED !!!!!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Match</h2>
      <div className="flex flex-col mb-4">
        <label htmlFor="homeTeam" className="mb-1 text-gray-700">
          Home Team:
        </label>
        <input
          type="text"
          id="homeTeam"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="awayTeam" className="mb-1 text-gray-700">
          Away Team:
        </label>
        <input
          type="text"
          id="awayTeam"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleAddMatch}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
      >
        Add Match
      </button>
    </div>
  );
};

export default AddMatch;
