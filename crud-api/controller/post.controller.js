var pool = require('../database/index');
var sql = require('mysql2');
const postController = {
    getAllStudents: async(req, res)=>{
        try {
            const [results, fields] = await pool.query("SELECT * FROM `student_master`");
            res.json({ body: results});
        } catch (error) {
            console.log(error);
        }
    },

    addStudent: async(req, res)=>{
        try {
            // console.log(req.body);
            const {roll_id, name, age, stream} = req.body;
            const sql = "insert into student_master (roll_id, name, age, stream) values (?,?,?,?) "
            const [results, fields] = await pool.query(sql, [roll_id, name, age, stream]);
            res.json({
                body: results,
            });
        } catch (error) {
            res.json({
                error: "error"
            });
            console.log(error);
        }
    },

    deleteStudent: async(req, res)=>{
        try {
            const {roll_id} = req.body;
            const [results, fields] = await pool.query("delete from student_master where roll_id = ?", [roll_id]);
            const isDeleted = (results.affectedRows >=1) ? true: false; 
            res.json({
                body: { "isDeleted": isDeleted }
            })
        } catch (error) {
            res.json({
                error: "error"
            });
            console.log(error);
        }
    },

    updateStudent: async(req, res)=>{
        try {
            const {name, age, stream, roll_id} = req.body;
            console.log(req);
            const sql = "update student_master set name = ?, age = ?, stream = ? where roll_id = ?"
            const [results, fields] = await pool.query(sql, [name, age, stream, roll_id]);
            res.json({
                body: results,
            });
        } catch (error) {
            res.json({
                body: "error"
            });
            console.log(error);
        }
    },
}

module.exports = postController;