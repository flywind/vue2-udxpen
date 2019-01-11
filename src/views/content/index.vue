<template>
	<el-card>
		<el-form :inline="true" :model="searchForm" ref="searchForm">
			<el-form-item prop="technologyType">
				<el-select v-model="searchForm.technologyType" placeholder="请选择"> 
					<el-option v-for="(item, index) in categorys" :key="index" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="title">
				<el-input v-model="searchForm.title" placeholder="标题"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" :disabled="loading.search" @click="search" v-waves>搜索</el-button>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" @click="resetSearchFrom('searchForm')" v-waves>重置</el-button>
			</el-form-item>
		</el-form>
		<div class="action">
			<el-button type="danger" icon="el-icon-delete" @click="delAll" :disabled="loading.delete" v-waves>批量删除</el-button>
			<span></span>
			<el-button type="success" icon="el-icon-plus" @click="createForm" v-waves>添加</el-button>
		</div>
		<el-table stripe v-loading="loading.grid" :data="tableData" border ref="multipleTable" @selection-change="handleSelectionChange" height="300">
			<el-table-column type="selection" width="35"></el-table-column>
			<el-table-column prop="id" label="编号" sortable width="80"></el-table-column>
			<el-table-column prop="title" label="标题"></el-table-column>
			<el-table-column prop="smallImgurl" width="120" label="缩略图">
				<template slot-scope="scope">
					<img v-if="scope.row.smallImgurl" :scr="scope.row.smallImgurl" class="f-img"/>
				</template>
			</el-table-column>
			<el-table-column prop="technologyType" width="180" label="分类" :formatter="formatter"></el-table-column>
            <el-table-column prop="isOpen" width="100" label="是否显示" 
            	:filters="[{text:'显示',value:true},{text:'隐藏',value:false}]"
            	:filter-method="filterOpen" 
            	filter-placement="bottom-end">
            	<template slot-scope="scope">
            		<el-tag :type="scope.row.isOpen === true ? 'success' : 'info'" disable-transitions>
            			{{scope.row.isOpen === true ? '显示' : '隐藏'}}
            		</el-tag>
            	</template>
            </el-table-column>
            <el-table-column prop="isHot" width="100" label="是否推荐" 
            	:filters="[{text:'推荐',value:true},{text:'不推荐',value:false}]"
            	:filter-method="filterHot" 
            	filter-placement="bottom-end">
            	<template slot-scope="scope">
            		<el-tag :type="scope.row.isHot === true ? 'success' : 'info'" disable-transitions>
            			{{scope.row.isHot === true ? '推荐' : '不推荐'}}
            		</el-tag>
            	</template>
            </el-table-column>
            <el-table-column prop="lastUpdateTime" width="160" sortable label="最后更新时间" :formatter="dateFormat"></el-table-column>
            <el-table-column label="操作" width="180" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
		</el-table>
		<div class="pagination">
            <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
      			layout="total, sizes, prev, pager, next, jumper"
            	:page-size="pageSize" 
            	:total="total"></el-pagination>
        </div>
        
        <!-- 编辑弹出框 -->
		<el-dialog :title="dialogTitle" :visible.sync="visible.formDialog" width="60%" :before-close="handleClose">
			<el-form ref="form" :model="form" label-width="150px">
				<el-form-item label="标题" prop="title" :rules="rules.title">
	                <el-input v-model="form.title" clearable></el-input>
	            </el-form-item>
	            <el-form-item label="分类" prop="technologyType" :rules="rules.technologyType">
	                <el-select v-model="form.technologyType" class="me-select" clearable placeholder="请选择">
	                	<el-option v-for="(item, index) in categorys" :key="index" :label="item.name" :value="item.id"></el-option>
	                </el-select>
	            </el-form-item>
	            <el-form-item label="缩列图" prop="smallImgurl">
	            	<el-upload
					  class="avatar-uploader"
					  action="/api/upload/img"
					  :multiple="false"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="form.smallImgurl" :src="form.smallImgurl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
	            </el-form-item>
							<editor action="/api/upload/img" v-model="form.content"/>
	            <el-form-item label="是否推荐" prop="isHot">
	            	<el-radio-group v-model="form.isHot">
	            		<el-radio :label="true">是</el-radio>
	            		<el-radio :label="false">否</el-radio>
	            	</el-radio-group>
	            </el-form-item>
	            <el-form-item label="是否显示" prop="isOpen">
	            	<el-switch v-model="form.isOpen"></el-switch>
	            </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleCancle('form')">取消</el-button>
				<!--<el-button @click="visible.formDialog = false">取消</el-button>-->
				<el-button type="primary" @click="saveCreate('form')" v-if="visible.add">确定</el-button>
				<el-button type="primary" @click="saveEdit('form')" v-if="visible.update">修改</el-button>
			</span>
		</el-dialog>
		
		<!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="visible.deleteAlert" width="500px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible.deleteAlert = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
		
	</el-card>
</template>

<script>


