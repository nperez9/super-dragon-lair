const lsKey = 'maxScores';

interface MaxScore {
  points: number;
}

const maxScoreDefault: MaxScore = {
  points: 0,
};

export const getMaxScore = (): number => {
  const maxScores = localStorage.getItem(lsKey);
  if (maxScores) {
    const parsedScores = parseInt(maxScores);
    if (!isNaN(parsedScores)) {
      return parsedScores;
    } else {
      return 0;
    }
  }
  return 0;
};

/**
 * Save max score, returns true in new record
 * @param points
 * @returns
 */
export const saveMaxScore = (points: number): boolean => {
  const maxScores = getMaxScore();

  if (maxScores < points) {
    localStorage.setItem(lsKey, points.toString());
    return true;
  }

  return false;
};
