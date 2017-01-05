(function(){

	let _files = {},
			_sizes = [],
			_ext = ['jpg','jpeg','gif','png','ico','dwg','bmp'];

	function Upload(el,options){
		that = this;
		that.el = el;
		let opts = arguments[1] ? options : {multiple:false,max:1,size:'1MB'};
		that.multiple = opts.multiple ? opts.multiple : false;
		that.max = opts.max ? opts.max : 1;
		that.size = opts.size ? opts.size : '1MB';
		that._createFileInput();
		that._addListener(el);
		this.getFiles = function(){
			return _files;
		};
		this.getSizes = function(){
			return _sizes;
		}
		this.clearFiles = function(){
			_files = {};
			_sizes = [];
			let aImg = document.getElementsByClassName('upload-img'),
					j = aImg.length;
			for(let i=0;i<j;i++){
				aImg[0].parentNode.removeChild(aImg[0]);
			}
			return _files;
		}
	}

	Upload.prototype._createFileInput = function(){
		let oInput = document.createElement('input');
		oInput.id = 'file_btn';
		oInput.type = 'file';
		oInput.multiple = that.multiple || false;
		that.el.parentNode.appendChild(oInput);
		that._oInput = oInput;
	}

	Upload.prototype._addListener = function(el){
		let count = 0;   //计数器，记录当前图片数量
		let handler = {
			change:function(){
				let files = that._oInput.files;
				if(count+files.length>that.max){
					alert('一次只能上传'+that.max+'张图片哦~');
				}else{
					for(let i=0;i<files.length;i++){
						let name = files[i].name,
								index = name.indexOf('.'),
								ext = name.substring(index+1);
						if(_ext.indexOf(ext) === -1){
							alert('请使用正确的图片格式');
							return;
						}

						if(files[i].size>getBytes(that.size)){
							alert('上传的图片大小不能超过'+that.size+'哦~');
							return;
						}

						let FR = new FileReader();
						FR.readAsDataURL(files[i]);
						_files['inp_img'+count] = files[i];
						count++;
						
						FR.onload = function(e){
							let oImg = document.createElement('img');
							oImg.className = 'upload-img';
							oImg.src = e.target.result;
							_sizes.push(getSize(e.total));
							that.el.appendChild(oImg);
						}
					}
				}
			},
			dragenter:function(e){
				e.target.classList.add('active');
				
				stopPropagation(e);
				preventDefault(e);
			},
			dragover:function(e){
				stopPropagation(e);
				preventDefault(e);
			},
			dragleave:function(e){
				e.target.classList.remove('active');

				stopPropagation(e);
				preventDefault(e);
			},
			drop:function(e){
				stopPropagation(e);
				preventDefault(e);
				e.target.classList.remove('active');

				let files = e.dataTransfer.files;
				if(count+files.length>that.max){
					alert('一次只能上传'+that.max+'张图片哦~');
				}else{
					for(let i=0;i<files.length;i++){
						let name = files[i].name,
								index = name.indexOf('.'),
								ext = name.substring(index+1);
						if(_ext.indexOf(ext) === -1){
							alert('请使用正确的图片格式');
							return;
						}

						if(files[i].size>getBytes(that.size)){
							alert('上传的图片大小不能超过'+that.size+'哦~');
							return;
						}

						let FR = new FileReader();
						FR.readAsDataURL(files[i]);
						_files['drop_img'+count] = files[i];
						count++;

						FR.onload = function(e){
							let oImg = document.createElement('img');
							oImg.className = 'upload-img';
							oImg.src = e.target.result;
							_sizes.push(getSize(e.total));
							that.el.appendChild(oImg);
						}
					}
				}	
			}
		};

		let listeners = [{
			target:that._oInput,
			type:'change',
			listener:handler.change
		},
		{
			target:that.el,
			type:'dragenter',
			listener:handler.dragenter
		},
		{
			target:that.el,
			type:'dragover',
			listener:handler.dragover
		},
		{
			target:that.el,
			type:'dragleave',
			listener:handler.dragleave
		},
		{
			target:that.el,
			type:'drop',
			listener:handler.drop
		}];

		addListener(listeners);



		function addListener(listeners){
			if(listeners.length){
				let j = listeners.length;
				for(let i=0;i<j;i++){
					let obj = listeners[i],
							target = obj.target || null,
							type = obj.type || null,
							listener = obj.listener || null,
							options = obj.options || null;

					target.addEventListener(type,listener,options);
				}
			}
		}
		function getSize(bytes) {
			if (bytes === 0) return '0 B';  
			let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
					i = Math.floor(Math.log(bytes) / Math.log(1024)),
					size;
			size = (bytes / Math.pow(1024, i)).toPrecision(3) + ' ' + sizes[i];
			return size;
		}
		function getBytes(size){
			if (size === 0) return '0 B';
			let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
					i,
					j = size.replace(/\d/g,''),
					bytes;
			if(sizes.indexOf(j) !== -1){
				i = sizes.indexOf(j);
			}else{
				throw new Error('Oops,Please use the correct storage unit!')
			}
			bytes = parseInt(size) * Math.pow(1024, i);
			return bytes;
		}
		function stopPropagation(e){
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble = true;
			}
		}
		function preventDefault(e){
			e = e || window.event;
			if(e.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue = false;
			}
		}
	}

	window.Upload = Upload;
})();
