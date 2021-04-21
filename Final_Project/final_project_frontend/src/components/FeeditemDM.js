import { useEffect, useState } from "react"
import { Feed, Icon } from "semantic-ui-react"
import { connect } from 'react-redux'

const FeedItemDM = ({ message }) => {
    return(
        <Feed.Event id='feeditem'>
            <Feed.Label>
                <Icon name='user' />
            </Feed.Label>
            <Feed.Content>
            <   Feed.Summary>
                    <Feed.User id='feeditemname'>{message.user.display_name}</Feed.User>
                    <Feed.Date>{message.created_at}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    {message.body}
                </Feed.Extra>
            </Feed.Content>
        </Feed.Event>
    )
}

export default FeedItemDM