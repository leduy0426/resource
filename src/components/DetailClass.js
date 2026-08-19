import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { fetchClassesAPI } from "../services/classService";
import Header from "./Header";

function DetailClass() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseDetail, setCourseDetail] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchClassesAPI()
      .then((data) => {
        const found = data.find((item) => String(item.id) === String(id));
        setCourseDetail(found);
        if (found && found.classes && found.classes.length > 0) {
          setSelectedClass(found.classes[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy chi tiết khóa học:", err);
        setLoading(false);
      });
  }, [id]);

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
  };

  if (loading)
    return (
      <Container className="py-5 text-center">Đang tải chi tiết...</Container>
    );
  if (!courseDetail)
    return (
      <Container className="py-5 text-center">
        <h3>Không tìm thấy thông tin khóa học!</h3>
        <Button variant="secondary" onClick={() => navigate("/classes")} className="mt-3">
          &larr; Back to courses
        </Button>
      </Container>
    );

  const classes = courseDetail.classes || [];
  const slots = selectedClass ? selectedClass.slots || [] : [];

  return (
    <Container className="py-4">
      <Header />


      <div className="mt-3 mb-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-1 small">
            <li className="breadcrumb-item">
              <Link
                to="/classes"
                className="text-decoration-none text-muted fw-semibold"
              >
                My Courses
              </Link>
            </li>
            <li
              className="breadcrumb-item active text-muted fw-semibold"
              aria-current="page"
            >
              {courseDetail.nameEn}_{courseDetail.nameVi}
            </li>
          </ol>
        </nav>
      </div>


      <h2 className="fw-bold mb-1 text-dark" style={{ color: "#1a252f" }}>
        {courseDetail.nameEn}_{courseDetail.nameVi}
      </h2>


      <div className="text-muted fs-6 mb-3 fw-semibold">
        {courseDetail.code}{" "}
        {selectedClass ? selectedClass.name || selectedClass.classId : ""}
      </div>


      <div className="mb-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate("/classes")}
          className="fw-semibold px-3"
        >
          &larr; Back to courses
        </Button>
      </div>



      <div className="p-3 mb-4 rounded border bg-white shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold fs-5 text-uppercase">CLASSES</span>
          <span className="text-muted fw-semibold">{classes.length} class</span>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {classes.length === 0 ? (
            <span className="text-muted small">Không có lớp học nào.</span>
          ) : (
            classes.map((cls, idx) => {
              const isSelected = selectedClass?.classId === cls.classId;
              return (
                <Button
                  key={cls.classId || idx}
                  variant={isSelected ? "primary" : "outline-secondary"}
                  size="sm"
                  onClick={() => handleSelectClass(cls)}
                  className="px-3 py-1 fw-semibold"
                >
                  {cls.name || cls.classId}
                </Button>
              );
            })
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold fs-5">Slots</span>
          <span className="text-muted fw-semibold">
            {slots.length} sessions
          </span>
        </div>

        {slots.length === 0 ? (
          <div className="p-4 border rounded text-center text-muted bg-light">
            Chưa có slot học nào cho lớp này.
          </div>
        ) : (
          <Row className="g-3">
            {slots.map((slot, idx) => (
              <Col key={slot.slotNumber || idx} xs={12} sm={6} md={4} lg={3}>
                <Card className="border p-3 bg-white shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary">
                      {slot.slotNumber}
                    </span>
                    <span className="small text-muted">{slot.date}</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
}

export default DetailClass;
