import db from "./Connection.js"

export async function AddClass(data) {

    var message;





    if (data.grade == "Select" || data.subject == "Select" || data.class_type == "Select" || data.teacher == "Select" || data.class_type == "Select" || data.day == "Select" || data.time_start == "" || data.time_end == "" || data.medium == "Select") {
        message = "Please Fill the required Details First"
    }

    else if (data.time_end < data.time_start) {
        message = "Please Check The Class Starting And Ending Time"
    }

    else {

        const [dataFetched] = await db.promise().query("select * from class where grade_id=? and class_type_id=? and subject_id=? and medium_id=? and teacher_id=? and day_id=? and time_start=? and time_end=?", [data.grade, data.class_type, data.subject, data.medium, data.teacher, data.day, data.time_start, data.time_end])

        console.log("working");
        console.log(dataFetched.length);


        if (dataFetched.length > 0) {
            message = "Class Already Exist";
        } else {



            db.query("insert into class (grade_id,class_type_id,subject_id,medium_id,teacher_id,day_id,time_start,time_end) values (?,?,?,?,?,?,?,?)", [data.grade, data.class_type, data.subject, data.medium, data.teacher, data.day, data.time_start, data.time_end]);

            message = "New Class Added Successfully"

        }

    }


    return message;

}
