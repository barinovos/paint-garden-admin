import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as PinIcon } from '../../assets/dialogue.svg'
import { ReactComponent as CloseIcon } from '../../assets/close.svg'
import Tooltip from '../../components/Tooltip'
import { ClosedWrapper, ListHeader, ListWrapper, ListItem } from './Styled'

const Comments = ({ items = [] }) => {
  const [isOpened, setIsOpened] = useState(false)

  return !isOpened ? (
    <Fragment>
      <ClosedWrapper data-tip data-for="dialogue">
        <PinIcon onClick={() => setIsOpened(true)} />
      </ClosedWrapper>

      <Tooltip id="dialogue" text="Comments" place="left" />
    </Fragment>
  ) : (
    <ListWrapper>
      <ListHeader>
        <h1>Annotations list</h1>
        <CloseIcon onClick={() => setIsOpened(false)} />
      </ListHeader>
      {items.map(item => (
        <ListItem key={item.id}>{item.text}</ListItem>
      ))}
    </ListWrapper>
  )
}

Comments.propTypes = {
  items: PropTypes.array,
}

export default Comments
