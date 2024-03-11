import { Link } from 'react-router-dom';
import "./Sidebar.css"

function Sidebar(){
    return(
    <div className="sidebar">
        <div className='boxcontrol'>
            <div className="sidebar-circle">
                <div className='iconn'>อัศวินโต๊ะกลมในตำนาน</div>
            </div>
            <div className='boxbtn'>
            <ul>
                <Link to={"/Profile"}>
                <button className="sidebar-category">โปรไฟล์</button>
                </Link>
                </ul>
                <ul>
                <Link to={"/RedeemRewards"}>
                <button className="sidebar-category">แลกของรางวัล</button>
                </Link>
                </ul>
                <ul>
                <Link to={"/TopUp"}>
                <button className="sidebar-category">เติมเงิน</button>
                </Link>
                </ul>
            </div>
            
        </div>
        
    </div>
    )
}
export default Sidebar