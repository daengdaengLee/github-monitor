import { connect } from 'react-redux';
import Presenter from './presenter';

const mapStateToProps = state => ({
  repos: state.repos.repos,
});

export default connect(mapStateToProps)(Presenter);
