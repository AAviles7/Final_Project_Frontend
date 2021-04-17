import { List } from "semantic-ui-react"
import { connect } from 'react-redux'

const ChatroomList = ({ chatroom, select, select_chatroom, get_chat }) => {
    return(
        <List.Item id='listitem' onClick={() => {
            select(chatroom);
            select_chatroom(chatroom);
            get_chat(chatroom)
        }}>
            <List.Icon name='hashtag' />
            <List.Content>
                <List.Header as='h4'  id='chatroomlistitem'>{chatroom.name}</List.Header>
            </List.Content>
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