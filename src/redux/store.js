import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { getTableDataReducer } from "./reducers/getTableData";

const store = createStore(getTableDataReducer, applyMiddleware(thunk));
export default store;
