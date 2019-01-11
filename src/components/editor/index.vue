<template>
	<el-form-item label="内容" prop="content">
		<el-upload
		class="avatar-uploader-editor"
		:action="action"
		:show-file-list="false"
		:before-upload="beforeUpload"
		:on-error="uploadError"
		:on-success="uploadSuccess">
		</el-upload>
		<!--富文本编辑器组件-->
		<el-row v-loading="quillloading">
			<quill-editor
			v-model="content"
			ref="quillEditor"
			:options="editorOption">
			</quill-editor>
		</el-row>
	</el-form-item>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
// 工具栏配置
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'] // remove formatting button
];
export default {
	name: 'editor',
	components: {
		quillEditor
	},
	props: {
		value: {
			type: String
		},
		action: {
			type: String
		}
	},
	watch: {
		content(val) {
			this.$emit('input', val);
		},
		value(val) {
			this.content = val;
		}
	},
    data() {
        return {
			content: '',
			quillloading: false,
			//文本编辑器选项
			editorOption: {
					placeholder: '',
					theme: 'snow', // or 'bubble'
					modules: {
							toolbar: {
									container: toolbarOptions, // 工具栏
									handlers: {
											image: function(value) {
													//debugger;
													if (value) {
															document.querySelector('.avatar-uploader-editor input').click();
													} else {
															this.quill.format('image', false);
													}
											}
									}
							}
					}
			}
		};
    },
	methods: {
		//文本编辑器上传成功回调
		// 上传图片前
		beforeUpload(res, file) {
			debugger;
			// 显示loading动画
			this.quillloading = true;
		},
		uploadSuccess(res, file) {
			//debugger;
			// res为图片服务器返回的数据
			// 获取富文本组件实例
			let quill = this.$refs.quillEditor.quill;
			// 如果上传成功
			if (res.code === 0) {
				// 获取光标所在位置
				let length = quill.getSelection().index;
				// 插入图片  res.info为服务器返回的图片地址
				quill.insertEmbed(length, 'image', res.img);
				// 调整光标到最后
				quill.setSelection(length + 1);
			} else {
				this.$message.error('图片插入失败');
			}
			// loading动画消失
			this.quillloading = false;
		},

		// 富文本图片上传失败
		uploadError() {
			// loading动画消失
			this.quillloading = false;
			this.$message.error('图片插入失败');
		}
	}
};
</script>

<style>
</style>
