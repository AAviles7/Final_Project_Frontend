import { List } from "semantic-ui-react"
import { connect } from 'react-redux'
import Workspace from "../containers/Workspace"
import { useEffect, useState } from "react"

const DirectMessageList = ({ conversation, user, users, select }) => {
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
                <List.Header as='h4' id='dmlistitem'>{ targetUser !== '' ? targetUser.display_name : null }</List.Header>
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
        select: (user) => dispatch({ type: 'SET_TARGET_USER', user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageList)