import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCanvas, updateCanvas } from './actions';
import { ActionButton, ActionsBar } from './Styled';
import DndArea from '../DndArea';

class Canvas extends React.PureComponent {
  static propTypes = {
    canvas: PropTypes.object.isRequired,
    fetchCanvas: PropTypes.func,
    updateCanvas: PropTypes.func,
  };

  constructor(props) {
    super(props);
    props.fetchCanvas();
  }

  render() {
    const { canvas, updateCanvas } = this.props;

    return (
      <Fragment>
        <ActionsBar>
          <ActionButton>Create section</ActionButton>
          <ActionButton>Add pin</ActionButton>
        </ActionsBar>
        <DndArea canvas={canvas} onDropImage={updateCanvas}/>
      </Fragment>
    )
  }
}

export default connect(
  ({ canvas }) => ({ canvas }),
  dispatch => bindActionCreators({ fetchCanvas, updateCanvas }, dispatch)
)(Canvas);
