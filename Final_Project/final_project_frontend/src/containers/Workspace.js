import { Divider, Grid, List } from "semantic-ui-react"
import { connect } from 'react-redux'
import ChannelList from '../components/ChannelList'
import UserList from '../components/UserList'
import WorkspaceMain from '../components/WorkspaceMain'
import WorkspaceDetails from '../components/WorkspaceDetails'
import WorkspaceThread from '../components/WorkspaceThread'

const Workspace = ({ channels, users }) => {
    return(
        <Grid celled id='workspaceContainer'>
            <Grid.Row id='workspaceTopbar'>

            </Grid.Row>
            <Grid.Row>
                <Grid.Column id='workspaceLeftbar'>
                    <List relaxed>
                        {channels.map((channel) => <ChannelList channel={channel} key={channel.id}/>)}
                    </List>
                    <Divider />
                    <List relaxed>
                        {users.map((user) => <UserList user={user} key={user.id} />)}
                    </List>
                </Grid.Column>
                <Grid.Column id='workspaceMain'>
                    <WorkspaceMain />
                </Grid.Column>
                <Grid.Column id='workspaceRightbar'>
                        
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        channels: state.workspace.selected.channels,
        users: state.workspace.selected.users,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // select: (target) => dispatch({ type: 'SELECT_TARGET', target})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)