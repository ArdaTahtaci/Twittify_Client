export const isReplied = (tweet, user) => {

    if (tweet.replies) {
        const allReplies = tweet.replies
        let allRepliedBys = [];
        for (var i = 0; i < allReplies.length; i++) {
            allRepliedBys.push(allReplies[i].replyedBy)
        }
        if (allRepliedBys) return allRepliedBys.includes(user._id)
        else return false
    }

    else return false
}