import { mapState, mapMutations, mapGetters } from 'vuex';
import editor from '@/components/editor'
import { getCategorys } from '@/api/category';
import { 
	getTechnologys, 
	createTechnology,
	deleteTechnology,
	updateTechnology
} from '@/api/technology';
export default {
		components: {
			editor
		},
    data() {
        return {
            tableData: [], //表格数据
            multipleSelection: [], //选择多条
            categorys: [], //分类集合
            categoryType: 1, //内容类型
            categoryName: '', //分类名称
            total: 0,
            pageNumber: 1, //当前页
            pageSize: 20,
            searchForm: {
                technologyType: '', //筛选
                title: '' //内容标题
            },
            form: {
                title: '',
                technologyType: '',
                content: '',
                isOpen: true,
                isHot: false,
                smallImgurl: ''
            },
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                technologyType: {
                    required: true,
                    message: '请选择分类',
                    trigger: 'blur'
                }
            },
            idx: -1,
            gridHeight: null,
            dialogTitle: '',
            row: {},
            loading: {
                grid: false,
                search: false,
                delete: false
            },
            visible: {
                formDialog: false,
                add: false,
                update: false,
                deleteAlert: false
            }, 
        };
    },
    created() {
        this.getCategoryList();
        let queryParams = {
            title: this.searchForm.title != '' ? this.searchForm.title : null,
            technologyType:
                this.searchForm.technologyType != '' ? this.searchForm.technologyType : null,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
        };
        this.getContentList(queryParams);
    },
    methods: {
        //获得内容分类
        getCategoryList() {
					getCategorys(this.categoryType, this.categoryName, 1, 20).then(res => {
						const data = res.data;
						if(data.code === 0) {
							this.categorys = data.list;
						}
					}).catch(err => {
						this.$message.error('获取数据失败');
					})
        },
        ////获得内容集合
        getContentList(p) {
					this.loading.grid = true;
					getTechnologys(p.title, p.technologyType, p.pageNumber, p.pageSize).then(res => {
						const data = res.data;
						if(data.code === 0) {
							this.tableData = data.list;
							this.total = data.rows;
							this.loading.grid = false;
							this.loading.search = false;
							this.loading.delete = false;
						}
					}).catch(err => {
						this.$message.error('获取数据失败');
					})
					
					
        },
        //格式化分类
        formatter(row, column) {
            const list = this.categorys;
            let type = '';
            //every: 碰到return false的时候，循环中止
            //some: 碰到return ture的时候，循环中止
            if (list.length > 0) {
                list.some(item => {
                    if (item.id === row.technologyType) {
                        type = item.name;
                        return true;
                    }
                });
            }
            return type;
        },
        //显示隐藏过滤
        filterOpen(val, row) {
            return row.isOpen === val;
        },
        //是否推荐过滤
        filterHot(val, row) {
            return row.isHot === val;
        },
        //格式化时间
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return '';
            }
            return this.$moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
        //批量删除
        delAll() {
            this.loading.delete = true;
            const length = this.multipleSelection.length;
            if (!length) {
                this.$message.warning('请选择至少一条记录');
                return;
            }
            let ids = [];
            for (let i = 0; i < length; i++) {
                ids.push(this.multipleSelection[i].id);
            }
						deleteTechnology(ids).then(res => {
							if(res.data.code === 0){
								this.multipleSelection = [];
								let queryParams = {
										title: this.searchForm.title != '' ? this.searchForm.title : null,
										technologyType:
												this.searchForm.technologyType != ''
														? this.searchForm.technologyType
														: null,
										pageNumber: this.pageNumber ? this.pageNumber : 1,
										pageSize: this.pageSize ? this.pageSize : 20
								};
								this.getContentList(queryParams);
								this.$message.success('删除成功了');
							}
						}).catch(err => {
							this.$message.error('删除失败了');
							this.multipleSelection = [];
							this.loading.delete = false;
							console.log(err);
						})
        },
        //搜索
        search() {
            this.loading.search = true;
            let queryParams = {
                title: this.searchForm.title != '' ? this.searchForm.title : null,
                technologyType:
                    this.searchForm.technologyType != '' ? this.searchForm.technologyType : null,
                pageNumber: this.pageNumber ? this.pageNumber : 1,
                pageSize: this.pageSize ? this.pageSize : 20
            };
            this.getContentList(queryParams);
        },
        //重置表单
        resetSearchFrom(formName) {
            this.$refs[formName].resetFields();
            let queryParams = {
                title: this.title != '' ? this.title : null,
                technologyType:
                    this.searchForm.technologyType != '' ? this.searchForm.technologyType : null,
                pageNumber: this.pageNumber ? this.pageNumber : 1,
                pageSize: this.pageSize ? this.pageSize : 20
            };
            this.getContentList(queryParams);
        },
        //恢复默认表单初始值
        resetFormDefault() {
            this.form = {
                title: '',
                technologyType: '',
                content: '',
                isOpen: true,
                isHot: false,
                smallImgurl: ''
            };
        },
        //添加表单
        createForm() {
            this.visible.formDialog = true;
            this.dialogTitle = '添加';
            this.visible.add = true;
            this.visible.update = false;
        },
        //选择
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //行编辑
        handleEdit(index, row) {
            const item = this.tableData[index];
            this.idx = index;
            this.form = {
                id: item.id,
                title: item.title,
                technologyType: item.technologyType,
                content: item.content,
                isOpen: item.isOpen,
                isHot: item.isHot,
                smallImgurl: item.smallImgurl,
                lastUpdateTime: item.lastUpdateTime
            };
            this.visible.formDialog = true;
            this.dialogTitle = '编辑';
            this.visible.add = true;
            this.visible.update = false;
        },
        //行删除
        handleDelete(index, row) {
            this.row = row;
            this.idx = index;
            this.visible.deleteAlert = true;
        },
        // 分页导航
        handleCurrentChange(val) {
            let queryParams = {
                title: this.title != '' ? this.title : null,
                technologyType:
                    this.searchForm.technologyType != '' ? this.searchForm.technologyType : null,
                pageNumber: val,
                pageSize: this.pageSize ? this.pageSize : 20
            };
            this.getContentList(queryParams);
        },
        handleSizeChange(val) {
            let queryParams = {
                title: this.title != '' ? this.title : null,
                technologyType:
                    this.searchForm.technologyType != '' ? this.searchForm.technologyType : null,
                pageNumber: this.pageNumber ? this.pageNumber : 1,
                pageSize: val
            };
            this.getContentList(queryParams);
            console.log(`每页 ${val} 条`);
        },
        //取消弹层清除数据
        handleCancle(formName) {
            this.visible.formDialog = false;
            this.$refs[formName].resetFields();
            this.$refs[formName].clearValidate();
            this.resetFormDefault();
        },
        //执行行删除
        deleteRow() {
					this.visible.deleteAlert = false;
					let ids = [];
					ids.push(this.row.id);
					deleteTechnology(ids).then(res => {
						if(res.data.code === 0){
							this.tableData.splice(this.idx, 1);
							this.$message.success('删除成功');
							this.idx = -1;
							this.row = {};
						}
					}).catch(err => {
						this.$message.error('删除失败');
						this.idx = -1;
						this.row = {};
					})
        },
        //保存编辑
        saveEdit(formName) {
            //this.$refs[formName].clearValidate();
            let _self = this;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.form.lastUpdateTime = new Date();
										updateTechnology(this.form).then(res => {
											if (res.data.code === 0) {
													this.$set(this.tableData, this.idx, this.form);
													this.$message.success('保存成功');
													this.visible.formDialog = false;
													this.resetFormDefault();
													this.idx = -1;
											}
										}).catch(err => {
											this.$message.error('保存失败');
											this.visible.formDialog = false;
											this.resetFormDefault();
											this.idx = -1;
										})
                } else {
                    console.log('Submit Error');
                    return false;
                }
            });

            //this.$set(this.tableData, this.idx, this.form);
            //this.$message.success(`修改第${this.idx + 1}行成功`);
        },
        //添加内容
        saveCreate(formName) {
            //this.$refs[formName].clearValidate();
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let username = this.name;
                    if (username) {
                        this.form.creater = username;
                        this.form.lastUpdatePerson = username;
                        this.form.lastUpdateTime = new Date();
                    }
										createTechnology(this.form).then(res => {
											if(res.data.code === 0){
												this.resetFormDefault();
												let queryParams = {
														title: this.title != '' ? this.title : null,
														technologyType:
																this.searchForm.technologyType != ''
																		? this.searchForm.technologyType
																		: null,
														pageNumber: this.pageNumber ? this.pageNumber : 1,
														pageSize: this.pageSize ? this.pageSize : 20
												};
												this.getContentList(queryParams);
												this.visible.formDialog = false;
											}
										}).catch(err => {
											this.$message.error('添加失败');
											this.visible.formDialog = false;
											console.log(error);
										})
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleAvatarSuccess(response, file, fileList) {
					if(response.code === 0){
						this.form.smallImgurl = response.img;
					}
        },
        //关闭弹层清除数据
        handleClose(done) {
            this.$refs.form.resetFields();
            this.$refs.form.clearValidate();
            this.resetFormDefault();
            done();
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const maxSize = file.size / 1024 / 1024 < 0.2;
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG、PNG格式!');
            }
            if (!maxSize) {
                this.$message.error('上传头像图片大小不能超过 200KB!');
            }
            return isJPG || (isPNG && maxSize);
        },
        //监听内容高度
//         getGridHeight() {
//             const _self = this;
//             _self.gridHeight = document.querySelector('.content').clientHeight - 240;
//             window.onresize = () => {
//                 _self.gridHeight = document.querySelector('.content').clientHeight - 240;
//             };
//         },
        
    },
    computed: {
        ...mapGetters(['name']),
        //			getImg() {
        //				return this.host + this.smallImgurl;
        //			}
    },
    mounted() {
        //this.getGridHeight();
        //this.$refs.form.resetFields();
    },
    watch: {
//         gridHeight(val) {
//             this.gridHeight = val;
//         }
    }
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
}
.f-img {
    width: 90px;
    height: 90px;
    float: left;
    background-color: #f2f2f2;
    overflow: hidden;
}
.me-select {
    width: 100%;
}
</style>
