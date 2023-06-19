import React, { useEffect, useState } from 'react'
import Tweets from '../Tweets'
import { Col, Row } from 'react-bootstrap'
import CreateTweet from './CreateTweet'
import { useSelector } from 'react-redux'
import { getFollowingTweets } from '../../utils/followOperations'

export default function Home() {

    const [select, setSelect] = useState(true)
    const allTweets = useSelector(state => state.tweet.allTweets)
    const currentUser = useSelector(state => state.user.session.currentUser.userInfo)
    const [followingTweets, setFollowingTweets] = useState(undefined)

    useEffect(() => {
        setFollowingTweets(getFollowingTweets(allTweets, currentUser))
    }, [])
    useEffect(() => {
        setFollowingTweets(getFollowingTweets(allTweets, currentUser))
    }, [allTweets])

    useEffect(() => {
        setFollowingTweets(getFollowingTweets(allTweets, currentUser))
    }, [currentUser])

    useEffect(() => {

        let btn1 = document.getElementById("select-btn-1").style
        let btn2 = document.getElementById("select-btn-2").style
        if (select) {
            btn2.borderBottom = "none"
            btn1.borderBottom = "4px solid #1DA1F2"
            btn1.color = "#000"
            btn2.color = "rgb(101, 119, 134)"
            btn1.fontWeight = "500"
            btn2.fontWeight = "300"
        } else {
            btn1.borderBottom = "none"
            btn2.borderBottom = "4px solid #1DA1F2"
            btn2.color = "#000"
            btn1.color = "rgb(101, 119, 134)"
            btn2.fontWeight = "500"
            btn1.fontWeight = "300"
        }

    }, [select])
    return (
        <div >
            <div className='sticky-header'>
                <div style={{ width: "100%" }}>
                    <h4 style={{ fontWeight: "bold" }} className='d-flex pt-2 ps-1 my-1'>Home</h4>
                </div>
                <Row style={{ width: "100%" }} className='mx-auto'>
                    <Col className="col-6 select" onClick={() => setSelect(true)}>
                        <div style={{ width: "fit-content" }} className='py-2 mx-auto' id='select-btn-1'><p >For you</p></div>

                    </Col>
                    <Col className="col-6 select" onClick={() => setSelect(false)}>
                        <div style={{ width: "fit-content" }} className='py-2 mx-auto select-btn' id='select-btn-2'><p >Following</p></div>
                    </Col>
                </Row>
            </div>
            <CreateTweet />
            {select ? (
                <Tweets tweets={allTweets} />
            ) : (
                <Tweets tweets={followingTweets} />
            )}

        </div>
    )
}
