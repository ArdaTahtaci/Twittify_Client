import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteAcc, editUser } from '../../redux/user/userActions'
import { useNavigate } from "react-router-dom"

export default function EditProfile(props) {

    const currentUser = props.user.userInfo
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = () => {
        props.closeModel()
    }

    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)

    const convert2base64 = (file, num) => {
        const reader = new FileReader()
        if (num === "1") {
            reader.onloadend = () => {
                setFile1(reader.result.toString())
            }
        }
        else if (num === "2") {
            reader.onloadend = () => {
                setFile2(reader.result.toString())
            }
        }

        reader.readAsDataURL(file)
    }

    const handleInput = () => {
        document.querySelector('#file-upload-2').click();
    }

    const submitForm = (e) => {
        e.preventDefault();

        const form = document.querySelector('#edit-form')

        const data = {
            profileBackgroundPhoto: file1,
            profilePhoto: file2,
            name: form[2].value,
            bio: form[3].value
        }

        dispatch(editUser(props.user, data))
        props.closeModel()

    }

    const deleteAccount = () => {
        dispatch(deleteAcc(props.user))
        navigate("/")
        props.closeModel()
    }


    return (
        <div className='edit-container'>
            <div className='model-header d-flex'>
                <button type='button' className='btn-close d-flex mx-2 my-3' onClick={handleClick}></button>
                <h5 style={{ textAlign: "left" }} className='my-auto ms-4'>Edit profile</h5>
                <Button className='edit-save-btn ms-auto me-3 my-2 px-3' onClick={submitForm}>Save</Button>
            </div>
            <div>
                <form id='edit-form'>

                    <div className="edit-custom-file-upload">
                        <input type="file" accept='image/*' className='edit-custom-file-upload'
                            onChange={({ target: { files } }) => convert2base64(files[0], "1")} />
                        <div for="file-upload"><i className="upload-icon fa-solid fa-cloud-arrow-up fa-2xl"></i></div>
                    </div>
                    <div className='edit-custom-file-upload-2'>
                        <input type="file" id="file-upload-2" accept='image/*' className='edit-custom-file-upload'
                            onChange={({ target: { files } }) => convert2base64(files[0], "2")} />
                        <div onClick={handleInput} for="file-upload"><i className="upload-icon-2 fa-solid fa-cloud-arrow-up fa-2xl"></i></div>

                    </div>

                    <div className='text-inputs'>
                        <input className='text-input' type='text' placeholder='Name' />

                        <textarea style={{ resize: "none" }} className='text-input my-3' type='text' placeholder='Bio' />
                    </div>

                    <div>
                        <Button type='button' variant='outline-danger' className=' ms-auto me-3 my-2 px-3' onClick={deleteAccount}>Delete Account</Button>
                        <p style={{ color: "red" }} >This proccess is irreversible !</p>
                    </div>



                </form>
            </div>

        </div>

    )
}