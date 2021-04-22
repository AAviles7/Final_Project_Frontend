import { useState } from "react"
import { Button, Form, TextArea } from "semantic-ui-react"
import { connect } from 'react-redux'
import { API_CHATROOM_MESSAGES } from '../constants'

const MessageForm = ({ chatroom, user }) => {
    const [body, setBody] = useState('')


    const SendMessage = () => {
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
        fetch(API_CHATROOM_MESSAGES, rqObj)
        setBody('')
    }

    const handleKeyPress = (e) => {
        if(e.key==='Enter' && e.shiftKey===false){
            e.preventDefault()
            SendMessage(body)
        }
    }    

    return(
        <Form>
            <TextArea value={body} id='messagebox' onChange={(event) => setBody(event.target.value)} onKeyPress={(e) => handleKeyPress(e)} placeholder='Enter new message... '/>
            <Button fluid onClick={() => SendMessage(body)}>Send</Button>
        </Form>
    )
    
}

const mapStateToProps = (state) => {
    return {
        chatroom: state.chatroom.chatroom,
        user: state.user.user.user
    }
}

export default connect(mapStateToProps)(MessageForm)
