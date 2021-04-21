import { List, Popup } from "semantic-ui-react"
import { connect } from 'react-redux'
import { useEffect, useState } from "react"
import { ActionCableConsumer } from 'react-actioncable-provider'
import { API_CHATROOMS } from '../constants'

const ChatroomList = ({ chatroom, select, select_chatroom, get_chat, leaveChatroom }) => {
    const [chat, setChatroom] = useState(chatroom)

    useEffect(() => {
        const fetchChatrooms = async () => {
            const res = await fetch(API_CHATROOMS)
            const chatroomsData = await res.json()
            const foundChatroom = chatroomsData.find((room) => room.id === chatroom.id)
            setChatroom(foundChatroom)
        }
        fetchChatrooms()
    }, [chatroom])

    return(
        // <ActionCableConsumer
        //     channel = {{channel: 'ChatroomsChannel', chatroom_id: chatroom.id}}
        //     onReceived = {(data) => console.log('data: ', data)}
        // >
            <List.Item id='listitem' >
                <List.Icon name='hashtag' />
                <List.Content>
                    <List.Header as='h4'  id='chatroomlistitem' onClick={() => {
                        select('chatroom');
                        select_chatroom(chat);
                        get_chat(chat)
                    }}>{chat.name}</List.Header>
                </List.Content>
                <Popup on='hover' basic trigger={<List.Icon name='times' id='threedots' onClick={() => leaveChatroom(chat)}/>}>
                    <Popup.Content>
                        <Popup.Header>Leave Chatroom</Popup.Header>
                    </Popup.Content>
                </Popup>
            </List.Item>
        // </ActionCableConsumer>
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