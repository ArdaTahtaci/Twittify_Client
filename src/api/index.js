import axios from "axios"

const userApiEndPoint = "https://twittify-server.onrender.com/users"
const tweetApiEndPoint = "https://twittify-server.onrender.com/tweets"

const headerObject = (token) => {
    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
}

export const createUser = async (newUser) => await axios.post(userApiEndPoint + "/create", newUser)

export const login = async (userInfo) => await axios.post(userApiEndPoint + "/login", userInfo)

export const createOriginalTweet = async (user, tweet) => await axios.post(tweetApiEndPoint + "/create-original", { tweet: tweet }, headerObject(user.accessToken))

export const addNewTweetToUser = async (user, tweet) => await axios.patch(userApiEndPoint + "/post-tweet", { tweet: tweet }, {
    headers: {
        Authorization: 'Bearer ' + user.accessToken
    }
})

export const getAllTweets = async () => await axios.get(tweetApiEndPoint)

export const getAllUsers = async () => await axios.get(userApiEndPoint)

export const likeTweet = async (currentUser, tweet) => await axios.patch(tweetApiEndPoint + "/like", { tweet: tweet }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const addRetweetToTweet = async (currentUser, tweet) => await axios.patch(tweetApiEndPoint + "/retweet-to-tweet", { tweet: tweet }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const createRetweet = async (currentUser, tweet) => await axios.post(tweetApiEndPoint + "/create-retweet", { tweet: tweet }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const addRetweetToUser = async (currentUser, newRetweet) => await axios.patch(userApiEndPoint + "/retweet-to-user", { newRetweet: newRetweet }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const createQuote = async (currentUser, tweet, quoteContent) => await axios.post(tweetApiEndPoint + "/create-quote", { tweet: tweet, quoteContent: quoteContent }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const addQuoteToTweet = async (currentUser, tweet, newQuote) => await axios.patch(tweetApiEndPoint + "/quote-to-tweet", { tweet: tweet, newQuote: newQuote }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})


export const addQuoteToUser = async (currentUser, newQuote) => await axios.patch(userApiEndPoint + "/quote_to_user", { newQuote: newQuote }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const reply = async (currentUser, tweet, text) => await axios.patch(tweetApiEndPoint + "/reply", { tweet: tweet, text: text }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const getProfileTweets = async (currentUser) => await axios.get(tweetApiEndPoint + "/get-profile-tweets", {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const follow = async (currentUser, profileOwner) => await axios.patch(userApiEndPoint + "/follow", { profileOwner: profileOwner }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const unfollow = async (currentUser, profileOwner) => await axios.patch(userApiEndPoint + "/unfollow", { profileOwner: profileOwner }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const edit = async (currentUser, data) => await axios.patch(userApiEndPoint + "/editProfile", { data: data }, {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const deleteAccount = async (currentUser) => await axios.delete(userApiEndPoint + "/delete_account", {
    headers: {
        Authorization: 'Bearer ' + currentUser.accessToken
    }
})

export const deleteTweet = async (currentUser, tweet) => {
    alert(JSON.stringify(currentUser.accessToken))
    await axios.delete(tweetApiEndPoint + "/delete-tweet", { tweet: tweet }, {
        headers: {
            Authorization: 'Bearer ' + currentUser.accessToken
        }
    })
}




