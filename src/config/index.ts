// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
// import rootReducer from "./reducers/reducers";
// import rootSaga from "./sagas/sagas";
// import { createLogger } from "redux-logger";

// const sagaMiddleware = createSagaMiddleware();
// const logger = createLogger({
//   collapsed: true,
//   diff: true,
// });

// const store = configureStore({
//   reducer: combineReducers({ rootReducer }),
//   middleware: [sagaMiddleware, logger],
// });

// sagaMiddleware.run(rootSaga);

// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/reducers";
import rootSaga from "./sagas/sagas";
import { createLogger } from "redux-logger";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
  collapsed: true,
  diff: true,
});

let middleware = [<any>sagaMiddleware];
if (process.env.NODE_ENV === "development") {
  middleware = middleware.concat(logger);
} else {
  middleware = [...middleware];
}

const store = configureStore({
  reducer: combineReducers({ rootReducer }),
  middleware: middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
