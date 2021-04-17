import { List } from "semantic-ui-react"
import { connect } from 'react-redux'

const UserList = ({ logged_user, user, select }) => {
    return(
        <List.Item id='listitem'>
            <List.Icon name='hashtag'/>
            <List.Content>
                <List.Header as='h4' id='userlistitem'>{logged_user.id === user.id ? `${user.display_name} (You)` : `${user.display_name}`}</List.Header>
            </List.Content>
        </List.Item>
    )
}

const mapStateToProps = (state) => {
    return {
        logged_user: state.user.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        select: (target) => dispatch({ type: 'SELECT_TARGET', target})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)