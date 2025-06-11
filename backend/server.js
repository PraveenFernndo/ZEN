const express = require('express');
const cors = require('cors');
const path = require('path');
const addStudent = require('./AddStudent.js');
const db = require('./Connection.js');
const addClass = require("./AddClass.js");
const { SearchClasses } = require('./SearchClasses.js');
const e = require('express');


const app = express();
app.use(cors());
app.use('/qrCodes', express.static(path.join(__dirname, 'qrCodes')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//add student

app.post('/addStudent', async (req, res) => {

    const requestData = await req.body;

    var message = "Success";

    const [qrPath, newUserId] = await addStudent.AddStudent(requestData.name, requestData.school, requestData.dob, requestData.address, requestData.mobile, requestData.grade);

    if (qrPath == "Error") {
        message = "Error";
    }
    if (qrPath == "UserAlreadyExist") {
        message = "UserAlreadyExist";
    }

    res.send({
        qrPath: "http://localhost:5000/qrCodes/" + qrPath + ".png",
        message: message,
        newUserId: newUserId
    })


});

// search Classes for assign students
app.post("/searchClasses", async (req, resp) => {

    const response = await SearchClasses(req.body.grade, req.body.subject)

    resp.send({
        response: response
    })

})

// add new class

app.post('/addClass', async (req, resp) => {


    const requestData = await req.body;

    const result = await addClass.AddClass(requestData);

    resp.send({
        status: result
    })

});


// fetch student data

app.get('/getStudentData', async (req, res) => {

    db.query("select * from student inner join student_has_class on student.id=student_has_class.student_id", (err, result) => {
        if (err) {
            console.log("Error fetching data from database");
            return;
        }
        res.send(result);
    });


});

// fetch grade table data

app.get('/loadGrades', async (req, resp) => {
    db.query("select * from grade", (err, result) => {

        if (err) {
            console.log("Error fetching data from database");
            return;
        }

        resp.send(result)
    })
});

// fetch class type table data

app.get('/loadClassType', async (req, resp) => {
    db.query("select * from class_type", (err, result) => {

        if (err) {
            console.log("Error fetching data from database");
            return;
        }

        resp.send(result)
    })
});


// fetch subject table data

app.get('/loadSubject', async (req, resp) => {
    db.query("select * from subject", (err, result) => {

        if (err) {
            console.log("Error fetching data from database");
            return;
        }

        resp.send(result)
    })
});


// fetch teacher table data

app.get('/loadTeacher', async (req, resp) => {
    db.query("select * from teacher", (err, result) => {

        if (err) {
            console.log("Error fetching data from database");
            return;
        }

        resp.send(result)
    })
});


// fetch days table data

app.get('/loadDay', async (req, resp) => {
    db.query("select * from days", (err, result) => {

        if (err) {
            console.log("Error fetching data from database");
            return;
        }

        resp.send(result)
    })
});

// fetch medium table data

app.get('/loadMedium', async (req, resp) => {
    db.query("select * from medium", (err, result) => {

        if (err) {
            console.log("Error fetching data from database");
            return;
        }

        resp.send(result)
    })
});

// schedule Class

app.post('/scheduleClass', async (req, res) => {

    const request = await req.body;

    const date = new Date();
    const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const r =await db.promise().query("select * from schedule_class where class_id=? and time_start=? and date=?", [request.classId, request.time_start, today]);

        console.log(r.length);
        if (r.length > 0) {

            res.send({ message: "Class already scheduled for this time" });

        } else {

            db.query("insert into schedule_class (class_id,date,time_start,time_finished) values (?,?,?,?)", [request.classId, today, request.time_start, request.time_end], (err, result) => {
                if (err) {
                    console.log("Error scheduling class");
                    console.log(err)
                    return res.send({ message: "Error scheduling class" });
                }
                res.send({ message: "Class scheduled successfully" });
            });
        }
});


// attendance marking
app.post('/markAttendance', async (req, res) => {

    const requestData = await req.body;

});


// upcomming classes list
app.get('/upcomingClasses', async (req, res) => {

    const date = new Date().getDate();

    db.query("SELECT class.id as id,teacher.name AS teacher_name, grade.name AS grade, class_type.name AS class_type, subject.name AS subject, medium.name AS medium, class.time_start, class.time_end FROM class INNER JOIN teacher ON teacher.id = class.teacher_id INNER JOIN grade ON grade.id = class.grade_id INNER JOIN class_type ON class_type.id = class.class_type_id INNER JOIN medium ON medium.id = class.medium_id INNER JOIN subject ON subject.id = class.subject_id WHERE class.day_id = 1 ORDER BY class.time_start ASC;", [date], (err, result) => {
        if (err) {
            console.log("Error fetching data from database");
            return;
        }
        res.send(result);
        console.log(result);
    });
});




app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
