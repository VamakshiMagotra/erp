import React from 'react';
import DetailsCardComponent from "../common/DetailsCardComponent";
import { sampleStudentDetails } from '../../sample/sampleStudentDetails';

 
const StudentDetails=()=>{
    return(
        <>
            <h4 className="text-custom-dark font-mont fw-bold mb-4">Vamakshi Magotra 18BCS086</h4>

            <div className="row">
                {
                    sampleStudentDetails.map((details)=>(
                        <DetailsCardComponent details={details}/>
                    )
                    )
                }
            </div>
        </>
    );
}

export default StudentDetails;