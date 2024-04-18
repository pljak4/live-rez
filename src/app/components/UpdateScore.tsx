"use client";
import React, { useState, useEffect } from "react";
import useMatchStore from "./hooks/store";
import Link from "next/link";

const UpdateScoreForm: React.FC = () => {
  const { updateScore, matches } = useMatchStore();
  const [scores, setScores] = useState<{
    [key: number]: { home: number; away: number };
  }>({});

  const handleScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    matchId: number
  ) => {
    const { name, value } = e.target;
    const score = value.trim() !== "" ? parseInt(value) : 0;

    const updatedScores = {
      ...scores,
      [matchId]: { ...scores[matchId], [name]: score },
    };
    setScores(updatedScores);

    updateScore(
      matchId,
      updatedScores[matchId].home || matches[matchId].homeScore,
      updatedScores[matchId].away || matches[matchId].awayScore
    );
  };

  return (
    <form className="max-w-lg mx-auto mt-8 space-y-4">
      {matches
        .filter((match) => match.status === "live")
        .map((match) => (
          <div key={match.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xl font-semibold">
                {match.homeTeam} vs {match.awayTeam}
              </p>
              <p
                className={`text-lg font-semibold ${
                  match.minute === 45 ? "text-blue-500" : ""
                }`}
              >
                {match.minute === 45 ? "Half time!" : ""}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Home Score
                </label>
                <input
                  min="0"
                  disabled={match.minute === 45}
                  type="number"
                  value={scores[match.id]?.home || match.homeScore}
                  name="home"
                  onChange={(e) => handleScoreChange(e, match.id)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Away Score
                </label>
                <input
                  min="0"
                  disabled={match.minute === 45}
                  type="number"
                  value={scores[match.id]?.away || match.awayScore}
                  name="away"
                  onChange={(e) => handleScoreChange(e, match.id)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        ))}
      {matches.filter((match) => match.status === "live").length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-xl mb-4">No live matches at the moment.</p>
          <Link
            href="/create-match"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Match
          </Link>
        </div>
      )}
    </form>
  );
};

export default UpdateScoreForm;
