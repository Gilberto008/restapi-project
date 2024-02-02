const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401)
    const roles_list = [...allowedRoles]
    const roles = req.roles
    console.log(roles_list)
    console.log(roles)
    const result = roles.map(role => roles_list.includes(role)).find(val => val === true)
    if (!result) return res.sendStatus(401)
    next()
  }
}

module.exports = verifyRoles