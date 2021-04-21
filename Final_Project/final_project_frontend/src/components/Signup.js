import React, { Component } from 'react'
import { Form, Header } from 'semantic-ui-react'
import { API_USERS } from '../constants'

class Signup extends Component {

    state = {
        username: '',
        password: '',
        email: '',
        display: '',
        bio: '',
        number: ''
    }

    resetStates = () => {
        this.setState({
            username: '',
            password: '',
            email: '',
            display: '',
            bio: '',
            number: ''
        })
    }

    handleSubmit = (event) => { 
        event.preventDefault()

        let newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            display_name: this.state.display,
            bio: this.state.bio,
            phone_number: this.state.number
        }
      
        let reqObj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: newUser }),
        }

        fetch(API_USERS, reqObj)
            .then((res) => res.json())
            .then(() => {
                this.resetStates();
                this.props.close();
                alert('Account created! You can now login!')
            })

        event.target.reset()
    }

    render(){
        return(
            <Form onSubmit={(event) => this.handleSubmit(event)}>
                <Header>Create New Account</Header>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Username' placeholder='Username' onChange={(event) => this.setState({ username: event.target.value })} />
                    <Form.Input fluid label='Password' placeholder='Password' onChange={(event) => this.setState({ password: event.target.value })} />
                    <Form.Input fluid label='Display Name' placeholder='Display Name: Name Users will see' onChange={(event) => this.setState({ display: event.target.value })} />
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input fluid label='Email' placeholder='Email' onChange={(event) => this.setState({ email: event.target.value })} />
                    <Form.Input fluid label='Phone Number' placeholder='Phone Number' onChange={(event) => this.setState({ number: event.target.value })} />
                </Form.Group>

                <Form.TextArea label='Bio' placeholder='Tell us more about you... ' onChange={(event) => this.setState({ bio: event.target.value })} />
                <Form.Button type='submit'>Create Account</Form.Button>
            </Form>
        )
    }
}

export default Signup