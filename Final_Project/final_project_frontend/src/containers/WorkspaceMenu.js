import { Container, Grid } from "semantic-ui-react"
import { connect } from 'react-redux'
import WorkspaceForm from '../components/WorkspaceForm'
import WorkspaceMenulist from '../components/WorkspaceMenuList'
import { Fragment } from "react"

const WorkspaceMenu = ({ add_workspace, history }) => {
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
        workspaces: state.workspace.workspaces
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_workspace: (workspace) => dispatch({ type: 'ADD_WORKSPACE', workspace }),
        get_selected: (workspace) => dispatch({ type: 'GET_SELECTED', workspace})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceMenu)