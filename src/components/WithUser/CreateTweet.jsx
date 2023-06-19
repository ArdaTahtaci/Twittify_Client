import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createOriginalTweet } from '../../redux/tweet/actionsTweets.js'
import NoProfileImg from "../NoProfileImg"
import { useNavigate } from 'react-router-dom'

export default function CreateTweet() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let currentUser = useSelector(state => state.user.session.currentUser)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (currentUser) setIsLoaded(true)
        else setIsLoaded(false)
    }, [])

    useEffect(() => {
        if (currentUser) setIsLoaded(true)
        else setIsLoaded(false)
    }, [currentUser])

    const [file, setFile] = useState(null)

    const convert2base64 = (file) => {
        const reader = new FileReader()

        reader.onloadend = () => {
            setFile(reader.result.toString())
        }
        reader.readAsDataURL(file)
    }

    const createTweet = (e) => {
        e.preventDefault()
        const tweet = {
            content: e.target[0].value,
            img: file,
            postedBy: currentUser.userInfo._id,
        }
        if (tweet.content.length > 0)
            dispatch(createOriginalTweet(currentUser, tweet))
    }


    return (
        <div className='create-tweet'>
            <Container>
                <Row>
                    <Col className="col-1 profile-col" style={{ cursor: "pointer" }} onClick={() => navigate("/" + currentUser.userInfo.userName)}>
                        <div className='profile-photo mt-2 ms-1'>
                            {(currentUser.userInfo.profilePhoto) ? (
                                <div>
                                    <img className='profile-img' src={currentUser.userInfo.profilePhoto} />

                                </div>)
                                : <NoProfileImg name={currentUser.userInfo.name} size={"50"} />}
                        </div>
                    </Col>
                    <Col className="col-11">
                        <form onSubmit={createTweet}>
                            <div >
                                <textarea className='textArea' placeholder="What's happening?" />
                            </div>
                            <div className='d-flex'>
                                <div className='my-1 mx-2 custom-file-upload' style={{ width: "100%", position: "relative" }}>
                                    <input
                                        type="file"
                                        accept='image/*'
                                        onChange={({ target: { files } }) => convert2base64(files[0])}
                                    />
                                    <button className='btn btn-info'>Select Photo</button>
                                </div>
                                <Button type='submit' className='my-2 tweet-btn' variant='info'>Tweet</Button>
                            </div>
                        </form>

                    </Col>
                </Row>
            </Container>


        </div>
    )
    /**
.custom-file-upload::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-upload::-webkit-input {
  visibility: hidden;
}


.custom-file-upload::before {
  content: 'Select Photo';
  border: 1px solid #1da1f2;
  color: #1da1f2;
  background-color: #fff;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 20px;
  white-space: nowrap;
  width: fit-content;
}

.custom-file-upload:hover::before {
  background-color: #1da1f2;
  color: #fff;
} */
}
