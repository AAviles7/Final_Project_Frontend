import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Divider, Form, Header } from "semantic-ui-react"
import { API_WORKSPACES, API_CHATROOMS, API_WORKSPACE_MEMBERS } from '../constants'

class WorkspaceForm extends Component {

    state = {
        name: '',
        join_code: '',
        chatroom_name: ''
    }

    resetStates = () => {
        this.setState({
            name: '',
            join_code: '',
            chatroom_name: ''
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const newWorkspace = {
            name: this.state.name,
            join_code: this.state.join_code
        }

        const reqObj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newWorkspace),
        }

        fetch(API_WORKSPACES, reqObj)
            .then((res) => res.json())
            .then((workspace) => {                
                const newChatroom = {
                    name: this.state.chatroom_name,
                    workspace_id: workspace.id
                }
                const rObj = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newChatroom),
                }
                fetch(API_CHATROOMS, rObj)
                this.props.set_recent(workspace)
                this.props.add(workspace);
                this.resetStates()
            })
        
        event.target.reset()
    }

    render(){
        return(
            <Fragment>
                <Header as='h1'>Join existing Workspace or Create a new Workspace</Header>
                <Divider />
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <Form.Field onChange={(event) => this.setState({ name: event.target.value })}>
                        <label>Name</label>
                        <input placeholder='Enter Name for new workspace' />
                    </Form.Field>
                    <Form.Field onChange={(event) => this.setState({ join_code: event.target.value })}>
                        <label>Join Code</label>
                        <input placeholder='Enter Join Code for users to join workspace' />
                    </Form.Field>
                    <Divider />
                    <Form.Field onChange={(event) => this.setState({ chatroom_name: event.target.value })}>
                        <label>Name of First Channel</label>
                        <input placeholder='Enter Name for the first Channel' />
                    </Form.Field>
                    <Form.Button type='submit'>Submit</Form.Button>
                </Form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_recent: (workspace) => dispatch({ type: 'SET_RECENT', workspace })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceForm)