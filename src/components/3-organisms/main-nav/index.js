import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const Header = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const CloseButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: #dee0e2;
  border: 0 none;
  outline: 0 none;
  cursor: pointer;
`;

const Nav = styled.nav`
  height: 0;
  flex-grow: 1;
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden:
  overflow-y: auto;
`;

const ListItem = styled.li`
  width: 100%;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  padding-left: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #dee0e2;
  }
`;

const MainNav = ({ title, navs, onToggleNav, onClickNavItem }) => (
  <Container>
    <Header>
      <Title>{title}</Title>
      <CloseButton onClick={onToggleNav} />
    </Header>
    <Nav>
      <List>
        {navs.map(nav => (
          <ListItem key={nav.key} onClick={() => onClickNavItem(nav.key)}>
            {nav.title}
          </ListItem>
        ))}
      </List>
    </Nav>
  </Container>
);

MainNav.defaultProps = {
  title: 'Navigation',
  navs: [],
};

MainNav.propTypes = {
  title: PropTypes.string,
  navs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ),
  onToggleNav: PropTypes.func.isRequired,
  onClickNavItem: PropTypes.func.isRequired,
};

export default MainNav;
