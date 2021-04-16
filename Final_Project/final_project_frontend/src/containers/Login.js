import React, { Component } from 'react'
import { Button, Divider, Form, Grid, Segment, Container, Image } from 'semantic-ui-react'
import { TransitionablePortal } from 'semantic-ui-react'
import Signup from '../components/Signup'
import Hedwig from '../images/Hedwig.png'
import { API_LOGIN } from '../constants'

class Login extends Component {

state = {
        username: "",
        password: "",
        signup: false
    };
    
    setUsername = (username) => {
        this.setState({ username, error: '' });
    };
    
    setPassword = (password) => {
        this.setState({ password, error: '' });
    };

    openSignup = () => {
        this.setState({ signup: true })
    }
    
    closeSignup = () => {
        this.setState({ signup: false })
    }

    handleSubmit = (event) => {
        event.preventDefault();
    
        let newUser = {
          username: this.state.username,
          password: this.state.password,
        };
    
        let reqObj = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: newUser }),
        };
    
        fetch(API_LOGIN, reqObj)
          .then((res) => {
            const jsonPromise = res.json();
    
            if (res.ok) {
              return jsonPromise;
            }
    
            return jsonPromise.then((error) => {
              return Promise.reject(error);
            });
          })
          .then((user) => {
            this.props.login(user);
            this.props.history.push("/select_workspace");
        })
          .catch(({ error }) => {
            this.setState({
                error,
              });
            alert('Invalid Login Please Try Again!')
        });
    };
    
    render(){
        return(
            <Container>
                <Divider hidden />
                <Image src={Hedwig} centered />
                <Divider hidden />
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable >
                
                        <Grid.Column>
                            <Form>
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                label='Username'
                                placeholder='Username'
                                onChange={(e) => this.setUsername(e.target.value)}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                                onChange={(e) => this.setPassword(e.target.value)}
                            />
                            <Button content='Login' primary onClick={this.handleSubmit}/>
                            </Form>
                        </Grid.Column>
                
                        <Grid.Column verticalAlign='middle'>
                        <Button content='Sign up' icon='signup' size='big' onClick={this.state.signup ? this.closeSignup : this.openSignup}/>
                        </Grid.Column>
                
                    </Grid>
                    <Divider vertical>Or</Divider>
                </Segment>

                <TransitionablePortal
                    onClose={this.closeSignup}
                    open={this.state.signup}>
                    <Segment>
                        <Signup close={this.closeSignup} />
                    </Segment>
                </TransitionablePortal>

            </Container>
        )
    }
}


export default Login