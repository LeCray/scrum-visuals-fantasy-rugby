import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoxScore from "@/components/BoxScore";
import { boxScores } from "@/lib/boxScoreData";

const BoxScorePage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();

  // Get the box score data for this match
  const boxScore = matchId ? boxScores.get(matchId) : null;

  // If no box score is found, redirect to fixtures
  React.useEffect(() => {
    if (!boxScore) {
      navigate("/fixtures");
    }
  }, [boxScore, navigate]);

  if (!boxScore) {
    return null;
  }

  return <BoxScore {...boxScore} />;
};

export default BoxScorePage; 