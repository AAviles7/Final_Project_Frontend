import { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Search, Dropdown, Image, Popup, Button, Divider } from 'semantic-ui-react'
import Hedwig from '../images/Hedwig.png'

const TopBar = ({ user, all_users, all_chatrooms, history }) => {
    const [searchedUsers, setSearchUsers] = useState('')
    const [searchedChatrooms, setSearchChatrooms] = useState('')
    const [searchBy, setSearchBy] = useState('User')

    const filterUsers = all_users.filter((user) => (user.display_name).toLowerCase().includes(searchedUsers.toLowerCase()))
    const filterChatrooms = all_chatrooms.filter((chatroom) => (chatroom.name).toLowerCase().includes(searchedChatrooms.toLowerCase()))

    let results = []
    if(searchBy === 'User'){
        results = []
        filterUsers.map((user) => results.push({title: user.display_name, description: user.email}))
    }else if(searchBy === 'Channel'){
        results = []
        filterChatrooms.map((chatroom) => results.push({title: chatroom.name}))
    }else{
        results = []
    }
    

    return(
        <Fragment>
            <Image src={Hedwig} size='small' id='topbarlogo'/>
            <Dropdown text='Search By :' id='dropdownmenu'>
                <Dropdown.Menu>
                    <Dropdown.Item text='User' onClick={() => setSearchBy('User')}/>
                    <Dropdown.Item text='Channel' onClick={() => setSearchBy('Channel')}/>
                </Dropdown.Menu>
            </Dropdown>
            <Search id='topsearch' size='large' onSearchChange={(event) => searchBy==='User' ? setSearchUsers(event.target.value) : setSearchChatrooms(event.target.value)} results={results} placeholder={`${searchBy}`}/>
            <Popup 
                on='click'
                pinned
                position='bottom right'
                trigger={<Icon name='user' size='big' id='profileicon' />}
            >
                <Popup.Content>
                    <Popup.Header as='h1'>{user.display_name}</Popup.Header>
                    <Popup.Header as='h4'>E-mail: {user.email}</Popup.Header>
                    <Popup.Header as='h4'>Phone# {user.phone_number}</Popup.Header>
                    <Popup.Header as='h4'>Bio: {user.bio}</Popup.Header>
                    <Button fluid>Edit Profile</Button>
                    <Divider />
                    <Button fluid onClick={() => history.push('/select_workspace')}>Return to Workspace Menu</Button>
                    <Divider hidden />
                    <Button fluid onClick={() => history.push('/logout')}>Logout</Button>
                </Popup.Content>
            </Popup>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user.user,
        all_users: state.workspace.selected_workspace.users,
        all_chatrooms: state.workspace.selected_workspace.chatrooms
    }
}

export default connect(mapStateToProps)(TopBar)