import { useState } from "react"
import { Button, Form, TextArea } from "semantic-ui-react"
import { connect } from 'react-redux'

let CHATROOMMESSAGES_URL = 'http://127.0.0.1:4000/chatroom_messages'


const MessageForm = ({ chatroom, user, send_message}) => {
    const [body, setBody] = useState('')


    const SendMessage = async () => {
        const newMsg = {
            user_id: user.id,
            chatroom_id: chatroom.id,
            body: body
        }
        const rqObj ={
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMsg)
        }
        const res = await fetch(CHATROOMMESSAGES_URL, rqObj)
        const message = await res.json()
        send_message(message)
    }
    

    return(
        <Form>
            <TextArea onChange={(event) => setBody(event.target.value)} placeholder='Enter new message... '/>
            <Button onClick={() => SendMessage(body)}>Send</Button>
        </Form>
    )
    
}

const mapStateToProps = (state) => {
    return {
        chatroom: state.workspace.target,
        user: state.user.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        send_message: (message) => dispatch({ type: 'ADD_MESSAGE', message})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
