import { List } from "semantic-ui-react"
import { connect } from 'react-redux'

const ChannelList = ({ channel }) => {
    return(
        <List.Item>
            <List.Icon name='hashtag' />
            <List.Content>
                <List.Header as='a'>{channel.name}</List.Header>
            </List.Content>
        </List.Item>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_selected: (channel) => dispatch({ type: 'SELECT_CHANNEL', channel})
    }
}

export default connect(null, mapDispatchToProps)(ChannelList)