import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import SearchControls from './components/SearchControls';
import TestRunner from './components/TestRunner';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: 'asc'
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Save data to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (studentData) => {
    if (editingStudent) {
      // Update existing student
      setStudents(students.map(student => 
        student.id === editingStudent.id ? { ...studentData, id: student.id } : student
      ));
      setEditingStudent(null);
    } else {
      // Add new student
      const newStudent = {
        ...studentData,
        id: Date.now().toString()
      };
      setStudents([...students, newStudent]);
    }
  };

  const editStudent = (student) => {
    setEditingStudent(student);
  };

  const deleteStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
    if (editingStudent && editingStudent.id === studentId) {
      setEditingStudent(null);
    }
  };

  const clearForm = () => {
    setEditingStudent(null);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('');
    setYearFilter('');
    setSortConfig({ field: null, direction: 'asc' });
  };

  // Filter and sort students
  const getFilteredAndSortedStudents = () => {
    let filtered = students.filter(student => {
      const matchesSearch = !searchQuery || 
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = !departmentFilter || student.department === departmentFilter;
      const matchesYear = !yearFilter || student.year === yearFilter;
      
      return matchesSearch && matchesDepartment && matchesYear;
    });

    // Sort students
    if (sortConfig.field) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.field];
        let bValue = b[sortConfig.field];
        
        if (sortConfig.field === 'cgpa') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else {
          aValue = aValue.toString().toLowerCase();
          bValue = bValue.toString().toLowerCase();
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  };

  const filteredStudents = getFilteredAndSortedStudents();

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Student Data Manager</h1>
          <p>Manage student records with ease - Add, Edit, Delete, Search & Sort</p>
        </header>

        <StudentForm 
          onSubmit={addStudent}
          editingStudent={editingStudent}
          onClear={clearForm}
          existingRollNumbers={students.map(s => s.rollNumber)}
        />

        <SearchControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          yearFilter={yearFilter}
          onYearFilterChange={setYearFilter}
          sortConfig={sortConfig}
          onSortChange={setSortConfig}
          onResetFilters={resetFilters}
        />

        <StudentTable
          students={filteredStudents}
          onEdit={editStudent}
          onDelete={deleteStudent}
        />

        <TestRunner />
      </div>
    </div>
  );
}

export default App;
