import { connect } from 'react-redux';
import { pushUser } from '../../../ducks/modules/users';
import Presenter from './presenter';

const mapDispatchToProps = dispatch => ({
  onSubmitUser: username => dispatch(pushUser({ username })),
});

export default connect(
  null,
  mapDispatchToProps,
)(Presenter);
