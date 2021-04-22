import { List } from "semantic-ui-react"
import { connect } from 'react-redux'
import { useEffect, useState } from "react"

const DirectMessageList = ({ conversation, user, users, select, select_conversation, get_dms }) => {
    const [targetUser, setTargetUser] = useState('')

    useEffect(() => {
        const targetId = conversation.sender_id===user.id ? conversation.receiver_id : conversation.sender_id
        const target = users.find((user) => user.id === targetId)
        setTargetUser(target)
    }, [])

    return(
        <List.Item id='listitem'>
            <List.Icon name='hashtag'/>
            <List.Content>
                <List.Header as='h4' id='dmlistitem' onClick={() => {
                    select('user');
                    select_conversation(conversation);
                    get_dms(conversation)
                }}>{ targetUser !== '' ? targetUser.display_name : null }</List.Header>
            </List.Content>
        </List.Item>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user.user,
        users: state.workspace.selected_workspace.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        select_conversation: (conversation) => dispatch({ type: 'SET_TARGET_CONVERSATION', conversation}),
        select: (target) => dispatch({ type: 'SELECT_TARGET', target}),
        get_dms: (conversation) => dispatch({ type: 'GET_DMS', conversation})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageList)