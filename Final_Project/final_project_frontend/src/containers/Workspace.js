import { Grid, List } from "semantic-ui-react"
import { connect } from 'react-redux'
import ChatroomList from '../components/ChatroomList'
import WorkspaceMain from '../components/WorkspaceMain'
import React, { useEffect } from 'react'
import Cable from '../components/Cable'
import { ActionCableConsumer } from 'react-actioncable-provider';

const Workspace = ({ workspace, set_chatrooms, workspace_chatrooms, add_chatroom }) => {

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://127.0.0.1:4000/chatrooms')
            const chatroomsAllData = await res.json()
            const chatroomsData = chatroomsAllData.filter((chatroom) => chatroom.workspace_id === workspace.id)
            set_chatrooms(chatroomsData) 
        }
        fetchData()
    }, [workspace, set_chatrooms])

    let left = 2
    let center = 12
    let right = 2

    return(
        <Grid celled padded={false} id='workspace'>
            <Grid.Row id='workspaceTopbar'>

            </Grid.Row>
            <Grid.Row id='workspaceContainer'>
                <ActionCableConsumer 
                    channel={{ channel: 'ChatroomsChannel' }}
                    onReceived={add_chatroom}
                >
                    <Grid.Column id='workspaceLeftbar' width={left}>
                        {/* {workspace_chatrooms.length ? <Cable /> : null} */}
                        <List relaxed>
                            {workspace_chatrooms.length ? workspace_chatrooms.map((chatroom) => <ChatroomList chatroom={chatroom} key={chatroom.id}/>) : null}
                        </List>
                    </Grid.Column>
                    <Grid.Column id='workspaceMain' width={center}>
                        <WorkspaceMain />
                    </Grid.Column>
                    <Grid.Column id='workspaceRightbar' width={right}>
                            
                    </Grid.Column>
                </ActionCableConsumer>
            </Grid.Row>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.workspace.selected_workspace.users,
        user: state.user.user,
        workspace_chatrooms: state.workspace.workspace_chatrooms,
        target_chatroom: state.workspace.target
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_chatrooms: (workspace_chatrooms) => dispatch({ type: 'SET_CHATROOMS', workspace_chatrooms}),
        add_chatroom: (chatroom) => dispatch({ type: 'ADD_CHATROOM', chatroom}),
        add_message: (message) => dispatch({ type: 'ADD_MESSAGE', message})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)