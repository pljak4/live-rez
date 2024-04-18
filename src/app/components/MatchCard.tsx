import React from "react";
import { Match } from "./utils";

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center border-b pb-4">
      <div className="flex items-center gap-4 flex-1 justify-end">
        <div
          className={`w-6 h-6 rounded-full ${
            match.status === "live" ? "bg-green-500" : "bg-gray-400"
          }`}
        />
        <div>
          <p className="text-xl font-semibold">{match.homeTeam}</p>
          <p className="text-sm text-gray-600">{match.status}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-1 justify-center">
        <p className="text-2xl font-semibold">{match.homeScore}</p>
        <p className="font-bold text-sm text-green-600 min-w-10 text-center">
          {match.minute === 45
            ? "HT"
            : match.minute === 90
            ? "FT"
            : `${match.minute}'`}
        </p>
        <p className="text-2xl font-semibold">{match.awayScore}</p>
      </div>
      <div className="flex items-center gap-4 flex-1 justify-start">
        <div>
          <p className="text-xl font-semibold">{match.awayTeam}</p>
          <p className="text-sm text-gray-600">{match.status}</p>
        </div>
        <div
          className={`w-6 h-6 rounded-full ${
            match.status === "live" ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </div>
    </div>
  );
};

export default MatchCard;
