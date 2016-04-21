import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import LoginForm from '../../partials/LoginForm';

export default class Login extends Component {
  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.member.isAuthenticated) {
      this.context.router.push('/member');
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.member.isAuthenticated) {
      this.context.router.push('/member');
    }
  }

  handleSubmit(data) {
    this.props.memberLogin(data);
  }

  renderErrorMessage() {
    return (
      <div className="row">
        <div className="col-md-12">
          <p className="text-danger">{this.props.member.error}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title="Member Login" />
        <div className="col-md-8">
          <LoginForm onSubmit={ this.handleSubmit } />

          {this.props.member.error && this.renderErrorMessage()}

        </div>
        <div className="col-md-4">
          Sidebar   
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object
};