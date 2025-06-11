import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";


export function AssignStudentForClasses() {

    const location = useLocation();
    const { id } = location.state;

    const [getSubject, setSubject] = useState([]);
    const [getGrade, setGrade] = useState([]);
    const [getSubmitData, setSubmitData] = useState({ subject: "", grade: "" });

    const [getData,setData]=useState([]);


    // loading data for subject selection

    useEffect(() => {

        const fetchData = async () => {

            const subjectrequest = await fetch("http://localhost:5000/loadSubject")
            const subjectResponse = await subjectrequest.json();

            setSubject(subjectResponse);

        }

        fetchData();
    }, []);


    // loading data for grade selection

    useEffect(() => {

        const fetchData = async () => {

            const gradeRequest = await fetch("http://localhost:5000/loadGrades")
            const gradeResponse = await gradeRequest.json();

            setGrade(gradeResponse);

        }

        fetchData();
    }, []);


    const submitData = (e) => {

        setSubmitData({ ...getSubmitData, [e.target.name]: [e.target.value] })

    }

    const searchClass = async () => {

        const request = await fetch("http://localhost:5000/searchClasses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(getSubmitData)
        })

        const response=await request.json();
        setData(response.response);


    }


    return (

        <div className="assign-class">
            <h1 style={{ margin: "10px" }}>Assign Class</h1>

            <div className="main-container-assign-class">

                <div className="selector-holder">
                    <h3>Grade</h3>
                    <select name="grade" onChange={submitData}>
                        <option>Select</option>
                        {getGrade.map((data) => (
                            <option value={data.id}>{data.name}</option>
                        ))}
                    </select>

                    <h3>Subject</h3>
                    <select name="subject" onChange={submitData}>
                        <option>Select</option>
                        {getSubject.map((data) => (
                            <option value={data.id}>{data.name}</option>
                        ))}
                    </select>

                    <button onClick={searchClass}>Search Class</button>

                </div>


                <div className="searched-classes">

                    <div className="class-list-item">
                        <h4>Grade 10 || Mathematics || Theory</h4>
                        <h4>Praveen Fernando</h4>
                        <p>Sinhala Medium</p>
                        <p>Saturday</p>
                        <p>10.30 AM - 12.00 PM</p>

                        <button>Assign</button>

                    </div>

                    

                </div>


            </div>




        </div>
    )
}