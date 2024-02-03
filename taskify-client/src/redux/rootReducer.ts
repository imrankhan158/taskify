import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

// slices
import authReducer from "./slices/auth";
import orgReducer from "./slices/organization";

const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "redux-",
};

const rootReducer = combineReducers({
    auth: authReducer,
    org: orgReducer
});

export { rootPersistConfig, rootReducer };
