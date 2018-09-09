import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainTemplate from '../../4-templates/main-template';
import MainHeader from '../../3-organisms/main-header';
import MainNav from '../../3-organisms/main-nav';
import MainUserRegister from '../../3-organisms/main-user-register';
import MainReposList from '../../3-organisms/main-repos-list';
import MainRepoDashboard from '../../3-organisms/main-repo-dashboard';

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
        center={() => (
          <Switch>
            <Route path="/registers" component={MainUserRegister} />
            <Route
              path="/repos/:username/:repoId"
              component={MainRepoDashboard}
            />
            <Route path="/repos/:username" component={MainReposList} />
            <Redirect from="*" to="/registers" />
          </Switch>
        )}
        left={() => <MainNav onToggleNav={_toggleIsOpenLeft} />}
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
