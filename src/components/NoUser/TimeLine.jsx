import React, { useEffect, useState } from 'react'
import Tweets from '../Tweets'
import { useSelector } from 'react-redux'
import Loader from '../Loader'

export default function TimeLine() {

    const allTweets = useSelector(state => state.tweet.allTweets)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
        if (allTweets) setIsLoaded(true)
    }, [])
    useEffect(() => {
        if (allTweets) setIsLoaded(true)
    }, [allTweets])

    return (
        <div>
            {isLoaded ? (
                <div>
                    <div className='d-flex'>
                        <div style={{ width: "100%" }}>
                            <h4 style={{ fontWeight: "bold" }} className='d-flex pt-2 ps-1 my-1'>Explore</h4>
                        </div>
                        <div>
                            <h5 className='py-2 px-2 ms-4 mt-1 border-radius' style={{ fontSize: "1.2rem" }}>
                                <i className="fa-solid fa-regular fa-gear" style={{ color: "#000000" }}></i>
                            </h5>
                        </div>
                    </div>
                    <Tweets tweets={allTweets} />
                </div>

            ) : (<Loader />)}

        </div>
    )
}
