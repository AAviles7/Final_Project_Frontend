import { Grid, Header, Feed } from "semantic-ui-react"
import { connect } from 'react-redux'
import { useEffect, useState } from "react"
import MessageForm from '../components/MessageForm'
import { ActionCableConsumer } from 'react-actioncable-provider'
import FeedItem from './FeedItem'


const WorkspaceMain = ({ chatroom, chatroom_messages }) => {
    return(
        <Grid id='workspacemain'>
            <Grid.Row>
                <Header>{chatroom.name}</Header>
            </Grid.Row>
            <Grid.Row>
                <Feed>
                    {chatroom_messages.map((message) => <FeedItem message={message} key={message.id} />)}
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

export default connect(mapStateToProps)(WorkspaceMain)