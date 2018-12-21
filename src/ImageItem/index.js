import React from 'react';
import PropTypes from 'prop-types';
import { Thumb, ItemInput, InputButton } from './Styled';
import { Row, Cell, TextBlue, IconWrapper } from '../Common/Styled';
import Trash from '../Icons/Trash';
import thumb from '../assets/thumb.png';

const ImageItem = ({ item }) => (
  <Row>
    <Cell size={5}>
      <Thumb src={thumb} alt={'thumb'} />
    </Cell>
    <Cell size={20}>
      <ItemInput defaultValue={item.title} />
    </Cell>
    <Cell size={10}>
      <InputButton>L</InputButton>
      <InputButton>H</InputButton>
      <InputButton>D</InputButton>
    </Cell>
    <Cell size={10}>
      <ItemInput defaultValue={item.medium} />
    </Cell>
    <Cell size={8}>
      <ItemInput defaultValue={item.year} />
    </Cell>
    <Cell size={26}>
      <ItemInput defaultValue={item.summaryText} />
    </Cell>
    <Cell size={15}>
      <TextBlue>{item.id === 1 ? 'Change' : 'Add'}</TextBlue>
    </Cell>
    <Cell size={6}>
      <IconWrapper>
        <Trash />
      </IconWrapper>
    </Cell>
  </Row>
);

ImageItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    medium: PropTypes.string,
    year: PropTypes.string,
    summaryText: PropTypes.string,
  }),
};

export default ImageItem;
