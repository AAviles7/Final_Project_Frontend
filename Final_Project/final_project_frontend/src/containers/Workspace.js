import { Divider, Grid, List } from "semantic-ui-react"
import { connect } from 'react-redux'
import ChannelList from '../components/ChannelList'
import UserList from '../components/UserList'
import WorkspaceMain from '../components/WorkspaceMain'
import WorkspaceDetails from '../components/WorkspaceDetails'
import WorkspaceThread from '../components/WorkspaceThread'

const Workspace = ({ channels, users }) => {

    let left = 2
    let center = 12
    let right = 2

    return(
        <Grid celled padded={false} id='workspace'>
            <Grid.Row id='workspaceTopbar'>

            </Grid.Row>
            <Grid.Row id='workspaceContainer'>
                <Grid.Column id='workspaceLeftbar' width={left}>
                    <List relaxed>
                        {channels.map((channel) => <ChannelList channel={channel} key={channel.id}/>)}
                    </List>
                    <Divider />
                    <List relaxed>
                        {users.map((user) => <UserList user={user} key={user.id} />)}
                    </List>
                </Grid.Column>
                <Grid.Column id='workspaceMain' width={center}>
                    <WorkspaceMain />
                </Grid.Column>
                <Grid.Column id='workspaceRightbar' width={right}>
                        
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