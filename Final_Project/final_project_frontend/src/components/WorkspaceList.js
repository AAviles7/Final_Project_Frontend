import { List } from "semantic-ui-react"

const WorkspaceList = ({ workspace, select, history }) => {
    return(
        <List.Item>
            <List.Icon name='chat' size='large' verticalAlign='middle' />
            <List.Content>
                <List.Header as='a' onClick={() => {
                    select(workspace);
                    history.push(`/join_workspace/${workspace.name}`);
                    }} >{workspace.name}</List.Header>
            </List.Content>
        </List.Item>
    )
}

export default WorkspaceList