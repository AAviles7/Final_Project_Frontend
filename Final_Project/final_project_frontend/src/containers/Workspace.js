import { Divider, Grid, Header, List, Icon, Popup } from "semantic-ui-react"
import { connect } from 'react-redux'
import ChatroomList from '../components/ChatroomList'
import UserList from '../components/UserList'
import WorkspaceMain from '../components/WorkspaceMain'
import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import { API_CHATROOMS, API_CHATROOM_MEMBERS } from '../constants'
import DirectMessageList from '../components/DirectMessageList'
import NewChannelForm from '../components/NewChannelForm'

const Workspace = ({ workspace, set_chatrooms, target_chatroom, select_chatroom, set_messages, users, history, user }) => {
    const [showChatrooms, setShowRooms ] = useState(true)
    const [showUsers, setShowUsers ] = useState(true)
    const [showDms, setShowDms ] = useState(true)
    const [userChatrooms, setUserChatrooms] = useState([])
    const [nonUserChatrooms, setNoneChatrooms] = useState([])

    const conversations = []
    user.sent_conversations.map((conv) => conversations.push(conv))
    user.received_conversations.map((conv) => conversations.push(conv))

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(API_CHATROOMS)
            const chatroomsAllData = await res.json()
            const chatroomsData = chatroomsAllData.filter((chatroom) => chatroom.workspace_id === workspace.id)
            const userChatrooms = chatroomsData.filter((chatroom) => chatroom.users.find((chatUser) => chatUser.id === user.id))
            const nonUserRooms = chatroomsData.filter((chatroom) => !chatroom.users.find((chatUser) => chatUser.id === user.id))
            setNoneChatrooms(nonUserRooms)
            setUserChatrooms(userChatrooms)
            set_chatrooms(chatroomsData)
            select_chatroom(chatroomsData[0])
            set_messages(chatroomsData[0])
        }
        fetchData()
    }, [])

    const joinChatroom = async (chatroom) => {
        const newChatroomMember = {
            user_id: user.id,
            chatroom_id: chatroom.id
        }
        const reqObj = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newChatroomMember)
        }

        await fetch(API_CHATROOM_MEMBERS, reqObj)
        setUserChatrooms([...userChatrooms, chatroom])
        setNoneChatrooms(nonUserChatrooms.filter((chatroom) => chatroom.users.find((chatUser) => chatUser.id === user.id)))
    }

    const leaveChatroom = async (chatroom) => {
        
    }

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
                        {showChatrooms ? <List relaxed id='chatroomlist'>
                            {userChatrooms.length ? userChatrooms.map((chatroom) => <ChatroomList chatroom={chatroom} key={chatroom.id} leaveChatroom={leaveChatroom} />) : null}
                        </List> : null}

                        {/* Join Channel */}
                        <Popup on='click' position='right center' trigger={
                            <Header as='h4' id='channeljoin'>
                                + Join Channel
                            </Header>
                        }>
                            <Popup.Content>
                                {nonUserChatrooms.length ? <List>
                                    {nonUserChatrooms.map((chatroom) => <List.Item as='h4' id='joinlist' onClick={() => joinChatroom(chatroom)}>{chatroom.name}</List.Item>)}
                                </List> : 'No Channels to Join'}
                            </Popup.Content>
                        </Popup>

                        {/* Create New Channel */}
                        <Popup on='click' position='right center' trigger={
                            <Header as='h4' id='createchannel'>
                                + Create New Channel
                            </Header>
                        }>
                            <Popup.Content>
                                <NewChannelForm />
                            </Popup.Content>
                        </Popup>
                        
                        <Divider />

                        {/* Direct Message List */}
                        <Header as='h3' onClick={() => setShowDms(!showDms)} id='dmheader'>
                            <Icon name={showDms ? 'caret down' : 'caret right'}/>
                            Direct messages
                        </Header>
                        {showDms ? <List relaxed id='dmlist'>
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
                        {showUsers ? <List relaxed id='userlist'>
                            {users.map((user) => <UserList user={user} key={user.id}/>)}
                        </List> : null}

                    </Grid.Column>
            </Grid.Row>

        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.workspace.selected_workspace.users,
        target_chatroom: state.chatroom.chatroom,
        user: state.user.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_chatrooms: (workspace_chatrooms) => dispatch({ type: 'SET_CHATROOMS', workspace_chatrooms}),
        add_message: (message) => dispatch({ type: 'ADD_MESSAGE', message}),
        select_chatroom: (chatroom) => dispatch({ type: 'SELECT_CHATROOM', chatroom}),
        set_messages: (chatroom) => dispatch({ type: 'GET_MESSAGES', chatroom})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)