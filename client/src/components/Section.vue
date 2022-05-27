<template>
    <div>
        <el-button type="btn" @click="createSection">添加小節</el-button>
        <el-table :data="chapterList" border>
            <el-table-column align="center" width="100" label="序號" type="index"></el-table-column>
            <el-table-column prop="title" label="節標題"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="updateSection(scope.row.id)" type="text" size="small">編輯</el-button>
                    <el-button @click="deleteSection(scope.row.id)" type="text" size="small">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import request from "../utils/request"
export default {
    methods: {
        createSection(){
            this.$router.push(`/createSection?chapter_id=${this.chapter_id}`);
        },
        updateSection(id){
            this.$router.push(`/section/${id}?chapter_id=${this.chapter_id}`);
        },
        deleteSection(id) {
            this.$confirm("此操作將永遠刪除該文件, 是否繼續?", "提示", {
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    request
                        .delete(`/section/${id}`)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: "刪除成功!"
                            });
                            this.gitSectionList();
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        
        gitSectionList() {
            request
                .get(`/section?chapter_id=${this.chapter_id}`)
                .then(res => {
                    this.chapterList = res.data.data;
                });
        },
    },

    data() {
        return {
            chapterList: [],
            title:"",
        };
    },
    computed:{
        chapter_id(){
            return this.$route.query.chapter_id;
        }
    },
    created() {
        
        this.gitSectionList();
    }
};
</script>

