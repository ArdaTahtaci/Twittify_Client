import React, { useEffect, useState } from 'react'
import Login from './Login';
import { Col, Container, Row } from 'react-bootstrap';
import LargeWindow from './LargeWindow';
import Links from '../Links';
import ButtomNav from './ButtomNav';
import TimeLine from './TimeLine';
import SignUp from './SignUp';
import { NavIconL, NavIconS } from './NavIcons';
import useWindowSize from '../../utils/useWindowSize.js';
import { getAllTweets } from '../../redux/tweet/actionsTweets.js';
import { getAllUsers } from '../../redux/user/userActions.js';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function RootUser() {

  const dispatch = useDispatch()
  const allTweets = useSelector(state => state.tweet.allTweets)
  const allUsers = useSelector(state => state.user.allUsers)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (allTweets && allUsers) setIsLoaded(true)
  }, [allTweets, allUsers])


  useEffect(() => {
    setIsLoaded(true)
    dispatch(getAllTweets())
    dispatch(getAllUsers())
  }, [])


  const [windowWidth, windowHeight] = useWindowSize()

  const [lScreen, setLScreen] = useState(false)
  const [mScreen, setMScreen] = useState(false)
  const [sScreen, setSScreen] = useState(false)

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

  const [showLogin, setShowLogin] = useState(false);
  const closeLogin = () => setShowLogin(false);

  const [showSignUp, setShowSignUp] = useState(false);
  const closeSignUp = () => setShowSignUp(false);

  const setLogin = () => {
    setShowSignUp(false)
    setShowLogin(true)

  }
  const setSignUp = () => {
    setShowLogin(false)
    setShowSignUp(true)
  }

  return (
    <div >
      {isLoaded ? (
        <div>
          {showLogin && <Login closeModel={closeLogin} />}
          {showSignUp && <SignUp closeModel={closeSignUp} />}

          <Container >

            <Row className='py-2'>

              {lScreen ? (
                <Col className='left-side col-2'>
                  <NavIconL />
                </Col>
              ) : (
                <Col className='left-side col-1'>
                  <NavIconS />
                </Col>
              )}

              <Col lg={6} md={10} sm={10} className='time-line'>
                <TimeLine />
              </Col>

              {(mScreen || lScreen) && (
                <Col className='col-4'>
                  <div className='sticky'>
                    <LargeWindow />
                    <Links />
                  </div>

                </Col>
              )}

            </Row>

          </Container>

          <ButtomNav login={setLogin} signUp={setSignUp} />
        </div>
      ) : (<Loader />)}


    </div>
  )
}
