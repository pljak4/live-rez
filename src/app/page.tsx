import React from "react";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-500">
        Welcome to LIVE REZZ
      </h1>
      <p className="text-lg mb-4 mt-16 text-gray-700">
        Thank you for using the Live REZZ application developed by Tarik . We
        advise you to use small or extra small window screen size (recommended
        600x900). This application provides real-time updates and scoring for
        sports matches.
      </p>
      <p className="text-lg mb-4 text-gray-700">To get started:</p>
      <ol className="list-decimal list-inside mb-4 text-gray-700">
        <li className="mb-2">
          Create new matches using the "Create Match" feature
        </li>
        <li className="mb-2">
          Explore the "Live" section to see ongoing matches
        </li>
        <li className="mb-2">
          Explore the "Results" section to see all of your matches sorted
        </li>
        <li className="mb-2">
          Use the "Update Score" form to update scores for live matches
        </li>
      </ol>
      <p className="text-lg text-indigo-500">
        Enjoy using Live REZZ for all your sports updates!
      </p>
    </main>
  );
}
