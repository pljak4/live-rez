import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import AddMatch from "./AddMatch";

describe("AddMatch", () => {
  describe("Given that user is on the app", () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(<AddMatch />);
      jest.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("When user starts the match by adding both home team and away team", () => {
      beforeEach(() => {
        const homeTeamInput = renderResult.getByLabelText("Home Team:");
        const awayTeamInput = renderResult.getByLabelText("Away Team:");

        fireEvent.change(homeTeamInput, { target: { value: "Home Team" } });
        fireEvent.change(awayTeamInput, { target: { value: "Away Team" } });
        fireEvent.click(
          renderResult.getByRole("button", { name: "Add Match" })
        );
      });

      it("Then the match should be created successfully", () => {
        expect(window.alert).toHaveBeenCalledWith("MATCH CREATED !!!!!");
      });
    });

    describe("When user starts the match without providing both home team and away team", () => {
      beforeEach(() => {
        fireEvent.click(
          renderResult.getByRole("button", { name: "Add Match" })
        );
      });

      it("Then user should be alerted to enter both teams", () => {
        expect(window.alert).toHaveBeenCalledWith(
          "Please enter both home team and away team"
        );
      });
    });

    describe("When user starts the match with the same team for home and away", () => {
      beforeEach(() => {
        const homeTeamInput = renderResult.getByLabelText("Home Team:");
        const awayTeamInput = renderResult.getByLabelText("Away Team:");

        fireEvent.change(homeTeamInput, { target: { value: "Same Team" } });
        fireEvent.change(awayTeamInput, { target: { value: "Same Team" } });
        fireEvent.click(
          renderResult.getByRole("button", { name: "Add Match" })
        );
      });

      it("Then user should be alerted that same team is entered twice", () => {
        expect(window.alert).toHaveBeenCalledWith(
          "You entered same team twice"
        );
      });
    });

    describe("When user starts the match with teams that already have a live match", () => {
      beforeEach(() => {
        const homeTeamInput = renderResult.getByLabelText("Home Team:");
        const awayTeamInput = renderResult.getByLabelText("Away Team:");

        fireEvent.change(homeTeamInput, { target: { value: "Home Team" } });
        fireEvent.change(awayTeamInput, { target: { value: "Away Team" } });
        fireEvent.click(
          renderResult.getByRole("button", { name: "Add Match" })
        );

        fireEvent.change(homeTeamInput, { target: { value: "Home Team" } });
        fireEvent.change(awayTeamInput, { target: { value: "Away2 Team" } });
        fireEvent.click(
          renderResult.getByRole("button", { name: "Add Match" })
        );
      });

      it("Then user should be alerted that a live match with one of these teams already exists", () => {
        expect(window.alert).toHaveBeenCalledWith(
          "A live match with one of these teams already exists"
        );
      });
    });
  });
});
