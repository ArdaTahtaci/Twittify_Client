import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import _ from "lodash"
import { getUserById } from '../utils/ownerOfTweet'
import NoProfileImg from './NoProfileImg'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function RtAndLikes(props) {

    const location = useLocation()
    const lastRoute = _.split(location.pathname, '/')

    const allUsers = useSelector(state => state.user.allUsers)



    const [profiles, setProfiles] = useState(undefined)
    useEffect(() => {
        if (lastRoute[4] === "likes") {
            const userIds = props.tweet.retweetedBy
            let result = []
            userIds.map((userId) => {
                result.push(getUserById(allUsers, userId))
            })
            setProfiles(result)
        }
        else if (lastRoute[4] === "retweets") {
            const userIds = props.tweet.likedBy
            let result = []
            userIds.map((userId) => {
                result.push(getUserById(allUsers, userId))
            })
            setProfiles(result)
        }
        else setProfiles(undefined)
    }, [])

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (profiles) setIsLoaded(true)
        else setIsLoaded(false)
    }, [profiles])
    useEffect(() => {
        if (profiles) setIsLoaded(true)
        else setIsLoaded(false)
    }, [])

    return (
        <div className='rt-and-likes-container'>
            <div className='model-header d-flex'>
                <button type='button' className='btn-close d-flex mx-2 my-3' onClick={() => props.close()}></button>
                <div className='ms-3 my-2' style={{ textAlign: "left" }}>
                    {(lastRoute[4] === "retweets") && <span style={{ fontSize: "1.4rem", fontWeight: "500" }}>Retweeted by</span>}
                    {(lastRoute[4] === "likes") && <span style={{ fontSize: "1.4rem", fontWeight: "500" }}>Liked by</span>}

                </div>
            </div>
            {isLoaded && (
                <div style={{ margin: "18px" }}>
                    {profiles.map((user, index) => {
                        return (
                            <div className='profiles' key={index}>
                                <div className='my-3 d-flex'>
                                    <div className='my-auto'>
                                        {user.profilePhoto ? (<img className='profile-img' src={user.profilePhoto} />) : <NoProfileImg name={user.name} size={"40"} />}
                                    </div>
                                    <div className='profile-info' style={{ textAlign: "left", marginLeft: "12px" }}>


                                        <h6 className='mt-3 mb-0' style={{ textAlign: "left" }}><Link className='tweet-owner-name' to={"/" + user.userName} >{user.name}</Link></h6>
                                        <span style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>@{user.userName} </span>
                                        {user.bio && <span >{user.bio} </span>}

                                    </div>

                                    <Button style={{ borderRadius: "20px", color: "#fff" }} className='my-3 ms-auto' variant='dark'><span className='mx-1'>Follow</span></Button>

                                </div>
                            </div>
                        )
                    })}
                </div>

            )
            }
        </div >
    )
}
