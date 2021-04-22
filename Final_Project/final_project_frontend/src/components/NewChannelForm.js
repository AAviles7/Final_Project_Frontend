import { Button, Form, Input } from "semantic-ui-react"
import { connect } from 'react-redux'
import { useState } from "react"
import { API_CHATROOMS, API_CHATROOM_MEMBERS } from '../constants'


const NewChannelForm = ({ workspace, add_chatroom, setUserChatrooms, user, userChatrooms }) => {
    const [name, setName] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(name===''){
            alert('Need to input name')
        }else{
            const newChannel = {
                name: name,
                workspace_id: workspace.id
            }
            const reqObj = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newChannel)
            }

            const res = await fetch(API_CHATROOMS, reqObj)
            const newChatroom = await res.json()

            const newChannelMember = {
                user_id: user.id,
                chatroom_id: newChatroom.id
            }
            const reObj = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newChannelMember)
            }
            await fetch(API_CHATROOM_MEMBERS, reObj)

            setUserChatrooms([...userChatrooms, newChatroom])
            add_chatroom(newChatroom)

            event.target.reset()
        }
    }

    return(
        <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Field label='Channel Name' control={Input} placeholder='name' onChange={(event) => setName(event.target.value)} />
            <Button type='submit'>Create Channel</Button>
        </Form>
    )
}

const mapStateToProps = (state) => {
    return {
        workspace: state.workspace.selected_workspace,
        user: state.user.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_chatroom: (chatroom) => dispatch({ type: 'ADD_CHATROOM', chatroom}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChannelForm)