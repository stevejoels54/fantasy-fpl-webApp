const appIntialState = {
  user: {},
  usersData: [],

  appUiState: {
    isSidebarOpen: false,
    isModalOpen: false,
    isDrawerOpen: false,
    isSnackbarOpen: false,
    snackbarMessage: "",
    resetPasswordModal: false,
    updateUserProfileModal: false,
    logOutUserModal: false,
    uploadProfilePictureModal: false,
    userNameModal: false,
    uploadTeamPictureModal: false,

    activeComponent: "Home",
  },

  fireBaseActions: {
    isLoggingIn: false,
    isLoggingOut: false,
    isSigningUp: false,
    isResettingPassword: false,
    isVerifyingEmail: false,
    isSendingVerificationEmail: false,
    isUpdatingPassword: false,
    isUpdatingEmail: false,
    isUpdatingProfile: false,
    isDeletingUser: false,
    isPasswordReset: false,
    isProfilePictureSet: false,
    isUserNameSet: false,
    isTeamVerified: false,
    teamData: {},
  },

  leagueDataLoading: false,
  leagueDataSuccess: {},
  leagueDataError: {},

  teamDataLoading: false,
  teamDataSuccess: {},
  teamDataError: {},

  gameWeekDataLoading: false,
  gameWeekLiveData: {},
  gameWeekDataSuccess: {},
  gameWeekDataError: {},

  managerHistoryDataLoading: false,
  managerHistoryDataSuccess: {},
  managerHistoryDataError: {},

  managerDataLoading: false,
  managerDataSuccess: {},
  managerDataError: {},

  fixturesDataLoading: false,
  fixturesDataSuccess: {},
  fixturesDataError: {},

  playersDataLoading: false,
  playersDataSuccess: {},
  playersDataError: {},

  generalDataLoading: false,
  generalDataSuccess: {},
  generalDataError: {},

  eventDataLoading: false,
  eventDataSuccess: {},
  eventDataError: {},
};

export default appIntialState;
