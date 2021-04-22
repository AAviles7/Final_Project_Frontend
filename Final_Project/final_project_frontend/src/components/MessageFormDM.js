import { useState } from "react"
import { Button, Form, TextArea } from "semantic-ui-react"
import { connect } from 'react-redux'
import { API_DIRECT_MESSAGES } from '../constants'

const MessageFormDM = ({ user, conversation }) => {
    const [body, setBody] = useState('')


    const SendMessage = () => {
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
        fetch(API_DIRECT_MESSAGES, rqObj)
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
        user: state.user.user.user,
        conversation: state.user.target_conversation
    }
}

export default connect(mapStateToProps)(MessageFormDM)
