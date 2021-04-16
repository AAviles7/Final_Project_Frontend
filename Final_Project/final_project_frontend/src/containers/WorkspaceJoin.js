import { useState } from "react"
import { Container, Header, Input, Button } from "semantic-ui-react"
import { connect } from 'react-redux'


const WorkspaceJoin = ({ workspace, history }) => {
    const [join_code, setCode] = useState('')

    const handleClick = () => {
        if(workspace.join_code !== join_code){
            alert('Invalid Join Code')
        }else{
            history.push(`/workspace/${workspace.name}`)
        }
    }

    return(
        <Container>
            <Header as='h1'>{workspace.name}</Header>
            <Input placeholder='Please Enter Join code' onChange={(event) => setCode(event.target.value)}/>
            <Button onClick={handleClick}>Join Work Space</Button>
            <Button onClick={() => history.goBack()}>Go Back</Button>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        workspace: state.workspace.selected_workspace
    }
  }

export default connect(mapStateToProps)(WorkspaceJoin)