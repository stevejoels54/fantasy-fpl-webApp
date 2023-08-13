const appActions = {
  SET_USER_DATA: "SET_USER_DATA",
  SET_USERS_DATA: "SET_USERS_DATA",

  SET_ACTIVE_COMPONENT: "SET_ACTIVE_COMPONENT",

  GET_GENERAL_DATA_REQUEST: "GET_GENERAL_DATA_REQUEST",
  GET_GENERAL_DATA_SUCCESS: "GET_GENERAL_DATA_SUCCESS",
  GET_GENERAL_DATA_ERROR: "GET_GENERAL_DATA_ERROR",

  GET_LEAGUE_DATA_REQUEST: "GET_LEAGUE_DATA_REQUEST",
  GET_LEAGUE_DATA_SUCCESS: "GET_LEAGUE_DATA_SUCCESS",
  GET_LEAGUE_DATA_ERROR: "GET_LEAGUE_DATA_ERROR",

  GET_TEAM_DATA_REQUEST: "GET_TEAM_DATA_REQUEST",
  GET_TEAM_DATA_SUCCESS: "GET_TEAM_DATA_SUCCESS",
  GET_TEAM_DATA_ERROR: "GET_TEAM_DATA_ERROR",

  GET_PLAYER_DATA_REQUEST: "GET_PLAYER_DATA_REQUEST",
  GET_PLAYER_DATA_SUCCESS: "GET_PLAYER_DATA_SUCCESS",
  GET_PLAYER_DATA_ERROR: "GET_PLAYER_DATA_ERROR",

  GET_FIXTURE_DATA_REQUEST: "GET_FIXTURE_DATA_REQUEST",
  GET_FIXTURE_DATA_SUCCESS: "GET_FIXTURE_DATA_SUCCESS",
  GET_FIXTURE_DATA_ERROR: "GET_FIXTURE_DATA_ERROR",

  GET_GAMEWEEK_DATA_REQUEST: "GET_GAMEWEEK_DATA_REQUEST",
  GET_GAMEWEEK_DATA_SUCCESS: "GET_GAMEWEEK_DATA_SUCCESS",
  GET_GAMEWEEK_DATA_ERROR: "GET_GAMEWEEK_DATA_ERROR",

  GET_MANAGER_HISTORY_DATA_REQUEST: "GET_MANAGER_HISTORY_DATA_REQUEST",
  GET_MANAGER_HISTORY_DATA_SUCCESS: "GET_MANAGER_HISTORY_DATA_SUCCESS",
  GET_MANAGER_HISTORY_DATA_ERROR: "GET_MANAGER_HISTORY_DATA_ERROR",

  GET_MANAGER_DATA_REQUEST: "GET_MANAGER_DATA_REQUEST",
  GET_MANAGER_DATA_SUCCESS: "GET_MANAGER_DATA_SUCCESS",
  GET_MANAGER_DATA_ERROR: "GET_MANAGER_DATA_ERROR",

  GET_EVENT_DATA_REQUEST: "GET_EVENT_DATA_REQUEST",
  GET_EVENT_DATA_SUCCESS: "GET_EVENT_DATA_SUCCESS",
  GET_EVENT_DATA_ERROR: "GET_EVENT_DATA_ERROR",

  TOGGLE_RESET_PASSWORD_MODAL: "TOGGLE_RESET_PASSWORD_MODAL",
  TOGGLE_LOGOUT_MODAL: "TOGGLE_LOGOUT_MODAL",
  TOGGLE_UPLOAD_PROFILE_PICTURE_MODAL: "TOGGLE_UPLOAD_PROFILE_PICTURE_MODAL",
  TOGGLE_UPLOAD_PROFILE_PICTURE_SET: "TOGGLE_UPLOAD_PROFILE_PICTURE_SET",
  TOGGLE_USERNAME_MODAL: "TOGGLE_USERNAME_MODAL",
  TOGGLE_USERNAME_SET: "TOGGLE_USERNAME_SET",
  TOGGLE_IS_TEAM_VERIFIED: "TOGGLE_IS_VERIFIED",
  TOGGLE_UPLOAD_TEAM_PICTURE_MODAL: "TOGGLE_UPLOAD_TEAM_PICTURE_MODAL",

  SET_IS_PASSWORD_RESET: "SET_IS_PASSWORD_RESET",
  SET_TEAM_DATA: "SET_TEAM_DATA",

  setUserData: (userData: any) => ({
    type: appActions.SET_USER_DATA,
    userData,
  }),

  getGeneralData: () => ({
    type: appActions.GET_GENERAL_DATA_REQUEST,
  }),

  getLeagueData: (leagueId: string) => ({
    type: appActions.GET_LEAGUE_DATA_REQUEST,
    leagueId,
  }),

  getTeamData: (managerId: string, eventId: string) => ({
    type: appActions.GET_TEAM_DATA_REQUEST,
    managerId,
    eventId,
  }),

  getPlayerData: (playerId: string) => ({
    type: appActions.GET_PLAYER_DATA_REQUEST,
    playerId,
  }),

  getFixtureData: () => ({
    type: appActions.GET_FIXTURE_DATA_REQUEST,
  }),

  getGameweekData: (gameweekId: string) => ({
    type: appActions.GET_GAMEWEEK_DATA_REQUEST,
    gameweekId,
  }),

  getManagerHistoryData: (managerId: string) => ({
    type: appActions.GET_MANAGER_HISTORY_DATA_REQUEST,
    managerId,
  }),

  getManagerData: (managerId: string) => ({
    type: appActions.GET_MANAGER_DATA_REQUEST,
    managerId,
  }),

  getEventData: () => ({
    type: appActions.GET_EVENT_DATA_REQUEST,
  }),

  setActiveComponent: (component: string) => ({
    type: appActions.SET_ACTIVE_COMPONENT,
    component,
  }),

  setIsPasswordReset: (passwordReset: boolean) => ({
    type: appActions.SET_IS_PASSWORD_RESET,
    passwordReset,
  }),

  toggleResetPasswordModal: () => ({
    type: appActions.TOGGLE_RESET_PASSWORD_MODAL,
  }),

  toggleLogoutModal: () => ({
    type: appActions.TOGGLE_LOGOUT_MODAL,
  }),

  toggleUploadProfilePictureModal: () => ({
    type: appActions.TOGGLE_UPLOAD_PROFILE_PICTURE_MODAL,
  }),

  toggleUploadProfilePictureSet: () => ({
    type: appActions.TOGGLE_UPLOAD_PROFILE_PICTURE_SET,
  }),

  toggleUsernameModal: () => ({
    type: appActions.TOGGLE_USERNAME_MODAL,
  }),

  toggleUsernameSet: () => ({
    type: appActions.TOGGLE_USERNAME_SET,
  }),

  toggleIsTeamVerified: (verified: boolean) => ({
    type: appActions.TOGGLE_IS_TEAM_VERIFIED,
    verified,
  }),

  toggleUploadTeamPictureModal: () => ({
    type: appActions.TOGGLE_UPLOAD_TEAM_PICTURE_MODAL,
  }),

  setTeamData: (teamData: any) => ({
    type: appActions.SET_TEAM_DATA,
    teamData,
  }),

  setUsersData: (usersData: any) => ({
    type: appActions.SET_USERS_DATA,
    usersData,
  }),
};

export default appActions;
