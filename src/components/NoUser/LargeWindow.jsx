import React from 'react'
import { Button, Container } from 'react-bootstrap'

export default function LargeWindow() {
    return (
        <div className='large-window me-3 mt-2'>
            <Container>
                <h5 className='align-left pt-3 pb-1 bold'>New at Twittify?</h5>
                <p style={{ fontSize: "0.75rem", color: "rgb(101, 119, 134)" }} className='align-left'>Sign up now to get your personalized timeline!</p>
                <Button variant='light' className='signUpBtn my-2 btn-lg'><h6 className='signUp'>Sign up with Google</h6></Button>
                <Button variant='light' className='signUpBtn my-2 btn-lg'><h6 className='signUp'>Sign up with Apple</h6></Button>
                <Button variant='light' className='signUpBtn my-2 btn-lg'><h6 className='signUp'>Create an account</h6></Button>
                <p style={{ fontSize: "0.75rem", color: "rgb(101, 119, 134)" }} className='align-left'>By signing up, you agree to the <span className='link'>Terms of Service</span> and <span className='link'>Privacy Policy</span>, including <span className='link'>Cookie Use.</span></p>
            </Container>
        </div>
    )
}
