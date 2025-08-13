import React from 'react';

const SearchControls = ({
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  yearFilter,
  onYearFilterChange,
  sortConfig,
  onSortChange,
  onResetFilters
}) => {
  const handleSort = (field) => {
    if (sortConfig.field === field) {
      // Toggle direction if same field
      onSortChange({
        field,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      onSortChange({
        field,
        direction: 'asc'
      });
    }
  };

  const getSortButtonClass = (field) => {
    if (sortConfig.field === field) {
      return `sort-btn active`;
    }
    return 'sort-btn';
  };

  const getSortButtonText = (field) => {
    if (sortConfig.field === field) {
      const direction = sortConfig.direction === 'asc' ? '↑' : '↓';
      return `${field.charAt(0).toUpperCase() + field.slice(1)} ${direction}`;
    }
    return field.charAt(0).toUpperCase() + field.slice(1);
  };

  return (
    <section className="controls-section">
      <h2>Search & Filter Controls</h2>
      
      <div className="controls-grid">
        <div className="search-box">
          <label htmlFor="searchInput">Search by Roll Number or Name</label>
          <input
            type="text"
            id="searchInput"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search students..."
            aria-label="Search students by roll number or name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="departmentFilter">Filter by Department</label>
          <select
            id="departmentFilter"
            value={departmentFilter}
            onChange={(e) => onDepartmentFilterChange(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
            <option value="EE">EE</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="yearFilter">Filter by Year</label>
          <select
            id="yearFilter"
            value={yearFilter}
            onChange={(e) => onYearFilterChange(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
      </div>

      <div className="sort-buttons">
        <button
          type="button"
          className={getSortButtonClass('cgpa')}
          onClick={() => handleSort('cgpa')}
          aria-label="Sort by CGPA"
        >
          {getSortButtonText('cgpa')}
        </button>
        
        <button
          type="button"
          className={getSortButtonClass('name')}
          onClick={() => handleSort('name')}
          aria-label="Sort by Name"
        >
          {getSortButtonText('name')}
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onResetFilters}
          aria-label="Reset all filters and search"
        >
          Reset Filters
        </button>
      </div>
    </section>
  );
};

export default SearchControls;
