import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { Button, Container } from 'react-bootstrap'
import * as yup from "yup"
import { createUser } from '../../redux/user/userActions'

const signUpSchema = yup.object().shape({

    name: yup.string().required(),
    userName: yup.string().required(),
    eMail: yup.string().email().required(),
    password: yup.string().min(8).max(14).required(),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null])

})


export default function SignUp(props) {

    const [error, setError] = useState(undefined)
    const dispatch = useDispatch()

    const submitForm = async (e) => {
        e.preventDefault()

        const formData = {
            name: e.target[0].value,
            userName: e.target[1].value,
            eMail: e.target[2].value,
            password: e.target[3].value,
            passwordConfirmation: e.target[4].value
        }
        try {

            const validatedData = await signUpSchema.validate(formData)
            if (validatedData) {
                props.closeModel()
                setError(undefined)
                dispatch(createUser(validatedData))
            }
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }

    }

    return (
        <div className='login-container'>
            <div className='model-header'>
                <button type='button' className='btn-close d-flex mx-2 my-1' onClick={() => props.closeModel()}></button>
                <h3>
                    <i className="fa-brands fa-twitter fa-lg" style={{ color: "#1DA1F2" }}></i>
                </h3>
            </div>
            <div className='model-content'>
                <Container className='content-container'>
                    <h3 className='my-3' style={{ fontWeight: "bold" }}>Join Twittify Today</h3>
                    <form onSubmit={submitForm}>
                        <input className='form-control form-control-lg my-4' type="text" placeholder='Name' />
                        <input className='form-control form-control-lg my-4' type="text" placeholder='@username' />
                        <input className='form-control form-control-lg my-4' type="text" placeholder='E-mail' />
                        <input className='form-control form-control-lg my-4' type="password" placeholder='Password' />
                        <input className='form-control form-control-lg my-4' type="password" placeholder='Password again' />

                        <Button className='form-control my-4 login-btn' type='submit' >Sign Up</Button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <p className='my-4'>Already have an account ? <a className='link' href='/'>Login</a></p>
                    </form>
                </Container>
            </div>
        </div>
    )
}
