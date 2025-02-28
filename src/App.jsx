import React, { useEffect, useState } from "react";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(employees.length / recordsPerPage);

  const handlePrevious = () => {
    if (currentPage === 1) return; 
    setCurrentPage((prevPage) => prevPage - 1);
  };
  
  

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = employees.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center", marginTop: "20px" }}>
      <h2>Employee Data Table</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#2E7D32", color: "white", height: "40px" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((employee, index) => (
            <tr key={employee.id} style={{ height: "35px", borderBottom: "1px solid #ddd" }}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePrevious}
          style={{
            padding: "8px 15px",
            margin: "5px",
            backgroundColor: "#388E3C",
            color: "white",
            border: "none",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span style={{ margin: "0 15px", fontSize: "18px" }}>{currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 15px",
            margin: "5px",
            backgroundColor: "#388E3C",
            color: "white",
            border: "none",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
