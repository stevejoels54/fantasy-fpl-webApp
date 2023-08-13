// 1. Function to separate managers, sort them by rank, and return the sorted array

export const sortManagersByRank = (managers: any) => {
  const sortedManagers = managers.sort((a: any, b: any) => {
    return a.rank - b.rank;
  });
  return sortedManagers;
};

// 2. Function to separate managers, sort them by last_rank, and return the sorted array

export const sortManagersByLastRank = (managers: any) => {
  const sortedManagers = managers.sort((a: any, b: any) => {
    return a.last_rank - b.last_rank;
  });
  return sortedManagers;
};

// 3. Function to crreate leagues senior and junior by rank

export function createLeaguesByRank(sortedManagers: any) {
  const midpoint = Math.floor(sortedManagers.length / 2);
  const seniorLeague = sortedManagers.slice(0, midpoint);
  const juniorLeague = sortedManagers.slice(midpoint);
  return { seniorLeague, juniorLeague };
}

// 4. Function to create leagues senior and junior by last_rank

export function createLeaguesByLastRank(sortedManagers: any) {
  const midpoint = Math.floor(sortedManagers.length / 2);
  const seniorLeague = sortedManagers.slice(0, midpoint);
  const juniorLeague = sortedManagers.slice(midpoint);
  return { seniorLeague, juniorLeague };
}

// 5. Identify promotions

export function identifyPromotions(
  seniorLeague: any,
  juniorLeagueByLastRank: any
) {
  const promotedManagers = [];

  for (const seniorManager of seniorLeague) {
    if (
      juniorLeagueByLastRank.some(
        (juniorManager: any) => juniorManager.rank === seniorManager.rank
      )
    ) {
      promotedManagers.push(seniorManager);
    }
  }
  return promotedManagers;
}

// 6. Identify relegations

export function identifyRelegations(
  juniorLeague: any,
  seniorLeagueByLastRank: any
) {
  const relegatedManagers = [];

  for (const juniorManager of juniorLeague) {
    if (
      seniorLeagueByLastRank.some(
        (seniorManager: any) => seniorManager.rank === juniorManager.rank
      )
    ) {
      relegatedManagers.push(juniorManager);
    }
  }
  return relegatedManagers;
}
