const express = require('express')
const router = express.Router()
const path = require('path')
const employeeController = require('../../controllers/employeeController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middlewares/verifyRoles')

const employeesDB = {
  employees: require('../../model/employees.json'),
  setEmployees: function(data) { this.employees = data }
}

router.route('/')
  .get(employeeController.getEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.createEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee)

router.route('/:id')
  .get(employeeController.getEmployee)


module.exports = router