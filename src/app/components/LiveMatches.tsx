"use client";
import React from "react";
import useMatchState from "./hooks/store";
import MatchCard from "./MatchCard";
import Link from "next/link";

const LiveMatches: React.FC = () => {
  const { matches } = useMatchState();
  const liveMatches = matches.filter((match) => match.status === "live");

  return (
    <div className="bg-gray-100 p-6 rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Live Matches</h2>
      {liveMatches.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {liveMatches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </div>
      ) : (
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
    </div>
  );
};

export default LiveMatches;
