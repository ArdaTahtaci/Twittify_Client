import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { NavLeftL, NavLeftS } from './NavLeft'
import Suggestions from './Suggestions'
import Links from '../Links'
import { Col, Container, Row } from 'react-bootstrap'
import useWindowSize from '../../utils/useWindowSize.js'
import { getAllUsers } from '../../redux/user/userActions.js'
import Loader from '../Loader'
import { getAllTweets } from '../../redux/tweet/actionsTweets.js'

import { renderByParams } from '../../utils/choosePage'

export default function Main() {

    const params = useParams()
    const dispatch = useDispatch()
    const location = useLocation()

    const isLoggedIn = useSelector(state => state.user.session.isLoggedIn)
    const navigate = useNavigate()

    const [windowWidth, windowHeight] = useWindowSize()

    const [lScreen, setLScreen] = useState(false)
    const [mScreen, setMScreen] = useState(false)
    const [sScreen, setSScreen] = useState(false)

    const allTweets = useSelector(state => state.tweet.allTweets)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (allTweets) setIsLoaded(true)
        else setIsLoaded(false)
    }, [allTweets])

    useEffect(() => {

        if (allTweets) setIsLoaded(true)
        else setIsLoaded(false)
        dispatch(getAllTweets())
        dispatch(getAllUsers())
        if (!isLoggedIn) navigate("/")


    }, [])


    useEffect(() => {

        if (windowWidth > 1255) {
            setLScreen(true)
            setMScreen(false)
            setSScreen(false)
        }
        else if (windowWidth > 975) {
            setLScreen(false)
            setMScreen(true)
            setSScreen(false)
        }
        else {
            setLScreen(false)
            setMScreen(false)
            setSScreen(true)
        }
    }, [windowWidth])






    return (
        <div>

            {isLoaded ? (
                <div>
                    {isLoggedIn && (
                        <div>
                            <Container className='outermost-container'>

                                <Row >
                                    {lScreen ? (
                                        <Col style={{ position: "realtive" }} className='left-side col-2'>
                                            <NavLeftL />
                                        </Col>
                                    ) : (
                                        <Col style={{ position: "realtive" }} className='left-side col-1'>
                                            <NavLeftS />
                                        </Col>
                                    )}

                                    {lScreen && (
                                        <Col className='time-line col-6'>
                                            {renderByParams(params, location)}
                                        </Col>
                                    )}
                                    {mScreen && (
                                        <Col className='time-line col-7'>
                                            {renderByParams(params, location)}
                                        </Col>
                                    )}
                                    {sScreen && (
                                        <Col className='time-line col-11'>
                                            {renderByParams(params, location)}
                                        </Col>
                                    )}

                                    {(mScreen || lScreen) && (
                                        <Col className='col-4'>
                                            <div className='sticky'>
                                                <Suggestions />
                                                <Links />
                                            </div>

                                        </Col>
                                    )}


                                </Row>

                            </Container>
                        </div>
                    )}
                </div>
            ) : (<Loader />)}
        </div>



    )
}
