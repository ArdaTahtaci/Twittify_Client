export const isFollowing = (currentUser, profileOwner) => {

    const followings = currentUser.followings


    return followings.includes(profileOwner._id)
}

export const getFollowingTweets = (allTweets, currentUser) => {

    const followingTweets = allTweets.filter((tweet) => {
        return currentUser.followings.includes(tweet.postedBy)
    })


    return followingTweets
}