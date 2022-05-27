<template>
    <div>
        <el-button type="btn" @click="cheateChapter">添加章</el-button>
        <el-table :data="chapterList" border>
            <el-table-column align="center" width="100" label="序號" type="index"></el-table-column>
            <el-table-column prop="title" label="章標題"></el-table-column>
            <el-table-column label="詳情" width="100">
                <template slot-scope="scope">
                    <el-button @click="getDetail(scope.row.id)" type="text" size="small">查看小節</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="updateChapter(scope.row.id,scope.row.title,scope.row.orderby)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteChapter(scope.row.id)" type="text" size="small">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加" :visible.sync="dialogVisible" width="30%">
            <el-form>
                <el-form-item label="標題">
                    <el-input v-model="title"></el-input>
                </el-form-item><el-form-item label="權重">
                    <el-input v-model="orderby"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from "../utils/request"
export default {
    methods: {
        getDetail(id){
            this.$router.push(`/section?chapter_id=${id}`)
        },
        save() {
            if(this.isEdit){
                request
                .put(`/chapter/${this.updateId}`, {title:this.title,book_id:this.book_id,orderby:this.orderby})
                .then(() => {
                    this.getChapterList();
                    this.dialogVisible = false;
                });
            }else{
                request
                .post(`/chapter`, {title:this.title,book_id:this.book_id,orderby:this.orderby})
                .then(() => {
                    this.getChapterList();
                    this.dialogVisible = false;
                });
            }
            
        },
        cheateChapter(){
            this.dialogVisible = true;
            this.title = "";
            this.isEdit = false;
            this.orderby = ""
        },
        deleteChapter(id) {
            this.$confirm("此操作將永遠刪除該文件, 是否繼續?", "提示", {
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    request
                        .delete(`/chapter/${id}`)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "刪除成功!"
                            });
                            this.getChapterList();
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消刪除"
                    });
                });
        },
        updateChapter(id,title,orderby){
            this.dialogVisible = true;
            this.title = title;
            this.isEdit = true;
            this.updateId = id;
            this.orderby = orderby;
        },
        getChapterList() {
            // let id = this.$route.params.id;
            request
                .get(`/chapter?book_id=${this.book_id}`)
                .then(res => {
                    this.chapterList = res.data.data;
                });
        },
    },

    data() {
        return {
            chapterList: [],
            dialogVisible: false,
            title:"",
            isEdit:false,
            updateId:0,
            orderby:"",
        };
    },
    computed:{
        book_id(){
            return this.$route.query.book_id;
        }
    },
    created() {
        
        this.getChapterList();
    }
};
</script>

