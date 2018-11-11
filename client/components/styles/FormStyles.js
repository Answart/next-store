import styled from 'styled-components';


const StyledForm = styled.form`
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
    }
  }
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 0;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
    font-size: 1rem;
    background-color: transparent;
    &:focus {
      outline: ${props => props.theme.darkblue};
      border-color: ${props => props.theme.darkblue};
    }
    &:active {
      color: ${props => props.theme.darkblue};
      border-color: ${props => props.theme.darkblue};
    }
  }
  input[type='file'] {
    border: 0;
  }
  input[type=checkbox] {
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    float: left;
    background-color: yellow;
  }
  textarea,
  select {
    height: 2rem;
    padding: 0.25rem;
    border: 1px solid ${props => props.theme.lightGrey};
  }
  textarea {
    height: 3.2rem;
  }
  button {
    width: auto;
    border: 0;
    padding: 0.5rem 1.4rem;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 600;
    &[disabled] {
      opacity: 0.5;
    }
  }
  button[type='submit'] {
    background: ${props => props.theme.darkblue};
    color: white;
  }
  button[type='cancel'] {
    background: transparent;
    color: ${props => props.theme.textGrey};
    font-size: 1rem;
    &:hover {
      text-decoration: underline ${props => props.theme.orange};
    }
    a {
      padding: 0;
      color: ${props => props.theme.textGrey};
      font-size: 1rem;
    }
  }
  .form-actions {
    display: block;
    text-align: right;
  }
`;

export default StyledForm;
