import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Button } from 'antd';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
`;

const Title = styled.h2`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  height: 100%;
  width: 80%;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    width: 40rem;
  }
`;

const SubmitButton = styled(Button)`
  margin-left: 1rem;
`;

class MainUserRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this._onChangeUsername = this._onChangeUsername.bind(this);
    this._onClickSubmitButton = this._onClickSubmitButton.bind(this);
  }
  render() {
    const { _onChangeUsername, _onClickSubmitButton } = this;
    const { username } = this.state;
    return (
      <Container>
        <Title>Search repos of user</Title>
        <Form>
          <Input
            value={username}
            placeholder="Input Github username"
            onChange={_onChangeUsername}
          />
          <SubmitButton onClick={_onClickSubmitButton}>Submit</SubmitButton>
        </Form>
      </Container>
    );
  }

  _onChangeUsername({ target: { value: username } }) {
    this.setState({ username });
  }

  _onClickSubmitButton() {
    const { onSubmitUser } = this.props;
    const { username } = this.state;
    onSubmitUser(username);
    this.setState({ username: '' });
  }
}

MainUserRegister.propTypes = {
  onSubmitUser: PropTypes.func.isRequired,
};

export default MainUserRegister;
