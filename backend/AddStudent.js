import { qrCode } from "./qrCodeGenerator.js";
import db from "./Connection.js";


var qrName = "UserAlreadyExist";
var gradeID;
var newUserId;

export async function AddStudent(name, school, dob, address, mobile, grade) {

    if (name == "" || school == "" || dob == "" || address == "" || mobile == "" || grade == "" || grade == "Select") {

        qrName = "Error";

    } else {

        const [gradeResult] = await db.promise().query("select id from grade where name=?", [grade]);

        gradeID = gradeResult[0].id;

        const [rows] = await db.promise().query("Select * from student where name = ? and school = ? and dob = ? and address = ? and mobile = ? and grade_id = ?", [name, school, dob, address, mobile, gradeID]);


        if (rows.length == 0) {
            qrName = Date.now() + name + "_" + grade;

            qrCode(qrName);

            db.query("Insert into student (name, school, dob, address, mobile, grade_id , qrPath,status_id) values (?, ?, ?, ?, ?, ?, ?,?)", [name, school, dob, address, mobile, gradeID, qrName, 1]);

            const [newuser]=await db.promise().query("Select id from student where name = ? and school = ? and dob = ? and address = ? and mobile = ? and grade_id = ?", [name, school, dob, address, mobile, gradeID]);

            newUserId=newuser[0].id;

        } if (rows.length > 0) {
            qrName = "UserAlreadyExist";
        }



    }


    return [qrName , newUserId];

}