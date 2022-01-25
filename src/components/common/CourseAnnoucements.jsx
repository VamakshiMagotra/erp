import React from 'react';

const CourseAnnoucements = ({ data }) => {

  return (
    <>
      {
        data.announcements.map((element) => {
          return (
            <div key={element.announcement.id} className="card mb-1 radius-6 mx-auto font-roboto">
              <div className="card-header bg-custom-white">
                <h6 className="fw-bold mb-0 py-1 text-custom-sec">{element.announcement.title}</h6>
                <p className="font-0-65x mb-0">{element.announcement.time.substring(0, 10)}</p>
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
                          <div key={`file-${elem.id}`} className="mb-1">
                            <a
                              className="border-gray px-2 py-2 radius-6 text-custom-sec bg-custom-light-blue"
                              href={fileName}
                              target={"_blank"}
                              rel="noreferrer"
                              style={{ textDecoration: "none" }}
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


    </>
  );
}

export default CourseAnnoucements;