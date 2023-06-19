import React, { useEffect, useState } from 'react'

export default function NoProfileImg(props) {

    const [firstChar, setFirstChar] = useState('')

    useEffect(() => {
        if (props.name.length === 0) setFirstChar('')
        else {
            let firstChar = props.name.substring(0, 1)
            firstChar = firstChar.toUpperCase()
            setFirstChar(firstChar)
        }
    }, [])

    return (
        <div>

            {(props.size === "25") && (
                <div className='profile-img-quote mb-3'>
                    <h5 >{firstChar}</h5>
                </div>
            )}
            {(props.size === "50") && (
                (<div className='profile-img '>
                    <h1>{firstChar}</h1>
                </div>)
            )}
            {(props.size === "40") && (
                (<div className='profile-img-reply '>
                    <h2>{firstChar}</h2>
                </div>))}
            {(props.size === "45") && (
                (<div className='profile-img-logout '>
                    <h3 >{firstChar}</h3>
                </div>))}
            {(props.size === "150") && (
                (<div>
                    <h1 style={{ fontSize: "4.5rem", position: "relative", marginTop: "30px" }}>{firstChar}</h1>
                </div>))}


        </div>


    )
}
