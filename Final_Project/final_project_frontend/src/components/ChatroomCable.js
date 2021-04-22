import { Fragment } from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'

const ChatroomCable = ({ workspace_chatrooms, onReceived}) => {
    return(
        <Fragment>
            {workspace_chatrooms.map((chatroom) => {
                return (
                    <ActionCableConsumer 
                        key = {chatroom.id}
                        channel = {{channel: 'ChatroomMessagesChannel', chatroom_id: chatroom.id}}
                        onReceived = {onReceived}
                    />
                )
            })}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        workspace_chatrooms: state.workspace.workspace_chatrooms
    }
}

export default connect(mapStateToProps)(ChatroomCable)