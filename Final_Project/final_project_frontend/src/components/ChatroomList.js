import { List } from "semantic-ui-react"
import { connect } from 'react-redux'
import React, { Fragment } from 'react';

const ChatroomList = ({ chatroom, select, select_chatroom, get_chat }) => {
    return(
        <Fragment>
            <List.Item onClick={() => {
                select(chatroom);
                select_chatroom(chatroom);
                get_chat(chatroom)
            }}>
                <List.Icon name='hashtag' />
                <List.Content>
                    <List.Header as='a'>{chatroom.name}</List.Header>
                </List.Content>
            </List.Item>
        </Fragment>
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