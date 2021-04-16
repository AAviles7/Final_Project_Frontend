import { Fragment } from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { connect } from 'react-redux'

const Cable = ({ workspace_chatrooms, add_message}) => {
    return(
        <Fragment>
            {workspace_chatrooms.map((chatroom) => {
                return (
                    <ActionCableConsumer 
                        key = {chatroom.id}
                        channel = {{ channel: 'ChatroomMessages', chatroom: chatroom.id}}
                        onReceived = {add_message}
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

const mapDispatchToProps = (dispatch) => {
    return {
        add_message: (message) => dispatch({ type: 'ADD_MESSAGE', message})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cable)