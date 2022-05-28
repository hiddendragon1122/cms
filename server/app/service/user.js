'use strict'

const Service = require('egg').Service;
var md5 = require('md5-node')

class UserService extends Service {
    //createAC
    createUser(body){
        try {
            const body = {
                username: body.username,
                password: md5(body.password)
            }
            await this.app.model.User.createUser(body)
            return true
        } catch (error) {
            return false
        }
    }

    getUserList(){
        try {
            const userList = await this.app.model.User.findAll()
            return userList
        } catch (error) {
            console.log(error)
            return false
        }
    }

    deleteUser(id){
        try {
            await this.app.model.User.destory({
                where: id
            })
            return true
        } catch (error) {
            return false
        }
    }

    resetPassword(id,password){
        try {
            await this.app.model.User.update({
                password:md5(password)
            },{
                where: id
            })
            return true
        } catch (error) {
            return false
        }
    }

    adminLogin(username,password){
        try {
            let passwordMd5 = md5(password)
            const user = await this.app.model.User.findOne({
                where: {
                    username
                }
            })
            if(user){
                let usr = user.dataValues.username
                let pwd = user.dataValues.password
                if(username === usr && passwordMd5 === pwd){
                    let token = this.app.jwt.sign({
                        username:username
                    },this.app.config.jwt.secret);
                    return token
                }else{
                    return false;
                }
            }
        } catch (error) {
            return false;
        }
    }
}

module.exports = UserService;