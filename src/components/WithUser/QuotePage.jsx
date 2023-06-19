import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getTweetById, getTweetsByIds } from '../../utils/filterTweets'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Tweets from '../Tweets'

export default function QuotePage() {

    const location = useLocation()
    const navigate = useNavigate()
    const lastRoute = _.split(location.pathname, '/')
    const tweetId = lastRoute[3]

    const [isLoaded, setIsLoaded] = useState(false)

    const allTweets = useSelector(state => state.tweet.allTweets)

    const [quotes, setQuotes] = useState(undefined)


    useEffect(() => {
        setQuotes(getTweetsByIds(allTweets, getTweetById(allTweets, tweetId).quotesOfThisTweet))
    }, [])


    useEffect(() => {
        if (quotes) setIsLoaded(true)
        else setIsLoaded(false)
    }, [quotes])



    return (
        <div>
            <div className='sticky-header d-flex'>
                <div className='ms-2 px-2'><div className='back-btn px-2 py-1 mt-2 mb-1' onClick={() => navigate(-1)}><i class="fa-solid fa-arrow-left fa-lg"></i></div></div>
                <div className='ms-3 my-2' style={{ textAlign: "left" }}>
                    <span style={{ fontSize: "1.4rem", fontWeight: "500" }}>Quote Tweets</span>
                </div>
            </div>
            {isLoaded && (<Tweets tweets={quotes} />)}


        </div>
    )
}
