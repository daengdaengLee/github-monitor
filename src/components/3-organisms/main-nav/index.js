import { connect } from 'react-redux';
import Presenter from './presenter';

const mapStateToProps = state => ({
  users: state.users.usernames,
});

export default connect(mapStateToProps)(Presenter);
