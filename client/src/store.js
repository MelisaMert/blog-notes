import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk"; // to async operations
import { composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

// rootReducer, initialState, others
const store = createStore(rootReducer, {}, compose(
   applyMiddleware(thunk),
   composeWithDevTools()
));

export default store;