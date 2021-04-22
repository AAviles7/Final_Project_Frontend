import { useState } from 'react'
import { connect } from 'react-redux'
import { Portal, Button, Segment, Form } from 'semantic-ui-react'
import { API_USERS } from '../constants'

const EditProfilePortal = ({ user, update_user, setOpen, jwt_code }) => {
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [display_name, setDisplayName] = useState(user.display_name)
    const [bio, setBio] = useState(user.bio)
    const [phone_number, setPhoneNumber] = useState(user.phone_number)

    const resetHooks = () => {
        setUsername(user.username)
        setEmail(user.email)
        setDisplayName(user.display_name)
        setBio(user.bio)
        setPhoneNumber(user.phone_number)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        const updatedUser = {
            username: username,
            email: email,
            display_name: display_name,
            bio: bio,
            phone_number: phone_number
        }
        let emptyValue = false
        for(let x in updatedUser){
            if(updatedUser[x] === ''){
                emptyValue = true
            }
        }
        if(emptyValue){
            alert('Input can not be empty!')
        }else{
            const reqObj = {
                headers: { "Content-Type": "application/json" },
                method: 'PATCH',
                body: JSON.stringify(updatedUser)
            }
            const res = await fetch(API_USERS+user.id, reqObj)
            const updatedData = await res.json()

            const formatedData = {
                user: updatedData,
                jwt: jwt_code
            }

            update_user(formatedData)
            setOpen(false)
            event.target.reset()
        }
    }

    return(
        <Portal trigger={ <Button fluid onClick={() => resetHooks()}>Edit Profile</Button> } >
            <Segment style={{ left: '40%', position: 'fixed', top: '20%', zIndex: 1000, }} id='editprofileportal'>
                <Form onSubmit={(event) => handleSubmit(event)}>
                    <Form.Group widths='equal'>
                        <Form.Input value={username} fluid label='Username' onChange={(event) => setUsername(event.target.value)}/>
                        <Form.Input value={display_name} fluid label='Display Name' onChange={(event) => setDisplayName(event.target.value)}/>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Input value={email} fluid label='Email' onChange={(event) => setEmail(event.target.value)}/>
                        <Form.Input value={phone_number} fluid label='Phone Number' onChange={(event) => setPhoneNumber(event.target.value)}/>
                    </Form.Group>

                    <Form.TextArea value={bio} label='Bio' onChange={(event) => setBio(event.target.value)}/>
                    <Form.Button type='submit'>Submit</Form.Button>
                </Form>
            </Segment>
        </Portal>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user.user,
        jwt_code: state.user.user.jwt
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update_user: (user) => dispatch({ type: 'UPDATE_USER', user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePortal)