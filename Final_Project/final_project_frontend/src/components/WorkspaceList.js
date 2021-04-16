import { List } from "semantic-ui-react"
import { connect } from 'react-redux'


const WorkspaceList = ({ workspace, get_selected, history }) => {
    return(
        <List.Item>
            <List.Icon name='chat' size='large' verticalAlign='middle' />
            <List.Content>
                <List.Header as='a' onClick={() => {
                    get_selected(workspace);
                    history.push(`/join_workspace/${workspace.name}`);
                    }} >{workspace.name}</List.Header>
            </List.Content>
        </List.Item>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_selected: (workspace) => dispatch({ type: 'GET_SELECTED', workspace})
    }
}

export default connect(null, mapDispatchToProps)(WorkspaceList)