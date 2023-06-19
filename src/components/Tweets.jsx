import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import { getTime } from '../utils/calculateTime'
import { deleteTwt, likeTweet, quote, retweet } from '../redux/tweet/actionsTweets.js'
import NoProfileImg from './NoProfileImg'
import Reply from './WithUser/Reply'
import { findOriginalTweet, findOwner, findRtOwner } from '../utils/ownerOfTweet'
import { isReplied } from '../utils/isReplied'
import RtDropdown from './RtDropdown'
import Quote from './WithUser/Quote'
import { Link, useNavigate } from 'react-router-dom'
export default function Tweets(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const allTweets = useSelector(state => state.tweet.allTweets)
    const allUsers = useSelector(state => state.user.allUsers)
    const currentUser = useSelector(state => state.user.session.currentUser)
    const isLoggedIn = useSelector(state => state.user.session.isLoggedIn)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if ((allTweets !== undefined) && Array.isArray(allUsers) && allUsers.length > 0) setIsLoaded(true)

    }, [allTweets, allUsers])


    const like = (event, tweet) => {
        event.stopPropagation()
        dispatch(likeTweet(currentUser, tweet))
    }


    const [showQuote, setShowQuote] = useState(false)
    const closeQuote = () => setShowQuote(false);



    const chooseAction = (event, tweet, index) => {
        if (event === "retweet") dispatch(retweet(currentUser, tweet))
        else if (event === "quote") {
            setShowQuote(true)
            setTweetIndex(index)
        }
    }


    const [tweetIndex, setTweetIndex] = useState(-1)
    const reply = (event, index) => {
        event.stopPropagation()
        setShowReply(true)
        setTweetIndex(index)
    }

    const [showReply, setShowReply] = useState(false)
    const closeReply = () => setShowReply(false);


    const goToTweet = (event, tweet) => {
        event.stopPropagation()
        const owner = findOwner(tweet, allUsers)
        navigate("/" + owner.userName + "/status/" + tweet._id)
    }

    const navigateToProfile = (event, tweetOwner) => {
        event.stopPropagation()
        navigate("/" + tweetOwner.userName)
    }

    const deleteTweet = (e, tweet) => {
        e.stopPropagation()
        dispatch(deleteTwt(currentUser, tweet))
    }

    return (
        <div className='mt-0'>

            {isLoaded ? (props.tweets.map((tweet, index) => {

                const thisTweetOwner = findOwner(tweet, allUsers)
                let rtOwner
                if (tweet.type === "retweet") {
                    rtOwner = findRtOwner(tweet, allUsers)
                }


                let qOriginalOwner, originalTweet
                if (tweet.type === "quote") {

                    originalTweet = findOriginalTweet(tweet, allTweets)
                    qOriginalOwner = findOwner(originalTweet, allUsers)
                }
                if (thisTweetOwner.deleted !== true)
                    return (

                        <div key={index} className='tweet' onClick={(event) => goToTweet(event, tweet)}>
                            {(showReply && index === tweetIndex) && <Reply
                                currentUser={currentUser}
                                tweet={tweet}
                                closeModel={closeReply}
                                tweetOwner={thisTweetOwner}
                            />}
                            {(showQuote && index === tweetIndex) && <Quote
                                currentUser={currentUser}
                                tweet={tweet}
                                closeModel={closeQuote}
                                tweetOwner={thisTweetOwner}
                            />}

                            {tweet.type === "retweet" && <div>
                                <Row style={{ color: "rgb(101, 119, 134)" }}>
                                    <Col className='col-1 profile-col'><i className='fa-solid fa-retweet'></i></Col>
                                    <Col className='col-11 d-flex rtText'>{rtOwner.name} Retweeted</Col>
                                </Row>
                            </div>}
                            <Row>
                                <Col className="col-1 profile-col" onClick={(e) => navigateToProfile(e, findOwner(tweet, allUsers))}>

                                    {findOwner(tweet, allUsers).profilePhoto ? (<img className='profile-img' src={findOwner(tweet, allUsers).profilePhoto} />) : <NoProfileImg name={findOwner(tweet, allUsers).name} size={"50"} />}
                                </Col>
                                <Col className="col-11">
                                    <div className='d-flex' style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
                                        <h6 style={{ textAlign: "left" }}><Link className='tweet-owner-name' to={"/" + thisTweetOwner.userName} >{thisTweetOwner.name}</Link> <span style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>@{thisTweetOwner.userName} . {getTime(tweet.createdAt)}</span></h6>
                                        {/* {(isLoggedIn && (findOwner(tweet, allUsers)._id === currentUser.userInfo._id)) && <i onClick={(e) => deleteTweet(e, tweet)} className="fa-solid fa-bars" style={{ position: "absolute", right: "30px", color: "#898d94" }}></i>} */}
                                    </div>
                                    <div id="content">
                                        <p style={{ textAlign: "left" }}>
                                            {tweet.content}
                                        </p>
                                    </div>

                                    {tweet.image && (<div id='photo' className='my-2 d-flex'>
                                        <img className='tweet-img' src={tweet.image} />
                                    </div>)}

                                    {tweet.type === "quote" && (<div className='my-3' onClick={(event) => goToTweet(event, originalTweet)}>
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
                                    </div>)}



                                    <div id='interactions' className=' mt-3' style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>
                                        {currentUser.userInfo === undefined ? (
                                            <div className='d-flex'>
                                                <div className='comment' onClick={() => reply(index)}>
                                                    <div className='me-4 d-flex'>
                                                        <i className='fa-regular fa-comment mt-1'> </i>
                                                        <p className='ps-3'>{tweet.quotedBy.length}</p>
                                                    </div>
                                                </div>
                                                <div className='retweet'>
                                                    <div className='mx-4 d-flex'>
                                                        <RtDropdown count={tweet.retweetedBy.length + tweet.quotedBy.length} />{/*this should redirect to sign up or login */}
                                                    </div>

                                                </div>
                                                <div className='like' onClick={() => like(tweet)}>
                                                    <div className='mx-4'>
                                                        <div className='d-flex'><i className='fa-regular fa-heart mt-1' />
                                                            <p className='ps-2'>{tweet.likedBy.length}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='comment' onClick={(e) => e.stopPropagation()}>
                                                    <div className='mx-4'>
                                                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='d-flex'>
                                                <div className='comment' onClick={(e) => reply(e, index)}>
                                                    {isReplied(tweet, currentUser.userInfo) ?
                                                        <div className='mx-4 d-flex' style={{ color: "#1DA1F2" }}>
                                                            <i className='fa-solid fa-comment mt-1'> </i>
                                                            <p className='ps-3'>{tweet.replies.length}</p>
                                                        </div>
                                                        : <div className='mx-4 d-flex'>
                                                            <i className='fa-regular fa-comment mt-1'> </i>
                                                            <p className='ps-3'>{tweet.replies.length}</p>
                                                        </div>}
                                                </div>
                                                <div className='retweet' onClick={(e) => e.stopPropagation()}>
                                                    {(tweet.retweetedBy.includes(currentUser.userInfo._id)) ?
                                                        <div className='mx-4' style={{ color: "rgb(2, 184, 2)" }}>
                                                            <RtDropdown index={index} tweet={tweet} count={tweet.retweetedBy.length + tweet.quotedBy.length} event={chooseAction} />

                                                        </div>
                                                        : <div className='mx-4'>
                                                            <RtDropdown index={index} tweet={tweet} count={tweet.retweetedBy.length + tweet.quotedBy.length} event={chooseAction} />
                                                        </div>}

                                                </div>
                                                <div className='like' onClick={(e) => like(e, tweet)}>
                                                    <div className='mx-4'>
                                                        {(tweet.likedBy.includes(currentUser.userInfo._id)) ?
                                                            <div className='d-flex' style={{ color: "rgb(224,36,94)" }}><i className='fa-solid fa-heart mt-1' /><p className='ps-2'>{tweet.likedBy.length}</p></div>
                                                            : <div className='d-flex'><i className='fa-regular fa-heart mt-1' /><p className='ps-2'>{tweet.likedBy.length}</p></div>}

                                                    </div>
                                                </div>,
                                                <div className='comment' onClick={(e) => e.stopPropagation()}>
                                                    <div className='mx-4'>
                                                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                                    </div>
                                                </div>
                                            </div>

                                        )}





                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )
            })) : (<Loader />)}

        </div>





    )
}



