import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentItem from './StudentItem';
import StudentForm from './StudentForm';
import ReactPaginate from 'react-paginate';
import Loading from './Loading';

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
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 5;
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false); // Thêm state loading

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (page: number = 0) => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await axios.get('http://localhost:8080/students');
      setStudents(response.data);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setTimeout(() => setLoading(false), 2000); // Kết thúc loading sau 2s
    }
  };

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      setLoading(true); // Bắt đầu loading
      try {
        await axios.delete(`http://localhost:8080/students/${deleteId}`);
        setStudents(students.filter(student => student.id !== deleteId));
        setShowDeleteModal(false);
      } catch (error) {
        console.error('Error deleting student:', error);
      } finally {
        setTimeout(() => setLoading(false), 2000); // Kết thúc loading sau 2s
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleSave = async (student: Student) => {
    setLoading(true); // Bắt đầu loading
    if (student.id === 0) {
      // Thêm mới sinh viên
      try {
        const response = await axios.post('http://localhost:8080/students', student);
        setStudents([...students, response.data]);
      } catch (error) {
        console.error('Error adding student:', error);
      } finally {
        setTimeout(() => setLoading(false), 2000); // Kết thúc loading sau 2s
      }
    } else {
      // Cập nhật sinh viên hiện tại
      try {
        const response = await axios.put(`http://localhost:8080/students/${student.id}`, student);
        setStudents(students.map(s => (s.id === student.id ? response.data : s)));
      } catch (error) {
        console.error('Error updating student:', error);
      } finally {
        setTimeout(() => setLoading(false), 2000); // Kết thúc loading sau 2s
      }
    }
    setCurrentStudent(null);
    setShowFormModal(false);
  };

  const handleEditClick = (student: Student) => {
    setCurrentStudent(student);
    setShowFormModal(true);
  };

  const handleAddClick = () => {
    setCurrentStudent(null);
    setShowFormModal(true);
  };

  const offset = currentPage * studentsPerPage;
  const currentStudents = students.slice(offset, offset + studentsPerPage);
  const pageCount = Math.ceil(students.length / studentsPerPage);

  return (
    <div className="student-list">
      <header className="header">
        <h1>Quản lý sinh viên</h1>
        <button className="add-button" onClick={handleAddClick}>Thêm mới sinh viên</button>
      </header>
      {loading && <Loading />} {/* Hiển thị component Loading khi loading */}
      {!loading && (
        <>
          {showFormModal && (
            <StudentForm
              currentStudent={currentStudent}
              onSave={handleSave}
              onClose={() => setShowFormModal(false)}
            />
          )}
          <table>
            <thead>
              <tr>
                <th>Tên sinh viên</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map(student => (
                <StudentItem
                  key={student.id}
                  student={student}
                  onDelete={handleDeleteClick}
                  onEdit={handleEditClick}
                />
              ))}
            </tbody>
          </table>
          {/*model Hiển thị bản ghi và phân trang */}
          <div className="pagination-container">
            <p className="record-info">Hiển thị {offset + 1}-{offset + currentStudents.length} / {students.length} bản ghi</p>
            <ReactPaginate
              previousLabel={"Trước"}
              nextLabel={"Sau"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              forcePage={currentPage} // Đảm bảo rằng trang hiện tại được đánh dấu
            />
          </div>
        </>
      )}
      {/*Model Xóa Sinh Viên */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa sinh viên này không?</p>
            <button onClick={handleDelete}>Xóa</button>
            <button onClick={handleCancelDelete}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
