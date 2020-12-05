import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ReactComponent as PinIcon } from '../../assets/dialogue.svg'
import { ReactComponent as CloseIcon } from '../../assets/close.svg'
import Tooltip from '../../components/Tooltip'
import { ClosedWrapper, ListHeader, ListWrapper, ListItem, Date } from './Styled'
import { FlexLayout } from '../../Common/Styled'

const Comments = ({ items = [], selectAnnotation, activePin }) => {
  const [isOpened, setIsOpened] = useState(false)
  const activeId = activePin ? activePin.id : null

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
        <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setIsOpened(false)} />
      </ListHeader>
      {items.map(item => (
        <ListItem
          key={item.id}
          active={item.id === activeId}
          onClick={() => item.id !== activeId && selectAnnotation(item)}
        >
          <FlexLayout justifyContent="space-between" style={{ marginBottom: 10 }}>
            {item.user.name}
            <Date>{moment(item.created_at).fromNow()}</Date>
          </FlexLayout>
          <FlexLayout style={{ fontWeight: 400 }}>{item.text}</FlexLayout>
        </ListItem>
      ))}
    </ListWrapper>
  )
}

Comments.propTypes = {
  items: PropTypes.array,
  selectAnnotation: PropTypes.func,
  activePin: PropTypes.object,
}

export default Comments
