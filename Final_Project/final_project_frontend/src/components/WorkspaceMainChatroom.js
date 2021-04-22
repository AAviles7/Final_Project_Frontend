import { Grid, Header, Feed } from "semantic-ui-react"
import { connect } from 'react-redux'
import MessageForm from './MessageForm'
import FeedItem from './FeedItem'
import { useEffect, useState } from "react"
import { API_CHATROOM_MESSAGES } from '../constants'
import ChatroomCable from './ChatroomCable'


const WorkspaceMainChatroom = ({ chatroom, send_message, chatroom_messages }) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch(API_CHATROOM_MESSAGES)
            const allChatroom_Messages = await res.json()
            const chatroom_messages = allChatroom_Messages.filter((chat_messages) => chat_messages.chatroom_id === chatroom.id)
            setMessages(chatroom_messages)
        }
        fetchMessages()
    }, [chatroom, chatroom_messages])

    const onReceived = (data) => {
        send_message(data['chatroom_message'])
    }
    
    return(
        <Grid id='workspacemain'>
            <ChatroomCable onReceived={onReceived}/>
            <Grid.Row>
                <Header>{chatroom.name}</Header>
            </Grid.Row>
            <Grid.Row>
                <Feed>
                    {messages.map((message) => <FeedItem message={message} key={message.id} />)}
                </Feed>
            </Grid.Row>
            <Grid.Row >
                <MessageForm />
            </Grid.Row>            
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        chatroom: state.chatroom.chatroom,
        chatroom_messages: state.chatroom.chatroom_messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        send_message: (message) => dispatch({ type: 'ADD_MESSAGE', message})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceMainChatroom)