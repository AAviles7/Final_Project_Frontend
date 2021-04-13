import { Component } from "react"
import { Container, Header, Input, Button } from "semantic-ui-react"

class WorkspaceJoin extends Component{

    state = {
        join_code: ''
    }

    handleClick = () => {
        if(this.props.workspace.join_code !== this.state.join_code){
            alert('Invalid Join Code')
        }else{
            this.props.history.push(`/workspace/${this.props.workspace.name}`)
        }
    }

    render(){
        return(
            <Container>
                <Header as='h1'>{this.props.workspace.name}</Header>
                <Input placeholder='Please Enter Join code' onChange={(event) => this.setState({ join_code: event.target.value })}/>
                <Button onClick={this.handleClick}>Join Work Space</Button>
                <Button onClick={() => this.props.history.goBack()}>Go Back</Button>
            </Container>
        )
    }
}

export default WorkspaceJoin