import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LmsProvider, useLms } from "../LmsContext";

function TestHarness() {
  const { grades, comments, submitQuizScore, addFeedbackComment } = useLms();
  const hrg = grades.find((g) => g.slug === "hardware-requirements-guide");

  return (
    <div>
      <span data-testid="hrg-score">{hrg?.score}</span>
      <span data-testid="comment-count">{comments.length}</span>
      <button
        type="button"
        onClick={() => submitQuizScore("hardware-requirements-guide", 3, 3)}
      >
        Score Quiz
      </button>
      <button
        type="button"
        onClick={() => addFeedbackComment("UI", "Clean Classroom layout")}
      >
        Add Comment
      </button>
    </div>
  );
}

describe("LmsContext", () => {
  it("updates grade summary when a quiz is submitted and adds feedback comments", () => {
    render(
      <LmsProvider>
        <TestHarness />
      </LmsProvider>
    );

    expect(screen.getByTestId("hrg-score").textContent).toBe("/");
    fireEvent.click(screen.getByText("Score Quiz"));
    expect(screen.getByTestId("hrg-score").textContent).toBe("3/3");

    const beforeCount = Number(screen.getByTestId("comment-count").textContent);
    fireEvent.click(screen.getByText("Add Comment"));
    expect(Number(screen.getByTestId("comment-count").textContent)).toBe(
      beforeCount + 1
    );
  });
});
