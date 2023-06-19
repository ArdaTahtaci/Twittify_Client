import userReducer from "./user/userReducer.js"
import reducerTweets from "./tweet/reducerTweets.js"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    user: userReducer,
    tweet: reducerTweets
})

export default rootReducer