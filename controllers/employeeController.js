const Employee = require('../model/Employee')

const getEmployees = async (req, res) => {
  const employees = await Employee.find()
  if (!employees) return res.status(204).json({'message': 'No employees found'})
  res.json(employees)
}

const createEmployee = async (req, res) => {
  if (req?.body?.firstname || req?.body?.lastname) { 
    return res.status(400).json({'message': 'First and last names are required'})
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname
    })
    console.log(result) 
    res.status(201).json(result)
  } catch (err) {
    console.error(err)
  }
}

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({'message': 'Employee ID is required'})

  const employee = await Employee.findOne({_id: req.body.id}).exec()
  if (!employee) return res.status(204).json({'message': `No employee ID matches ${req.body.id}`})

  if (req.body.firstname) employee.firstname = req.body.firstname
  if (req.body.lastname) employee.lastname = req.body.lastname

  const result = await employee.save()
  console.log(result)
  res.status(201).json(result)
}

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({'message': 'Employee ID is required'})

  const employee = await Employee.findOne({_id: req.body.id}).exec()
  if (!employee) return res.status(204).json({'message': `No employee ID matches ${req.body.id}`})
  const result = await Employee.deleteOne({_id: req.body.id})
  res.status(201).json(result)
}

const getEmployee = async (req, res) => {
  const employee = await Employee.findOne({_id: req.params.id})
  if (!employee) return res.status(204).json({'message': `No employee ID matches ${req.params.id}`})
  res.status(201).json(employee)
}

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
}