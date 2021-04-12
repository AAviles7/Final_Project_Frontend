import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

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

    handleSubmit = () => { 
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

        fetch('http://127.0.0.1:4000/users', reqObj)
            .then((res) => res.json())
            .then(() => {
                this.resetStates();
                this.props.close();
                alert('Account created! You can now login!')
            })
    }

    render(){
        return(
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Username' placeholder='Username' onChange={(event) => this.setState({ username: event.target.value })} />
                    <Form.Input fluid label='Password' placeholder='Password' onChange={(event) => this.setState({ password: event.target.value })} />
                    <Form.Input fluid label='Display Name' placeholder='Display Name: Name Users will see' onChange={(event) => this.setState({ display: event.target.value })} />
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input fluid label='Email' placeholder='Email' onChange={(event) => this.setState({ email: event.target.value })} />
                    <Form.Input fluid label='Phone Number' placeholder='Phone Number' onChange={(event) => this.setState({ number: event.target.value })} />
                </Form.Group>

                <Form.TextArea label='Bio' placeholder='Tell us more about you... (Can be editted later)' onChange={(event) => this.setState({ bio: event.target.value })} />
                <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
            </Form>
        )
    }
}

export default Signup