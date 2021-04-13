import { Container, Grid, List } from "semantic-ui-react"
import { connect } from 'react-redux'
import WorkspaceList from '../components/WorkspaceList'
import WorkspaceForm from '../components/WorkspaceForm'

const WorkspaceMenu = ({ workspaces, add_workspace, get_selected, history }) => {
    return(
        <Container>
            <Grid celled >
                <Grid.Column width={3}>
                    <List divided relaxed>
                        {workspaces.map((workspace) => <WorkspaceList history={history} select={get_selected} workspace={workspace} key={workspace.id}/>)}
                    </List>
                </Grid.Column>
                <Grid.Column width={13}>
                    <WorkspaceForm add={add_workspace}/>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        workspaces: state.workspace.workspaces
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_workspaces: (workspaces) => dispatch({ type: 'GET_WORKSPACES', workspaces: workspaces }),
        add_workspace: (workspace) => dispatch({ type: 'ADD_WORKSPACE', workspace }),
        get_selected: (workspace) => dispatch({ type: 'GET_SELECTED', workspace})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceMenu)