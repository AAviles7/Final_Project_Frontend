import { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Search, Dropdown, Image, Popup, Button, Divider } from 'semantic-ui-react'
import Hedwig from '../images/Hedwig.png'
import LeaveWorkspacePortal from './LeaveWorkspacePortal'
import EditProfilePortal from './EditProfilePortal'

const TopBar = ({ user, all_users, all_chatrooms, history }) => {
    const [searchedUsers, setSearchUsers] = useState('')
    const [searchedChatrooms, setSearchChatrooms] = useState('')
    const [searchBy, setSearchBy] = useState('User')
    const [results, setResults] = useState([])
    const [open, setOpen] = useState(false)

    const handleSearch = (event) => {
        searchBy==='User' ? setSearchUsers(event.target.value) : setSearchChatrooms(event.target.value)
        const filterUsers = all_users.filter((user) => (user.display_name).toLowerCase().includes(searchedUsers.toLowerCase()))
        const filterChatrooms = all_chatrooms.filter((chatroom) => (chatroom.name).toLowerCase().includes(searchedChatrooms.toLowerCase()))
        let tempResults = []
    
        if(searchBy === 'User'){
            setResults([])
            tempResults = []
            filterUsers.map((user) => tempResults.push({title: user.display_name, description: user.email}))
            setResults(tempResults)
        }else if(searchBy === 'Channel'){
            setResults([])
            tempResults = []
            filterChatrooms.map((chatroom) => tempResults.push({title: chatroom.name}))
            setResults(tempResults)
        }else{
            tempResults = []
            setResults([])
            setResults(tempResults)
        }
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
            <Search id='topsearch' size='large' onSearchChange={(event) => handleSearch(event)} results={results} placeholder={`${searchBy}`}/>
            <Popup 
                on='click'
                basic
                open={open}
                position='bottom right'
                trigger={<Icon name='user' size='big' id='profileicon' onClick={() => setOpen(!open)}/>}
            >
                <Popup.Content>
                    <Icon name='close' id='popupclose' onClick={() => setOpen(!open)}/>
                    <Popup.Header as='h1'>{user.display_name}</Popup.Header>
                    <Popup.Header as='h4'>E-mail: {user.email}</Popup.Header>
                    <Popup.Header as='h4'>Phone# {user.phone_number}</Popup.Header>
                    <Popup.Header as='h4'>Bio: {user.bio}</Popup.Header>
                    {/* <EditProfilePortal setOpen={setOpen}/> */}
                    <Divider />
                    <Button fluid onClick={() => history.push('/select_workspace')}>Sign-in to another Workspace</Button>
                    <Divider hidden />
                    <LeaveWorkspacePortal history={history} setOpen={setOpen}/>
                    <Divider hidden />
                    <Button negative fluid onClick={() => history.push('/logout')}>Logout</Button>
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