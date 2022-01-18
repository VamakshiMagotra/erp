import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CourseService from "../../services/CourseService";

import { Loader } from "./Loader";
import { courseSchema } from "../../constants/schema";

const CourseDetailsComponent = () => {
  const { id } = useParams();
  const [dataReady, updateDataReady] = useState(false);
  const [data, updateData] = useState(courseSchema);

  useEffect(() => {
    CourseService.getCourseDetails(id)
      .then((resp) => {
        updateData({ ...resp.data });
        updateDataReady(true);
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
                  <div className="card border-2 radius-6 mb-2">
                    <div className="card-body radius-6">
                      <h5 className="fw-bold mb-0">Announcements</h5>
                    </div>
                  </div>
                  {
                    data.announcements.map((element) => {
                      return (
                        <div key={element.announcement.id} className="card mb-1 radius-6 w-95 mx-auto font-roboto">
                          <div className="card-header bg-custom-white">
                            <h6 className="fw-bold mb-0 py-1 text-custom-sec">{element.announcement.title}</h6>
                            <p className="font-0-65x mb-0">{element.announcement.time.substring(0,10)}</p>
                          </div>
                          <div className="card-body radius-6">
                            
                            <p className="font-0-8x mb-1">{element.announcement.announce}</p>
                            <div className="mb-3">
                              {
                                element.links.map((link) => (
                                  <a
                                    key={link.id}
                                    className="d-block font-0-75x"
                                    target={"_blank"}
                                    href={link.link}
                                    rel="noreferrer"
                                  >
                                    {link.link}
                                  </a>
                                ))
                              }
                            </div>
                            <div>
                              <div className="d-flex flex-column">

                                {
                                  element.files.map((elem) => {
                                    const fileName = elem.file;
                                    const i = fileName.indexOf("%2F");
                                    const i2 = fileName.indexOf("?alt");
                                    const sub = fileName.substring(i + 3, i2);
                                    return (
                                      <div className="mb-1">
                                        <a
                                          className="border-gray px-2 py-2 radius-6 text-custom-sec bg-custom-light-blue"
                                          href={fileName}
                                          target={"_blank"}
                                          rel="noreferrer"
                                          style={{textDecoration: "none"}}
                                        >
                                          <i className="fas fa-lg fa-file-download me-1" />
                                          <span className="font-0-75x">{sub}</span>
                                        </a>
                                      </div>
                                    );
                                  })
                                }

                              </div>

                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="col-12 col-md-3">
                  <div className="card shadow-none border-2 radius-6">
                    <div className="card-body text-custom-dark radius-6">
                      <span className="d-block font-1-1x fw-bold mb-3">Upcoming</span>
                      <div className="font-0-75x">
                        No Upcoming Work
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