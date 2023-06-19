import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { isFollowing } from '../../utils/followOperations.js'
import { useDispatch } from 'react-redux'
import { follow, unfollow } from '../../redux/user/userActions.js'

export default function AnyProfileButton(props) {

    const [isFollow, setIsFollow] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const dispatch = useDispatch()

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    useEffect(() => {
        if (isFollowing(props.currentUser.userInfo, props.profileOwner)) setIsFollow(true)
        else setIsFollow(false)
    }, [])

    const followUser = () => {
        dispatch(follow(props.currentUser, props.profileOwner))
        setIsFollow(true)
    }

    const unfollowUser = () => {
        dispatch(unfollow(props.currentUser, props.profileOwner))
        setIsFollow(false)
    }


    return (
        <div>
            {isFollow ? (
                <Button
                    disabled={props.currentUser.userInfo.deleted ? true : false}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className='me-3 mt-2'
                    style={{
                        position: "relative",
                        float: "right",
                        borderRadius: "20px",
                        backgroundColor: isHovered ? "#fcdede" : "#fff",
                        color: isHovered ? "red" : "#000",
                        border: isHovered ? "1px solid #ff9898" : "1px solid #d4d4d4"
                    }}
                    onClick={unfollowUser}
                >
                    <span className='mx-2 my-1'>{isHovered ? 'Unfollow' : 'Following'}</span></Button>
            ) : (
                <Button disabled={props.currentUser.userInfo.deleted ? true : false} className='flw-btn me-3 mt-2' variant='dark' onClick={followUser}><span className='mx-2 my-1'>Follow</span></Button>

            )}
        </div>
    )
}
