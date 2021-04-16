import { Header } from "semantic-ui-react"
import { connect } from 'react-redux'
import { Fragment } from "react"
import MessageForm from '../components/MessageForm'
import { ActionCableConsumer } from 'react-actioncable-provider'


const WorkspaceMain = ({ chatroom, messages, add_message}) => {
    return(
        <Fragment>
            <ActionCableConsumer 
                key = {chatroom.id}
                channel = {{ channel: 'ChatroomMessages', chatroom: chatroom.id}}
                onReceived = {add_message}
            >
            {chatroom!==null ? <Header as='h1' key={chatroom.id}>{chatroom.name}</Header> : <Header as='h1'>Chat</Header>}
            {messages!==null ? messages.map((message) => <Header as='h4' key={message.id} >{message.body}</Header>) : null}
            </ActionCableConsumer>
            <MessageForm />
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        chatroom: state.chatroom.chatroom,
        messages: state.chatroom.chatroom_messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_message: (message) => dispatch({ type: 'ADD_MESSAGE', message})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceMain)