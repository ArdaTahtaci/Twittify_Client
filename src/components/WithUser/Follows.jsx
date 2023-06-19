import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getOwner } from "../../utils/profileOwner.js"
import _ from 'lodash'
import NoProfileImg from '../NoProfileImg.jsx'
import AnyProfileButton from './AnyProfileButton.jsx'
import Loader from '../Loader.jsx'
import { getUsersById } from '../../utils/ownerOfTweet.js'

export default function Follows() {

    const [select, setSelect] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const allUsers = useSelector(state => state.user.allUsers)
    const currentUser = useSelector(state => state.user.session.currentUser)
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const thisUser = getOwner(allUsers, params.userName)

    const lastRoute = _.split(location.pathname, '/')

    const [usersToBeShown, setUsersToBeShown] = useState(undefined)

    useEffect(() => {
        if (lastRoute[2] === "following") {
            setUsersToBeShown(getUsersById(allUsers, thisUser.followings))
            setSelect(true)
        }
        else if (lastRoute[2] === "followers") {
            setUsersToBeShown(getUsersById(allUsers, thisUser.followers))
            setSelect(false)
        }
    }, [])

    useEffect(() => {
        if (lastRoute[2] === "following") {
            setIsLoaded(true)
        }
        else if (lastRoute[2] === "followers") {
            setIsLoaded(true)
        }
    }, [usersToBeShown])



    useEffect(() => {

        let btn1 = document.getElementById("select-btn-1").style
        let btn2 = document.getElementById("select-btn-2").style
        if (select) {
            setUsersToBeShown(getUsersById(allUsers, thisUser.followings))
            navigate("/" + lastRoute[1] + "/following")
            btn2.borderBottom = "none"
            btn1.borderBottom = "4px solid #1DA1F2"
            btn1.color = "#000"
            btn2.color = "rgb(101, 119, 134)"
            btn1.fontWeight = "500"
            btn2.fontWeight = "300"
        } else {
            setUsersToBeShown(getUsersById(allUsers, thisUser.followers))
            navigate("/" + lastRoute[1] + "/followers")
            btn1.borderBottom = "none"
            btn2.borderBottom = "4px solid #1DA1F2"
            btn2.color = "#000"
            btn1.color = "rgb(101, 119, 134)"
            btn2.fontWeight = "500"
            btn1.fontWeight = "300"
        }

    }, [select])


    return (
        <div>

            <div>
                <div className='sticky-header'>
                    <div className='d-flex'>
                        <div className='ms-2 px-2'><div className='back-btn px-2 py-1 mt-3 mb-1' onClick={() => navigate("/" + thisUser.userName)}><i class="fa-solid fa-arrow-left fa-lg"></i></div></div>
                        <div className='ms-3' style={{ width: "100%" }}>
                            <h4 style={{ fontWeight: "500" }} className='d-flex pt-2 ps-1 my-1'>{thisUser.name}</h4>
                            <h6 style={{ fontWeight: "400", color: "rgb(101, 119, 134)", fontSize: "0.9rem" }} className='d-flex'>@{thisUser.userName}</h6>
                        </div>
                    </div>

                    <Row style={{ width: "100%" }} className='mx-auto'>
                        <Col className="col-6 select" onClick={() => setSelect(true)}>
                            <div style={{ width: "fit-content" }} className='py-2 mx-auto' id='select-btn-1'><p >Following</p></div>

                        </Col>
                        <Col className="col-6 select" onClick={() => setSelect(false)}>
                            <div style={{ width: "fit-content" }} className='py-2 mx-auto select-btn' id='select-btn-2'><p >Followers</p></div>
                        </Col>
                    </Row>
                </div>
                {isLoaded ? (

                    <div className='profiles'>
                        {usersToBeShown.map((user, index) => {
                            return (
                                <div key={index}>
                                    <div className='my-3 d-flex'>
                                        <div className='my-auto'>
                                            {user.profilePhoto ? (<img className='profile-img' src={user.profilePhoto} />) : <NoProfileImg name={user.name} size={"40"} />}
                                        </div>
                                        <div className='profile-info' style={{ textAlign: "left", marginLeft: "12px" }}>


                                            <h6 className='mt-3 mb-0' style={{ textAlign: "left" }}><Link className='tweet-owner-name' to={"/" + user.userName} >{user.name}</Link></h6>
                                            <span style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>@{user.userName} </span>
                                            {user.bio && <span >{user.bio} </span>}

                                        </div>
                                        <div className='ms-auto'>
                                            <AnyProfileButton currentUser={currentUser} profileOwner={user} />
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (<Loader />)}
            </div>

        </div>
    )
}

