import { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import WorkspaceList from './WorkspaceList'
import { List } from "semantic-ui-react"
import { Search } from 'semantic-ui-react'

const WorkspaceMenulist = ({ history, workspaces, set_workspaces }) => {
    const [searchFilter, setSearchFilter] = useState('')
    const filteredWorkspaces = workspaces.filter((workspace) => (workspace.name).toLowerCase().includes(searchFilter.toLowerCase()))

    return(
        <Fragment>
            <Search showNoResults={false} size='big' open={false} placeholder='Search by Name' onSearchChange={(event) => setSearchFilter(event.target.value)} />
            <List divided relaxed>
                {filteredWorkspaces.map((workspace) => <WorkspaceList history={history} workspace={workspace} key={workspace.id}/>)}
            </List>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        workspaces: state.workspace.workspaces
    }
}

export default connect(mapStateToProps)(WorkspaceMenulist)