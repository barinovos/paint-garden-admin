const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const parseEmails = text =>
  text
    .split(/[\s\n,;]/gi)
    .map(t => t.trim())
    .filter(t => !!t)

export const validateEmails = emails => emails.every(email => re.test(email))
