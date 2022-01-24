import React, { useState, useEffect, Fragment } from "react";

import TimeTableService from '../../services/TimeTableService';

import { Loader } from "./Loader";
import { DAY_OF_WEEK as dayArr, TIME_SLOTS as slots } from "../../constants/constants";
import { getAbbreviation } from "../../helpers/getAbbreviation";
import { designationHelper } from "../../helpers/designationHelper";

const TimeTable = () => {
  // Each member: timeTableSchema
  const [timeTableData, updateTimeTableData] = useState([]);
  const [dataAvailable, updateDataAvailable] = useState(0);
  const [courseArr, updateCourseArr] = useState([]);

  // Variable for storing indexes for traversing timeTableArray
  let currIndex = 0;

  useEffect(() => {
    TimeTableService.getTimeTable()
      .then((resp) => {
        updateTimeTableData(resp.data);
        updateDataAvailable(1);
        const courses = resp.data.map((element) => element.courseModel);
        const filteredCourses = courses.filter((value, index) => {
          return courses.map((c) => c.id).indexOf(value.id) === index;
        });
        updateCourseArr(filteredCourses);
      })
      .catch((err) => {
        updateDataAvailable(-1);
      });
  }, []);

  // Helper object to help with course Category
  const courseCategory = (cat) => {
    if(cat === 'C') return "Core";
    if(cat === 'E') return "Elective";
    return "Open Elective";
  };

  if (dataAvailable === 0) {
    return <Loader className="fa-3x" />
  }

  if (dataAvailable === -1 || timeTableData.length === 0) {
    return (
      <div className="card p-4 radius-6">
        <h5>No time Table Available</h5>
      </div>
    );
  }

  return (
    <>
      <div className="card mb-2 radius-6 p-4 overflow-auto">
        <h4 className="text-custom-dark font-mont fw-bold mb-4">My Time Table</h4>

        <table className="table table-bordered mb-1">
          <thead>
            <tr>
              <th>Day / Time</th>
              {
                slots.map((time, index) => {
                  const nextIndex = index + 1;
                  const nextHr = (nextIndex < slots.length) ? slots[nextIndex].hour : "17";
                  const nextMin = (nextIndex < slots.length) ? slots[nextIndex].minute : "30";
                  return (<th key={time.hour}>{`${time.hour}:${time.minute} - ${nextHr}:${nextMin}`}</th>)
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              dayArr.map((day) => {
                if (day === 'SATURDAY' || day === 'SUNDAY') return <Fragment key={day} />;

                let again = false;

                return (
                  <tr key={day}>
                    <th>{day}</th>
                    {
                      slots.map((time) => {
                        const hr = parseInt(time.hour, 10);
                        const min = parseInt(time.minute, 10);
                        const nextSchedule = timeTableData[currIndex];

                        if (again) {
                          again = false;
                          currIndex = currIndex + 1;
                          return (
                            <td key={day + time.hour}>{`${getAbbreviation(nextSchedule.courseModel.name)} (${nextSchedule.type})`}</td>
                          );
                        }

                        if (
                          currIndex < timeTableData.length &&
                          nextSchedule.day === day &&
                          nextSchedule.hour === hr &&
                          nextSchedule.minute === min
                        ) {
                          if (nextSchedule.duration === 2) again = true;
                          else currIndex = currIndex + 1;
                          return (
                            <td key={day + time.hour}>{`${getAbbreviation(nextSchedule.courseModel.name)} (${nextSchedule.type})`}</td>
                          );
                        }

                        if (hr === 13)
                          return <td key={day + time.hour}>LUNCH</td>

                        return <td key={day + time.hour} />;
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <div className="d-flex justify-content-end font-0-65x">
          <span>L: Lecture, T: Tutorial, P: Practical</span>
        </div>
      </div>

      <div className="card radius-6 p-4 overflow-auto">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Code</th>
              <th>Course Name</th>
              <th>LTP</th>
              <th>Category</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            {
              courseArr.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{`${parseInt(course.theory, 10)}-${parseInt(course.tutorial, 10)}-${parseInt(course.practical, 10)}`}</td>
                  <td>{courseCategory(course.type)}</td>
                  <td>{`${designationHelper(course.faculty)} ${course.faculty.userId.firstName} ${course.faculty.userId.lastName}`}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TimeTable;