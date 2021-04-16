import React, { Component, Fragment } from "react";
import { Checkbox, Divider, Form, Header } from "semantic-ui-react"
import { API_WORKSPACES } from '../constants'

class WorkspaceForm extends Component {

    state = {
        name: '',
        join_code: ''
    }

    resetStates = () => {
        this.setState({
            name: '',
            join_code: ''
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
                    <Form.Button type='submit'>Submit</Form.Button>
                </Form>
            </Fragment>
        )
    }
}

export default WorkspaceForm