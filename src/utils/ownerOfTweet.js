export const findOwner = (tweet, allUsers) => {

    const ownerId = tweet.postedBy
    const owner = allUsers.filter((user) => {
        return ownerId === user._id
    })



    return owner[0]


}
export const findRtOwner = (tweet, allUsers) => {
    const rtOwnerId = tweet.thisRetweet.createdBy
    const rtOwner = allUsers.filter((user) => {
        return rtOwnerId === user._id
    })
    return rtOwner[0]
}
export const findOriginalTweet = (tweet, allTweets) => {
    const originalTweetId = tweet.thisQuote.originalTweet
    const originalTweet = allTweets.filter((tweet) => {
        return originalTweetId === tweet._id
    })
    return originalTweet[0]
}

export const getUserById = (allUsers, id) => {
    const result = allUsers.filter((user) => {
        return user._id === id
    })
    return result[0]
}

export const getUsersById = (allUsers, userIds) => {
    const result = allUsers.filter((user) => {
        return userIds.includes(user._id)
    })
    return result
}