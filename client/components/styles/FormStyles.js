import styled from 'styled-components';


const StyledForm = styled.form`
  padding: 20px;
  font-size: 1.3rem;
  line-height: 1.5;
  font-weight: 600;
  color: ${props => props.theme.darkGrey};
  background-color: ${props => props.theme.beige};
  box-shadow: ${props => props.theme.bs};
  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      display: block;
      height: 10px;
      content: '';
    }
    h2 {
      text-align: center;
      padding-bottom: 4rem;
    }
    button.form-submit-btn {
      margin-top: 5rem;
      float: right;
    }
  }
  label {
    display: block;
    font-size: 1.2rem;
    .inline-lbl {
      margin: 0;
      pading-left: 0.3rem 0 0 0.25rem;
      font-size: 1rem;
      font-weight: normal;
    }
    .lbl-button {
      display: inline;
      width: 8rem;
      cursor: pointer;
      font-weight: normal;
      font-size: 1rem;
      color: ${props => props.theme.black};
      padding: 0.25rem 0.9rem;
      margin: 1rem 0;
      background-color: ${props => props.theme.beige};
      border: 1px solid #9A9A9A;
      border-radius: 5px;
      &:hover, &:active {
        border: 1px solid ${props => props.theme.darkGrey};
      }
    }
  }
  input,
  textarea,
  select {
    display: block;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 0;
    border-bottom: 1px solid ${props => props.theme.grey};
    background-color: transparent;
    &:focus {
      outline: ${props => props.theme.darkBlue};
      border-color: ${props => props.theme.darkBlue};
    }
    &:active {
      color: ${props => props.theme.darkBlue};
      border-color: ${props => props.theme.darkBlue};
    }
  }
  input[type='file'] {
    border: 0;
    display: none;
  }
  input[type='checkbox'] {
    width: 1.8rem;
    height: 1.8rem;
    margin: 0 0.25rem 0 0;
    padding: 0;
    float: left;
  }
  input[type='number'] {
    display: block;
    min-width: 12rem;
    width: auto;
  }
  input[type='radio'] {
    display: inline;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 0.5rem 0 0;
    padding: 0;
  }
  textarea,
  select {
    height: 2rem;
    padding: 0.25rem;
    border: 1px solid ${props => props.theme.grey};
    margin: 0.25rem;
  }
  textarea {
    display: block;
    height: 5rem;
    min-height: 5rem;
    max-height: 15rem;
    resize: vertical;
  }
  select {
    display: block;
    min-width: 12rem;
    width: auto;
  }
  .field-padding {
    padding: 0.5rem 0;
  }
  .chkbx-label {
    padding: 0.4rem 0;
  }
  .inline-lbl {
    margin: 0;
    block: inherit;
  }
  .field-detail {
    font-size: 1rem;
    h5 {
      text-decoration: underline;
      color: ${props => props.theme.darkGrey};
    }
    p {
      font-weight: normal;
      padding: 0;
      margin: 0;
    }
  }
`;


export default StyledForm;
