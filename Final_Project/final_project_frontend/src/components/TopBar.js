import { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Search, Dropdown, Image, Popup } from 'semantic-ui-react'
import Hedwig from '../images/Hedwig.png'

const TopBar = ({ user, all_users, all_chatrooms }) => {
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
                content={`${user.display_name}`}
                on='click'
                pinned
                position='bottom right'
                trigger={<Icon name='user' size='big' id='profileicon' />}
            />
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