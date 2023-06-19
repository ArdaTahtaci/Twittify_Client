import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import NoProfileImg from '../NoProfileImg'
import { getTime } from '../../utils/calculateTime'
import { reply } from '../../redux/tweet/actionsTweets'

export default function Reply(props) {

    const dispatch = useDispatch()

    const replyTweet = (e) => {
        e.preventDefault()
        const text = e.target[0].value
        dispatch(reply(props.currentUser, props.tweet, text))
        props.closeModel()
    }

    const handleClick = (event) => {
        event.stopPropagation()
        props.closeModel()
    }

    return (

        <div className='reply-container' onClick={(e) => e.stopPropagation()}>

            <div className='model-header'>
                <button type='button' className='btn-close d-flex mx-2 my-3' onClick={handleClick}></button>
            </div>
            <Row className='this-tweet mx-auto mt-4'>
                <Col className="col-1 profile-col">
                    <div className='ms-1'>
                        {props.tweetOwner.profilePhoto ? (
                            <img className='profile-img-reply' src={props.tweetOwner.profilePhoto} />
                        ) : (
                            <NoProfileImg name={props.tweetOwner.name} size={"40"} />
                        )}
                    </div>
                </Col>
                <Col className="col-11">

                    <div id='profile-info'>
                        <h6 style={{ textAlign: "left" }}>{props.tweetOwner.name} <span style={{ fontSize: "0.9rem", color: "rgb(101, 119, 134)" }}>@{props.tweetOwner.userName} . {getTime(props.tweet.createdAt)}</span></h6>
                    </div>
                    <div id="content">
                        <p style={{ textAlign: "left" }}>
                            {props.tweet.content}
                        </p>
                        <p style={{ textAlign: "left", color: "rgb(101, 119, 134)" }}>
                            Replying to <span className='link'>@{props.tweetOwner.userName}</span>
                        </p>
                    </div>

                    {props.tweet.image && (<div id='photo' className='my-2'>
                        <img className='reply-img' src={props.tweet.image} />
                    </div>)}

                </Col>
            </Row>
            <Row className='create-reply mx-auto my-2'>
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
                    <form onSubmit={replyTweet}>
                        <div >
                            <textarea style={{ borderRadius: "20px" }} className='textArea' placeholder="Tweet your reply?" />
                        </div>
                        <div className=''>

                            <Button type='submit' className='my-2 tweet-btn' variant='info'>Reply</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>





    )
}
