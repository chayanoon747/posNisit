import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [formData, setFormData] = useState({
    idCard: '',
    studentId: '',
    studentName: '',
    studentLastName: '',
    username: ''
  });

  //const [isSuccess, setSuccess] = useState(false)

  useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /*await fetch('http://localhost:3001/writeJsonFileToFolderDatabaseInFTP',{
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        studentID: formData.studentId,
        username: formData.username,
        firstname: 'firstname',
        lastname: 'lastname',
        cash: 0,
        point: 0
      })
    }).then((response) => {
      if(response.data == "Write successful"){
        console.log(response.data);
        return true;
      }else{
        console.log(response.data);
        if(response.data != undefined){
          Swal.fire({
            icon: "error",
            title: "สมัครสมาชิกไม่สำเร็จ",
            text: response.data,
          });
        }
        
        return;
      }
    })*/

  const handleSignUp = async()=>{
    let isSuccess = false;
    await axios.post('http://localhost:3001/writeJsonFileToFolderDatabaseInFTP',{
      studentID: formData.studentId,
      username: formData.username,
      firstname: formData.studentName,
      lastname: formData.studentLastName,
      cash: 0,
      point: 0
    }).then((response)=>{
      if(response.data == 'Write successful'){
        isSuccess = true;
      }else{
          Swal.fire({
            icon: "error",
            title: "สมัครสมาชิกไม่สำเร็จ",
            text: response.data,
          });
          isSuccess = false;
      }
    })
    return isSuccess;
  }
  const navigate = useNavigate();
  
  const handleSave = async() => {
    if ( !formData.studentId || !formData.studentName || !formData.studentLastName || !formData.username) {
      navigate("/");
        Swal.fire({
            icon: "error",
            title: "สมัครสมาชิกไม่สำเร็จ",
            text: "กรุณากรอกข้อมูลให้ครบ",
        });
        return;
    }
    let isSuccess = await handleSignUp();
    console.log(isSuccess)
    if(isSuccess){
      navigate("/Profile");
      console.log('Data saved:', formData);
      Swal.fire({
          title: "สมัครสมาชิกสำเร็จ",
          icon: "success"
      });
    }
    
};

  return (
    <div className='displayRg'>
      <div className='RegisBox'>
        <p style={{ fontSize: '26px', fontWeight: 'normal', textAlign: 'center', top: '20px', height: '30px' }}>สมัครสมาชิก</p>
        <div className='Boxinside'>
          <div className='centeredSection'>
              <div className='changpo'>
                <div className='boxx1'>
                  <label htmlFor="studentId">รหัสนิสิต</label>
                  <div style={{ marginTop: '5px' }}>
                    <input className='Boxidcard' type="text" id="studentId" name="studentId" value={formData.studentId} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div style={{  }}>
                <div className='boxxxx'>
                  <label htmlFor="studentName" style={{ fontSize: '13px' }}>ชื่อ</label>
                  
                    <input className='BoxName' type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleInputChange} />
                  
                </div>
                <div className='boxxxx'>
                  <label htmlFor="studentLastName" style={{ fontSize: '13px' }}>นามสกุล</label>
                  
                    <input className='BoxName' type="text" id="studentLastName" name="studentLastName" value={formData.studentLastName} onChange={handleInputChange} />
                  
                </div>
                <div className='boxxxx'>
                  <label htmlFor="username" style={{ fontSize: '13px' }}>ชื่อก่อนหน้า @ku.th</label>
                  
                    <input className='BoxName' type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
                  
                </div>
              </div>
          </div>
        </div>
        <div className='ButtonSave'>
          
          <button onClick={handleSave}>ยืนยัน</button>
         
        </div>
      </div>
      {/* <Profile></Profile> */}
    </div>
  );
}

export default Register;
