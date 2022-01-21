import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TimeTableService from '../../services/TimeTableService';

import { Loader } from './Loader';
import { COURSE_TYPE } from '../../constants/constants';

const TodayTimeline = ({ role }) => {
  const [schedule, updateSchedule] = useState([]);
  const [scheduleAvailable, updateScheduleAvailable] = useState(false);

  useEffect(() => {
    TimeTableService.getTodaySchedule()
      .then((resp) => {
        updateSchedule(resp.data);
        updateScheduleAvailable(true);
      })
      .catch((err) => {
        updateScheduleAvailable(true);
      });
  }, []);

  const timeLineContents = () => {
    if (!scheduleAvailable)
      return (<Loader className="fa-3x" />);
    if (schedule.length === 0)
      return <h6>You are not registered in any courses</h6>;

    return (
      <div className='timeline font-roboto'>
        <div className='timeline-item blank'>
          <div className='time'></div>
        </div>
        {
          schedule.map((elem) => (
            <div key={elem.id} className='timeline-item'>
              <div className='time'>{`${(elem.hour === 9) ? '09' : elem.hour}:${(elem.minute === 0) ? '00' : elem.minute}`}</div>
              <div className='data'>
                <p>{elem.courseModel.name}</p>
                <div className='d-flex justify-content-between'>
                  <span>{`${elem.duration}hrs`}</span>
                  <span>{COURSE_TYPE[elem.type]}</span>
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
          ))
        }
        <div className='timeline-item blank'>
          <div className='time'></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <h5 className='text-custom-dark font-muli fw-bold mb-2'>Today's Schedule</h5>
      <div className='row'>
        {timeLineContents()}
      </div>
    </>
  );
};

export default TodayTimeline;