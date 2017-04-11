//轮播图
/*
 *	调用插件参数:
 * fl:#fl  	button左按钮
 * fr:#fr  button右按钮
 * */

var myplay = function(box, fl, fr, page) {
	this.myBox = box; //#mybox  页面大盒子元素
	this.myPage = page; //#aa	图片上方小按钮
	this.myBox.style.overflow = "hidden";
	this.myUl = this.myBox.getElementsByTagName("ul")[0]; //获取图片外层盒子ul
	this.myLi = this.myUl.getElementsByTagName("li"); //获取图片父级li
	var str = ""; //全局变量，用于动态生成页面小按钮元素
	var num = 0; //下标初始值
	var my = this; //将myplay对象指针指向my
	var myWidth = this.myBox.offsetWidth; //mybox的宽度，包括边框线的宽度
	this.imgLeth = this.myLi.length; //img的宽=父级li的宽，简写

	//循环添加分页按钮
	if(this.myPage) {
		for(var i = 0; i < this.myLi.length; i++) {
			str += "<span></span>";
		}
		this.myPage.innerHTML = str;
		this.mySpan = this.myPage.getElementsByTagName("span");
		this.mySpan[0].className = "index"; //按钮的颜色
		this.myPage.style.marginLeft = -this.myPage.offsetWidth / 2 + "px"; //按钮的位置
		for(var n = 0; n < my.imgLeth; n++) {
			this.mySpan[n].index = n;
			//小按钮点击
			this.mySpan[n].onclick = function() {
				for(var j = 0; j < my.imgLeth; j++) {
					my.mySpan[j].className = "";
				}
				num = this.index; //将下标值指向当前点击按钮下标
				my.mySpan[num].className = "index"; //当前点击按钮添加一个样式
				my.myUl.style.marginLeft = -num * myWidth + "px"; //点击第几个按钮就显示哪张图片
			}
		}
	}

	var oLi = this.myLi[0].cloneNode(true); //cloneNode()创建节点的拷贝，并返回该副本,true克隆所有后,否则设置为 false
	this.myUl.appendChild(oLi); //appendChild向节点添加最后一个子节点,复制第一张图片dom节点
	this.myUl.style.width = this.myLi.length * myWidth + "px"; //获取此时ul的宽度
	for(var li = 0; li < oLi.length; li++) {
		this.myLi[li].style.float = "left"; //为新的li重新设置样式
	}

	//执行动画
	function doTime(n) {
		
		/*if(my.mySpan) {
			for(var j = 0; j < my.imgLeth; j++) {
				my.mySpan[j].className = "";
			}
		}*/

		if(num > my.imgLeth) {
			num = 1;
			my.myUl.style.marginLeft = 0;
		}
		if(num < 0) {
			num = my.imgLeth - 1;
			my.myUl.style.marginLeft = -my.imgLeth * myWidth + "px";
		}
		starts(n);
		//清除当前执行动画所有mySpan的className,给当前的添加按钮样式
		if(my.mySpan) {
			for(var j = 0; j < my.imgLeth; j++) {
				my.mySpan[j].className = "";
			}
			if(num == my.imgLeth) {
				my.mySpan[0].className = "index";
			} else {
				my.mySpan[num].className = "index";
			}
		};
		/*if(my.mySpan) {
			if(num == my.imgLeth) {
				my.mySpan[0].className = "index";
			} else {
				my.mySpan[num].className = "index";
			}
		}*/

	}

	function flBtn() {
		clearInterval(timer1);
		my.myUl.style.marginLeft = -num * myWidth + "px";
		num++;
		doTime(10);
	}

	//判断是否传了fl、fr参数，如果没传就不添加点击事件
	if(fl) {
		fl.style.display = 'block';
		this.flBton = fl;
		this.flBton.onclick = function() {
			flBtn();
		};
	}
	if(fr) {
		fr.style.display = 'block';
		this.frBtn = fr;
		this.frBtn.onclick = function() {
			clearInterval(timer1);
			my.myUl.style.marginLeft = -num * myWidth + "px";
			num--;
			doTime(-10);
		};
	}
	//创建定时器
	var timer1 = null;
	//n:图片滚动速度值
	function starts(n) {
		timer1 = setInterval(function() {
			my.myUl.style.marginLeft = (my.myUl.offsetLeft - n) + "px";
			if(my.myUl.offsetLeft == -num * myWidth) {
				clearInterval(timer1);
			}
		}, 10);
	}
	var timer = setInterval(flBtn, 2000);
	this.myBox.onmouseover = function() {
		clearInterval(timer);
	};
	this.myBox.onmouseout = function() {
		timer = setInterval(flBtn, 2000);
	}
}