import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchImages } from './actions';
import { Text, Row, Cell } from '../Common/Styled';
import ImageItem from '../ImageItem';

class ImagesList extends React.PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    fetchImages: PropTypes.func
  };

  constructor(props) {
    super(props);
    props.fetchImages();
  }


  render() {
    const { images } = this.props;

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
            <Text>Add to canvas</Text>
          </Cell>
          <Cell size={6}>
            <Text>Delete</Text>
          </Cell>
        </Row>
        {images && images.map(data => (
          <ImageItem item={data} key={data.id}/>
        ))}
      </Fragment>
    )
  }
}

export default connect(
  ({ images }) => ({ images }),
  dispatch => bindActionCreators({ fetchImages }, dispatch)
)(ImagesList);
