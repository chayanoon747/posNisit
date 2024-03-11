import React, { useState, useEffect } from 'react';
import './RedeemRewards.css';
import OTPModal from './OTPModal';
import MessageModal from './MessageModal';
import axios from 'axios';
import Swal from 'sweetalert2'

function RedeemRewards() {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
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

  const [firstProducts, setFirstProducts] = useState([
    { name: 'อเมริกาโน่', points: 600, quantity: 0 },
    { name: 'เอสเปรสโซ่', points: 650, quantity: 0 },
    { name: 'ลาเต้', points: 650, quantity: 0 },
    { name: 'คาปูชิโน่', points: 650, quantity: 0 },
    { name: 'มอคค่า', points: 700, quantity: 0 }
  ]);

  const [secondProducts, setSecondProducts] = useState([
    { name: 'เค้กช็อกโกแลต', points: 650, quantity: 0 },
    { name: 'เค้กส้มวาเลนเซีย', points: 700, quantity: 0 },
    { name: 'เค้กฝอยทอง', points: 700, quantity: 0 },
    { name: 'เค้กสตรอว์เบอร์รี', points: 750, quantity: 0 },
    { name: 'เค้กมัจชะครีมสด', points: 850, quantity: 0 }
  ]);

  const [thirdProducts, setThirdProducts] = useState([
    { name: 'ชาดำ', points: 550, quantity: 0 },
    { name: 'ชาเย็น', points: 550, quantity: 0 },
    { name: 'ชาพีช', points: 600, quantity: 0 },
    { name: 'ชามะนาว', points: 600, quantity: 0 },
    { name: 'ชาน้ำผึ้งมะนาว', points: 650, quantity: 0 }
  ]);

  const [fourthProducts, setFourthProducts] = useState([
    { name: 'เครปเย็น', points: 600, quantity: 0 },
    { name: 'แพนเค้ก', points: 650, quantity: 0 },
    { name: 'พาร์เฟ่ต์', points: 890, quantity: 0 },
    { name: 'พานาคอตต้า', points: 890, quantity: 0 },
    { name: 'วาฟเฟิลเนยสด', points: 890, quantity: 0 }
  ]);

  const decreaseQuantity = (index, productList, setProductList) => {
    const updatedProducts = [...productList]

    console.log(updatedProducts);
    const selectedProduct = updatedProducts[index];
    console.log(selectedProduct)
    if(updatedProducts[index].quantity - 1 >= 0){
      updatedProducts[index].quantity -= 1;
    }
    
    setProductList(updatedProducts);
  };
  

  const increaseQuantity = (index, productList, setProductList) => {
    const updatedProducts = [...productList];
    const selectedProduct = updatedProducts[index];
    const totalPointsRequired = selectedProduct.points * (selectedProduct.quantity + 1);
    updatedProducts[index].quantity += 1;
    setProductList(updatedProducts);
  };
  

  // Back-end รับข้อมูล allProducts ในหน้านี้
  const handleSubmit = async() => {
    
    await axios.post('http://localhost:3001/sendSMTPToEmail',{
      usernameReceiver: `${dataCustomer.username}`
    })
    .then((response) => {
      if(response.status === 500){
        Swal.fire({
          icon: "error",
          title: "ทำรายการไม่สำเร็จ",
          text: response.data,
        });
      }
      else if(response.status === 200){
        console.log(('Success'));
      }
    })

    /*setFirstProducts(firstProducts.map(product => ({ ...product, quantity: 0 })));
    setSecondProducts(secondProducts.map(product => ({ ...product, quantity: 0 })));
    setThirdProducts(thirdProducts.map(product => ({ ...product, quantity: 0 })));
    setFourthProducts(fourthProducts.map(product => ({ ...product, quantity: 0 })));*/

    setShowOTPModal(true);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleOTPSubmit = (otp) => {
    const allProducts = [
      ...firstProducts,
      ...secondProducts,
      ...thirdProducts,
      ...fourthProducts
    ];
    console.log(`${allProducts}BBBBBBBBBB`);
    const allProductsFillter = allProducts.filter((product)=>{
      console.log(product)
      if(product.quantity > 0){
        return product;
      }
    })
    console.log(`${allProductsFillter}AAAAAAAAAAAAAAAAAA`);

    axios.post('http://localhost:3001/verifyOTP',{
      receivedOTP: otp
    }).then((response) => {
      if(response.data == "OTP match. User verified successfully."){
        setShowOTPModal(false);
        
        axios.post('http://localhost:3001/updatePointNisit',{
          allProductsFillter: allProductsFillter
        })
        .then((response) => {
            if(response.data == "กรุณาแนบบัตร" || response.data == "ไม่พบเครื่องอ่านบัตร" || response.data == "Not member, please sign up first" || response.data == "Not enough point"){
              Swal.fire({
                icon: "error",
                title: "ทำรายการไม่สำเร็จ",
                text: response.data,
              });
            }
            else if(response.status == 200){
              setDataCustomer(response.data);
              axios.post('http://localhost:3001/createTransactionRedeem',{
                allProductsFillter: allProductsFillter
              }).then((response)=>{
                if(response.status == 200){
                  Swal.fire({
                    icon: "success",
                    title: "ทำรายการสำเร็จ",
                    text: "ทำรายการสำเร็จ",
                  });
                }
              })
            }
            
        })
        
      }
      else if(response.data == "OTP do not match. User verification failed."){
        setShowOTPModal(false);
        Swal.fire({
          icon: "error",
          title: "ทำรายการไม่สำเร็จ",
          text: response.data,
        });
      }
    })
    console.log(otp);
    
  };

  const handleOTPClose = () => {
    setShowOTPModal(false);
  };

  return (
    <div className="app">
      {/* <div className="sidebar">
        <div className="sidebar-circle">
          อัศวินโต๊ะกลมในตำนาน
        </div>
        <ul>
          <p className="sidebar-category">แลกของรางวัล</p>
        </ul>
      </div> */}

      <div className="main-content">
        <h2 className='main-header'>รายการของรางวัล</h2>
        <div className="input-row">
          <label htmlFor="studentCardId">รหัสบัตร:</label>
          <input type="text" id="studentCardId" value={dataCustomer.cardID} />
          <label htmlFor="studentId">รหัสนิสิต:</label>
          <input type="text" id="studentId" value={dataCustomer.studentID} />
          <label htmlFor="studentName">ชื่อ-นามสกุล:</label>
          <input type="text" id="studentName" value={`${dataCustomer.firstname} ${dataCustomer.lastname}`} />
          <label htmlFor="studentPoints">คะแนน:</label>
          <input type="text" id="studentPoints" value={dataCustomer.point} />
        </div>
        <div className="product-list-container">
          <div className="product-list">
            <table>
              <thead>
                <tr>
                  <th>กาแฟเย็น</th>
                  <th>คะแนน</th>
                  <th>จำนวน</th>
                </tr>
              </thead>
              <tbody>
                {firstProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.points}</td>
                    <td>
                      <button className="decrease" onClick={() => decreaseQuantity(index, firstProducts, setFirstProducts)}>-</button>
                      <input type="text" value={product.quantity} />
                      <button className="increase" onClick={() => increaseQuantity(index, firstProducts, setFirstProducts)}>+</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="product-list">
            <table>
              <thead>
                <tr>
                  <th>เค้ก</th>
                  <th>คะแนน</th>
                  <th>จำนวน</th>
                </tr>
              </thead>
              <tbody>
                {secondProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.points}</td>
                    <td>
                      <button className="decrease" onClick={() => decreaseQuantity(index, secondProducts, setSecondProducts)}>-</button>
                      <input type="text" value={product.quantity} />
                      <button className="increase" onClick={() => increaseQuantity(index, secondProducts, setSecondProducts)}>+</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="product-list">
            <table>
              <thead>
                <tr>
                  <th>ชา</th>
                  <th>คะแนน</th>
                  <th>จำนวน</th>
                </tr>
              </thead>
              <tbody>
                {thirdProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.points}</td>
                    <td>
                      <button className="decrease" onClick={() => decreaseQuantity(index, thirdProducts, setThirdProducts)}>-</button>
                      <input type="text" value={product.quantity} />
                      <button className="increase" onClick={() => increaseQuantity(index, thirdProducts, setThirdProducts)}>+</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="product-list">
            <table>
              <thead>
                <tr>
                  <th>ของหวาน</th>
                  <th>คะแนน</th>
                  <th>จำนวน</th>
                </tr>
              </thead>
              <tbody>
                {fourthProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.points}</td>
                    <td>
                      <button className="decrease" onClick={() => decreaseQuantity(index, fourthProducts, setFourthProducts)}>-</button>
                      <input type="text" value={product.quantity} />
                      <button className="increase" onClick={() => increaseQuantity(index, fourthProducts, setFourthProducts)}>+</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
        <div className="submit-container">
          
            <button className="back-button" onClick={handleGoBack}>กลับ</button>
          
            <button className="submit-button" onClick={handleSubmit}>ตกลง</button>
          
        </div>
      </div>
      {showOTPModal && (
        <OTPModal onClose={handleOTPClose} onSubmit={handleOTPSubmit} />
      )}
      {showMessageModal && (
        <MessageModal 
          message="คุณมีคะแนนไม่เพียงพอที่จะซื้อสินค้านี้" 
          onClose={() => setShowMessageModal(false)} 
        />
      )}
    </div>
  );
}

export default RedeemRewards;
