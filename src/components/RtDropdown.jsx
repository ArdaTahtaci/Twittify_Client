import React from 'react'
import { Dropdown } from "react-bootstrap"
export default function RtDropdown(props) {

    const handleDropdownSelect = (eventKey) => {
        props.event(eventKey, props.tweet, props.index)
    }

    return (
        <div>
            <Dropdown onSelect={handleDropdownSelect}>
                <Dropdown.Toggle
                    className='dropdown-toggle d-flex'
                    as="span"
                    variant="light"
                    id="dropdown-basic"
                >
                    {(props.index != -1) ? (
                        <i className='fa-solid fa-retweet mt-1'> </i>
                    ) : (
                        <i className='fa-solid fa-retweet mt-1' style={{ fontSize: "1.3rem" }}> </i>
                    )}
                    {(props.index != -1) && <p className='ps-3'>{props.count}</p>}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="retweet"><span>
                        <i className='fa-solid fa-retweet mt-1 me-1'> </i>{"  Retweet"}
                    </span></Dropdown.Item>
                    <Dropdown.Item eventKey="quote">
                        <i className="fa-solid fa-pen me-1"></i><span>{"  Quote Tweet"}

                        </span></Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

