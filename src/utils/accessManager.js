const accessManager = user => ({
  ...user,
  isModerator: () => user.is_moderator || user.is_admin,
})

export default accessManager
