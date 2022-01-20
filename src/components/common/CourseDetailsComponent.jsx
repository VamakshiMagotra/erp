import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";

import CourseService from "../../services/CourseService";

import { Loader } from "./Loader";
import { courseSchema } from "../../constants/schema";
import CourseAnnoucements from "./CourseAnnoucements";
import AccordionItem from "react-bootstrap/esm/AccordionItem";

const CourseDetailsComponent = () => {
  const { id } = useParams();
  const [dataReady, updateDataReady] = useState(false);
  const [data, updateData] = useState(courseSchema);

  const [students, updateStudents] = useState([]);

  useEffect(() => {
    CourseService.getCourseDetails(id)
      .then((resp) => {
        updateData({ ...resp.data });
        updateDataReady(true);
      })
      .catch((err) => { console.log("Error" + err) });

    CourseService.getCourseStudents(id)
      .then((resp) => {
        updateStudents(resp.data);
      })
      .catch((err) => { console.log("Error" + err) });
  }, [id]);


  return (
    <>
      {
        (!dataReady) ? (
          <Loader className="fa-3x" />
        ) : (
          <>
            <div className="card-header font-muli bg-custom-sec mb-3 p-4 radius-6">
              <h4 className="mb-0 text-custom-white fw-normal">{data.course.name}</h4>
            </div>
            <div className="course-announce container font-muli">
              <div className="row">
                <div className="col-12 col-md-9">

                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="border-0 shadow-none">
                      <Accordion.Header className="p-0">
                        <div className="mb-0 w-100 py-0">
                          <div className="card-body radius-6">
                            <h5 className="fw-bold mb-0">Announcements</h5>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="bg-custom-light p-0 pt-2 border-0 shadow-none">
                        <CourseAnnoucements data={data} />
                      </Accordion.Body>
                    </Accordion.Item>

                    {/* Student List */}
                    <Accordion.Item eventKey="1" className="border-0 shadow-none mt-2">
                      <Accordion.Header className="p-0">
                        <div className="mb-0 w-100 py-0">
                          <div className="card-body radius-6">
                            <h5 className="fw-bold mb-0">Students Registered</h5>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="bg-custom-light p-0 pt-2 border-0 shadow-none d-flex justify-content-between">
                        {console.log(students)}
                        <div className="card radius-6 font-roboto w-100 p-3">
                        <table className="table table-bordered">
                          <thead>
                           <tr>
                             <th>Entry No</th>
                             <th>Name</th>
                             <th>Attendance</th>
                           </tr>
                           </thead>
                           <tbody>
                        {
                           
                          students.map((student) => {
                            const studentModel = student.studentModel;
                            const { present, absent } = student;
                            const total=present+absent;
                            const attendance=present/total*100;
                            return (
                             
                                  <tr>
                                    <td>{studentModel.id}</td>
                                    <td>{studentModel.userId.firstName} {studentModel.userId.lastName}</td>
                                    <td>{attendance}%</td>
                                  </tr>

                              

                            )
                            
                          })

                        }
                        </tbody>
                        </table>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    {/* Syllabus */}
                    <Accordion.Item eventKey="2" className="border-0 shadow-none mt-2">
                      <Accordion.Header className="p-0">
                        <div className="mb-0 w-100 py-0">
                          <div className="card-body radius-6">
                            <h5 className="fw-bold mb-0">Syllabus</h5>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="bg-custom-light p-0 pt-2 border-0 shadow-none d-flex justify-content-between">
                        <div>
                          <img src={data.course.syllabus} className="w-100" />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>



                </div>
                <div className="col-12 col-md-3 ">
                  <div className="card shadow-none border-2 radius-6">
                    <div className="card-body text-custom-dark radius-6">
                      <span className="d-block font-1-1x fw-bold mb-3">Upcoming</span>
                      <div className="font-0-75x">
                        No Upcoming Work
                      </div>
                    </div>
                  </div>
                  <div className="card shadow-none border-2 radius-6 mt-2">
                    <div className="card-body text-custom-dark radius-6">
                      <span className="d-block font-1-1x fw-bold mb-3">Timeline</span>
                      <div className="font-0-75x">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac interdum eros, in consectetur tellus. Morbi pellentesque, sem et pellentesque efficitur, nibh massa ullamcorper eros, sit amet posuere nunc velit non orci. Quisque tristique diam sed ullamcorper consequat. Ut non erat tempor, accumsan urna sit amet, consequat lacus.  Sed ut felis vel libero elementum volutpat. In congue ultricies venenatis. Aenean non sodales libero, condimentum dignissim metus. Curabitur non vulputate nulla. Integer nec augue vitae turpis vulputate consequat. Sed eu tempus dui. Mauris egestas ullamcorper ipsum.s


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default CourseDetailsComponent;