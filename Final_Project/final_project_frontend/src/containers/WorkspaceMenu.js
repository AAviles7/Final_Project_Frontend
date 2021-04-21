import { Grid } from "semantic-ui-react"
import { connect } from 'react-redux'
import WorkspaceForm from '../components/WorkspaceForm'
import WorkspaceMenulist from '../components/WorkspaceMenuList'
import { Fragment, useEffect } from "react"
import { API_WORKSPACES } from '../constants'

const WorkspaceMenu = ({ add_workspace, history, set_workspaces, recently_added_workspace }) => {

    useEffect(() => {
        const getWorkspaces = async () => {
            const res = await fetch(API_WORKSPACES)
            const allWorkspaces = await res.json()
            set_workspaces(allWorkspaces)
        }
        getWorkspaces()
    }, [recently_added_workspace])

    return(
        <Fragment>
            <Grid celled id='workspacemenu'>
                <Grid.Column width={4} id='workspacemenulist'>
                    <WorkspaceMenulist history={history} />
                </Grid.Column>
                <Grid.Column width={12} id='workspacemenuform'>
                    <WorkspaceForm add={add_workspace}/>
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        workspaces: state.workspace.workspaces,
        recently_added_workspace: state.workspace.recently_added_workspace
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_workspace: (workspace) => dispatch({ type: 'ADD_WORKSPACE', workspace }),
        get_selected: (workspace) => dispatch({ type: 'GET_SELECTED', workspace}),
        set_workspaces: (workspaces) => dispatch({ type: 'GET_WORKSPACES', workspaces})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceMenu)