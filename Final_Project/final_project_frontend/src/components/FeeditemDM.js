import { useEffect, useState } from "react"
import { Feed, Icon, Popup } from "semantic-ui-react"
import { API_DIRECTMESSAGE_LIKES } from '../constants'
import { connect } from 'react-redux'

const FeedItemDM = ({ message, logged_user }) => {
    const [currentUserLike, setCurrentUserLike] = useState(false)
    const [likes, setLikes] = useState(message.directmessage_likes.length)
    const [userLike, setUserLike] = useState(null)
    const [likesArray, setLikeArray] = useState([])

    useEffect(() => {
        const foundLike = message.directmessage_likes.map((like) => like.user_id === logged_user.id)
        setCurrentUserLike(foundLike.includes(true))
        if(foundLike.includes(true)){
            const likeData = message.directmessage_likes.filter((like) => like.user_id === logged_user.id)
            setUserLike(likeData[0])
        }
        const getLikes = async () => {
            const res = await fetch(API_DIRECTMESSAGE_LIKES)
            const likeData = await res.json()
            const likeDataFiltered = likeData.filter((like) => like.direct_message_id === message.id)
            setLikeArray(likeDataFiltered)
        }
        getLikes()
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
            setLikeArray([...likesArray, newLikeData])
            setUserLike(newLikeData)
            setLikes(likes+1)
            setCurrentUserLike(true)
        }else if(currentUserLike){
            const reObj = {
                headers: {"Content-Type": "application/json"},
                method: "DELETE"
            }

            await fetch(API_DIRECTMESSAGE_LIKES+userLike.id, reObj)
            setLikeArray(likesArray.filter((like) => like.id !== userLike.id))
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
                    <Popup position='left center' mouseEnterDelay={500} mouseLeaveDelay={500} on='hover' disabled={likesArray.length < 1} trigger={
                        <Feed.Like onClick={() => like()}>
                            <Icon name='fire' color={currentUserLike ? 'red' : null}/>
                            {likes}
                        </Feed.Like>
                    }>
                        <Popup.Content>
                            {likesArray.map((like) => <Popup.Header as='p'>{like.user.display_name}</Popup.Header>)}
                        </Popup.Content>
                    </Popup>
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