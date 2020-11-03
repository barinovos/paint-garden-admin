const accessManager = user => ({
  ...user,
  isModerator: () => user.role && user.role.name === 'admin',
})

export default accessManager
