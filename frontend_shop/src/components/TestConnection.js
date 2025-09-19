import React, { useState } from 'react';
import axios from 'axios';

const TestConnection = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/test/');
      setResult(`✅ Backend is working! Response: ${JSON.stringify(response.data)}`);
    } catch (err) {
      setResult(`❌ Backend connection failed: ${err.message}`);
      console.log('Connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Backend Connection Test</h5>
            </div>
            <div className="card-body">
              <button 
                className="btn btn-primary" 
                onClick={testBackend}
                disabled={loading}
              >
                {loading ? 'Testing...' : 'Test Backend Connection'}
              </button>
              {result && (
                <div className="mt-3">
                  <pre className="bg-light p-3 rounded">{result}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestConnection; 