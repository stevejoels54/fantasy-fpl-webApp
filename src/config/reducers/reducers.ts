import appActions from "../actions/actions";
import appIntialState from "../initialState/initialState";

const appReducer = (state = appIntialState, action: any) => {
  switch (action.type) {
    case appActions.SET_USER_DATA:
      return {
        ...state,
        user: action.userData,
      };
    case appActions.GET_GENERAL_DATA_REQUEST:
      return {
        ...state,
        generalDataLoading: true,
        generalDataError: {},
      };
    case appActions.GET_GENERAL_DATA_SUCCESS:
      return {
        ...state,
        generalDataLoading: false,
        generalDataSuccess: action.payload,
      };
    case appActions.GET_GENERAL_DATA_ERROR:
      return {
        ...state,
        generalDataLoading: false,
        generalDataError: action.payload,
      };
    case appActions.GET_LEAGUE_DATA_REQUEST:
      return {
        ...state,
        leagueDataLoading: true,
        leagueDataError: {},
      };
    case appActions.GET_LEAGUE_DATA_SUCCESS:
      return {
        ...state,
        leagueDataLoading: false,
        leagueDataSuccess: action.payload,
      };
    case appActions.GET_LEAGUE_DATA_ERROR:
      return {
        ...state,
        leagueDataLoading: false,
        leagueDataError: action.payload,
      };
    case appActions.GET_TEAM_DATA_REQUEST:
      return {
        ...state,
        teamDataLoading: true,
        teamDataError: {},
      };
    case appActions.GET_TEAM_DATA_SUCCESS:
      return {
        ...state,
        teamDataLoading: false,
        teamDataSuccess: action.payload,
      };
    case appActions.GET_TEAM_DATA_ERROR:
      return {
        ...state,
        teamDataLoading: false,
        teamDataError: action.payload,
      };
    case appActions.GET_PLAYER_DATA_REQUEST:
      return {
        ...state,
        playersDataLoading: true,
        playersDataError: {},
      };
    case appActions.GET_PLAYER_DATA_SUCCESS:
      return {
        ...state,
        playersDataLoading: false,
        playersDataSuccess: action.payload,
      };
    case appActions.GET_PLAYER_DATA_ERROR:
      return {
        ...state,
        playersDataLoading: false,
        playersDataError: action.payload,
      };
    case appActions.GET_FIXTURE_DATA_REQUEST:
      return {
        ...state,
        fixturesDataLoading: true,
        fixturesDataError: {},
      };
    case appActions.GET_FIXTURE_DATA_SUCCESS:
      return {
        ...state,
        fixturesDataLoading: false,
        fixturesDataSuccess: action.payload,
      };
    case appActions.GET_FIXTURE_DATA_ERROR:
      return {
        ...state,
        fixturesDataLoading: false,
        fixturesDataError: action.payload,
      };
    case appActions.GET_GAMEWEEK_DATA_REQUEST:
      return {
        ...state,
        gameWeekDataLoading: true,
        gameWeekDataError: {},
      };
    case appActions.GET_GAMEWEEK_DATA_SUCCESS:
      return {
        ...state,
        gameWeekDataLoading: false,
        gameWeekDataSuccess: action.payload,
      };
    case appActions.GET_GAMEWEEK_DATA_ERROR:
      return {
        ...state,
        gameWeekDataLoading: false,
        gameWeekDataError: action.payload,
      };
    case appActions.GET_MANAGER_HISTORY_DATA_REQUEST:
      return {
        ...state,
        managerHistoryDataLoading: true,
        managerHistoryDataError: {},
      };
    case appActions.GET_MANAGER_HISTORY_DATA_SUCCESS:
      return {
        ...state,
        managerHistoryDataLoading: false,
        managerHistoryDataSuccess: action.payload,
      };
    case appActions.GET_MANAGER_HISTORY_DATA_ERROR:
      return {
        ...state,
        managerHistoryDataLoading: false,
        managerHistoryDataError: action.payload,
      };
    case appActions.GET_MANAGER_DATA_REQUEST:
      return {
        ...state,
        managerDataLoading: true,
        managerDataError: {},
      };
    case appActions.GET_MANAGER_DATA_SUCCESS:
      return {
        ...state,
        managerDataLoading: false,
        managerDataSuccess: action.payload,
      };
    case appActions.GET_MANAGER_DATA_ERROR:
      return {
        ...state,
        managerDataLoading: false,
        managerDataError: action.payload,
      };
    case appActions.GET_EVENT_DATA_REQUEST:
      return {
        ...state,
        eventDataLoading: true,
        eventDataError: {},
      };
    case appActions.GET_EVENT_DATA_SUCCESS:
      return {
        ...state,
        eventDataLoading: false,
        eventDataSuccess: action.payload,
      };
    case appActions.GET_EVENT_DATA_ERROR:
      return {
        ...state,
        eventDataLoading: false,
        eventDataError: action.payload,
      };
    case appActions.SET_ACTIVE_COMPONENT:
      return {
        ...state,
        appUiState: {
          ...state.appUiState,
          activeComponent: action.component,
        },
      };
    case appActions.SET_IS_PASSWORD_RESET:
      return {
        ...state,
        fireBaseActions: {
          ...state.fireBaseActions,
          isPasswordReset: action.passwordReset,
        },
      };
    case appActions.TOGGLE_RESET_PASSWORD_MODAL:
      return {
        ...state,
        appUiState: {
          ...state.appUiState,
          resetPasswordModal: !state.appUiState.resetPasswordModal,
        },
      };
    case appActions.TOGGLE_LOGOUT_MODAL:
      return {
        ...state,
        appUiState: {
          ...state.appUiState,
          logOutUserModal: !state.appUiState.logOutUserModal,
        },
      };
    case appActions.TOGGLE_UPLOAD_PROFILE_PICTURE_MODAL:
      return {
        ...state,
        appUiState: {
          ...state.appUiState,
          uploadProfilePictureModal:
            !state.appUiState.uploadProfilePictureModal,
        },
      };
    case appActions.TOGGLE_UPLOAD_PROFILE_PICTURE_SET:
      return {
        ...state,
        fireBaseActions: {
          ...state.fireBaseActions,
          isProfilePictureSet: !state.fireBaseActions.isProfilePictureSet,
        },
      };
    case appActions.TOGGLE_USERNAME_MODAL:
      return {
        ...state,
        appUiState: {
          ...state.appUiState,
          userNameModal: !state.appUiState.userNameModal,
        },
      };
    case appActions.TOGGLE_USERNAME_SET:
      return {
        ...state,
        fireBaseActions: {
          ...state.fireBaseActions,
          isUserNameSet: !state.fireBaseActions.isUserNameSet,
        },
      };

    case appActions.TOGGLE_IS_TEAM_VERIFIED:
      return {
        ...state,
        fireBaseActions: {
          ...state.fireBaseActions,
          isTeamVerified: action.verified,
        },
      };

    case appActions.SET_TEAM_DATA:
      return {
        ...state,
        fireBaseActions: {
          ...state.fireBaseActions,
          teamData: action.teamData,
        },
      };
    case appActions.TOGGLE_UPLOAD_TEAM_PICTURE_MODAL:
      return {
        ...state,
        appUiState: {
          ...state.appUiState,
          uploadTeamPictureModal: !state.appUiState.uploadTeamPictureModal,
        },
      };
    case appActions.SET_USERS_DATA:
      return {
        ...state,
        usersData: action.usersData,
      };

    default:
      return state;
  }
};

export default appReducer;
