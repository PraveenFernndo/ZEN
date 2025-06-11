import db from "./Connection.js"

export async function SearchClasses(gradeId, subId) {

    if (gradeId !== "" && subId !== "") {

        const [r1]=await db.promise().query("select * from class where grade_id=? and subject_id=?",[gradeId,subId]);
    
        return r1;
       

    }
}