import { Grid, List } from "semantic-ui-react"
import { connect } from 'react-redux'

const Workspace = () => {
    return(
        <Grid celled id='workspaceContainer'>
            <Grid.Row id='workspaceTopbar'>

            </Grid.Row>
            <Grid.Row>
                <Grid.Column id='workspaceLeftbar'>
                    <List divided relaxed>
                        {}
                    </List>
                </Grid.Column>
                <Grid.Column id='workspaceMain'>

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
        user: state.user.user,
        selected_channel: state.channel.selected
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_selected: (channel) => dispatch({ type: 'SELECT_CHANNEL', channel})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)