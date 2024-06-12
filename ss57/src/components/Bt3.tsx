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

const StudentDetail: React.FC<{ id: number }> = ({ id }) => {
  useEffect(() => {
    getStudentById(id);
  }, [id]);

  const getStudentById = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/students/${id}`);
      if (response.data) {
        console.log(response.data);
      } else {
        console.log('Không tìm thấy bản ghi');
      }
    } catch (error) {
      console.error('Không tìm thấy bản ghi', error);
    }
  };

  return (
    <div>
      <h1>Chi tiết Học sinh</h1>
      <p>Kiểm tra màn hình console</p>
    </div>
  );
};

export default StudentDetail;
