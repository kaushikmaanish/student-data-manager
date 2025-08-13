import React, { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, editingStudent, onClear, existingRollNumbers }) => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    department: '',
    year: '',
    cgpa: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        rollNumber: editingStudent.rollNumber,
        name: editingStudent.name,
        department: editingStudent.department,
        year: editingStudent.year,
        cgpa: editingStudent.cgpa.toString()
      });
      setErrors({});
    } else {
      setFormData({
        rollNumber: '',
        name: '',
        department: '',
        year: '',
        cgpa: ''
      });
      setErrors({});
    }
  }, [editingStudent]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll Number is required';
    } else if (!editingStudent && existingRollNumbers.includes(formData.rollNumber.trim())) {
      newErrors.rollNumber = 'Roll Number must be unique';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year is required';
    }

    if (!formData.cgpa.trim()) {
      newErrors.cgpa = 'CGPA is required';
    } else {
      const cgpaValue = parseFloat(formData.cgpa);
      if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
        newErrors.cgpa = 'CGPA must be between 0 and 10';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      const studentData = {
        rollNumber: formData.rollNumber.trim(),
        name: formData.name.trim(),
        department: formData.department,
        year: formData.year,
        cgpa: parseFloat(formData.cgpa)
      };

      onSubmit(studentData);
      
      if (!editingStudent) {
        setFormData({
          rollNumber: '',
          name: '',
          department: '',
          year: '',
          cgpa: ''
        });
      }
      
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      rollNumber: '',
      name: '',
      department: '',
      year: '',
      cgpa: ''
    });
    setErrors({});
    onClear();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <section className="form-section">
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number *</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              className={errors.rollNumber ? 'error' : ''}
              placeholder="Enter roll number"
              disabled={isSubmitting}
            />
            {errors.rollNumber && <div className="error-message">{errors.rollNumber}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter student name"
              disabled={isSubmitting}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={errors.department ? 'error' : ''}
              disabled={isSubmitting}
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
              <option value="CE">CE</option>
              <option value="EE">EE</option>
            </select>
            {errors.department && <div className="error-message">{errors.department}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="year">Year *</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className={errors.year ? 'error' : ''}
              disabled={isSubmitting}
            >
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            {errors.year && <div className="error-message">{errors.year}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="cgpa">CGPA *</label>
            <input
              type="number"
              id="cgpa"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleInputChange}
              className={errors.cgpa ? 'error' : ''}
              placeholder="0.0 - 10.0"
              step="0.01"
              min="0"
              max="10"
              disabled={isSubmitting}
            />
            {errors.cgpa && <div className="error-message">{errors.cgpa}</div>}
          </div>
        </div>

        <div className="button-group">
          <button
            type="submit"
            className={`btn ${editingStudent ? 'btn-success' : 'btn-primary'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (editingStudent ? 'Update' : 'Save')}
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>
      </form>
    </section>
  );
};

export default StudentForm;
