import React from 'react'

export default function Loader() {
    return (
        <div style={{ position: "relative" }}>
            <div className='loading-page'>
                <i className="fa-brands fa-twitter mb-1 fa-2xl" style={{ color: "#1DA1F2", position: "fixed", fontSize: "4rem", top: "48%", left: "48%" }}></i>
            </div>
        </div>

    )
}
