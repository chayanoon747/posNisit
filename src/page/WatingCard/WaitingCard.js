import MetaHeader from "../../components/MetaHeader/MetaHeader"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import * as Scanning from '../../components/scanning/Scanning.json'
import axios from 'axios'
import { useState, useEffect } from "react"


const WaitingCard = ({ point }) => {

    const navigate = useNavigate()
    const [time, setTime] = useState(true)
    const [user, setUser] = useState([])
    const clear = setInterval(() => {
        if (time) {
            axios.post(`http://localhost:3001/retrieveDataNisitWithUUID`)
                .then((response) => {
                    if (response.status) {
                        if (response.data === 'Not member, please sign up first') {
                            console.log(response.data)
                            clearInterval(clear)
                            Swal.fire({
                                title: 'ไม่พบข้อมูลสมาชิก',
                                text: 'กรุณาสมัครสมาชิก',
                                icon: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#3FC3EE',
                                cancelButtonColor: '#F27474',
                                confirmButtonText: 'ตกลง',
                            })
                            setTime(false)
                            setUser(response.data)
                            navigate('/register')
                        } else if (response.data === 'กรุณาแนบบัตร') {
                            console.log(response.data)
                            // Swal.fire({
                            //     title: 'กรุณาแนบบัตร',
                            //     icon: 'error',
                            //     showCancelButton: false,
                            //     confirmButtonColor: '#3FC3EE',
                            //     cancelButtonColor: '#F27474',
                            //     confirmButtonText: 'ตกลง',
                            // })
                            // .then((result) => {
                            //     if (result.isConfirmed) {
                            //         navigate('/')
                            //     }

                            // })
                        }
                        else if (response.data === 'ไม่พบเครื่องอ่านบัตร') {
                            console.log(response.data)
                            Swal.fire({
                                title: 'ไม่พบเครื่องอ่านบัตร',
                                icon: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#3FC3EE',
                                cancelButtonColor: '#F27474',
                                confirmButtonText: 'ตกลง',
                            })
                            // .then((result) => {
                            //     if (result.isConfirmed) {
                            //         navigate('/')
                            //     }

                            // })
                        }
                        else {
                            console.log('hello')
                            console.log(response.data)
                            clearInterval(clear)
                            Swal.fire({
                                title: 'รายชื่อสมาชิกถูกต้อง',
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3FC3EE',
                                cancelButtonColor: '#F27474',
                                confirmButtonText: 'ตกลง',
                            })
                            setTime(false)
                            setUser(response.data)
                            navigate('/Profile')
                            
                        }
                    }
                })
        }

    }, 5000)


    const totalPrice = 1

    console.log(user)


    const handleNoUser = () => {
        Swal.fire({
            title: 'ไม่พบรายชื่อสมาชิก',
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3FC3EE',
            cancelButtonColor: '#F27474',
            confirmButtonText: 'ตกลง',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/')
            }

        })
    }
    const handleHaveUser = () => {
        Swal.fire({
            title: 'รายชื่อสมาชิกถูกต้อง',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3FC3EE',

            cancelButtonColor: '#F27474',
            confirmButtonText: 'ตกลง',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/')
            }

        })
    }
    const handleBack = () => {
        navigate('/')
    }

    const handlePayMent = () => {
        //     axios.post(`${process.env.REACT_APP_API}/updateDataNisit`,{
        //         cash : totalPrice
        //     })
        //     .then((response) => {
        //         if(response.status) {
        //             if(response.data === "Not enough money"){
        //                 Swal.fire({
        //                     title: 'ยอดเงินของคุณไม่พอ',
        //                     icon: 'error',
        //                     showCancelButton: false,
        //                     confirmButtonColor: '#3FC3EE',

        //                     cancelButtonColor: '#F27474',
        //                     confirmButtonText: 'ตกลง',
        //                 })
        //                 .then((result) => {
        //                     if (result.isConfirmed) {
        //                         navigate('/')
        //                     }

        //                 })
        //             }
        //             else{
        //                 setUser(response.data)
        //             }
        //         }
        //     })
        //     .catch((error) => {})
    }
    // console.log(user)

    const handleBack2 = () => {
        clearInterval(clear)
        setTime(false)
        navigate('/')
        
    }

    return (
        <div>
            <MetaHeader title='Pay By Card' />
            <div className="flex items-center justify-center w-full h-screen py-16 align-middle bg-pos-primary">
                <div className="flex flex-col items-center w-full h-full mx-20 rounded-box bg-pos-white">
                    {user.length !== 0 ?
                        <div className="flex flex-col items-center w-full h-full py-3">
                            <div className="flex flex-col items-center w-full h-full py-3">
                                <div className="flex justify-between w-[30rem] ">
                                    <span className="text-3xl text-pos-primary">รหัสนิสิต</span>
                                    <span className="text-3xl text-pos-primary">{user.studentID}</span>
                                </div>
                                <div className="flex justify-between w-[30rem] ">
                                    <span className="text-3xl text-pos-primary">ชื่อ-นามสกุล</span>
                                    <span className="text-3xl text-pos-primary">{user.firstname} {user.lastname}</span>
                                </div>

                                <div className='h-1 mx-10 my-5 border-none divider bg-pos-primary' />
                                <div className="flex justify-between w-full px-40 py-2">
                                    <span className="text-2xl text-pos-primary">ยอดรวมสุทธิ</span>
                                    <span className="text-2xl text-pos-primary">{totalPrice} บาท</span>
                                </div>
                                <div className="flex justify-between w-full px-40 ">
                                    <span className="text-2xl text-pos-primary">ได้รับแต้ม</span>
                                    <span className="text-2xl text-pos-primary">{point} คะแนน</span>
                                </div>
                                <div className="flex justify-between w-full px-40 py-2">
                                    <span className="text-2xl text-pos-primary">ยอดเงินคงเหลือ</span>
                                    <span className="text-2xl text-pos-primary">{user.cash} บาท</span>
                                </div>
                                <div className="flex justify-between w-full px-40 ">
                                    <span className="text-2xl text-pos-primary">แต้มสะสมคงเหลือ</span>
                                    <span className="text-2xl text-pos-primary">{user.point} คะแนน</span>
                                </div>
                                <div className="flex justify-center py-5">
                                    <button className="btn w-[150px] bg-pos-error hover:bg-pos-error/80 text-[#000000] border-none" onClick={handleBack} >ย้อนกลับ</button>
                                </div>
                            </div>

                        </div>
                        :
                        <div className="flex justify-center w-full h-full max-h-screen max-w-screen">
                            <div className="flex flex-col self-center">
                                <div className="text-[#000000] flex items-start text-2xl"> กรุณานำบัตรมาแตะที่เครื่อง NFC Reader </div>
                                <img src={require('../../image/waiting.gif')} className="w-full h-full pt-20 max-w-96 max-h-80" />
                                <div>
                                    <button className="btn " onClick={handleBack2}>back</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default WaitingCard