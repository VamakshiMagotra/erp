import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';

import AttendanceService from '../../services/AttendanceService';

import { Loader } from '../common/Loader';

const DashboardAttendance = () => {

  const [attendance, updateAttendance] = useState([]);
  const [attendanceReady, updateAttendanceReady] = useState(false);

  ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

  useEffect(() => {
    AttendanceService.getStudentCompleteAttendance()
      .then((resp) => {
        updateAttendance(resp.data);
        updateAttendanceReady(true);
      })
      .catch((err) => {
        updateAttendanceReady(true);
      });
  }, []);

  const attendanceList = () => {
    if (!attendanceReady)
      return (<Loader className="fa-3x" />);
    if (attendance.length === 0)
      return <h6>You are not registered in any courses</h6>;

    return (
      <>
        {
          attendance.map((att, index) => {
            const { courseName, courseId, present, absent, total } = att;
            const per = ((present / total) * 100.0).toFixed(2);
            const cNameArr = courseName.split(" ");
            const type = cNameArr.splice(-1);
            const cName = cNameArr.join(" ");

            const data = {
              labels: ['Present', 'Absent'],
              datasets: [
                {
                  label: 'Attendance',
                  data: [present, absent],
                  backgroundColor: [
                    'rgba(39, 75, 99, 0.8)',
                    'rgba(209, 220, 220, 0.8)',
                  ],
                  borderColor: [
                    'rgba(39, 75, 99, 1)',
                    'rgba(209, 220, 220, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            };

            const plugins = [{
              beforeDraw: (chart) => {
                const { width, height, ctx } = chart;
                ctx.restore();
                const fontSize = 16;
                ctx.font = fontSize + "px roboto";
                ctx.textBaseline = "middle";
                const text = chart.config.options.elements.center.text,
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = 5.5 * height / 8;
                ctx.fillText(text, textX, textY);
                ctx.save();
              }
            }];

            const options = {
              rotation: -90,
              circumference: 180,
              elements: {
                center: {
                  text: per + "%"
                }
              },
              plugins: {
                datalabels: {
                  display: true,
                  formatter: (value, ctx) => {

                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => sum += data);
                    let percentage = (value * 100 / sum).toFixed(2) + "%";
                    return percentage;
                  },
                  backgroundColor: '#fefefe',
                  borderRadius: 3,
                  font: {
                    color: '#353535',
                    weight: 'bold',
                    size: '10px',
                  },
                  doughnutlabel: {
                    labels: [{
                      text: '550',
                      font: {
                        size: 20,
                        weight: 'bold'
                      }
                    }, {
                      text: 'total'
                    }]
                  },
                }
              }
            };

            return (
              <div key={`${courseId}-attendance-${index}`} className='col-12 col-sm-6 col-xl-4'>
                <Doughnut data={data} options={options} plugins={plugins} />
                <div className='w-100 everything-center flex-column font-roboto fw-bold' style={{marginTop: '-40px'}}>
                  <p className='text-center mb-0 font-0-85x'>{cName}</p>
                  <p className='text-center mb-0 font-0-75x'>{type}</p>
                </div>
              </div>
            );
          })
        }
      </>
    );
  };

  return (
    <>
      <h5 className='text-custom-dark font-muli fw-bold mb-2'>
        My Attendance
      </h5>
      <div className='row font-roboto'>
        {attendanceList()}
      </div>
    </>
  );
};

export default DashboardAttendance;
