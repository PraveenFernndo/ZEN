import { useState, useEffect } from "react"

export function MarkAttendance() {

    const [getScheduledClasses, setScheduledClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await fetch("http://localhost:5000/upcomingClasses");
            const response = await request.json();
            setScheduledClasses(response);

        }


        fetchData();
    }, [])

    return (
        <div className="mark-attendance">
            <h1>Mark Attendance</h1>
            <h3>Please Select Class And Scan the QR Code ...</h3>

            <div className="mark-attendance-select">
                <select name="grade" id="grade" onChange={() => { }}>
                    <option>Select</option>
                    {getScheduledClasses.map((data) => (
                    <option>{data.teacher_name} || {data.grade} || {data.medium} || {data.subject} || {data.time_start}</option>

                    ))}
                    
                </select>
            </div>
        </div>
    )
}