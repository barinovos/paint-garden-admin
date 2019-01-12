import React from 'react';
import PropTypes from 'prop-types';
import { Thumb, ItemInput, InputButton } from './Styled';
import { Row, Cell, TextBlue, IconWrapper } from '../Common/Styled';
import Trash from '../Icons/Trash';
import api from '../utils/api';

const ImageItem = ({ item, addToCanvas, removeFromCanvas, deleteImage, updateImage }) => (
  <Row>
    <Cell size={5}>
      <Thumb src={api.getImageUrl(item.filePath)} alt={'thumb'}/>
    </Cell>
    <Cell size={20}>
      <ItemInput defaultValue={item.title}/>
    </Cell>
    <Cell size={10}>
      <InputButton selected={item.dimension === 0}
                   onClick={updateImage.bind(null, item.id, { dimension: 0 })}>L</InputButton>
      <InputButton selected={item.dimension === 1}
                   onClick={updateImage.bind(null, item.id, { dimension: 1 })}>H</InputButton>
      <InputButton selected={item.dimension === 2}
                   onClick={updateImage.bind(null, item.id, { dimension: 2 })}>D</InputButton>
    </Cell>
    <Cell size={10}>
      <ItemInput defaultValue={item.medium}/>
    </Cell>
    <Cell size={8}>
      <ItemInput defaultValue={item.year}/>
    </Cell>
    <Cell size={26}>
      <ItemInput defaultValue={item.summaryText}/>
    </Cell>
    <Cell size={15}>
      <TextBlue onClick={() => item.onCanvas ? removeFromCanvas(item.id) : addToCanvas(item.id)}>
        {item.onCanvas ? 'Remove' : 'Add'}
      </TextBlue>
    </Cell>
    <Cell size={6}>
      <IconWrapper onClick={deleteImage.bind(null, item.id)}>
        <Trash/>
      </IconWrapper>
    </Cell>
  </Row>
);

ImageItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    medium: PropTypes.string,
    year: PropTypes.string,
    summaryText: PropTypes.string,
    filePath: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onCanvas: PropTypes.bool,
    dimension: PropTypes.number
  }),
  addToCanvas: PropTypes.func,
  deleteImage: PropTypes.func,
  removeFromCanvas: PropTypes.func,
  updateImage: PropTypes.func,
};

export default ImageItem;
