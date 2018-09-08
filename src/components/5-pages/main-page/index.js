import React, { Component } from 'react';
import styled from 'styled-components';
import MainTemplate from '../../4-templates/main-template';
import MainHeader from '../../3-organisms/main-header';

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
    const { _toggleIsOpenLeft } = this;
    const { isOpenLeft } = this.state;
    return (
      <MainTemplate
        top={() => <MainHeader onToggleLeftArea={_toggleIsOpenLeft} />}
        center={() => <Mockup borderColor="black" />}
        left={() => <Mockup borderColor="blue" onClick={_toggleIsOpenLeft} />}
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
