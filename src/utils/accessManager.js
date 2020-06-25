const accessManager = user => ({
  ...user,
  isModerator: () => user.is_moderator,
})

export default accessManager
