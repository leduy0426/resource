import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import { fetchClassesAPI } from "../services/classService";
import Header from "./Header";

function ClassList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("SUMMER2026");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu 
  const loadData = () => {
    setLoading(true);
    fetchClassesAPI()
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi đọc dữ liệu courses", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    loadData();
  };

  // Lọc theo 
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {

      const matchSemester = course.semester === selectedSemester;
      const matchSearch =
        !searchTerm ||
        (course.code && course.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (course.nameEn && course.nameEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (course.nameVi && course.nameVi.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchSemester && matchSearch;
    });
  }, [courses, selectedSemester, searchTerm]);

  const countCourse = filteredCourses.length;

  return (
    <Container className="py-4">
      <Header />

      <div className="mt-3 mb-2">
        <span className="text-muted fs-6">Welcome back lecturer</span>
      </div>


      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold m-0" style={{ color: "#2c3e50" }}>
            My Courses
          </h2>
        </div>

        <div className="d-flex flex-column align-items-end">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">Semester</span>
            <Form.Select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              style={{ width: "160px" }}
              size="sm"
            >
              <option value="SUMMER2026">SUMMER2026</option>
              <option value="SPRING2026">SPRING2026</option>
              <option value="FALL2025">FALL2025</option>
            </Form.Select>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleRefresh}
              className="fw-semibold"
            >
              REFRESH
            </Button>
          </div>


          <div className="mt-1 text-muted small fw-semibold">
            {countCourse} courses
          </div>
        </div>
      </div>


      <div className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "400px" }}
        />
      </div>


      {loading ? (
        <div className="text-center py-5 text-muted">Đang tải dữ liệu...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-5 border rounded bg-light">
          <p className="text-muted mb-0">Không có môn học nào trong học kỳ này.</p>
        </div>
      ) : (
        <Row className="g-4">
          {filteredCourses.map((course) => (
            <Col key={course.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="h-100 shadow-sm border-1 hover-card text-decoration-none text-dark"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/detail/${course.id}`)}
              >
                <Card.Body className="d-flex flex-column justify-content-between p-3">
                  <div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Badge bg="secondary" className="px-2 py-1 fs-7">
                        {course.badge || course.code}
                      </Badge>
                      <Badge
                        bg={course.category === "TECH" ? "primary" : "info"}
                        className="px-2 py-1 text-uppercase"
                      >
                        {course.category}
                      </Badge>
                    </div>

                    <div className="mb-3">

                      <div className="text-muted small mb-1">{course.code}</div>

                      <div className="fw-bold fs-6 mb-1 text-dark">
                        {course.nameEn}
                      </div>

                      <div className="text-secondary small">{course.nameVi}</div>
                    </div>
                  </div>


                  <div className="pt-2 border-top d-flex align-items-center text-primary fw-semibold small">
                    <span className="me-2">&rarr;</span> Get started
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ClassList;

