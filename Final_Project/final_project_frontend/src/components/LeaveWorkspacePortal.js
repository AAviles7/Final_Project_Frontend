import { connect } from 'react-redux'
import { Button, Header, Portal, Segment } from 'semantic-ui-react'
import { API_WORKSPACE_MEMBERS, API_WORKSPACES } from '../constants'

const LeaveWorkspacePortal = ({ history, workspace_user, set_workspace_user, setOpen, workspace, set_workspaces, set_selected_workspace }) => {

    const leaveWorkspace = async () => {
        const reObj = {
            headers: {"Content-Type": "application/json"},
            method: "DELETE"
        }
        await fetch(API_WORKSPACE_MEMBERS+workspace_user.id, reObj)
        set_workspace_user(null)
        const res = await fetch(API_WORKSPACES)
        const workspacesData = await res.json()
        set_workspaces(workspacesData)
        const selectedWorkspace = workspacesData.find((work) => work.id === workspace.id)
        set_selected_workspace(selectedWorkspace)
        history.push('/select_workspace')
    }

    return(
        <Portal closeOnTriggerClick openOnTriggerClick trigger={ <Button fluid negative>Leave Workspace</Button> }>
            <Segment style={{ left: '35%', position: 'fixed', top: '35%', zIndex: 1000, }}>
                <Header color='red'>ARE YOU SURE YOU WANT TO LEAVE THIS WORKSPACE?!</Header>
                <Button.Group>
                    <Button negative onClick={() => leaveWorkspace()}>Yes</Button>
                    <Button.Or />
                    <Button positive onClick={() => setOpen(false)}>No</Button>
                </Button.Group>
            </Segment>
        </Portal>
    )
}

const mapStateToProps = (state) => {
    return {
        workspace_user: state.workspace.selected_workspace_user,
        workspace: state.workspace.selected_workspace
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_workspace_user: (user) => dispatch({ type: 'SET_WORKSPACE_USER', user}),
        set_workspaces: (workspaces) => dispatch({ type: 'GET_WORKSPACES', workspaces}),
        set_selected_workspace: (workspace) => dispatch({ type: 'GET_SELECTED', workspace})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveWorkspacePortal)