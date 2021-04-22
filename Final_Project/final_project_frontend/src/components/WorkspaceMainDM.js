import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Feed } from 'semantic-ui-react'
import MessageFormDM from '../components/MessageFormDM'
import { API_DIRECT_MESSAGES } from '../constants'
import FeedItemDM from './FeeditemDM'
import DirectCable from './DirectCable'

const WorkspaceMainDM = ({ conversation, sender, receiver, user, send_message, direct_messages }) => {
    const [target_user, setTarget] = useState(sender)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setTarget(user.id === sender.id? receiver : sender)
        const fetchMessages = async () => {
            const res = await fetch(API_DIRECT_MESSAGES)
            const allMsgsData = await res.json()
            const convMessages = allMsgsData.filter((msg) => msg.conversation_id === conversation.id)
            setMessages(convMessages)
        }
        fetchMessages()
    }, [conversation, direct_messages])

    const onReceived = (data) =>{
        send_message(data['direct_message'])
    }

    return(
        <Grid id='workspacemain'>
            <DirectCable onReceived={onReceived}/>
            <Grid.Row>
                <Header>{target_user.display_name}</Header>
            </Grid.Row>
            <Grid.Row>
                <Feed>
                    {messages.map((message) => <FeedItemDM message={message} key={message.id} />)}
                </Feed>
            </Grid.Row>
            <Grid.Row>
                <MessageFormDM />
            </Grid.Row>

        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        conversation: state.user.target_conversation,
        direct_messages: state.user.direct_messages,
        sender: state.user.target_conversation.sender,
        receiver: state.user.target_conversation.receiver,
        user: state.user.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        send_message: (message) => dispatch({ type: 'ADD_DM_MESSAGE', message})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceMainDM)