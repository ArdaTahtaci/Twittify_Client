import * as types from "./typesTweets.js"
import * as userTypes from "../user/userTypes.js"
import * as api from "../../api/index.js"


export const getAllTweets = () => async (dispatch) => {
    try {
        const { data } = await api.getAllTweets()

        dispatch({
            type: types.GET_ALL_TWEETS,
            payload: data
        })

    } catch (error) {
        console.log(error.message)
    }
}

export const createOriginalTweet = (user, tweet) => async (dispatch) => {

    let newTweet
    try {
        const newTweetSchema = {
            type: "original",
            content: tweet.content,
            image: tweet.img,
            postedBy: tweet.postedBy,
        }
        const { data } = await api.createOriginalTweet(user, newTweetSchema)
        newTweet = data.newTweet
        dispatch({
            type: types.CREATE_ORIGINAL_TWEET,
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }

    try {
        const { data } = await api.addNewTweetToUser(user, newTweet)

        dispatch({
            type: userTypes.ADD_NEW_TWEET,
            payload: { allUsers: data.allUsers, thisUser: data.thisUser }
        })

    } catch (error) {
        console.log(error.message)
    }
}

export const likeTweet = (user, tweet) => async (dispatch) => {

    try {
        const { data } = await api.likeTweet(user, tweet)

        if (data.liked) {
            dispatch({
                type: types.LIKE,
                payload: data.tweets
            })
        }
        else {
            console.log(data.message)
        }


    } catch (error) {
        console.log(error.message)
    }
}

export const retweet = (user, tweet) => async (dispatch) => {
    let createdRt, updatedTweet
    try {
        const { data } = await api.addRetweetToTweet(user, tweet)
        if (data.retweeted) {
            dispatch({
                type: types.ADD_RETWEET_TO_TWEET,
                payload: data.tweets
            })
            updatedTweet = data.updatedTweet
        } else {
            console.log(data.message)
        }
    } catch (error) {
        console.log(error.message)
    }
    try {
        const { data } = await api.createRetweet(user, updatedTweet[0])
        createdRt = data.newTweet
        if (data.retweetCreated) {
            dispatch({
                type: types.CREATE_RETWEET,
                payload: data.tweets
            })
        } else {
            console.log(data.message)
        }
    } catch (error) {
        console.log(error.message)
    }
    try {
        const { data } = await api.addRetweetToUser(user, createdRt)
        if (data.updated) {
            dispatch({
                type: userTypes.ADD_RETWEET,
                payload: data.allUsers
            })
        } else {
            console.log(data.message)
        }
    } catch (error) {
        console.log(error.message)
    }

}

export const quote = (user, tweet, quoteContent) => async (dispatch) => {

    let newQuote
    try {
        const { data } = await api.createQuote(user, tweet, quoteContent)
        newQuote = data.newQuote
    } catch (error) {
        console.log(error.message)
    }
    try {
        const { data } = await api.addQuoteToTweet(user, tweet, newQuote)
        console.log(data.message)
        dispatch({
            type: types.ADD_QUOTES_TO_TWEETS,
            payload: data.allTweets
        })
    } catch (error) {
        console.log(error.message)
    }

    try {
        const { data } = await api.addQuoteToUser(user, newQuote)
        dispatch({
            type: userTypes.ADD_QUOTE_TO_USER,
            payload: data.allUsers
        })
    } catch (error) {
        console.log(error.message)
    }

}

export const reply = (user, tweet, text) => async (dispatch) => {

    try {
        const { data } = await api.reply(user, tweet, text)
        dispatch({
            type: types.REPLY,
            payload: data.allTweets
        })
    } catch (error) {
        console.log(error.message)

    }
}

export const logoutT = () => {
    return {
        type: types.LOGOUT_T
    }
}

export const getProfileTweets = (user) => async (dispatch) => {
    try {
        const { data } = await api.getProfileTweets(user)

        dispatch({
            type: types.GET_PROFILE_TWEETS,
            payload: { ownTweets: data.ownTweets, followingTweets: data.followingTweets }
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteTwt = (currentUser, tweet) => async (dispatch) => {
    try {
        const { data } = await api.deleteTweet(currentUser, tweet)

        dispatch({
            type: types.DELETE_TWEET,
            payload: data.allTweets
        })
    } catch (error) {
        console.log(error.message)
    }
}



