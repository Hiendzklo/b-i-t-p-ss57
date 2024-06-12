import React, { useState } from 'react';
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

const updateStudentById = async (id: number) => {
  const updatedStudent: Partial<Student> = {
    student_name: 'Nguyễn Văn B',
    email: 'nguyenvanb@gmail.com',
    address: 'Hà Nội',
    phone: '0987654322',
    status: true,
  };

  try {
    const response = await axios.put(`http://localhost:8080/students/${id}`, updatedStudent);
    console.log('Student updated:', response.data);
  } catch (error) {
    console.error('Error updating student:', error);
  }
};

const StudentForm: React.FC = () => {
  const [studentId, setStudentId] = useState<number>(0);

  return (
    <div>
      <h1>Update Student</h1>
      <input
        type="number"
        value={studentId}
        onChange={(e) => setStudentId(Number(e.target.value))}
        placeholder="Enter student ID"
      />
      <button onClick={() => updateStudentById(studentId)}>Update Student</button>
    </div>
  );
};

export default StudentForm;
