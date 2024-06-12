import React, { useEffect } from 'react';
import axios from 'axios';

interface Student {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

const StudentList: React.FC = () => {
  useEffect(() => {
    getAllStudent();
  }, []);

  const getAllStudent = async () => {
    try {
      const response = await axios.get('http://localhost:8080/students');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching the students', error);
    }
  };

  return (
    <div>
      <h1>Student List</h1>
    </div>
  );
};

export default StudentList;
