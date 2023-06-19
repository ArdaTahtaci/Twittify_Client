import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NoProfileImg from '../NoProfileImg'
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { logoutU } from '../../redux/user/userActions'
import { logoutT } from '../../redux/tweet/actionsTweets'

export function NavLeftL() {

    const currentUser = useSelector(state => state.user.session.currentUser.userInfo)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (currentUser) setIsLoaded(true)
        else setIsLoaded(false)
    }, [])

    useEffect(() => {
        if (currentUser) setIsLoaded(true)
        else setIsLoaded(false)
    }, [currentUser])

    const [loader, setLoader] = useState(false)

    const handleLogout = () => {
        dispatch(logoutU())
        dispatch(logoutT())
        navigate("/")
    }

    return (
        <div>
            {loader && <Loader />}
            {isLoaded ? (
                <div style={{ position: "fixed", top: "0", bottom: "30px" }}>
                    <div className='d-flex'>
                        <h3 className='py-2 px-2 border-radius-lg'>
                            <i className="fa-brands fa-twitter mb-1" style={{ color: "#1DA1F2" }}></i>
                        </h3>
                    </div>
                    <div className='d-flex' onClick={() => navigate("/home")}>
                        <h3 className='py-2 px-2 border-radius-lg'>
                            <i className="fa-solid fa-house mb-2 mx-2" style={{ color: "#000000" }}></i><span className='leftSpan mx-3'>Home</span>
                        </h3>
                    </div>
                    <div className='d-flex'>
                        <h3 className='py-2 px-2 border-radius-lg'>
                            <i className="fa-solid fa-hashtag mb-2 mx-2" style={{ color: "#000000" }}></i><span className='leftSpan mx-3'>Explore</span>
                        </h3>

                    </div>
                    <div className='d-flex'>
                        <h3 className='py-2 px-2 border-radius-lg'>
                            <i className="fa-solid fa-bell  mb-2" style={{ color: "#000000" }}></i><span className='leftSpan ms-3 me-2'>Notifications</span>
                        </h3>

                    </div>
                    <div className='d-flex' onClick={() => navigate("/" + currentUser.userName)}>
                        <h3 className='py-2 px-2 border-radius-lg'>
                            <i className="fa-solid fa-user  mb-2 mx-2" style={{ color: "#000000" }}></i><span className='leftSpan mx-3'>Profile</span>
                        </h3>
                    </div>
                    <div className='d-flex'>
                        <h3 className='py-2 px-2 border-radius-lg'>
                            <i className="fa-solid fa-regular fa-gear mb-2 mx-2" style={{ color: "#000000" }}></i><span className='leftSpan mx-3'>Settings</span>
                        </h3>
                    </div>


                    <Dropdown >
                        <div className='for-logoutL'>
                            <Dropdown.Toggle
                                className='dropdown-toggle d-flex'
                                as="span"
                                variant="light"
                                id="dropdown-basic"
                            >

                                <div className='d-flex mx-2 my-1'>
                                    {currentUser.profilePhoto ? (
                                        <img className='profile-img-logout' src={currentUser.profilePhoto} />
                                    ) : (
                                        <NoProfileImg name={currentUser.name} size={"45"} />
                                    )}
                                    <div className='ms-2'>
                                        <h6 className='mt-3 mb-0 pb-0' style={{ fontSize: "0.5" }}>{currentUser.name}</h6>
                                        <h6 className='mb-3' style={{ fontSize: "0.3", color: "rgb(101, 119, 134)" }}>@{currentUser.userName}</h6>
                                    </div>
                                </div>



                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item onClick={handleLogout}><span>
                                    Logout
                                </span></Dropdown.Item>
                            </Dropdown.Menu>
                        </div>
                    </Dropdown>




                </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export function NavLeftS() {


    const currentUser = useSelector(state => state.user.session.currentUser.userInfo)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const sabitDivRef = useRef(null);

    useEffect(() => {
        if (sabitDivRef.current) {
            const ustDivSolPozisyon = sabitDivRef.current.parentNode.offsetLeft;
            sabitDivRef.current.style.left = `${ustDivSolPozisyon}px`;
        }

        if (currentUser) setIsLoaded(true)
        else setIsLoaded(false)
    }, []);

    useEffect(() => {
        if (currentUser) setIsLoaded(true)
        else setIsLoaded(false)
    }, [currentUser])

    const [loader, setLoader] = useState(false)

    const handleLogout = () => {

        dispatch(logoutU())
        dispatch(logoutT())
        navigate("/")

    }

    return (
        <div>
            {loader && <Loader />}
            {isLoaded ? (
                <div style={{ position: "fixed", top: "0", bottom: "30px" }}>
                    <div className='d-flex my-2'>
                        <h3 className='py-2 px-2 border-radius'>
                            <i className="fa-brands fa-twitter" style={{ color: "#1DA1F2", fontSize: "1.5rem" }}></i>
                        </h3>
                    </div>
                    <div className='d-flex my-2' onClick={() => navigate("/home")}>
                        <h3 className='py-2 px-2 border-radius'>
                            <i className="fa-solid fa-house" style={{ color: "#000000", fontSize: "1.5rem" }}></i>
                        </h3>
                    </div>
                    <div className='d-flex my-2'>
                        <h3 className='py-2 px-2 border-radius'>
                            <i className="fa-solid fa-hashtag fa-lg" style={{ color: "#000000", fontSize: "1.5rem" }}></i>
                        </h3>
                    </div>
                    <div className='d-flex my-2'>
                        <h3 className='py-2 px-2 border-radius'>
                            <i className="fa-solid fa-bell " style={{ color: "#000000", fontSize: "1.5rem" }}></i>
                        </h3>

                    </div>
                    <div className='d-flex my-2' onClick={() => navigate("/" + currentUser.userName)}>
                        <h3 className='py-2 px-2 border-radius'>
                            <i className="fa-solid fa-user " style={{ color: "#000000", fontSize: "1.5rem" }}></i>
                        </h3>
                    </div>

                    <div className='d-flex my-2'>
                        <h3 className='py-2 px-2 border-radius'>
                            <i className="fa-solid fa-regular fa-gear" style={{ color: "#000000", fontSize: "1.5rem" }}></i>
                        </h3>
                    </div>


                    <Dropdown >
                        <div className='for-logout'>
                            <Dropdown.Toggle
                                className='dropdown-toggle d-flex'
                                as="span"
                                variant="light"
                                id="dropdown-basic"
                            >

                                {currentUser.profilePhoto ? (
                                    <img className='profile-img-logout' src={currentUser.profilePhoto} />
                                ) : (
                                    <NoProfileImg name={currentUser.name} size={"45"} />
                                )}



                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item onClick={handleLogout}><span>
                                    Logout
                                </span></Dropdown.Item>
                            </Dropdown.Menu>
                        </div>
                    </Dropdown>




                </div>
            ) : (
                <Loader />
            )}
        </div>

    )
}
