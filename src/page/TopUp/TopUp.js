import "./TopUp.css";
import { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from "sweetalert2"; // เพิ่มการ import สำหรับ SweetAlert

function TopUp() {
  const [money, setMoney] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [moneysimple, setMoneysimple] = useState("");
  const [dataCustomer, setDataCustomer] = useState({cardID:'', studentID: '', firstname: '', lastname:'', username:'',cash:''});
  const [isUpdated, setIsUpdated] = useState(false)

  const handleButtonClick = (amount) => {
    setMoney(amount.toString());
  };

  useEffect(()=>{
    (async() => {
        await axios.post('http://localhost:3001/retrieveDataNisitWithUUID')
        .then((response)=>{
            if(response.status === 200 && response.data !== 'Not member, please sign up first'){
                console.log(response.data)
                setDataCustomer(response.data);
            }else{
                console.log("")
            }
        })
    })()
},[isUpdated])

  /* const handleSubmit = (event) => {
    event.preventDefault();

    const cardID = {
      name: name
    };

    axios.get(`https://jsonplaceholder.typicode.com/users`, { cardID })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }; */

  const showSwal = () => {
    if (!money || money==="0") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูล",
        html: `โปรดกรอกข้อมูลให้ครบถ้วน`,
        confirmButtonText: "ตกลง",
      });
      return;
    }
    Swal.fire({
      title: "บริการเติมเงิน",
      icon: "question",
      html: `คุณต้องการเติมเงิน ${money} บาท<br><br>ชื่อ-นามสกุล: ${dataCustomer.firstname} ${dataCustomer.lastname} <br>รหัสบัตรของผู้เติม: ${cardCode}<br>ยอดเงินคงเหลือ: ${moneysimple}`,
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`http://localhost:3001/topUpCashCard`, { cash: parseInt(money)})
          .then((response)=>{
            if(response.data){
              if(response.data == "กรุณาแนบบัตร" || response.data == "ไม่พบเครื่องอ่านบัตร" || response.data == "Not member, please sign up first"){
                Swal.fire(response.data, "", "error");
              }
              else{
                if(response.status == 200){
                    Swal.fire({
                      title: "เติมเงินสำเร็จ",
                      icon: "success"
                  });
                  setIsUpdated(!isUpdated);
                }
              }
            }
          })
          .catch(err => {
            Swal.fire("มีบางอย่างผิดพลาด", "", "error");
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("การเติมเงินถูกยกเลิก", "", "error");
      }
    });
  };

  return (
    <div className="TopUpPage">
      <h1>บริการเติมเงิน</h1>
      <div className="CashNow">
        <p style={{fontSize:"medium",color:"#6F6F6F"}}>ยอดเงินคงเหลือ</p>
        <p>{dataCustomer.cash}</p>
      </div>
      <div className="bigBoxInp">
        <div className="dataUser">
          <div className="BoxInput">
            <p>ชื่อ-นามสกุล</p>
            <input
              className="inpName"
              type="text"
              value={`${dataCustomer.firstname} ${dataCustomer.lastname}`}
              placeholder="ชื่อ-นามสกุล"
              readOnly
            />
          </div>
          <div className="BoxInput">
            <p>รหัสบัตร</p>
            <input
              className="inpCardCode"
              type="text"
              value={dataCustomer.cardID}
              placeholder="รหัสบัตรของผู้เติม"
              readOnly
            />
          </div>
        </div>
        <div className="BoxInput_Cash">
          <p>กรอกจำนวนเงินที่ต้องการ(บาท)</p>
          <input
            type="number"
            className="inpCash"
            value={money}
            placeholder="กรุณาใส่จำนวนเงิน"
            min="20"
            max="5000"
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <div className="chooseCash">
          <button onClick={() => handleButtonClick(50)}>50</button>
          <button onClick={() => handleButtonClick(100)}>100</button>
          <button onClick={() => handleButtonClick(150)}>150</button>
          <button onClick={() => handleButtonClick(200)}>200</button>
          <button onClick={() => handleButtonClick(250)}>250</button>
          <button onClick={() => handleButtonClick(300)}>300</button>
        </div>
        <div className="btnYes">
          <button onClick={showSwal}>ยืนยัน</button>
        </div>
      </div>
    </div>
  );
}

export default TopUp;
