import React, { Component } from 'react';
import styled from 'styled-components';
import MainTemplate from '../../4-templates/main-template';

const Mockup = styled.div`
  width: 100%;
  height: 100%;
  border: ${props => `1px solid ${props.borderColor}`};
  box-sizing: border-box;
`;

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenLeft: false,
    };
    this._toggleIsOpenLeft = this._toggleIsOpenLeft.bind(this);
  }

  render() {
    const { isOpenLeft } = this.state;
    return (
      <MainTemplate
        top={() => <Mockup borderColor="red" />}
        center={() => <Mockup borderColor="black" />}
        left={() => <Mockup borderColor="blue" />}
        isOpenLeft={isOpenLeft}
      />
    );
  }

  _toggleIsOpenLeft(flag) {
    this.setState(prevState => ({
      ...prevState,
      isOpenLeft: typeof flag === 'boolean' ? flag : !prevState.isOpenLeft,
    }));
  }
}

export default MainPage;
