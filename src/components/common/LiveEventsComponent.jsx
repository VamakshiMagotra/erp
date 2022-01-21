import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import TimeTableService from "../../services/TimeTableService";

import { Loader } from "./Loader";
import { timeTableSchema } from '../../constants/schema';
import { COURSE_TYPE } from "../../constants/constants";

const LiveEvents = ({ role }) => {

  const [event, updateEvent] = useState(timeTableSchema);
  const [eventAvailable, updateEventAvailable] = useState(false);
  const [err, updateErr] = useState(false);

  useEffect(() => {
    TimeTableService.getCurrentSchedule()
      .then((resp) => {
        updateEvent({...resp.data});
        updateEventAvailable(true);
        updateErr(false);
      })
      .catch((err) => {
        updateEventAvailable(true);
        updateErr(true);
      });
  }, []);

  const eventContents = () => {
    if (!eventAvailable)
      return (<Loader className="fa-3x" />);
    if (err)
      return (<h6>No Live Events</h6>);

    return (
      <div className='timeline font-roboto'>
        <div className='timeline-item'>
          <div className='time no-line'>{`${(event.hour === 9) ? '09' : event.hour}:${(event.minute === 0) ? '00' : event.minute}`}</div>
          <div className='data'>
            <p>{event.courseModel.name}</p>
            <div className='d-flex justify-content-between'>
              <span>{`${event.duration}hrs`}</span>
              <span>{COURSE_TYPE[event.type]}</span>
            </div>
            {
              (role === 'student') ? (
                <></>
              ) : (
                <div className='w-100'>
                  <Link
                    className='btn py-0 bg-custom-light-blue d-block text-custom-blue fw-bold'
                    to={'/faculty'}
                  >
                    Mark Attendance
                  </Link>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <h5 className='text-custom-dark font-muli fw-bold mb-2'>
        Live Events <i className={`fas fa-circle font-0-8x text-danger fa-blink ${(err || !eventAvailable) ? 'd-none' : ''}`} />
      </h5>
      <div className='row font-roboto'>
        {eventContents()}
      </div>
    </>
  );
};

export default LiveEvents;
