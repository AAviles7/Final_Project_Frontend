import { Divider, Grid, Header, List, Icon, Popup } from "semantic-ui-react"
import { connect } from 'react-redux'
import ChatroomList from '../components/ChatroomList'
import UserList from '../components/UserList'
import WorkspaceMainChatroom from '../components/WorkspaceMainChatroom'
import WorkspaceMainDM from '../components/WorkspaceMainDM'
import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import { API_CHATROOMS, API_CHATROOM_MEMBERS, API_CONVERSTATIONS } from '../constants'
import DirectMessageList from '../components/DirectMessageList'
import NewChannelForm from '../components/NewChannelForm'

const Workspace = ({ workspace, set_chatrooms, target_chatroom, select_chatroom, set_messages, users, history, user, add_chatroom, set_conversations, set_target_conversations, set_directmessages, target }) => {
    const [showChatrooms, setShowRooms ] = useState(true)
    const [showUsers, setShowUsers ] = useState(true)
    const [showDms, setShowDms ] = useState(true)
    const [userChatrooms, setUserChatrooms] = useState([])
    const [nonUserChatrooms, setNoneChatrooms] = useState([])
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(API_CHATROOMS)
            const chatroomsAllData = await res.json()
            const chatroomsData = chatroomsAllData.filter((chatroom) => chatroom.workspace_id === workspace.id)
            const userChatrooms = chatroomsData.filter((chatroom) => chatroom.users.find((chatUser) => chatUser.id === user.id))
            const nonUserRooms = chatroomsData.filter((chatroom) => !chatroom.users.find((chatUser) => chatUser.id === user.id))

            const conversations_unfiltered = []
            user.sent_conversations.map((conv) => conversations_unfiltered.push(conv))
            user.received_conversations.map((conv) => conversations_unfiltered.push(conv))
            const conversations_filtered = conversations_unfiltered.filter((conv) => conv.workspace_id === workspace.id)

            const r = await fetch(API_CONVERSTATIONS)
            const convData = await r.json()
            const userConversations = convData.filter((conv) =>  conversations_filtered.find((c) => c.id === conv.id))

            if(userConversations.length > 0){
                set_target_conversations(userConversations[0])
                set_directmessages(userConversations[0])
                setConversations(userConversations)
                set_conversations(userConversations)
            }
            
            setNoneChatrooms(nonUserRooms)
            setUserChatrooms(userChatrooms)
            set_chatrooms(chatroomsData)
            select_chatroom(chatroomsData[0])
            set_messages(chatroomsData[0])
        }
        fetchData()
    }, [workspace])


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
        setNoneChatrooms(nonUserChatrooms.filter((c) => c.id !== chatroom.id))
    }

    const leaveChatroom = async (chatroom) => {
        const reObj = {
            headers: {"Content-Type": "application/json"},
            method: "DELETE"
        }
        const chatroomUser = chatroom.chatroom_members.find((member) => member.user_id === user.id)
        await fetch(API_CHATROOM_MEMBERS+chatroomUser.id, reObj)
        setUserChatrooms(userChatrooms.filter((c) => c.id !== chatroom.id))
        setNoneChatrooms([...nonUserChatrooms, chatroom])
    }

    let left = 2
    let center = 12
    let right = 2

    const onReceived = (data) => {
        const newChatroom = data['chatroom']
        const newChannelMember = {
            user_id: user.id,
            chatroom_id: newChatroom.id
        }
        const reObj = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newChannelMember)
        }
        fetch(API_CHATROOM_MEMBERS, reObj)
        add_chatroom(newChatroom)
        setUserChatrooms([...userChatrooms, newChatroom])
    }


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
                                <NewChannelForm setUserChatrooms={setUserChatrooms} userChatrooms={userChatrooms} />
                            </Popup.Content>
                        </Popup>
                        
                        <Divider />

                        {/* Direct Message List */}
                        <Header as='h3' onClick={() => setShowDms(!showDms)} id='dmheader'>
                            <Icon name={showDms ? 'caret down' : 'caret right'}/>
                            Direct messages
                        </Header>
                        {showDms ? <List relaxed id='dmlist'>
                            {conversations.length > 0 ? conversations.map((conversation) => <DirectMessageList conversation={conversation} key={conversation.id} />) : null}
                        </List> : null}

                    </Grid.Column>

                    {/* Workspace Main */}
                    <Grid.Column id='workspaceMain' width={center}>
                        {target === 'chatroom' ? (target_chatroom !== null ? <WorkspaceMainChatroom /> : null) : <WorkspaceMainDM />}
                    </Grid.Column>

                    {/* Workspace Right */}
                    <Grid.Column id='workspaceRightbar' width={right}>

                        {/* All Users List */}
                        <Header as='h3' onClick={() => setShowUsers(!showUsers)} id='userheader'>
                            <Icon name={showUsers ? 'caret down' : 'caret right'}/>
                            All users
                        </Header>
                        {showUsers ? <List relaxed id='userlist'>
                            {users.map((user) => <UserList user={user} key={user.id} setConversations={setConversations} conversations={conversations}/>)}
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
        target_conversation: state.user.target_conversation,
        user: state.user.user.user,
        workspace_chatrooms: state.workspace.workspace_chatrooms,
        target: state.workspace.target
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_chatrooms: (workspace_chatrooms) => dispatch({ type: 'SET_CHATROOMS', workspace_chatrooms}),
        add_message: (message) => dispatch({ type: 'ADD_MESSAGE', message}),
        select_chatroom: (chatroom) => dispatch({ type: 'SELECT_CHATROOM', chatroom}),
        set_messages: (chatroom) => dispatch({ type: 'GET_MESSAGES', chatroom}),
        set_directmessages: (conversation) => dispatch({ type: 'GET_DMS', conversation}),
        set_conversations: (conversations) => dispatch({ type: 'SET_CONVERSATIONS', conversations}),
        set_target_conversations: (conversation) => dispatch({ type: 'SET_TARGET_CONVERSATION', conversation}),
        add_chatroom: (chatroom) => dispatch({ type: 'ADD_CHATROOM', chatroom})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)