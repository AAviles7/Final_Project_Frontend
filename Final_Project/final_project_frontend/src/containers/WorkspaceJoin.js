import { useState } from "react"
import { Container, Header, Input, Button, Checkbox } from "semantic-ui-react"
import { connect } from 'react-redux'
import { API_WORKSPACE_MEMBERS } from '../constants'


const WorkspaceJoin = ({ workspace, history, workspace_user, set_workspace_user, user }) => {
    const [join_code, setCode] = useState('')
    const [remember, setRemember] = useState(false)

    const updateRemeber = async () => {
        const updatedMember = {
            remember: remember
        }
        const reqObj = {
            headers: { "Content-Type": "application/json" },
            method: 'PATCH',
            body: JSON.stringify(updatedMember)
        }
        const res = await fetch(API_WORKSPACE_MEMBERS+workspace_user.id, reqObj)
        const newData = await res.json()
        set_workspace_user(newData)
    }

    const joinWorkspace = async () => {
        const newMember = {
            workspace_id: workspace.id,
            user_id: user.id,
            remember: remember
        }
        const reObj = {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify(newMember)
        }
        const res = await fetch(API_WORKSPACE_MEMBERS, reObj)
        const newMemberData = await res.json()
        set_workspace_user(newMemberData)
    }

    const handleClick = () => {
        if(workspace.join_code !== join_code){
            alert('Invalid Join Code')
        }else{
            if(workspace_user===null){
                joinWorkspace()
            }
            if(remember && workspace_user!==null){
                updateRemeber()
            }
            history.push(`/workspace/${workspace.name}`)
        }
    }

    return(
        <Container>
            <Header as='h1'>{workspace.name}</Header>
            <Input placeholder='Please Enter Join code' onChange={(event) => setCode(event.target.value)}/>
            <Button onClick={handleClick}>Join Work Space</Button>
            <Button onClick={() => history.goBack()}>Go Back</Button>
            <Checkbox  label='Remember me' onChange={() => setRemember(!remember)} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        workspace: state.workspace.selected_workspace,
        workspace_user: state.workspace.selected_workspace_user,
        user: state.user.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_workspace_user: (user) => dispatch({ type: 'SET_WORKSPACE_USER', user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceJoin)