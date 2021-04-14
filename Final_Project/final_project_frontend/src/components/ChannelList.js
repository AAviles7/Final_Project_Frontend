import { List } from "semantic-ui-react"
import { connect } from 'react-redux'

const ChannelList = ({ channel, select }) => {
    return(
        <List.Item onClick={() => select(channel)}>
            <List.Icon name='hashtag' />
            <List.Content>
                <List.Header as='a'>{channel.name}</List.Header>
            </List.Content>
        </List.Item>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        select: (target) => dispatch({ type: 'SELECT_TARGET', target})
    }
}

export default connect(null, mapDispatchToProps)(ChannelList)