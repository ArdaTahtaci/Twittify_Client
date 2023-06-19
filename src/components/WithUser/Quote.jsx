import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { quote } from '../../redux/tweet/actionsTweets'
import NoProfileImg from '../NoProfileImg'
import { Button, Col, Row } from 'react-bootstrap'
import { findOwner } from '../../utils/ownerOfTweet'
import { getTime } from '../../utils/calculateTime'

export default function Quote(props) {

    const dispatch = useDispatch()



    const quoteTweet = (e) => {
        e.preventDefault()
        const text = e.target[0].value
        dispatch(quote(props.currentUser, props.tweet, text))

        props.closeModel()
    }
    /**
     * currentUser={currentUser}
        tweet={tweet}
        closeModel={closeReply}
        tweetOwner={thisTweetOwner} */

    const handleClick = (event) => {
        event.stopPropagation()
        props.closeModel()
    }
    return (
        <div className='quote-container' onClick={(e) => e.stopPropagation()}>

            <div className='model-header'>
                <button type='button' className='btn-close d-flex mx-2 my-3' onClick={handleClick}></button>
            </div>
            <div className='my-3'>

                <Row className='this-tweet mx-auto'>
                    <Col className="col-1 profile-col">
                        <div className='ms-1'>
                            {props.currentUser.userInfo.profilePhoto ? (
                                <img className='profile-img-reply' src={props.currentUser.userInfo.profilePhoto} />
                            ) : (
                                <NoProfileImg name={props.currentUser.userInfo.name} size={"40"} />
                            )}
                        </div>
                    </Col>
                    <Col className="col-11 ">
                        <form onSubmit={quoteTweet}>
                            <div >
                                <textarea style={{ borderRadius: "20px" }} className='textArea' placeholder="Add a comment" />
                            </div>

                            <div className='quotes-original'>
                                <Row>
                                    <Col className="col-1 profile-col">
                                        {props.tweetOwner.profilePhoto ? (<img className='profile-img-quote' src={props.tweetOwner.profilePhoto} />) : <NoProfileImg name={props.tweetOwner.name} size={"25"} />}
                                    </Col>
                                    <Col className="col-11">
                                        <div id='profile-info'>
                                            <h6 style={{ textAlign: "left" }}>{props.tweetOwner.name} <span style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>@{props.tweetOwner.userName} . {getTime(props.tweet.createdAt)}</span></h6>
                                        </div>
                                        <div id="content">
                                            <p style={{ textAlign: "left" }}>
                                                {props.tweet.content}
                                            </p>
                                        </div>
                                        {props.tweet.image && (<div id='photo' className='my-2'>
                                            <img className='tweet-img' src={props.tweet.image} />
                                        </div>)}
                                    </Col>
                                </Row>
                            </div>

                            <div >

                                <Button type='submit' className='my-2 tweet-btn' variant='info'>Tweet</Button>
                            </div>
                        </form>
                    </Col>
                </Row>







            </div>
        </div>
    )
}
