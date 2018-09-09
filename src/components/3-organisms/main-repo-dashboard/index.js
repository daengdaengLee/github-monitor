import { connect } from 'react-redux';
import { fetchStart } from '../../../ducks/modules/commits';
import Presenter from './presenter';

const mapStateToProps = state => ({
  repos: state.repos.repos,
  commits: state.commits.commits,
});

const mapDispatchToProps = dispatch => ({
  fetchStart: (username, repo) =>
    dispatch(fetchStart({ owner: username, repo })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presenter);
