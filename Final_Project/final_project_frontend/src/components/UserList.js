import { Divider, List, Popup } from "semantic-ui-react"
import { connect } from 'react-redux'
import { API_CONVERSTATIONS } from '../constants'
import { useEffect, useState } from "react"

const UserList = ({ logged_user, user, select, setConversations, conversations, select_conversation, get_dms, workspace, set_conversations }) => {
    const [currentUser, setCurrentUser] = useState(false)
    const [convExist, setConvExist] = useState(false)
    const [existingConv, setExistingConv] = useState(null)

    useEffect(() => {
        if(user.id !== logged_user.id){
            const sendConv = conversations.map((conv) => conv.sender_id === user.id)
            const recConv = conversations.map((conv) => conv.receiver_id === user.id)    
            if(sendConv.includes(true) || recConv.includes(true)){
                setConvExist(true)
                for(var x in conversations){
                    if(conversations[x].sender_id === user.id || conversations[x].receiver_id === user.id){
                        setExistingConv(conversations[x])
                    }
                }
            }
        }else{
            setCurrentUser(true)
        }
    }, [conversations])
    
    const createConversation = async () => {
        const newConversation = {
            sender_id: logged_user.id,
            receiver_id: user.id,
            workspace_id: workspace.id
        }
        const reqObj = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newConversation)
        }
        const res = await fetch(API_CONVERSTATIONS, reqObj)
        const newConvData = await res.json()
        setConversations([...conversations, newConvData])
        set_conversations([...conversations, newConvData])
        select_conversation(newConvData);
        get_dms(newConvData)
        select('user');
    }

    const handleClick = () => {
        if(convExist){
            select('user');
            select_conversation(existingConv);
            get_dms(existingConv)
        }else{
            if(!currentUser){
                createConversation()
            }
        }
    }

    return(
        <Popup position='left center' mouseEnterDelay={500} mouseLeaveDelay={500} on='hover' trigger={
            <List.Item id='listitem' onClick={handleClick}>
                <List.Icon name='hashtag'/>
                <List.Content>
                    <List.Header as='h4' id='userlistitem'>{currentUser ? `${user.display_name} (You)` : `${user.display_name}`}</List.Header>
                </List.Content>
            </List.Item>
        }>
            <Popup.Content>
                <Popup.Header as='h3'>{user.display_name}</Popup.Header>
                <Divider />
                <Popup.Header as='p'>Email: {user.email}</Popup.Header>
                <Popup.Header as='p'>Phone Number: {user.phone_number}</Popup.Header>
                <Popup.Header as='p'>Bio: {user.bio}</Popup.Header>
            </Popup.Content>
        </Popup>
    )
}

const mapStateToProps = (state) => {
    return {
        logged_user: state.user.user.user,
        workspace: state.workspace.selected_workspace
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        select: (target) => dispatch({ type: 'SELECT_TARGET', target}),
        get_dms: (conversation) => dispatch({ type: 'GET_DMS', conversation}),
        select_conversation: (conversation) => dispatch({ type: 'SET_TARGET_CONVERSATION', conversation}),
        set_conversations: (conversations) => dispatch({ type: 'SET_CONVERSATIONS', conversations})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)