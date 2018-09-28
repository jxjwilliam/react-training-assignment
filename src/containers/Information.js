import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import RequestForm from '../components/RequestForm'
import ListTable from '../components/ListTable'
import {ButtonToolbar, Button} from 'react-bootstrap'

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };
  }

  fetchData() {
    fetch('http://someuri/api/v1/requestData')
      .then(res => res.json())
      .then(data => console.log('data:', data))
  }

  componentDidMount() {
    fetch('/etc/requestData.json')
      .then(res => res.json())
      .then(data => this.setState({requests: data}))
  }

  handleSubmit = character => {
    if (character) {
      this.setState({requests: [...this.state.requests, character]});
    }
  };

  render() {
    const {match, user, admin} = this.props;
    return (
      <div className="container">
        <div className="alert-heading">
          {user && user.email && <h1>{user.email}</h1>}
          {admin && admin.email && <h1>{admin.email}</h1>}
          <ButtonToolbar>
            <Link to={`${match.url}/request`}>
              <Button
                bsStyle="link"
                bsSize="large"
              >
                On Leave Request
              </Button>
            </Link>&nbsp;&nbsp;
            <Link to={`${match.url}/list`}>
              <Button
                bsStyle="link"
                bsSize="large"
              >
                List
              </Button>
            </Link>
          </ButtonToolbar>
        </div>
        <Route path={`${match.url}/request`} component={RequestForm}/>
        <Route
          path={`${match.url}/list`}
          render={(routeProps) => (
            <ListTable
              requests={this.state.requests}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path={match.url}
          render={() => <h3>Please select a topic.</h3>}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  admin: state.admin
})

export default connect(
  mapStateToProps
)(Information);
