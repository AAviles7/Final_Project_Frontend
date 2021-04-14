import { Container } from "semantic-ui-react"
import { connect } from 'react-redux'

const WorkspaceMain = ({ target }) => {
    return(
        <Container>
            
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        target: state.workspace.target
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceMain)