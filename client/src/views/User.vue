<template>
    <div class="user">
        <el-button type="btn" @click="createUser">添加用戶</el-button>
        <el-table :data="userList" border>
            <el-table-column align="center" width="100" label="序號" type="index"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="resetPassword(scope.row.id,scope.row.username)" type="text" size="small">重置密碼</el-button>
                    <el-button @click="deleteUser(scope.row.id)" type="text" size="small">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加" :visible.sync="dialogVisible" width="30%">
            <el-form>
                <el-form-item label="用戶名">
                    <el-input :disabled="cantBeEdited" v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="密碼">
                    <el-input type="password" v-model="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">確 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from "../utils/request";
export default {
    methods: {
        save() {
            if (this.isEdit) {
                request
                    .put(`/user/${this.updateId}`, {
                        password:this.password
                    })
                    .then(() => {
                        this.getUserList();
                        this.dialogVisible = false;
                    });
            } else {
                request
                    .post(`/user`, {
                        username: this.username,
                        password:this.password
                    })
                    .then(() => {
                        this.getUserList();
                        this.dialogVisible = false;
                    });
            }
        },
        createUser() {
            this.dialogVisible = true;
            this.username = "";
            this. password = "";
            this.isEdit = false;
            this.cantBeEdited = false;
        },
        deleteUser(id) {
            this.$confirm("此操作將永遠刪除該文件, 是否繼續?", "提示", {
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    request.delete(`/user/${id}`).then(() => {
                        this.$message({
                            type: "success",
                            message: "刪除成功!",
                        });
                        this.getUserList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消刪除",
                    });
                });
        },
        resetPassword(id,username) {
            this.dialogVisible = true;
            this.isEdit = true;
            this.updateId = id;
            this.cantBeEdited = true;
            this.username = username;
            this.password = "";
        },
        getUserList() {
            request.get(`/user?page=1&total=10`).then((res) => {
                this.userList = res.data.data;
            });
        },
    },

    data() {
        return {
            userList: [],
            password: "",
            dialogVisible: false,
            username: "",
            isEdit: false,
            updateId: 0,
            headers: {
                token: "",
            },
            cantBeEdited:false
        };
    },

    created() {
        this.getUserList();
    },
};
</script>

<style scoped>
.user .pic {
    width: 50px;
    height: 50px;
}
</style>

