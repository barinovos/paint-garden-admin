import { MessageLink } from './Styled'
export const messageToLink = msg => {
  const message = msg.split(' ')
  for (let i = 0; i < message.length; i++) {
    if (message[i].includes('https://') || message[i].includes('http://')) {
      message[i] = (
        <MessageLink href={message[i]} target="__blank">
          {message[i]}
        </MessageLink>
      )
    } else {
      message[i] = `${message[i]} `
    }
  }
  return message
}
