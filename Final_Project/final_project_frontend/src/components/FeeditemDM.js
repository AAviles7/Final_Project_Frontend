import { useEffect, useState } from "react"
import { Feed, Icon } from "semantic-ui-react"
import { API_DIRECTMESSAGE_LIKES } from '../constants'
import { connect } from 'react-redux'

const FeedItemDM = ({ message, logged_user }) => {
    const [currentUserLike, setCurrentUserLike] = useState(false)
    const [likes, setLikes] = useState(message.directmessage_likes.length)
    const [userLike, setUserLike] = useState(null)

    useEffect(() => {
        const foundLike = message.directmessage_likes.map((like) => like.user_id === logged_user.id)
        setCurrentUserLike(foundLike.includes(true))
        if(foundLike.includes(true)){
            const likeData = message.directmessage_likes.filter((like) => like.user_id === logged_user.id)
            setUserLike(likeData[0])
        }
    }, [message])

    const like = async () => {
        if(!currentUserLike){
            const newLike = {
                user_id: logged_user.id,
                direct_message_id: message.id
            }

            const reObj = {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify(newLike)
            }

            const res = await fetch(API_DIRECTMESSAGE_LIKES, reObj)
            const newLikeData = await res.json()
            setUserLike(newLikeData)
            setLikes(likes+1)
            setCurrentUserLike(true)
        }else if(currentUserLike){
            const reObj = {
                headers: {"Content-Type": "application/json"},
                method: "DELETE"
            }

            await fetch(API_DIRECTMESSAGE_LIKES+userLike.id, reObj)
            setLikes(likes-1)
            setCurrentUserLike(false)
            setUserLike(null)
        }
    }

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
                <Feed.Meta>
                    <Feed.Like onClick={() => like()}>
                        <Icon name='fire' color={currentUserLike ? 'red' : null}/>
                        {likes}
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    )
}

const mapStateToProps = (state) => {
    return {
        logged_user: state.user.user.user
    }
}

export default connect(mapStateToProps)(FeedItemDM)