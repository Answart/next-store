import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import DisplayMessage from '../DisplayMessage';
import StyledForm from '../styles/FormStyles';
import { RESET_PASSWORD_MUTATION } from '../../graphql';


class ResetPasswordForm extends React.Component {
  static propTypes = {
    resetToken: PropTypes.string
  };
  state = {
    password: '',
    confirmPassword: '',
  };
  saveToState = e => this.setState({ [e.target.name]: e.target.value });
  submitForm = async (e, resetPassword) => {
    e.preventDefault();
    await resetPassword().then((res) => {
      Router.push({
        pathname: "/shop",
        query: { name: `${res.data.resetPassword.name}` }
      });

      this.setState({
        password: '', confirmPassword: ''
      });
    });
  }
  render() {
    const disabled = !this.props.resetToken || this.props.resetToken.length !== 40;
    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
      >
        {(resetPassword, { error, loading }) => (
          <StyledForm onSubmit={e => this.submitForm(e, resetPassword)}>
            <DisplayMessage error={error} />

            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset Your Password</h2>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={this.state.password}
                  onChange={this.saveToState}
                  required
                />
              </label>

              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="New Password"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                  required
                />
              </label>

              <button className="big-btn"
                disabled={disabled}
                title={disabled ? 'Requires valid token' : 'Click to reset'}
                type="submit"
              >Reset{loading ? 'ting' : ''} Password</button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
};


export { ResetPasswordForm };
