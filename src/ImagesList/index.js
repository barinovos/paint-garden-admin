import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchImages, addToCanvas, deleteImage, removeFromCanvas, updateImage } from './actions';
import { Text, Row, Cell } from '../Common/Styled';
import ImageItem from '../ImageItem';

class ImagesList extends React.PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    fetchImages: PropTypes.func,
    addToCanvas: PropTypes.func,
    deleteImage: PropTypes.func,
    removeFromCanvas: PropTypes.func,
    updateImage: PropTypes.func
  };

  constructor(props) {
    super(props);
    props.fetchImages();
  }


  render() {
    const { images, addToCanvas, removeFromCanvas, deleteImage, updateImage } = this.props;

    return (
      <Fragment>
        <Row>
          <Cell size={5}/>
          <Cell size={20}>
            <Text>Title</Text>
          </Cell>
          <Cell size={10}>
            <Text>Dimensions</Text>
          </Cell>
          <Cell size={10}>
            <Text>Medium</Text>
          </Cell>
          <Cell size={8}>
            <Text>Year</Text>
          </Cell>
          <Cell size={26}>
            <Text>Summary text</Text>
          </Cell>
          <Cell size={15}>
            <Text>Canvas</Text>
          </Cell>
          <Cell size={6}>
            <Text>Delete</Text>
          </Cell>
        </Row>
        {images && images.map(data => (
          <ImageItem item={data} key={data.id} addToCanvas={addToCanvas} deleteImage={deleteImage}
                     removeFromCanvas={removeFromCanvas} updateImage={updateImage}/>
        ))}
      </Fragment>
    )
  }
}

export default connect(
  ({ images }) => ({ images }),
  dispatch => bindActionCreators({ fetchImages, addToCanvas, deleteImage, removeFromCanvas, updateImage }, dispatch)
)(ImagesList);
