export const getItemSize = (item, prop) => {
  if (item.media && item.media.custom_properties && item.media.custom_properties[prop]) {
    return item.media.custom_properties[prop]
  }
  if (item.dimensions && item.dimensions[prop]) {
    return item.dimensions[prop]
  }
  // just some random value to set up anything
  return 500
}

export const getHeight = item => getItemSize(item, 'height')
export const getWidth = item => getItemSize(item, 'width')

export const getX = item => (item && item.position ? item.position.x : 0)
export const getY = item => (item && item.position ? item.position.y : 0)
