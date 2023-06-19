import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import logger from "redux-logger"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import rootReducer from "./rootReducer";

const persistsConfig = {
    key: "persist-key",
    storage
}

const persistedReducer = persistReducer(persistsConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk, logger))
const persistor = persistStore(store)


export default store
export { persistor }



// async function resetStore() {
//     await persistor.purge();
//     window.location.reload();
// }

// resetStore();
