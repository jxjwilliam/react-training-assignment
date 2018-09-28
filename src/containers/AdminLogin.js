import React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {addAdminLoginUser} from '../actions/'
import {connect} from 'react-redux'
import './AdminLogin.css'

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fireRedirect: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({fireRedirect: true})
    this.props.addAdminLoginUser({email: this.state.email})
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {email, password, fireRedirect} = this.state;
    const {admin} = this.props;
    if (fireRedirect) {
      return <Redirect to="/list"/>
    }

    return (
      <div className="text-center">
        <h1>Admin Panel {admin && admin.email ? `[ ${admin.email} ]` : ''}</h1>
        <form className="form-signin" onSubmit={this.handleSubmit} id="signin" name="signin"
              ref={el => this.form = el}>
          <label htmlFor="email1" className="sr-only">Email</label>
          <input type="email" id="email1" name="email" value={email} className="form-control"
                 placeholder="Email"
                 required=""
                 autoFocus="" onChange={this.handleChange}/>
          <label htmlFor="password" className="sr-only">Password:</label>
          <input type="password" id="password" name="password" value={password} className="form-control"
                 placeholder="Password"
                 required="" onChange={this.handleChange}/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Admin Login</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  admin: state.admin
});

const mapDispatchToProps = (dispatch, ownProps) => {
  let actions = bindActionCreators({
    addAdminLoginUser
  }, dispatch);
  return {...actions, dispatch}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin);

