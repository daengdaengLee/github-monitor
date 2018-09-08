import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopArea = styled.div`
  height: 8rem;
`;

const CenterArea = styled.div`
  height: 0;
  flex-grow: 1;
`;

const LeftArea = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  width: 80%;
  @media (min-width: 768px) {
    width: 16rem;
  }
`;

const MainTemplate = ({ top, center, left, isOpenLeft }) => (
  <Container>
    <TopArea>{top()}</TopArea>
    <CenterArea>{center()}</CenterArea>
    {isOpenLeft ? <LeftArea>{left()}</LeftArea> : null}
  </Container>
);

MainTemplate.propTypes = {
  top: PropTypes.func.isRequired,
  center: PropTypes.func.isRequired,
  left: PropTypes.func.isRequired,
  isOpenLeft: PropTypes.bool.isRequired,
};

export default MainTemplate;
