import React, { Component } from 'react';
import StyledForm from './styles/FormStyles';


class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
          <StyledForm
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              this.setState({ name: '', email: '', password: '' });
            }}
          >
            <fieldset disabled={false} aria-busy={false}>
              <h2>Sign Up for An Account</h2>

              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>

              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.saveToState}
                />
              </label>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>

              <button className="big-btn"
                type="submit"
              >Sign Up!</button>
            </fieldset>
          </StyledForm>
    );
  }
}

export default Signup;
