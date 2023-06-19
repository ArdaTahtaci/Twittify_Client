import React from 'react'
import { Container, Row, Col } from "react-bootstrap"

export default function ButtomNav(props) {
    return (
        <div>
            <div className='login-nav' bg='info'>
                <Container>
                    <Row >
                        <Col>
                            <h3 className='mx-auto mb-0'>Don't miss what happens</h3>
                            <p style={{ fontSize: "0.9rem" }}>Twittify users will be the first to know</p>
                        </Col>
                        <Col className='d-flex' style={{ position: "relative" }}>
                            <btn className="signin-button" onClick={() => props.login()}>Sign In</btn>
                            <btn className="signup-button" onClick={() => props.signUp()}>Sing Up</btn>

                        </Col>
                    </Row>
                </Container>

            </div>
        </div>
    )
}
