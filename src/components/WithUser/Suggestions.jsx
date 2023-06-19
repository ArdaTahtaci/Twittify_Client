import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getRandomUsers } from '../../utils/filterTweets'
import { Link, useNavigate } from 'react-router-dom'
import NoProfileImg from '../NoProfileImg'
import Loader from '../Loader'
import AnyProfileButton from "./AnyProfileButton"

export default function Suggestions() {

    const allUsers = useSelector(state => state.user.allUsers)
    const [randomUsers, setRandomUsers] = useState(undefined)

    const currentUser = useSelector(state => state.user.session.currentUser)

    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const users = getRandomUsers(allUsers, currentUser.userInfo)

        if (users) setRandomUsers(users)
        else setIsLoaded(true)


    }, [])

    useEffect(() => {
        if (randomUsers) setIsLoaded(true)
        else setIsLoaded(false)
    }, [randomUsers])

    return (
        <div>
            {isLoaded && (
                <div className='large-window-suggest me-3 mt-2' >

                    {(randomUsers.length == 0 || !randomUsers) ? (
                        <h5 className='align-left ps-3 py-3 mb-4 pb-1 bold'>You are following all the users</h5>
                    ) : (
                        <h5 className='align-left ps-3 pt-3 pb-1 bold'>Who to follow</h5>
                    )}

                    {randomUsers.map((user, index) => {
                        return (
                            <div className='suggestions  px-2 py-1' onClick={() => navigate("/" + user.userName)}><h6 className='signUp'>

                                <div className='profiles' key={index}>
                                    <div className='my-3 d-flex'>
                                        <div className='my-auto'>
                                            {user.profilePhoto ? (<img className='profile-img' src={user.profilePhoto} />) : <NoProfileImg name={user.name} size={"40"} />}
                                        </div>
                                        <div className='profile-info' style={{ textAlign: "left", marginLeft: "12px" }}>


                                            <h6 className='mt-3 mb-0' style={{ textAlign: "left" }}><Link className='tweet-owner-name' to={"/" + user.userName} >{user.name}</Link></h6>
                                            <span style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>@{user.userName} </span>
                                            <br />
                                            {user.bio && <span >{user.bio} </span>}

                                        </div>
                                        <div className='ms-auto'>
                                            <AnyProfileButton currentUser={currentUser} profileOwner={user} />
                                        </div>

                                    </div>
                                </div>
                            </h6></div>
                        )
                    })}



                </div>
            )}
        </div>
    )
}
