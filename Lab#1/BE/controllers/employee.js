const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const {id} = req.params;
  const index = employee.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employee.splice(index, 1);
    return res.status(200).json({ message: 'Employee deleted successfully', data: employee });
  }
  return res.status(404).json({message: "There is no employee with this id!"})

};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;

  const exists = employee.find(emp => emp.id === id);
  if (exists) {
    return res.status(400).json({ message: 'ID already exists' });
  }

  else if (!id || !name) {
    return res.status(400).json({ message: 'Please fill both Name and ID' });
  }
  
  employee.push({ id, name });
  return res.status(201).json({ message: 'Employee added successfully' });
};
