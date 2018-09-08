import React, { Component } from 'react';
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

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Users',
    };
  }

  render() {
    const { users, onToggleNav, onClickNavItem } = this.props;
    const { title } = this.state;
    const navs =
      title === 'Users' ? users.map(user => ({ key: user, title: user })) : [];
    const type = title === 'Users' ? 'user' : 'repo';
    return (
      <Container>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onToggleNav} />
        </Header>
        <Nav>
          <List>
            {navs.map(nav => (
              <ListItem
                key={nav.key}
                onClick={() => onClickNavItem(type, nav.key)}
              >
                {nav.title}
              </ListItem>
            ))}
          </List>
        </Nav>
      </Container>
    );
  }
}

MainNav.defaultProps = {
  users: [],
};

MainNav.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string),
  onToggleNav: PropTypes.func.isRequired,
  onClickNavItem: PropTypes.func.isRequired,
};

export default MainNav;
