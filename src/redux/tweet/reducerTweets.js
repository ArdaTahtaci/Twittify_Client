import * as types from "./typesTweets.js"

const initialState = {
    allTweets: [],
    currentUser: {
        ownTweets: [],
        followingTweets: [],
    },
}

const reducerTweets = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_ORIGINAL_TWEET: return {
            ...state,
            allTweets: action.payload.tweets,
        }
        case types.GET_ALL_TWEETS: return {
            ...state,
            allTweets: action.payload
        }
        case types.LIKE: return {
            ...state,
            allTweets: action.payload
        }
        case types.ADD_RETWEET_TO_TWEET: return {
            ...state,
            allTweets: action.payload
        }
        case types.CREATE_RETWEET: return {
            ...state,
            allTweets: action.payload,
        }
        case types.LOGOUT_T: return initialState

        case types.ADD_QUOTES_TO_TWEETS: return {
            ...state,
            allTweets: action.payload
        }
        case types.REPLY: return {
            ...state,
            allTweets: action.payload
        }
        case types.GET_PROFILE_TWEETS: return {
            ...state,
            currentUser: {
                ownTweets: action.payload.ownTweets,
                followingTweets: action.payload.followingTweets,
            }
        }
        case types.DELETE_TWEET: return {
            ...state,
            allTweets: action.payload
        }
        default: return state
    }
}



export default reducerTweets