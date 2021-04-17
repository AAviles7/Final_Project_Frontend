import { useEffect, useState } from "react"
import { Feed, Icon } from "semantic-ui-react"
import { API_USERS } from '../constants'

const FeedItem = ({ message }) => {
    const [user, setUser] = useState('')

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch(API_USERS)
            const allUsers = await res.json()
            const foundUser = allUsers.find((user) => user.id === message.user_id)
            setUser(foundUser)
        }
        getUsers()
    }, [])

    return(
        <Feed.Event id='feeditem'>
            <Feed.Label>
                <Icon name='user' />
            </Feed.Label>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User id='feeditemname'>{user.display_name}</Feed.User>
                    <Feed.Date>{message.created_at}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    {message.body}
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='fire'/>
                        {message.likes}
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    )
}

export default FeedItem