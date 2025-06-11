import "./style.css";
import { useState } from 'react';
import img1 from './images/sea.jpg'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from "react-router-dom";




export function AddStudent() {

    const navigate = useNavigate();

    var newUserId;

    const [getFormData, setFormData] = useState({ name: "", school: "", dob: "", address: "", mobile: "", grade: "" });

    const assignClassesForStudent = () => {
        navigate("/assignClasses",{
            state:{
                id:newUserId
            }
        } );
    }


    function setData(e) {
        setFormData({ ...getFormData, [e.target.name]: e.target.value });
    }

    async function submitData(e) {
        e.preventDefault();

        const request = await fetch("http://localhost:5000/addStudent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(getFormData)
        });


        const response = await request.json();

        newUserId=response.newUserId;

        if (response.message === "Error") {

            const errorMessage = <h3 style={{ color: "red" }}>Please Fill All the Details</h3>
            ReactDOM.createRoot(document.getElementById("qrHolder")).render(errorMessage);

        } else if (response.message === "UserAlreadyExist") {

            const errorMessage = <h3 style={{ color: "red" }}>This Student Already Exist</h3>
            ReactDOM.createRoot(document.getElementById("qrHolder")).render(errorMessage);

        } else {

            const image = <img src={response.qrPath} alt="Grab the QR Code" className="QrImage" />;

            ReactDOM.createRoot(document.getElementById("qrHolder")).render(
                <div className="qrHolder">
                    {/* {image} */}
                    <br />
                    <a className="downloadQR" href={response.qrPath} download="Qr.png">
                        <button className="downloadQR">Download QR Code</button>
                    </a>

                    <br />
                    <button className="assignClasses" onClick={assignClassesForStudent}>Assign Classes</button>

                </div>

            );
        }


    }

    return (
        <div className="add-student">
            <h1>Add Student</h1>

            <form className="add-student-form">
                <p>Name</p>
                <input type="text" name="name" onChange={setData} placeholder="Enter Name" />
                <p>School</p>
                <input type="text" name="school" onChange={setData} placeholder="Enter School" />
                <p>Date Of Birth</p>
                <input type="date" name="dob" onChange={setData} placeholder="Enter Date Of Birth" />
                <p>Address</p>
                <input type="text" name="address" onChange={setData} placeholder="Enter Address" />
                <p>WhatsApp Number</p>
                <input type="text" name="mobile" onChange={setData} placeholder="WhatsApp Number" />

                <p>Select Grade</p>
                <select name="grade" id="grade" onChange={setData}>
                    <option>Select</option>
                    <option>Grade 06 </option>
                    <option>Grade 07 </option>
                    <option>Grade 08 </option>
                    <option>Grade 09 </option>
                    <option>Grade 10 </option>
                    <option>Grade 11 </option>
                    <option>Grade 12 </option>
                    <option>Grade 13 </option>
                </select>

                <input type="submit" value="Submit" onClick={submitData} />

            </form>


            <div id="qrHolder">
            </div>




        </div>



    );
}