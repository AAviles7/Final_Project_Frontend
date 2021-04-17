import { Divider, Grid, Header, List, Icon } from "semantic-ui-react"
import { connect } from 'react-redux'
import ChatroomList from '../components/ChatroomList'
import UserList from '../components/UserList'
import WorkspaceMain from '../components/WorkspaceMain'
import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import { API_CHATROOMS } from '../constants'
import DirectMessageList from '../components/DirectMessageList'

const Workspace = ({ workspace, set_chatrooms, workspace_chatrooms, add_chatroom, target_chatroom, select_chatroom, set_messages, users, history, user }) => {
    const [showChatrooms, setShowRooms ] = useState(true)
    const [showUsers, setShowUsers ] = useState(true)
    const [showDms, setShowDms ] = useState(true)

    const conversations = []
    user.sent_conversations.map((conv) => conversations.push(conv))
    user.received_conversations.map((conv) => conversations.push(conv))

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(API_CHATROOMS)
            const chatroomsAllData = await res.json()
            const chatroomsData = chatroomsAllData.filter((chatroom) => chatroom.workspace_id === workspace.id)
            set_chatrooms(chatroomsData)
            select_chatroom(chatroomsData[0])
            set_messages(chatroomsData[0])
        }
        fetchData()
    }, [workspace])

    let left = 2
    let center = 12
    let right = 2

    return(
        <Grid celled padded={false} id='workspace'>

            {/* Top Nav Bar */}
            <Grid.Row id='workspaceTopbar' color='grey'>
                <TopBar history={history} />
            </Grid.Row>

            {/* Workspace */}
            <Grid.Row id='workspaceContainer'>

                    {/* Workspace Left */}
                    <Grid.Column id='workspaceLeftbar' width={left}>
                        
                        {/* Channel List */}
                        <Header as='h3' onClick={() => setShowRooms(!showChatrooms)} id='chatroomheader'>
                            <Icon name={showChatrooms ? 'caret down' : 'caret right'}/>
                            Channels
                        </Header>
                        {showChatrooms ? <List relaxed animated id='chatroomlist'>
                            {workspace_chatrooms.length ? workspace_chatrooms.map((chatroom) => <ChatroomList chatroom={chatroom} key={chatroom.id}/>) : null}
                        </List> : null}

                        <Divider />

                        {/* Direct Message List */}
                        <Header as='h3' onClick={() => setShowDms(!showDms)} id='dmheader'>
                            <Icon name={showDms ? 'caret down' : 'caret right'}/>
                            Direct messages
                        </Header>
                        {showDms ? <List relaxed animated id='dmlist'>
                            {conversations.length ? conversations.map((conversation) => <DirectMessageList conversation={conversation} key={conversation.id} />) : null}
                        </List> : null}

                    </Grid.Column>

                    {/* Workspace Main */}
                    <Grid.Column id='workspaceMain' width={center}>
                        {target_chatroom !== null ? <WorkspaceMain /> : null}
                    </Grid.Column>

                    {/* Workspace Right */}
                    <Grid.Column id='workspaceRightbar' width={right}>

                        {/* All Users List */}
                        <Header as='h3' onClick={() => setShowUsers(!showUsers)} id='userheader'>
                            <Icon name={showUsers ? 'caret down' : 'caret right'}/>
                            All users
                        </Header>
                        {showUsers ? <List relaxed animated id='userlist'>
                            {users.length ? users.map((user) => <UserList user={user} key={user.id}/>) : null}
                        </List> : null}

                    </Grid.Column>
            </Grid.Row>

        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.workspace.selected_workspace.users,
        workspace_chatrooms: state.workspace.workspace_chatrooms,
        target_chatroom: state.chatroom.chatroom,
        user: state.user.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_chatrooms: (workspace_chatrooms) => dispatch({ type: 'SET_CHATROOMS', workspace_chatrooms}),
        add_chatroom: (chatroom) => dispatch({ type: 'ADD_CHATROOM', chatroom}),
        add_message: (message) => dispatch({ type: 'ADD_MESSAGE', message}),
        select_chatroom: (chatroom) => dispatch({ type: 'SELECT_CHATROOM', chatroom}),
        set_messages: (chatroom) => dispatch({ type: 'GET_MESSAGES', chatroom})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)