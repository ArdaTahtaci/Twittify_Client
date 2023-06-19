export const getUsersTweets = (allTweets, user) => {


    const result = allTweets.filter((tweet) => {
        return tweet.postedBy === user._id
    })

    return result
}

export const getAllTweets = (allTweets) => allTweets


export const getTweetById = (allTweets, id) => {
    const result = allTweets.filter((tweet) => {
        return tweet._id === id
    })
    return result[0]
}

export const getTweetsByIds = (allTweets, ids) => {

    const result = allTweets.filter((tweet) => {
        return ids.includes(tweet._id)
    })

    return result
}

export const getRandomUsers = (allUsers, currentUser) => {

    const randomUserIndexes = []
    const randomUsers = []
    let rand
    let k = 0

    while (true) {
        if (k > 200 || randomUserIndexes.length > 5) break

        rand = Math.floor(Math.random() * allUsers.length)
        if (!randomUserIndexes.includes(rand) && !currentUser.followings.includes(allUsers[rand]._id) && (currentUser._id != allUsers[rand]._id) && (allUsers[rand].deleted !== true)) randomUserIndexes.push(rand)

        k++
    }

    for (var i = 0; i < randomUserIndexes.length; i++) {
        const user = allUsers[randomUserIndexes[i]]

        randomUsers.push(user)
    }

    return randomUsers
}

export const eliminateRts = (tweets, userId) => {
    return tweets.filter((tweet) => {
        if (tweet.type != "retweet") return tweet
        else return tweet.thisRetweet.createdBy === userId

    })
}

export const addRts = (allTweets, ownerTweets, userId) => {
    return allTweets.filter((tweet) => {
        if (ownerTweets.includes(tweet)) return tweet
        else if (tweet.type === "retweet") return tweet.thisRetweet.createdBy === userId
    })
}
