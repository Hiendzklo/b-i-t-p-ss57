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

const createStudent = async () => {
  try {
    const response = await axios.get('http://localhost:8080/students');
    const students: Student[] = response.data;

    // Tìm ID lớn nhất hiện tại
    const maxId = students.length > 0 ? Math.max(...students.map(student => student.id)) : 0;

    // Tạo sinh viên mới với ID lớn nhất + 1
    const newStudent: Student = {
      id: maxId + 1,
      student_name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      address: 'Hà Nội',
      phone: '0987654321',
      status: true,
      created_at: new Date().toISOString(),
    };

    const postResponse = await axios.post('http://localhost:8080/students', newStudent);
    console.log('Student created:', postResponse.data);
  } catch (error) {
    console.error('Error creating student:', error);
  }
};

const StudentForm: React.FC = () => {
  return (
    <div>
      <h1>Create Student</h1>
      <button onClick={createStudent}>Create Student</button>
    </div>
  );
};

export default StudentForm;
