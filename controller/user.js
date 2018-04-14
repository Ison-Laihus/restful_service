/**
 * Created by lyk on 2018/4/14 0014.
 */


const mysql = require('mysql');
const connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password:   '',
    database:   'test'
});

connection.connect();

module.exports = {
    'GET /user/structure': async (ctx, next) => {
        await  next();
        var res = "no result";
        await new Promise( (resolve, reject) => {
            connection.query('desc user', function (error, results, fields) {
                if (error) throw error;
                jsonObj = JSON.stringify(results);
                resolve(jsonObj);
            });
        }).then(function(result){
            // ctx.body = result;
            res = result;
        });
        ctx.body = res;
    },
    'GET /user/all': async (ctx, next) => {
        await next();
        var res = "no result";
        await new Promise( (resolve, reject) => {
            connection.query('select * from user order by id asc', function (error, results, fields) {
                if (error) throw error;
                jsonObj = JSON.stringify(results);
                resolve(jsonObj);
            });
        }).then(function(result){
            // ctx.body = result;
            res = result;
        });
        ctx.body = res;
    },
    'GET /user/maxid': async (ctx, next) => {
        await next();
        var res = "no result";
        await new Promise( (resolve, reject) => {
            connection.query('select * from user order by id desc limit 1', function (error, results, fields) {
                if (error) throw error;
                jsonObj = JSON.stringify(results[0]['id']);
                resolve(jsonObj);
            });
        }).then(function(result){
            // ctx.body = result;
            res = result;
        });
        ctx.body = res;
    },
    'GET /user/id/:id': async (ctx, next) => {
        var id = ctx.params.id;
        await next();
        var res = "no result";
        await new Promise((resolve, reject) => {
            connection.query('select * from user where id = ' + id, function (error, results, fields) {
                if (error) throw error;
                jsonObj = JSON.stringify(results);
                resolve(jsonObj);
            });
        }).then(function (result) {
            // ctx.body = result;
            res = result;
        });
        ctx.body = res;
    },
    'DELETE /user/id/:id': async (ctx, next) => {
        var id = ctx.params.id;
        await next();
        var res = "no result";
        await new Promise( (resolve, reject) => {
            connection.query('delete from user where id = '+id, function (error, results, fields) {
                if (error) throw error;
                resolve(results);
            });
        }).then(function(result){
            console.log(result.affectedRows);
            var obj = {};
            if ( result.affectedRows==1 ) {
                obj['success'] = true;
            } else {
                obj['success'] = false;
            }
            var jsonObj = JSON.stringify(obj);
            res = jsonObj;
        });
        ctx.body = res;
    },
    'POST /user': async (ctx, next) => {
        var name = ctx.request.body.name;
        var age = ctx.request.body.age;
        var sex = ctx.request.body.sex;
        await next();
        var res = "no result";
        var addSql = 'INSERT INTO user(id,name,age,sex) VALUES(0,?,?,?)';
        var addSqlParams = [name, age, sex];
        await new Promise( (resolve, reject) => {
            connection.query(addSql, addSqlParams, function (error, results, fields) {
                if (error) throw error;
                resolve(results);
            });
        }).then(function(result){
            console.log(result.affectedRows);
            var obj = {};
            if ( result.affectedRows==1 ) {
                obj['success'] = true;
                obj['id'] = result.insertId;
            } else {
                obj['success'] = false;
            }
            var jsonObj = JSON.stringify(obj);
            res = jsonObj;
        });
        ctx.body = res;
    },
    'PUT /user': async (ctx, next) => {
        await next();
        var id = ctx.request.body.id;
        var name = ctx.request.body.name;
        var age = ctx.request.body.age;
        var sex = ctx.request.body.sex;
        console.log(id);
        console.log(name);
        console.log(age);
        console.log(sex);
        var res = "no result";
        var addSql = 'UPDATE user SET name = ?, age = ?, sex = ? where id = ?';
        var addSqlParams = [name, age, sex, id];
        await new Promise( (resolve, reject) => {
            connection.query(addSql, addSqlParams, function (error, results, fields) {
                if (error) throw error;
                resolve(results);
            });
        }).then(function(result){
            console.log(result.affectedRows);
            var obj = {};
            if ( result.affectedRows==1 ) {
                obj['success'] = true;
            } else {
                obj['success'] = false;
            }
            var jsonObj = JSON.stringify(obj);
            res = jsonObj;
        });
        ctx.body = res;
    }
};