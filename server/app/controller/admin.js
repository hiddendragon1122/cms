'use strict'

const Controller = require('egg').Controller
class AdminController extends Controller {
    async index(){

    }

    async login(){
        try {
            const body = await this.ctx.request.body
            const token = await this.ctx.service.User.adminLogin(body.username,body.password)
            if(token){
                this.ctx.body = {
                    code:20000,
                    message:true,
                    token:token
                }
            }else{
                this.ctx.body = {
                    code: 40000,
                    message:false
                }
            }
        } catch (error) {
            this.ctx.body = {
                code:40000,
                message:false
            }
        }
    }
}

module.exports = AdminController;