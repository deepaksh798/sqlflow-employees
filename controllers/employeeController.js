import db from "../config/db.js";

// Create Employee
export const createEmployee = (req, res) => {
  const { name, department, salary, joining_date } = req.body;
  const sql =
    "INSERT INTO employees (name, department, salary, joining_date) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, department, salary, joining_date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Employee added successfully", id: result.insertId });
  });
};

// Get All Employees
export const getEmployees = (req, res) => {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get One Employee
export const getEmployeeById = (req, res) => {
  const { id } = req.params;
  console.log("Fetching employee with ID:", id);
  const sql = "SELECT * FROM employees WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0)
      return res.status(404).json({ message: "Employee not found" });
    res.json(result[0]);
  });
};

// Update Employee
export const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, department, salary, joining_date } = req.body;
  const sql =
    "UPDATE employees SET name=?, department=?, salary=?, joining_date=? WHERE id=?";
  db.query(sql, [name, department, salary, joining_date, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee updated successfully" });
  });
};

// Delete Employee
export const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM employees WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee deleted successfully" });
  });
};
