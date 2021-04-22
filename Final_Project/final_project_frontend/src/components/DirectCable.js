import { Fragment } from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'

const DirectCable = ({ conversations, onReceived}) => {
    return(
        <Fragment>
            {conversations.map((conversation) => {
                return (
                    <ActionCableConsumer 
                        key = {conversation.id}
                        channel = {{channel: 'DirectMessagesChannel', conversation_id: conversation.id}}
                        onReceived = {onReceived}
                    />
                )
            })}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        conversations: state.user.conversations
    }
}

export default connect(mapStateToProps)(DirectCable)