# Upload-Image
Upload Image Plugin by Javascript</br>可预览图片、多张上传、拖拽上传
### 立即使用
```html
<body>
	<form action="#">
		<div id="box"></div>
	</form>
	<script type="text/javascript" src="./upload_image.js"></script>
	<script type="text/javascript">
		let upload = new Upload(document.getElementById('box'));
	</script>
</body>
```
### options参数
Example:
```javascript
let upload = new Upload(document.getElementById('box'),{
  multiple : true,
  max : 3
});
```
Options List:
- multiple：`false` 是否使用多图模式（与max项配合使用）
- max：`1` 最大图片张数
- size：`"1MB"` 每张图片限制大小

### 方法
```javascript
let oFiles = upload.getFiles();
let aSizes = upload.getSizes();
```
Method List:
- `getFiles`：获取文件列表对象，里面包含了所有显示的图片，可用于构建FormData</br>
- `clearFiles`：清空文件列表对象，并清除所有显示的图片</br>
- `getSizes`：获取保存图片大小的数组
- `getExtensions`：获取拓展名数组（当前`['jpg','jpeg','gif','png','ico','dwg','bmp']`）
- `addExtensions`：添加拓展名数组，以['abc']形式添加图片文件的拓展名，所有拓展名会转换为小写

### 其他
- 初始化Upload时，会自动创建一个id为`file_btn`的file按钮，如果你不希望看到这个丑丑的按钮，你可以将`file_btn`的`display`设为`none`，并设置box的onclick事件，在该事件中模拟点击按钮
```javascript
document.getElementById('box').onclick = function(){
  document.getElementById('file_btn').click();
}
```
- 如果你希望在拖拽图片进入box的时候让它有一些高亮效果，可以设置box的`.active`的样式，这个classname是动态的，在拖拽进入box时被添加，离开box时被移除
- 每张预览的图片都有一个classname，为`upload-img`
