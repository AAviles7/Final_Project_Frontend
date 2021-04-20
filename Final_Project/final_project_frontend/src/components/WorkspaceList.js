import { List } from "semantic-ui-react"
import { connect } from 'react-redux'
import { useEffect, useState } from "react"
import { API_WORKSPACE_MEMBERS } from '../constants'


const WorkspaceList = ({ workspace, get_selected, history, user, set_workspace_user }) => {
    const [workspaceUser, setWorkspaceUser] = useState(null)
    const [userFound, setUserFound] = useState(false)

    useEffect(() => {
        const found = workspace.users.find((u) => u.id===user.id)
        if(found){
            setUserFound(true)
            const findUser = async () =>{
                const res = await fetch(API_WORKSPACE_MEMBERS)
                const membersData = await res.json()
                const workspaceData = membersData.filter((members) => members.workspace_id === workspace.id)
                const foundMemberData = workspaceData.filter((members) => members.user_id === user.id)
                setWorkspaceUser(foundMemberData[0])
            }
            findUser()
        }
    }, [])

    const handleClick = () => {
        if(userFound && workspaceUser.remember){
            get_selected(workspace);
            set_workspace_user(workspaceUser);
            history.push(`/workspace/${workspace.name}`)
        }else{
            get_selected(workspace);
            set_workspace_user(workspaceUser);
            history.push(`/join_workspace/${workspace.name}`)
        }
    }

    return(
        <List.Item>
            <List.Icon name='chat' size='large' verticalAlign='middle' />
            <List.Content>
                <List.Header as='a' onClick={() => handleClick()} >{workspace.name}</List.Header>
            </List.Content>
        </List.Item>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.user.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_selected: (workspace) => dispatch({ type: 'GET_SELECTED', workspace}),
        set_workspace_user: (user) => dispatch({ type: 'SET_WORKSPACE_USER', user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceList)