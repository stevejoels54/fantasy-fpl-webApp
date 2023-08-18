interface ChipPlay {
  chip_name: string;
  num_played: number;
}

interface TopElementInfo {
  id: number;
  points: number;
}

interface Gameweek {
  id: number;
  name: string;
  deadline_time: string;
  average_entry_score: number;
  finished: boolean;
  data_checked: boolean;
  highest_scoring_entry: number;
  deadline_time_epoch: number;
  deadline_time_game_offset: number;
  highest_score: number;
  is_previous: boolean;
  is_current: boolean;
  is_next: boolean;
  cup_leagues_created: boolean;
  h2h_ko_matches_created: boolean;
  chip_plays: ChipPlay[];
  most_selected: number;
  most_transferred_in: number;
  top_element: number;
  top_element_info: TopElementInfo;
  transfers_made: number;
  most_captained: number;
  most_vice_captained: number;
}

interface EventsData {
  events: Gameweek[];
}

function getCurrentGameweek(
  eventsData: EventsData | null | undefined
): Gameweek | null {
  if (!eventsData?.events || eventsData.events.length === 0) {
    return null;
  }

  const currentGameweek = eventsData.events.find(
    (gameweek) => gameweek.is_current
  );

  return currentGameweek || null;
}

// Example usage
const eventsData: EventsData = {
  events: [
    // ... your events data here ...
  ],
};

const currentGameweek = getCurrentGameweek(eventsData);

if (currentGameweek) {
  console.log("Current Gameweek:", currentGameweek.name);
  console.log("Deadline Time:", currentGameweek.deadline_time);
  // Access other properties of the current gameweek as needed
} else {
  console.log("No current gameweek found.");
}

export default getCurrentGameweek;
