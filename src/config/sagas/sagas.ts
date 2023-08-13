/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeLatest, put, fork } from "@redux-saga/core/effects";
import axios from "axios";
import appActions from "../actions/actions";
import { AxiosResponse } from "axios";

function* getGeneralData(): Generator<any, void, AxiosResponse> {
  try {
    const response = yield axios.get(
      "https://fantasy-server.onrender.com/general-info/"
    );
    yield put({
      type: appActions.GET_GENERAL_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_GENERAL_DATA_ERROR,
      payload: error,
    });
  }
}

function* getLeagueData(): Generator<any, void, AxiosResponse> {
  try {
    const response = yield axios.get(
      "https://fantasy-server.onrender.com/league-standings/"
    );
    yield put({
      type: appActions.GET_LEAGUE_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_LEAGUE_DATA_ERROR,
      payload: error,
    });
  }
}

function* getTeamData(action: any): Generator<any, void, AxiosResponse> {
  try {
    const response = yield axios.get(
      `https://fantasy.premierleague.com/api/entry/${action.managerId}/event/${action.eventId}/picks/`
    );
    yield put({
      type: appActions.GET_TEAM_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_TEAM_DATA_ERROR,
      payload: error,
    });
  }
}

function* getPlayerData(action: any): Generator<any, void, AxiosResponse> {
  try {
    const response = yield axios.get(
      `https://fantasy.premierleague.com/api/element-summary/${action.playerId}/`
    );
    yield put({
      type: appActions.GET_PLAYER_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_PLAYER_DATA_ERROR,
      payload: error,
    });
  }
}

function* getFixtureData(): Generator<any, void, AxiosResponse> {
  try {
    const response = yield axios.get(
      `https://fantasy.premierleague.com/api/fixtures/`
    );
    yield put({
      type: appActions.GET_FIXTURE_DATA_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_FIXTURE_DATA_ERROR,
      payload: error,
    });
  }
}

function* getGameweekData(action: any): Generator<any, void, AxiosResponse> {
  try {
    const response = yield axios.get(
      `https://fantasy.premierleague.com/api/event/${action.gameweekId}/live/`
    );
    yield put({
      type: appActions.GET_GAMEWEEK_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_GAMEWEEK_DATA_ERROR,
      payload: error,
    });
  }
}

function* getManagerHistoryData(
  action: any
): Generator<any, void, AxiosResponse> {
  try {
    const response = yield axios.get(
      `https://fantasy.premierleague.com/api/entry/${action.managerId}/history/`
    );
    yield put({
      type: appActions.GET_MANAGER_HISTORY_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_MANAGER_HISTORY_DATA_ERROR,
      payload: error,
    });
  }
}

function* getManagerData(action: any): Generator<any, void, AxiosResponse> {
  try {
    const response = yield axios.get(
      `https://fantasy.premierleague.com/api/entry/${action.managerId}/`
    );
    yield put({
      type: appActions.GET_MANAGER_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_MANAGER_DATA_ERROR,
      payload: error,
    });
  }
}

function* getEventData(): Generator<any, void, AxiosResponse> {
  try {
    const response = yield axios.get(
      `https://fantasy.premierleague.com/api/event-status/`
    );
    yield put({
      type: appActions.GET_EVENT_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_EVENT_DATA_ERROR,
      payload: error,
    });
  }
}

function* watchGetGeneralData() {
  yield takeLatest(appActions.GET_GENERAL_DATA_REQUEST, getGeneralData);
}

function* watchGetLeagueData() {
  yield takeLatest(appActions.GET_LEAGUE_DATA_REQUEST, getLeagueData);
}

function* watchGetTeamData() {
  yield takeLatest(appActions.GET_TEAM_DATA_REQUEST, getTeamData);
}

function* watchGetPlayerData() {
  yield takeLatest(appActions.GET_PLAYER_DATA_REQUEST, getPlayerData);
}

function* watchGetFixtureData() {
  yield takeLatest(appActions.GET_FIXTURE_DATA_REQUEST, getFixtureData);
}

function* watchGetGameweekData() {
  yield takeLatest(appActions.GET_GAMEWEEK_DATA_REQUEST, getGameweekData);
}

function* watchGetManagerHistoryData() {
  yield takeLatest(
    appActions.GET_MANAGER_HISTORY_DATA_REQUEST,
    getManagerHistoryData
  );
}

function* watchGetManagerData() {
  yield takeLatest(appActions.GET_MANAGER_DATA_REQUEST, getManagerData);
}

function* watchGetEventData() {
  yield takeLatest(appActions.GET_EVENT_DATA_REQUEST, getEventData);
}

export default function* rootSaga() {
  yield fork(watchGetGeneralData);
  yield fork(watchGetLeagueData);
  yield fork(watchGetTeamData);
  yield fork(watchGetPlayerData);
  yield fork(watchGetFixtureData);
  yield fork(watchGetGameweekData);
  yield fork(watchGetManagerHistoryData);
  yield fork(watchGetManagerData);
  yield fork(watchGetEventData);
}
