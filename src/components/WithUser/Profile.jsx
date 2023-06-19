import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader'
import { getProfileTweets } from '../../redux/tweet/actionsTweets'
import { Button, Container } from 'react-bootstrap'
import Tweets from '../Tweets'
import { addRts, eliminateRts, getUsersTweets } from '../../utils/filterTweets'
import { getOwner } from '../../utils/profileOwner'
import NoProfileImg from '../NoProfileImg'
import AnyProfileButton from './AnyProfileButton'
import EditProfile from './EditProfile'
import { joinedWhen } from '../../utils/calculateTime'

export default function Profile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const [isLoaded, setIsLoaded] = useState(false)
    const [isOwnProfile, setIsOwnProfile] = useState(false)

    const isLoggedIn = useSelector(state => state.user.session.isLoggedIn)
    const currentUserTweets = useSelector(state => state.tweet.currentUser)
    const currentUser = useSelector(state => state.user.session.currentUser)
    const allUsers = useSelector(state => state.user.allUsers)
    const allTweets = useSelector(state => state.tweet.allTweets)

    let profileOwner = getOwner(allUsers, params.userName)

    const [showEdit, setShowEdit] = useState(false)
    const closeEdit = () => setShowEdit(false);

    useEffect(() => {
        if (!isLoggedIn) navigate("/")
        dispatch(getProfileTweets(currentUser))
        if (currentUserTweets.ownTweets && currentUserTweets.followingTweets) setIsLoaded(true)
        else setIsLoaded(false)
        if (currentUser.userInfo._id === profileOwner._id) setIsOwnProfile(true)
        else setIsOwnProfile(false)

    }, [])

    useEffect(() => {
        if (currentUserTweets.ownTweets && currentUserTweets.followingTweets) setIsLoaded(true)
        else setIsLoaded(false)

    }, [currentUserTweets])

    const profileOwnerTweetsWithoutRts = eliminateRts(getUsersTweets(allTweets, getOwner(allUsers, params.userName)), profileOwner._id)
    const profileOwnerTweets = addRts(allTweets, profileOwnerTweetsWithoutRts, profileOwner._id)

    return (
        <div>
            {isLoaded ? (
                <div >
                    {showEdit && <EditProfile closeModel={closeEdit} user={currentUser} />}
                    <div className='profile-info'>
                        <div className='sticky-header d-flex'>
                            <div className='ms-2 px-2'><div className='back-btn px-2 py-1 mt-2 mb-1' onClick={() => navigate("/home")}><i class="fa-solid fa-arrow-left fa-lg"></i></div></div>
                            <div className='ms-4' style={{ textAlign: "left" }}>
                                <h5 className='mb-0 mt-1 '>{profileOwner.name}</h5>
                                <span style={{ color: "rgb(101, 119, 134)", fontSize: "0.9rem" }}>{profileOwnerTweets.length} Tweets</span>
                            </div>
                        </div>
                        <div style={{ position: "relative" }}>
                            <div className='profile-bg-img'>
                                {profileOwner.profileBackgroundPhoto ? (
                                    <img src={profileOwner.profileBackgroundPhoto} height={"200px"} width={"100%"} />
                                ) : (
                                    <div style={{ backgroundColor: "#d9e0e2", height: "200px" }}></div>
                                )}
                            </div>
                            <div className='fixed-profile-img'>
                                {profileOwner.profilePhoto ? (
                                    <img src={profileOwner.profilePhoto} className='profile-img' style={{ width: "150px", height: "150px" }} />
                                ) : (
                                    <NoProfileImg name={profileOwner.name} size={"150"} />
                                )}
                            </div>
                        </div>
                        <Container className='pb-4 bio-info'>
                            <div style={{ height: "85px" }}>

                                {isOwnProfile ? (
                                    <Button className='edit-btn me-3 mt-2' onClick={() => setShowEdit(true)}><span className='mx-2 my-1'>Edit profile</span></Button>
                                ) : (
                                    <AnyProfileButton currentUser={currentUser} profileOwner={profileOwner} />
                                )}

                            </div>
                            <div style={{ textAlign: "left" }}>
                                <div className='ms-1' style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{profileOwner.name}</div>

                                <div className='ms-1 mb-1' style={{ fontSize: "0.95rem", color: "rgb(101, 119, 134)" }}>@{profileOwner.userName}</div>

                                {profileOwner.bio && <p>{profileOwner.bio}</p>}

                                <div className='ms-1 my-2' style={{ fontSize: "0.95rem", color: "rgb(101, 119, 134)" }}>Joined {joinedWhen(profileOwner.createdAt)}</div>

                                <div className='ms-1' style={{ fontSize: "0.95rem" }}>
                                    {profileOwner.deleted ? (
                                        <div className='d-flex'>
                                            <div className='follows' >
                                                <span style={{ fontWeight: "bold" }}>{0} </span>
                                                <span className='me-3' style={{ color: "rgb(101, 119, 134)" }}>Following</span>
                                            </div>
                                            <div className='follows' >
                                                <span style={{ fontWeight: "bold" }}>{0}</span>
                                                <span style={{ color: "rgb(101, 119, 134)" }}> Followers</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='d-flex'>
                                            <div className='follows' onClick={() => navigate("/" + profileOwner.userName + "/following")}>
                                                <span style={{ fontWeight: "bold" }}>{profileOwner.followings.length} </span>
                                                <span className='me-3' style={{ color: "rgb(101, 119, 134)" }}>Following</span>
                                            </div>
                                            <div className='follows' onClick={() => navigate("/" + profileOwner.userName + "/followers")}>
                                                <span style={{ fontWeight: "bold" }}>{profileOwner.followers.length}</span>
                                                <span style={{ color: "rgb(101, 119, 134)" }}> Followers</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </Container>

                    </div >
                    <div className='tweets'>
                        {profileOwner.deleted ? (<h5>404 User Not Found</h5>) : (
                            <Tweets tweets={profileOwnerTweets} />
                        )}
                    </div>

                </div >
            ) : (
                <Loader />
            )
            }
        </div >
    )
}

