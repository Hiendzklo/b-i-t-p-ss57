import React, { useState, useEffect } from 'react';

interface Student {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

interface StudentFormProps {
  currentStudent: Student | null;
  onSave: (student: Student) => void;
  onClose: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ currentStudent, onSave, onClose }) => {
  const [student, setStudent] = useState<Student>({
    id: 0,
    student_name: '',
    email: '',
    address: '',
    phone: '',
    status: false,
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    if (currentStudent) {
      setStudent(currentStudent);
    } else {
      setStudent({
        id: 0,
        student_name: '',
        email: '',
        address: '',
        phone: '',
        status: false,
        created_at: new Date().toISOString(),
      });
    }
  }, [currentStudent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(student);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{student.id === 0 ? 'Thêm mới sinh viên' : 'Cập nhật sinh viên'}</h2>
          <button className="close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <label >Tên sinh viên</label>
          <input type="text" name="student_name" value={student.student_name} onChange={handleChange} placeholder="Tên sinh viên" required />
          <label>Email</label>
          <input type="email" name="email" value={student.email} onChange={handleChange} placeholder="Email" required />
          <label>Địa chỉ</label>
          <input type="text" name="address" value={student.address} onChange={handleChange} placeholder="Địa chỉ" required />
          <label>Số điện thoại</label>
          <input type="text" name="phone" value={student.phone} onChange={handleChange} placeholder="Số điện thoại" required />
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-button">{student.id === 0 ? 'Add' : 'Update'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
