import React from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import DisplayMessage from '../DisplayMessage';
import StyledForm from '../styles/FormStyles';
import { SIGNUP_MUTATION, CURRENT_USER_QUERY } from '../../graphql';


class SignupForm extends React.Component {
  state = {
    name: '', email: '', password: ''
  };
  saveToState = e => this.setState({ [e.target.name]: e.target.value });
  submitForm = async (e, createUser) => {
    e.preventDefault();
    await createUser().then((res) => {
      if (!res || !res.data) return;
      Router.push({
        pathname: "/shop",
        query: { name: `${res.data.createUser.name}` }
      });

      this.setState({
        name: '', email: '', password: ''
      });
    });
  }
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onError={(e) => {}}
      >
        {(createUser, { error, loading }) => (
          <StyledForm onSubmit={e => this.submitForm(e, createUser)}>
            <DisplayMessage error={error} />

            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for An Account</h2>

              <label htmlFor="email">
                Email
                <input
                  id="email"
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
                  id="name"
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
                  id="password"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>

              <button className="big-btn"
                disabled={loading}
                type="submit"
              >Sign Up!</button>
            </fieldset>
          </StyledForm>
        )}
      </Mutation>
    );
  }
};


export { SignupForm };
