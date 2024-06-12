import React, { useEffect, useState } from 'react';
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
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching the students', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Danh sách học sinh</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <h2>{student.student_name}</h2>
            <p>Email: {student.email}</p>
            <p>Address: {student.address}</p>
            <p>Phone: {student.phone}</p>
            <p>Status: {student.status ? 'Active' : 'Inactive'}</p>
            <p>Created at: {new Date(student.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
