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

const RemoveStudent: React.FC = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [deletedStudent, setDeletedStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  const removeById = async (id: number) => {
    try {
      const response = await axios.get<Student>(`http://localhost:8080/students/${id}`);
      const student = response.data;
      await axios.delete(`http://localhost:8080/students/${id}`);
      setDeletedStudent(student);
      setIsDeleted(true);
      console.log('Deleted student:', student);
    } catch (err) {
      console.error('Error deleting the student', err);
      setError('Error deleting the student');
    }
  };

  if (isDeleted) {
    return (
      <div>
        <h1>Đã xóa thành công học sinh</h1>
        <p>Sinh viên có ID được chỉ định đã bị xóa thành công. Vui lòng tải lại trang và kiểm tra console để xem những thay đổi.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Xóa Học Sinh</h1>
      <button onClick={() => removeById(1)}>Xóa sinh viên có ID 1</button>
    </div>
  );
};

export default RemoveStudent;
