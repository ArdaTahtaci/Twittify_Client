import _ from "lodash"
import IndividualTweet from "../components/IndividualTweet"
import Home from "../components/WithUser/Home"
import Profile from "../components/WithUser/Profile"
import Follows from "../components/WithUser/Follows"
import QuotePage from "../components/WithUser/QuotePage"



export const renderByParams = (params, location) => {
    const { userName, tweetId } = params
    const lastRoute = _.split(location.pathname, '/')

    if (lastRoute[5] && (lastRoute[5] === "with_comments")) return <QuotePage />
    else if (lastRoute[2] && (lastRoute[2] === "following" || lastRoute[2] === "followers")) return <Follows />
    else if (tweetId) return <IndividualTweet />
    else if (userName) return <Profile />
    else return <Home />
}