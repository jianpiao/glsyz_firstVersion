(function ($) {
    $.init();
    $.plusReady(function () {
        //更新用户头像，主要是裁剪页面裁剪完后触发的
        plus.nativeUI.closeWaiting()
        //初始化头像，和预览图
        setTimeout(function () {
            //赋值一个默认的头像
            document.getElementById("head-img1").src = "../img/b1.jpg";
            setTimeout(function () {
                initImgPreview();
            }, 200);
        }, 0);

        //弹出菜单
        mui(".mui-table-view-cell").on("tap", "#head", function (e) {
            if (mui.os.plus) {
                var a = [{
                    title: "拍照"
                }, {
                    title: "从手机相册选择"
                }];
                plus.nativeUI.actionSheet({
                    title: "修改头像",
                    cancel: "取消",
                    buttons: a
                }, function (b) {
                    switch (b.index) {
                        case 0:
                            break;
                        case 1:
                            getImage();
                            break;
                        case 2:
                            galleryImg();
                            break;
                        default:
                            break
                    }
                })
            }

        });
    });

    //拍照
    function getImage() {
        var c = plus.camera.getCamera();
        c.captureImage(function (e) {
            //存储到本地
            plus.io.resolveLocalFileSystemURL(e, function (entry) {
                cutImage(entry.toLocalURL());//裁剪图片，传入绝对地址
            }, function (e) {
                console.log("读取拍照文件错误：" + e.message);
            });
        }, function (s) {
            console.log("error" + s);
        }, {
                filename: "_doc/head.jpg"
            })
    }

    //相册
    function galleryImg() {
        plus.gallery.pick(function (a) {
            plus.io.resolveLocalFileSystemURL(a, function (entry) { 　　　　　　//entry为图片原目录（相册）流
                cutImage(entry.toLocalURL());
            }, function (e) {
                console.log("读取图片错误：" + e.message);
            });
        }, function (a) { }, {
                filter: "image"
            })
    };


    //预览图像
    document.getElementById("head-img1").addEventListener('tap', function (e) {
        e.stopPropagation(); //阻止冒泡
    });

    function initImgPreview() {
        var imgs = document.querySelectorAll("img.mui-action-preview");
        imgs = mui.slice.call(imgs);
        if (imgs && imgs.length > 0) {
            var slider = document.createElement("div");
            slider.setAttribute("id", "__mui-imageview__");
            slider.classList.add("mui-slider");
            slider.classList.add("mui-fullscreen");
            slider.style.display = "none";
            slider.addEventListener("tap", function () {
                slider.style.display = "none";
            });
            slider.addEventListener("touchmove", function (event) {
                event.preventDefault();
            })
            var slider_group = document.createElement("div");
            slider_group.setAttribute("id", "__mui-imageview__group");
            slider_group.classList.add("mui-slider-group");
            imgs.forEach(function (value, index, array) {
                //给图片添加点击事件，触发预览显示；
                value.addEventListener('tap', function () {
                    slider.style.display = "block";
                    _slider.refresh();
                    _slider.gotoItem(index, 0);
                })
                var item = document.createElement("div");
                item.classList.add("mui-slider-item");
                var a = document.createElement("a");
                var img = document.createElement("img");
                img.setAttribute("src", value.src);
                a.appendChild(img)
                item.appendChild(a);
                slider_group.appendChild(item);
            });
            slider.appendChild(slider_group);
            document.body.appendChild(slider);
            var _slider = mui(slider).slider();
        }
    }

    //裁剪图片
    function cutImage(path) {
        $.openWindow({
            url: 'cropper.html',
            id: 'cropper',
            extras: {
                path: path,
            },
            show: {
                aniShow: 'zoom-fade-in',
                duration: 800
            },
            waiting: {
                autoShow: true
            }
        });
    }

    //添加updateHeadImg自定义事件监听
    window.addEventListener('updateHeadImg', function (event) {
        //获得事件参数
        var my_icon = event.detail.img_path;
        //根据id向服务器请求新闻详情
        if (my_icon != "") {
            document.getElementById("head-img1").src = my_icon
            document.querySelector("#__mui-imageview__group .mui-slider-item img").src = my_icon;
        }
    });

})(mui);