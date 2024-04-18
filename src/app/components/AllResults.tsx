"use client";
import React from "react";
import useMatchState from "./hooks/store";
import MatchCard from "./MatchCard";
import { Match } from "./utils";
import Link from "next/link";

const AllResults: React.FC = () => {
  const { matches } = useMatchState();

  const sortedMatches = matches.slice().sort((a: Match, b: Match) => {
    const totalScoreA = a.homeScore + a.awayScore;
    const totalScoreB = b.homeScore + b.awayScore;

    if (totalScoreA !== totalScoreB) {
      return totalScoreB - totalScoreA;
    } else {
      return (
        new Date(b.startDateTime).getTime() -
        new Date(a.startDateTime).getTime()
      );
    }
  });

  return (
    <div className="bg-gray-100 p-6 rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">All Matches</h2>
      {sortedMatches.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {sortedMatches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-xl mb-4">No matches at the moment.</p>
          <Link
            href="/create-match"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Match
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllResults;
