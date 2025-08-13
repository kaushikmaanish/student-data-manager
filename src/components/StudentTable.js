import React from 'react';

const StudentTable = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <section className="table-section">
        <h2>Student Records</h2>
        <div className="no-data">
          No students found. Add some students to get started!
        </div>
      </section>
    );
  }

  return (
    <section className="table-section">
      <h2>Student Records ({students.length} students)</h2>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Department</th>
              <th>Year</th>
              <th>CGPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.cgpa.toFixed(2)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      type="button"
                      className="action-btn edit-btn"
                      onClick={() => onEdit(student)}
                      aria-label={`Edit ${student.name}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="action-btn delete-btn"
                      onClick={() => onDelete(student.id)}
                      aria-label={`Delete ${student.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StudentTable;
