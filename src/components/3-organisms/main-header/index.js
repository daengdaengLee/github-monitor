import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleButton = styled.button`
  border: 0 none !important;
  position: absolute !important;
  top: calc(50% - 25px);
  width: 50px;
  height: 50px;
  cursor: pointer;
  outline: 0 none;
  margin-left: 1rem;
`;

const MainHeader = ({ onToggleLeftArea }) => (
  <Container>
    <ToggleButton onClick={onToggleLeftArea} />
    <Title>Github Monitor</Title>
  </Container>
);

MainHeader.propTypes = {
  onToggleLeftArea: PropTypes.func.isRequired,
};

export default MainHeader;
