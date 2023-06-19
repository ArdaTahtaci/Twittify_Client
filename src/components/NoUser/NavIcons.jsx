import React from 'react'

export function NavIconL() {
    return (
        <div className='sticky'>
            <div className='d-flex'>
                <h3 className='py-2 px-2 border-radius-lg'>
                    <i className="fa-brands fa-twitter" style={{ color: "#1DA1F2" }}></i>
                </h3>
            </div>
            <div className='d-flex'>
                <h3 className='py-2 px-2 border-radius-lg'>
                    <i className="fa-solid fa-hashtag" style={{ color: "#000000" }}></i><span className='leftSpan mx-3'>Explore</span>
                </h3>
            </div>
            <div className='d-flex'>
                <h3 className='py-2 px-2 border-radius-lg'>
                    <i className="fa-solid fa-regular fa-gear" style={{ color: "#000000" }}></i><span className='leftSpan mx-3'>Settings</span>
                </h3>
            </div>
        </div>
    )
}

export function NavIconS() {
    return (
        <div className='sticky'>
            <div className='d-flex'>
                <h3 className='py-2 px-2 border-radius'>
                    <i className="fa-brands fa-twitter" style={{ color: "#1DA1F2" }}></i>
                </h3>
            </div>
            <div className='d-flex'>
                <h3 className='py-2 px-2 border-radius'>
                    <i className="fa-solid fa-hashtag" style={{ color: "#000000" }}></i>
                </h3>
            </div>
            <div className='d-flex'>
                <h3 className='py-2 px-2 border-radius'>
                    <i className="fa-solid fa-regular fa-gear" style={{ color: "#000000" }}></i>
                </h3>
            </div>
        </div>
    )
}
