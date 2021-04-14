import { List } from "semantic-ui-react"
import { connect } from 'react-redux'

const UserList = ({ user, select }) => {
    return(
        <List.Item onClick={() => select(user)}>
            <List.Icon name='hashtag'/>
            <List.Content>
                <List.Header as='a'>{user.display_name}</List.Header>
            </List.Content>
        </List.Item>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        select: (target) => dispatch({ type: 'SELECT_TARGET', target})
    }
}

export default connect(null, mapDispatchToProps)(UserList)