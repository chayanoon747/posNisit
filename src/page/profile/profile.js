import React, { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';
import Swal from 'sweetalert2'

function Profile() {

    const [dataCustomer, setDataCustomer] = useState({studentID: '', firstname: '', lastname:'', username:''});

    useEffect(()=>{
        (async() => {
            await axios.post('http://localhost:3001/retrieveDataNisitWithUUID')
            .then((response)=>{
                if(response.status === 200 && response.data !== 'Not member, please sign up first'){
                    console.log(response.data)
                    setDataCustomer(response.data);
                }else{
                    console.log("จีจี้")
                }
            })
        })()
    },[])


    return (
        <div className="profile-container">
            <h1 className="profile-heading">ข้อมูลสมาชิก</h1>
            <div className="info-box">
                {
                    
                }
                <div className="info-item">
                    <label htmlFor="idCard">รหัสบัตร :</label>
                    <input type="text" id="idCard"  value={dataCustomer.cardID} className='BoxData' readOnly />
                </div>
                <div className="info-item">
                    <label htmlFor="studentId">รหัสนิสิต :</label>
                    <input type="text" id="studentId" value={dataCustomer.studentID} className='BoxData' readOnly />
                </div>
                <div className="info-item">
                    <label htmlFor="studentName">ชื่อ-นามสกุล :</label>
                    <input type="text" id="studentName" value={`${dataCustomer.firstname} ${dataCustomer.lastname}`} className='BoxData' readOnly />
                </div>
                <div className="info-item">
                    <label htmlFor="studentEmail">Email :</label>
                    <input type="text" id="studentEmail" value={`${dataCustomer.username}@ku.th`} className='BoxData' readOnly />
                </div>
            </div>
        </div>
    );
}

export default Profile;
