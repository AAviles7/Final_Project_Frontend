import { List, Popup } from "semantic-ui-react"
import { connect } from 'react-redux'

const ChatroomList = ({ chatroom, select, select_chatroom, get_chat, leaveChatroom }) => {
    return(
        <List.Item id='listitem' >
            <List.Icon name='hashtag' />
            <List.Content>
                <List.Header as='h4'  id='chatroomlistitem' onClick={() => {
                    select(chatroom);
                    select_chatroom(chatroom);
                    get_chat(chatroom)
                }}>{chatroom.name}</List.Header>
            </List.Content>
            <Popup on='hover' trigger={<List.Icon name='times' id='threedots' onClick={() => leaveChatroom(chatroom)}/>}>
                <Popup.Content>
                    <Popup.Header>Leave Chatroom</Popup.Header>
                </Popup.Content>
            </Popup>
        </List.Item>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        select: (target) => dispatch({ type: 'SELECT_TARGET', target}),
        select_chatroom: (chatroom) => dispatch({ type: 'SELECT_CHATROOM', chatroom}),
        get_chat: (chatroom) => dispatch({ type: 'GET_MESSAGES', chatroom })
    }
}

export default connect(null, mapDispatchToProps)(ChatroomList)