import { Grid, Header, Feed } from "semantic-ui-react"
import { connect } from 'react-redux'
import MessageForm from '../components/MessageForm'
import FeedItem from './FeedItem'
import { useEffect, useState } from "react"
import { API_CHATROOM_MESSAGES } from '../constants'
import { ActionCableConsumer } from 'react-actioncable-provider'


const WorkspaceMain = ({ chatroom, send_message }) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch(API_CHATROOM_MESSAGES)
            const allChatroom_Messages = await res.json()
            const chatroom_messages = allChatroom_Messages.filter((chat_messages) => chat_messages.chatroom_id === chatroom.id)
            setMessages(chatroom_messages)
        }
        fetchMessages()
    }, [chatroom])

    return(
        <Grid id='workspacemain'>
            <Grid.Row>
                <Header>{chatroom.name}</Header>
            </Grid.Row>
            <Grid.Row>

                {/* <ActionCableConsumer
                    channel = 'ChatroomMessagesChannel'
                    onReceived = {send_message}
                > */}
                <Feed>
                    {messages.map((message) => <FeedItem message={message} key={message.id} />)}
                </Feed>
                {/* </ActionCableConsumer> */}

            </Grid.Row>
            <Grid.Row >
                <MessageForm />
            </Grid.Row>            
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        chatroom: state.chatroom.chatroom
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        send_message: (message) => dispatch({ type: 'ADD_MESSAGE', message})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceMain)