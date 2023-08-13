// 1. Function to get general league stats like Total, Highest, Average, and Lowest scores

export const getLeagueStats = (managers: any) => {
  if (!managers || managers.length === 0) {
    return {
      totalScores: [],
      highestScore: 0,
      averageScore: 0,
      lowestScore: 0,
      totalSum: 0,
    };
  }
  const totalScores = managers.map((manager: any) => manager.total);
  const highestScore = Math.max(...totalScores);
  const averageScore = Math.round(
    totalScores.reduce((a: any, b: any) => a + b) / totalScores.length
  );
  const lowestScore = Math.min(...totalScores);
  const totalSum = totalScores.reduce((a: any, b: any) => a + b);

  return { totalScores, highestScore, averageScore, lowestScore, totalSum };
};

// 2. Get manager to watch (manager with the highest points in the last gameweek)

export const getManagerToWatch = (managers: any[]) => {
  if (!managers || managers.length === 0) {
    return null;
  }

  const managersSortedByEventTotal = [...managers].sort((a: any, b: any) => {
    return b.event_total - a.event_total;
  });

  const managerToWatch = managersSortedByEventTotal[0];

  if (managerToWatch.last_rank !== 0) {
    const totalManagers = managers.length;
    const changeInRank = managerToWatch.last_rank - managerToWatch.rank;
    const riseIndex = (changeInRank / totalManagers) * 100;

    managerToWatch.riseIndex = riseIndex;
  } else {
    managerToWatch.riseIndex = null;
  }

  return managerToWatch;
};

// export const getManagerToWatch = (managers: any) => {
//   if (!managers || managers.length === 0) {
//     return null;
//   }
//   const managersSortedByEventTotal = managers.sort((a: any, b: any) => {
//     return b.event_total - a.event_total;
//   });
//   // Add riseIndex to the manager to watch

//   const managerToWatch = managersSortedByEventTotal[0];
//   return managerToWatch;
// };

// 3. Get manager to avoid (manager with the lowest points in the last gameweek)

export const getManagerToAvoid = (managers: any) => {
  if (!managers || managers.length === 0) {
    return null;
  }
  const managersSortedByEventTotal = managers.sort((a: any, b: any) => {
    return a.event_total - b.event_total;
  });
  const managerToAvoid = managersSortedByEventTotal[0];
  return managerToAvoid;
};

// 6. Get manager with the highest total points

export const getManagerWithHighestTotalPoints = (managers: any) => {
  if (!managers || managers.length === 0) {
    return null;
  }
  const managersSortedByTotalPoints = managers.sort((a: any, b: any) => {
    return b.total - a.total;
  });
  const managerWithHighestTotalPoints = managersSortedByTotalPoints[0];
  return managerWithHighestTotalPoints;
};

// 7. Get manager with the lowest total points

export const getManagerWithLowestTotalPoints = (managers: any) => {
  if (!managers || managers.length === 0) {
    return null;
  }
  const managersSortedByTotalPoints = managers.sort((a: any, b: any) => {
    return a.total - b.total;
  });
  const managerWithLowestTotalPoints = managersSortedByTotalPoints[0];
  return managerWithLowestTotalPoints;
};

// 8. Get manager with the highest overall rank

export const getManagerWithHighestOverallRank = (managers: any) => {
  if (!managers || managers.length === 0) {
    return null;
  }
  const managersSortedByOverallRank = managers.sort((a: any, b: any) => {
    return a.rank - b.rank;
  });
  const managerWithHighestOverallRank = managersSortedByOverallRank[0];
  return managerWithHighestOverallRank;
};

// 9. Get manager with the lowest overall rank

export const getManagerWithLowestOverallRank = (managers: any) => {
  if (!managers || managers.length === 0) {
    return null;
  }
  const managersSortedByOverallRank = managers.sort((a: any, b: any) => {
    return b.rank - a.rank;
  });
  const managerWithLowestOverallRank = managersSortedByOverallRank[0];
  return managerWithLowestOverallRank;
};
