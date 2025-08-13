import React, { useState } from 'react';
import { normalizeName, isFuzzyMatch } from '../utils/searchUtils';

const TestRunner = () => {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = () => {
    setIsRunning(true);
    const results = [];

    try {
      const test1Result = normalizeName("José") === "jose";
      results.push({
        name: 'normalizeName("José") === "jose"',
        passed: test1Result,
        expected: 'jose',
        actual: normalizeName("José")
      });

      // Test 2: normalizeName("JOSE") === "jose"
      const test2Result = normalizeName("JOSE") === "jose";
      results.push({
        name: 'normalizeName("JOSE") === "jose"',
        passed: test2Result,
        expected: 'jose',
        actual: normalizeName("JOSE")
      });

      // Test 3: isFuzzyMatch("rvi", "ravi") === true
      const test3Result = isFuzzyMatch("rvi", "ravi") === true;
      results.push({
        name: 'isFuzzyMatch("rvi", "ravi") === true',
        passed: test3Result,
        expected: true,
        actual: isFuzzyMatch("rvi", "ravi")
      });

      // Test 4: isFuzzyMatch("cse2025-01", "CSE2025-001") === true
      const test4Result = isFuzzyMatch("cse2025-01", "CSE2025-001") === true;
      results.push({
        name: 'isFuzzyMatch("cse2025-01", "CSE2025-001") === true',
        passed: test4Result,
        expected: true,
        actual: isFuzzyMatch("cse2025-01", "CSE2025-001")
      });

      // Test 5: isFuzzyMatch("ana", "arun") === false
      const test5Result = isFuzzyMatch("ana", "arun") === false;
      results.push({
        name: 'isFuzzyMatch("ana", "arun") === false',
        passed: test5Result,
        expected: false,
        actual: isFuzzyMatch("ana", "arun")
      });

      // Additional tests for better coverage
      const test6Result = isFuzzyMatch("jose", "José") === true;
      results.push({
        name: 'isFuzzyMatch("jose", "José") === true',
        passed: test6Result,
        expected: true,
        actual: isFuzzyMatch("jose", "José")
      });

      const test7Result = isFuzzyMatch("", "test") === false;
      results.push({
        name: 'isFuzzyMatch("", "test") === false',
        passed: test7Result,
        expected: false,
        actual: isFuzzyMatch("", "test")
      });

      const test8Result = isFuzzyMatch("test", "") === false;
      results.push({
        name: 'isFuzzyMatch("test", "") === false',
        passed: test8Result,
        expected: false,
        actual: isFuzzyMatch("test", "")
      });

    } catch (error) {
      results.push({
        name: 'Test execution error',
        passed: false,
        expected: 'No error',
        actual: error.message
      });
    }

    setTestResults(results);
    setIsRunning(false);
  };

  const allTestsPassed = testResults.length > 0 && testResults.every(test => test.passed);

  return (
    <section className="tests-section">
      <h2>Built-in Tests</h2>
      
      <button
        type="button"
        className="btn btn-primary"
        onClick={runTests}
        disabled={isRunning}
        aria-label="Run all tests"
      >
        {isRunning ? 'Running Tests...' : 'Run Tests'}
      </button>

      {testResults.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          {allTestsPassed && (
            <div className="test-result test-passed">
              🎉 All tests passed! ({testResults.length}/{testResults.length})
            </div>
          )}
          
          {testResults.map((test, index) => (
            <div
              key={index}
              className={`test-result ${test.passed ? 'test-passed' : 'test-failed'}`}
            >
              <strong>{test.passed ? '✅ PASS' : '❌ FAIL'}:</strong> {test.name}
              {!test.passed && (
                <div style={{ marginTop: '5px', fontSize: '14px' }}>
                  Expected: {JSON.stringify(test.expected)}, Got: {JSON.stringify(test.actual)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>Test Coverage:</strong></p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>Name normalization (accent removal, case conversion)</li>
          <li>Fuzzy matching with 1 edit distance</li>
          <li>Edge cases (empty strings, special characters)</li>
          <li>Accent-insensitive search (José = jose)</li>
          <li>Typo tolerance (rvi matches ravi)</li>
        </ul>
      </div>
    </section>
  );
};

export default TestRunner;
