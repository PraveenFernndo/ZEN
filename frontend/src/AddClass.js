import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'


export function AddClass() {

    const [getClass, setClass] = useState({ grade: "", subject: "", class_type: "", time_start: "", time_end: "", teacher: "", day: "", medium: "" });
    const [getGrade, setGrade] = useState([]);
    const [getClassType, setClassType] = useState([]);
    const [getSubject, setSubject] = useState([]);
    const [getTeacher, setTeacher] = useState([]);
    const [getDay, setDay] = useState([]);
    const [getMedium, setMedium] = useState([]);

    function setClassData(e) {
        setClass({ ...getClass, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();


    // fetch data for add class

    function submitData(e) {
        e.preventDefault();
        async function getData() {
            const request = await fetch("http://localhost:5000/addClass", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(getClass)
            });

            const response = await request.json();
            alert(response.status);

            if (response.status == "New Class Added Successfully") {
                window.location.reload();
            }

        }

        getData();

    }

    // loading data for grade selection

    useEffect(() => {

        const fetchData = async () => {

            const gradeRequest = await fetch("http://localhost:5000/loadGrades")
            const gradeResponse = await gradeRequest.json();

            setGrade(gradeResponse);

        }

        fetchData();
    }, []);


    // loading data for class type selection

    useEffect(() => {

        const fetchData = async () => {

            const classTypeRequest = await fetch("http://localhost:5000/loadClassType")
            const classTypeResponse = await classTypeRequest.json();

            setClassType(classTypeResponse);

        }

        fetchData();
    }, []);


    // loading data for subject selection

    useEffect(() => {

        const fetchData = async () => {

            const subjectrequest = await fetch("http://localhost:5000/loadSubject")
            const subjectResponse = await subjectrequest.json();

            setSubject(subjectResponse);

        }

        fetchData();
    }, []);


    // loading data for teacher selection

    useEffect(() => {

        const fetchData = async () => {

            const teacherRequest = await fetch("http://localhost:5000/loadTeacher")
            const teacherResponse = await teacherRequest.json();

            setTeacher(teacherResponse);

        }

        fetchData();
    }, []);


    // loading data for day selection

    useEffect(() => {

        const fetchData = async () => {

            const dayRequest = await fetch("http://localhost:5000/loadDay")
            const dayResponse = await dayRequest.json();

            setDay(dayResponse);

        }

        fetchData();
    }, []);


    // loading data for medium selection

    useEffect(() => {

        const fetchData = async () => {

            const mediumRequest = await fetch("http://localhost:5000/loadMedium")
            const mediumResponse = await mediumRequest.json();

            setMedium(mediumResponse);

        }

        fetchData();
    }, []);


    return (
        <div className="add-class">
            <h1>Add Class</h1>
            <form className="add-class-form">
                <p>Grade</p>
                <select name="grade" id="grade" onChange={setClassData}>
                    <option>Select</option>
                    {getGrade.map((data) => (
                        <option value={data.id}>{data.name}</option>
                    ))}

                </select>
                <p>Subject</p>
                <select name="subject" id="subject" onChange={setClassData}>
                    <option>Select</option>
                    {getSubject.map((data) => (
                        <option value={data.id}>{data.name}</option>
                    ))}
                </select>
                <p>Medium</p>
                <select name="medium" id="medium" onChange={setClassData}>
                    <option>Select</option>
                    {getMedium.map((data) => (
                        <option value={data.id}>{data.name}</option>
                    ))}
                </select>
                <p>Class Type</p>
                <select name="class_type" id="class_type" onChange={setClassData}>
                    <option>Select</option>
                    {getClassType.map((data) => (
                        <option value={data.id}>{data.name}</option>
                    ))}
                </select>

                <p>Teacher</p>
                <select name="teacher" id="teacher" onChange={setClassData}>
                    <option>Select</option>
                    {getTeacher.map((data) => (
                        <option value={data.id}>{data.name} | {data.contact_number}</option>
                    ))}
                </select>

                <p>Class Day</p>
                <select name="day" id="day" onChange={setClassData}>
                    <option>Select</option>
                    {getDay.map((data) => (
                        <option value={data.id}>{data.name}</option>
                    ))}
                </select>

                <p>Class Starting Time</p>
                <input type="time" name="time_start" id="time_start" onChange={setClassData} />

                <p>Class Ending Time</p>
                <input type="time" name="time_end" id="time_end" onChange={setClassData} />

                <input type="submit" value="Enter" onClick={submitData} />

            <button className="viewClasses" onClick={() => { navigate('/allClass') }} >View All Classes</button>


            </form>


        </div>
    )
}
