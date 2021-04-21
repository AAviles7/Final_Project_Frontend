import { useState } from "react"
import { Button, Form, TextArea } from "semantic-ui-react"
import { connect } from 'react-redux'
import { API_DIRECT_MESSAGES } from '../constants'

const MessageFormDM = ({ user, conversation }) => {
    const [body, setBody] = useState('')


    const SendMessage = async () => {
        const newMsg = {
            body: body,
            conversation_id: conversation.id,
            user_id: user.id
        }
        const rqObj ={
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMsg)
        }
        await fetch(API_DIRECT_MESSAGES, rqObj)
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
        user: state.user.user.user,
        conversation: state.user.target_conversation
    }
}

export default connect(mapStateToProps)(MessageFormDM)
