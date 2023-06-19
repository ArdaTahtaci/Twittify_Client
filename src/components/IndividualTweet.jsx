import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getTweetById } from '../utils/filterTweets'
import { useDispatch, useSelector } from 'react-redux'
import { findOriginalTweet, findOwner, getUserById } from '../utils/ownerOfTweet'
import { Row, Col, Button } from 'react-bootstrap'
import NoProfileImg from './NoProfileImg'
import { getTime, postedWhen } from '../utils/calculateTime'
import RtDropdown from './RtDropdown'
import { isReplied } from '../utils/isReplied'
import RtAndLikes from './RtAndLikes'
import _ from 'lodash'
import { likeTweet, reply, retweet } from '../redux/tweet/actionsTweets.js'
import Quote from './WithUser/Quote'



export default function IndividualTweet() {

    const { userName, tweetId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const lastRoute = _.split(location.pathname, '/')


    const allTweets = useSelector(state => state.tweet.allTweets)
    const allUsers = useSelector(state => state.user.allUsers)
    const currentUser = useSelector(state => state.user.session.currentUser)

    const tweet = getTweetById(allTweets, tweetId)
    const owner = findOwner(tweet, allUsers)

    let qOriginalOwner, originalTweet
    if (tweet.type === "quote") {
        originalTweet = findOriginalTweet(tweet, allTweets)
        qOriginalOwner = findOwner(originalTweet, allUsers)
    }
    const goToTweet = (event, tweet) => {
        event.stopPropagation()
        const owner = findOwner(tweet, allUsers)
        navigate("/" + owner.userName + "/status/" + tweet._id)
    }


    const rtCount = tweet.retweetedBy.length
    const quoteCount = tweet.quotedBy.length
    const likeCount = tweet.likedBy.length

    const [showQuote, setShowQuote] = useState(false)
    const closeQuote = () => setShowQuote(false);

    const chooseAction = (event, tweet, index) => {
        if (event === "retweet") dispatch(retweet(currentUser, tweet))
        else if (event === "quote") {
            setShowQuote(true)
        }
    }

    const like = (event, tweet) => {
        event.stopPropagation()
        dispatch(likeTweet(currentUser, tweet))
    }


    const [showRtAndLikes, setShowRtAndLikes] = useState(false)


    const closeShowRtAndLikes = () => {
        setShowRtAndLikes(false)
        navigate(-1)
    }

    const showRt = () => {
        setShowRtAndLikes(true)
        navigate(location.pathname + "/retweets")
    }
    const showLikes = () => {
        setShowRtAndLikes(true)
        navigate(location.pathname + "/likes")
    }
    const showQuotes = () => {
        navigate(location.pathname + "/retweets/with_comments")
    }

    useEffect(() => {
        if (lastRoute[4] === "likes" || lastRoute[4] === "retweets") setShowRtAndLikes(true)
        else setShowRtAndLikes(false)
    }, [])

    const replyTweet = (e) => {
        e.preventDefault()
        const text = e.target[0].value
        dispatch(reply(currentUser, tweet, text))
    }

    return (
        <div>
            {showRtAndLikes && (
                <RtAndLikes
                    close={closeShowRtAndLikes}
                    tweet={tweet}
                />
            )}
            {(showQuote) && <Quote
                currentUser={currentUser}
                tweet={tweet}
                closeModel={closeQuote}
                tweetOwner={owner}
            />}
            <div className='sticky-header d-flex'>
                <div className='ms-2 px-2'><div className='back-btn px-2 py-1 mt-2 mb-1' onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left fa-lg"></i></div></div>
                <div className='ms-3 my-2' style={{ textAlign: "left" }}>
                    <span style={{ fontSize: "1.4rem", fontWeight: "500" }}>Tweet</span>
                </div>
            </div>
            <div style={{ paddingBottom: "0px" }} className='individual-tweet'>
                <div className='d-flex'>

                    <div >
                        {owner.profilePhoto ? (<img className='profile-img' src={owner.profilePhoto} />) : <NoProfileImg name={owner.name} size={"50"} />}
                    </div>

                    <div className='profile-info' style={{ textAlign: "left", marginLeft: "12px" }}>

                        <h6 className='mt-1 mb-0' style={{ textAlign: "left" }}><Link className='tweet-owner-name' to={"/" + owner.userName} >{owner.name}</Link></h6>
                        <span style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>@{owner.userName} </span>

                    </div>
                </div>

                <div className="my-3">
                    <p style={{ textAlign: "left" }}>
                        {tweet.content}
                    </p>
                    {tweet.image && (<div id='photo' className='my-2 d-flex'>
                        <img className='tweet-img' src={tweet.image} />
                    </div>)}
                </div>


                {tweet.type === "quote" && <div className='my-3' onClick={(event) => goToTweet(event, originalTweet)}>
                    <div className='quotes-original'>
                        <Row>
                            <Col className="col-1 profile-col">
                                {qOriginalOwner.profilePhoto ? (<img className='profile-img-quote' src={qOriginalOwner.profilePhoto} />) : <NoProfileImg name={qOriginalOwner.name} size={"25"} />}
                            </Col>
                            <Col className="col-11">
                                <div id='profile-info'>
                                    <h6 style={{ textAlign: "left" }}>{qOriginalOwner.name} <span style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>@{qOriginalOwner.userName} . {getTime(originalTweet.createdAt)}</span></h6>
                                </div>
                                <div id="content">
                                    <p style={{ textAlign: "left" }}>
                                        {originalTweet.content}
                                    </p>
                                </div>
                                {originalTweet.image && (<div id='photo' className='my-2 d-flex'>
                                    <img className='tweet-img' src={originalTweet.image} />
                                </div>)}
                            </Col>
                        </Row>
                    </div>
                </div>}


                <div style={{ textAlign: "left", fontSize: "1rem", color: "rgb(101, 119, 134)" }}>
                    <span >{postedWhen(tweet.createdAt)} </span>
                </div>
                <div style={{ borderBottom: "1px solid #E1E8ED" }} className='my-2' />

                {((rtCount + quoteCount + likeCount) != 0) &&
                    <div className='my-3 d-flex'>
                        {(rtCount != 0) && (<div className='me-4 rt-and-likes-show' onClick={showRt}>
                            <span style={{ fontWeight: "bold" }}>{rtCount}</span>
                            <span style={{ color: "rgb(101, 119, 134)", fontSize: "0.9rem", fontWeight: "400" }}> Retweets</span>
                        </div>)}
                        {(quoteCount != 0) && (<div className='me-4 rt-and-likes-show' onClick={showQuotes}>
                            <span style={{ fontWeight: "bold" }}>{quoteCount}</span>
                            <span style={{ color: "rgb(101, 119, 134)", fontSize: "0.9rem", fontWeight: "400" }}> Quotes</span>
                        </div>)}
                        {(likeCount != 0) && (<div className='me-4 rt-and-likes-show' onClick={showLikes}>
                            <span style={{ fontWeight: "bold" }}>{likeCount}</span>
                            <span style={{ color: "rgb(101, 119, 134)", fontSize: "0.9rem", fontWeight: "400" }}> Likes</span>
                        </div>)}
                    </div>}


                {((rtCount + quoteCount + likeCount) != 0) && <div style={{ borderBottom: "1px solid #E1E8ED" }} className='my-2' />}










                <div style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>
                    {currentUser.userInfo === undefined ? (
                        <div className='d-flex'>
                            <div className='comment' style={{ marginLeft: "40px", marginRight: "30px" }}>
                                <div className='me-4 d-flex'>
                                    <i className='fa-regular fa-comment mt-1' style={{ fontSize: "1.4rem" }}> </i>
                                </div>
                            </div>
                            <div className='retweet' style={{ marginLeft: "30px", marginRight: "30px" }}>
                                <div className='mx-4 d-flex'>
                                    <RtDropdown count={tweet.retweetedBy.length + tweet.quotedBy.length} />{/*this should redirect to sign up or login */}
                                </div>

                            </div>
                            <div className='like' style={{ marginLeft: "30px", marginRight: "30px" }}>
                                <div className='mx-4'>
                                    <div className='d-flex'><i className='fa-regular fa-heart mt-1' style={{ fontSize: "1.4rem" }} />                                        <p className='ps-2'>{tweet.likedBy.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='comment' style={{ marginLeft: "30px", marginRight: "30px" }}>
                                <div className='mx-4'>
                                    <i className="fa-solid fa-arrow-up-from-bracket mt-1" style={{ fontSize: "1.4rem" }}></i>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex'>
                            <div className='comment' style={{ marginLeft: "40px", marginRight: "30px" }} onClick={(e) => reply(e)}>
                                {isReplied(tweet, currentUser.userInfo) ?
                                    <div className='mx-4 d-flex' style={{ color: "#1DA1F2" }}>
                                        <i className='fa-solid fa-comment mt-1' style={{ fontSize: "1.4rem" }}> </i>
                                    </div>
                                    : <div className='mx-4 d-flex'>
                                        <i className='fa-regular fa-comment mt-1' style={{ fontSize: "1.4rem" }}> </i>
                                    </div>}
                            </div>
                            <div className='retweet' style={{ marginLeft: "30px", marginRight: "30px" }}>
                                {(tweet.retweetedBy.includes(currentUser.userInfo._id)) ?
                                    <div className='mx-4' style={{ color: "rgb(2, 184, 2)" }}>
                                        <RtDropdown index={-1} tweet={tweet} count={tweet.retweetedBy.length + tweet.quotedBy.length} event={chooseAction} />

                                    </div>
                                    : <div className='mx-4'>
                                        <RtDropdown index={-1} tweet={tweet} count={tweet.retweetedBy.length + tweet.quotedBy.length} event={chooseAction} />
                                    </div>}

                            </div>
                            <div className='like' style={{ marginLeft: "30px", marginRight: "30px" }} onClick={(e) => like(e, tweet)}>
                                <div className='mx-4'>
                                    {(tweet.likedBy.includes(currentUser.userInfo._id)) ?
                                        <div className='d-flex' style={{ color: "rgb(224,36,94)" }}><i style={{ fontSize: "1.4rem" }} className='fa-solid fa-heart mt-1' /></div>
                                        : <div className='d-flex'><i className='fa-regular fa-heart mt-1' style={{ fontSize: "1.4rem" }} /></div>}

                                </div>
                            </div>
                            <div className='comment' style={{ marginLeft: "30px", marginRight: "30px" }}>
                                <div className='mx-4'>
                                    <i className="fa-solid fa-arrow-up-from-bracket mt-1" style={{ fontSize: "1.4rem" }}></i>
                                </div>
                            </div>
                        </div>

                    )}
                </div>

                <div style={{ borderBottom: "1px solid #E1E8ED" }} className='my-2' />

                <div className='my-3 d-flex'>
                    <div className='my-auto'>
                        {currentUser.userInfo.profilePhoto ? (<img className='profile-img' src={currentUser.userInfo.profilePhoto} />) : <NoProfileImg name={currentUser.userInfo.name} size={"40"} />}
                    </div>
                    <form className='d-flex' onSubmit={replyTweet} style={{ width: "150%" }}>
                        <textarea className='textArea-individual' placeholder="Tweet your reply?" />
                        <Button type="submit" style={{ height: "fitContent" }} className='my-3 mx-2 tweet-btn' variant='info'><span className='mx-1'>Reply</span></Button>

                    </form>

                </div>

            </div>




            <div className='replies'>
                {tweet.replies.map((reply, index) => {
                    const replyOwner = getUserById(allUsers, reply.replyedBy)
                    const content = reply.relpy  //  !!!!!!!!!!!!!!!!!!!!change itt!!!!!!!!!!!!!!!!
                    return (
                        <div className='my-3' key={index}>
                            <Row className='mx-1'>
                                <Col className="col-1 profile-col">
                                    {replyOwner.profilePhoto ? (<img className='profile-img' src={replyOwner.profilePhoto} />) : <NoProfileImg name={replyOwner.name} size={"40"} />}
                                </Col>
                                <Col className="col-11">
                                    <div id='profile-info'>
                                        <h6 style={{ textAlign: "left" }}><Link className='tweet-owner-name' to={"/" + replyOwner.userName} >{replyOwner.name}</Link> <span style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>@{replyOwner.userName} . {getTime(reply.createdAt.default)}</span></h6>
                                    </div>
                                    <div id="content">
                                        <p style={{ textAlign: "left" }}>
                                            {content}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            {(tweet.replies.length - 1 > index) && <div style={{ borderBottom: "1px solid #E1E8ED" }} className='my-2' />}
                        </div>

                    )
                })}
            </div>
        </div>

    )
}
