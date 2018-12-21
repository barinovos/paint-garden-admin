import React, { Fragment } from 'react';
import { Text, Row, Cell } from '../Common/Styled';
import ImageItem from '../ImageItem';

const images = [
  { id: 1, title: 'Some image', medium: 'what is it?' },
  { id: 2, title: 'Some image 2', year: '2017' },
  { id: 3, title: 'Some image 3', summaryText: 'My best pic!' },
  { id: 4, title: 'Some image 4' },
  { id: 5, title: 'Some image 4' },
  { id: 6, title: 'Some image 6' },
];

const ImagesList = () => (
  <Fragment>
    <Row>
      <Cell size={5} />
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
    {images.map(data => (
      <ImageItem item={data} key={data.id} />
    ))}
  </Fragment>
);

export default ImagesList;
