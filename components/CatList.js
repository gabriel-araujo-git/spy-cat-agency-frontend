import { useState } from "react";

export default function CatList({ cats, onDelete, onSalaryUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [salaryInput, setSalaryInput] = useState("");

  const startEditing = (cat) => {
    setEditingId(cat.id);
    setSalaryInput(cat.salary);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setSalaryInput("");
  };

  const saveSalary = () => {
    if (isNaN(salaryInput) || salaryInput < 0) {
      alert("Salary must be a positive number");
      return;
    }
    onSalaryUpdate(editingId, salaryInput);
    setEditingId(null);
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Years of Experience</th>
          <th>Breed</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cats.map((cat) => (
          <tr key={cat.id}>
            <td>{cat.name}</td>
            <td>{cat.years_of_experience}</td>
            <td>{cat.breed}</td>
            <td>
              {editingId === cat.id ? (
                <input
                  type="number"
                  className="form-control"
                  value={salaryInput}
                  onChange={(e) => setSalaryInput(e.target.value)}
                  min="0"
                />
              ) : (
                cat.salary.toFixed(2)
              )}
            </td>
            <td>
              {editingId === cat.id ? (
                <>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={saveSalary}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEditing(cat)}
                  >
                    Edit Salary
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(cat.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
