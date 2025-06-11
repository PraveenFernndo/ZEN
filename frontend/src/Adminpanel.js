import './style.css'
import { FaCheck, FaTimes } from 'react-icons/fa'
import PieChartAttendance from './PieChartAttendance'
import PieChartPayments from './PieChartPayments'
import img1 from './images/img1.png'
import img2 from './images/img2.jpg'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AdminPanel() {

    const navigate = useNavigate();
    const [getDate, setDate] = useState();
    const [getUserData, setUserdata] = useState([]);
    const [getGrade, setGrade] = useState([]);
    const [getGradeId, setGradeId] = useState();
    const [getScheduleClasses, setScheduleClasses] = useState([]);

    // date and time
    useEffect(() => {

        setInterval(() => {
            setDate(new Date().toLocaleDateString() + "  " + new Date().toLocaleTimeString());
        }, 1000);

    });

    // set student details in table
    useEffect(() => {
        const fetchData = async () => {

            const request = await fetch("http://localhost:5000/getStudentData");
            const response = await request.json();

            setUserdata(response);

        };

        fetchData();

    }, []);


    // load gradees in select option
    useEffect(() => {
        const fetchData = async () => {

            const request = await fetch("http://localhost:5000/loadGrades");
            const response = await request.json();

            setGrade(response);

        };

        fetchData();

    }, []);

    // load schedule classes

    useEffect(() => {
        const fetchData = async () => {
            const request = await fetch("http://localhost:5000/upcomingClasses");
            const response = await request.json();

            setScheduleClasses(response);
        }

        fetchData();

    }, []);


    async function scheduleClass(id,time_start,time_end){

        const request=await fetch("http://localhost:5000/scheduleClass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ classId: id, time_start: time_start, time_end: time_end })
        });

       const response = await request.json();
        alert(response.message);

    }


    return (
        <div className="admin-panel">

            <div className='sidebar'>
                <h2>Admin Panel</h2>
                <hr />
                <ul>
                    <li><div onClick={() => { navigate('/addStudent') }}><p>Add Student</p></div></li>
                    <li><div onClick={() => { navigate('/addClass') }}><p>Add Class</p></div></li>
                    <li><div onClick={() => { navigate('/addStudent') }}><p>Student Information</p></div></li>
                    <li><div onClick={() => { navigate('/addStudent') }}><p>Send Message</p></div></li>
                    <li><div onClick={() => { navigate('/assignClasses', { state: { id: 20 } }) }}><p>Assign Class</p></div></li>

                </ul>
            </div>

            <div className='main-content'>

                {/* date */}
                <h3 style={{ color: "gray" }}>{getDate}</h3>

                <div className='top-information-bar'>
                    <div className='main-student-count-display'>
                        <h3>Total Available Students Of Today</h3>
                        <h2>30</h2>
                    </div>

                    <div className='main-payment-amount-display'>
                        <h3>Total Fees Payments Of Today</h3>
                        <h2>Rs. 3000.00</h2>
                    </div>
                </div>

                {/* Upcomming classes */}
                <h2>UpComming Classes</h2>

                <div className="schedule-classes-holder">

                    {getScheduleClasses.map((data) => (

                        <div className='schedule-class-item'>

                            <ul>
                                <li>
                                    <div>
                                        <h3>{data.teacher_name} || {data.grade}</h3>
                                        <p>{data.class_type} || {data.medium}</p>
                                        <p>{data.time_start} - {data.time_end}</p>
                                        <button name='schedule' onClick={()=>{scheduleClass(data.id,data.time_start,data.time_end)}} >Schedule</button>
                                        <button name='cancle'>Cancle</button>
                                    </div>
                                </li>

                            </ul>

                        </div>
                    ))}
                </div>

                {/* set grade selection */}
                <select className='class-select' onChange={(e) => { setGradeId(e.target.value); }} >
                    {getGrade.map((data) => (
                        <option value={data.id}>{data.name}</option>
                    ))}
                </select>
                <br />

                <button className='header-buttons' name='attendance' onClick={() => { navigate("") }} >Attendance History</button>
                <button className='header-buttons' name='payment' onClick={() => { navigate("") }}>Payment History</button>
                <button className='header-buttons' name='attendance' onClick={() => {
                    navigate("/markAttendance", {
                        state: { gradeId: getGradeId }
                    })
                }} >Mark Attendance</button>
                <button className='header-buttons' name='payment' onClick={() => { navigate("") }}>Fees Payment</button>


                <div className='details-div'>

                    <div className='details'>

                        <div className='details-left-container'>

                            <div className='attendance-div'>
                                <h2>Attendance</h2>
                                <div className='piechart'>
                                    <PieChartAttendance />
                                    <p>Number of Present Students Today : 10</p>
                                </div>
                            </div>

                            <div className='payments-div'>
                                <h2>Payments</h2>
                                <div className='piechart'>
                                    <PieChartPayments />
                                    <p>Number of Present Students Today : 10</p>
                                </div>
                            </div>
                        </div>

                        <div className='student-list'>
                            <h2>Student Rank List</h2>
                            <div className='student-ranks'>
                                <table className='student-rank-table'>
                                    <tr>
                                        <th>Name</th>
                                        <th>Avarage</th>
                                        <th>Rank</th>
                                    </tr>

                                    <tr>
                                        <td>John Doe</td>
                                        <td>85%</td>
                                        <td>1</td>
                                    </tr>

                                    <tr>
                                        <td>John Doe</td>
                                        <td>85%</td>
                                        <td>1</td>
                                    </tr>

                                    <tr>
                                        <td>John Doe</td>
                                        <td>85%</td>
                                        <td>1</td>
                                    </tr>

                                    <tr>
                                        <td>John Doe</td>
                                        <td>85%</td>
                                        <td>1</td>
                                    </tr>

                                    <tr>
                                        <td>John Doe</td>
                                        <td>85%</td>
                                        <td>1</td>
                                    </tr>

                                    <tr>
                                        <td>John Doe</td>
                                        <td>85%</td>
                                        <td>1</td>
                                    </tr>

                                </table>
                            </div>
                        </div>

                    </div>

                    <div className='student-details'>
                        <h2>Student Details</h2>
                        <div className='student-details-div'>
                            <div className='student-details-left'>


                                <table className='student-rank-table'>
                                    <tr>
                                        <th>Name</th>
                                        <th>Attendance</th>
                                        <th>Payment</th>
                                    </tr>



                                    {
                                        getUserData.map((data) => (

                                            <tr>
                                                <td>
                                                    <div className='student-name'>
                                                        <div className='student-image'><img src={img2} /></div>
                                                        <label>{data.name}</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='student-attendance'>
                                                        <div><FaCheck color='black' size={13} /></div>
                                                        <div><FaTimes color="red" size={13} /></div>
                                                        <div><FaCheck color='black' size={13} /></div>
                                                        <div><FaCheck color='black' size={13} /></div>
                                                    </div>
                                                </td>
                                                <td>Paid</td>
                                            </tr>


                                        ))

                                    }


                                </table>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default AdminPanel;