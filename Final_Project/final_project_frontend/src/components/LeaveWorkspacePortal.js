import { connect } from 'react-redux'
import { Button, Header, Portal, Segment } from 'semantic-ui-react'
import { API_WORKSPACE_MEMBERS } from '../constants'

const LeaveWorkspacePortal = ({ history, workspace_user, set_workspace_user, setOpen }) => {

    const leaveWorkspace = async () => {
        const reObj = {
            headers: {"Content-Type": "application/json"},
            method: "DELETE"
        }
        await fetch(API_WORKSPACE_MEMBERS+workspace_user.id, reObj)
        set_workspace_user(null)
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
        workspace_user: state.workspace.selected_workspace_user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_workspace_user: (user) => dispatch({ type: 'SET_WORKSPACE_USER', user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveWorkspacePortal)