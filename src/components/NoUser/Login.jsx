import React, { useEffect, useState } from 'react'
import * as yup from "yup"
import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login, loginFailure } from '../../redux/user/userActions'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import * as api from "../../api/index.js"

export default function Login(props) {

    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.user.session.isLoggedIn)
    const loginAttempt = useSelector(state => state.user.loginAttempt)



    useEffect(() => {

    }, [isLoggedIn])

    useEffect(() => {
        if (loginAttempt)
            setError("email or password is not correct")
    }, [loginAttempt])

    const loginSchema = yup.object().shape({
        eMail: yup.string().required(),
        password: yup.string().required()
    })

    const [loader, setLoader] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            eMail: e.target[0].value,
            password: e.target[1].value
        }

        try {
            const validatedData = await loginSchema.validate(formData)
            if (validatedData) {
                setLoader(true)

                setError("")
                loginFetchApi(validatedData)

                setTimeout(() => {
                    setLoader(false)
                    navigate("/home")
                }, 2500)

            }
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }
    }

    const loginFetchApi = async (validatedData) => {
        try {
            const { data } = await api.login(validatedData)
            dispatch(login(data))

        } catch (error) {
            console.log(error.message + " error from actions ")
            dispatch(loginFailure())
        }

    }


    return (
        <div>
            {loader && <Loader />}
            <div className='login-container'>

                <div className='model-header'>
                    <button type='button' className='btn-close d-flex mx-2 my-1' onClick={() => props.closeModel()}></button>
                    <h3>
                        <i className="fa-brands fa-twitter fa-lg" style={{ color: "#1DA1F2" }}></i>
                    </h3>
                </div>
                <div className='model-content'>
                    <Container className='content-container'>
                        <h3 className='my-3' style={{ fontWeight: "bold" }}>Login to Twittify</h3>
                        <form onSubmit={handleSubmit}>
                            <input className='form-control form-control-lg my-4' type="text" placeholder='E-mail' />
                            <input className='form-control form-control-lg my-4' type='password' placeholder='Password' />
                            <p className='my-0' style={{ color: "red" }}>{error}</p>
                            <Button type='submit' className='form-control my-4 login-btn' >Login</Button>
                            <a href='/' className='mb-4 link'>Forgotten password ?</a>
                            <p className='my-4'>Don't have an account ? <a className='link' href='/'>Sign up</a></p>
                        </form>
                    </Container>
                </div>
            </div>
        </div>

    )
}
