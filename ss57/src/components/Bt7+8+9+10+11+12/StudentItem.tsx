import React from 'react';

interface Student {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

interface StudentItemProps {
  student: Student;
  onDelete: (id: number) => void;
  onEdit: (student: Student) => void;
}

const StudentItem: React.FC<StudentItemProps> = ({ student, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{student.student_name}</td>
      <td>{student.email}</td>
      <td>{student.address}</td>
      <td>{student.phone}</td>
      <td>
        <button onClick={() => onEdit(student)}>Edit</button>
        <button onClick={() => onDelete(student.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default StudentItem;
