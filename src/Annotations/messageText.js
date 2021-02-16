import { MessageLink } from './Styled'
import { LineBreak } from './Styled'
export const messageToLink = msg => {
  const message = msg.split(' ')

  const renderBreak = data => {
    let i = 0
    for (i = 0; i <= data.length + 1; i++) {
      return <LineBreak> </LineBreak>
    }
  }

  for (let i = 0; i < message.length; i++) {
    if (message[i].includes('https://') || message[i].includes('http://')) {
      const linkMessage = message[i].replace(/(\r\n|\n|\r)/gm, ' ')

      if (linkMessage.includes(' ')) {
        const link = linkMessage.substring(linkMessage.lastIndexOf(' ') + 1, linkMessage.length)
        const totalSpaces = linkMessage.substring(0, linkMessage.lastIndexOf(' ')).split(' ') //.length - 1
        message[i] = (
          <>
            {linkMessage.substring(0, linkMessage.lastIndexOf(' ') - 1)}
            {renderBreak(totalSpaces)}

            <MessageLink href={link} target="__blank">
              {link}
            </MessageLink>
          </>
        )
      } else {
        message[i] = (
          <MessageLink href={message[i]} target="__blank">
            {message[i]}
          </MessageLink>
        )
      }
    } else {
      message[i] = `${message[i]} `
    }
  }
  return message
}
