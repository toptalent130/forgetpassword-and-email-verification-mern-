import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import "./auth.css";
import { Link } from 'react-router-dom';
import { verifyPassword } from '../../actions/authActions';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class Forgot extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.verifyPassword({email:this.state.email});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    let content = (
      <div className="landing">
      <div className="dark-overlay">
          <div className="forgot container">
            <h1 className="display-5 text-center">Reset Password</h1>
            <br/>
            <p className="text-center">
                Please enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Enter your email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <input type="submit" disabled={ !(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(this.state.email)) } value="Submit" className="btn btn-primary btn-block" />
              <br/>
              <div className="text-center text-light">
                <Link to="/login">
                    Back to Login
                </Link>
              </div>
            </form>
          </div>
          </div>
      </div>
    )
    if(errors.email_send_state)
    {
      content = <div className="forgot container">
        <div className="logo text-center">
            <img src="/img/logo.png" alt="logo"/>
        </div>
        <h1 className="display-5 text-center" style={{color:'green'}}>Successfully Sent</h1>
        <br/>
        <p className="text-center" style={{color:'blue'}}>
            Please check your email box.
        </p>
      </div>;
      toast("Successfully sent");
    } else {
      // this.props.history.push('/login');
    }
    return (
      <div className="landing">
        <div className="dark-overlay">
          <ToastContainer/>
          {content}
        </div>
      </div>
    );
  }
}

Forgot.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ verifyPassword})(Forgot);
