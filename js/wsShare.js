var wsShare = {
    wxconfig:function(wxconfig,wxRegister){
        wx.config({
            debug: false,
            appId: 'Id',//公众号APPID
            timestamp: wxconfig.timestamp,
            nonceStr: wxconfig.noncestr,
            signature: wxconfig.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'getNetworkType'
            ] 
        });
        wx.ready(function(){            
            // 2. 分享接口
            // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareAppMessage({
                title: wxRegister.title,
                desc: wxRegister.desc,
                link: wxRegister.link,
                imgUrl: wxRegister.imgUrl,
                trigger: function (res) {
                    console.log('用户点击发送给朋友');
                },
                success: function (res) {
                    console.log('已分享');
                },
                cancel: function (res) {
                    console.log('已取消');
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                }
            });
            
            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareTimeline({
                title: wxRegister.title,
                link: wxRegister.link,
                imgUrl: wxRegister.imgUrl,
                trigger: function (res) {
                    console.log('用户点击分享到朋友圈');
                },
                success: function (res) {
                    console.log('已分享');
                },
                cancel: function (res) {
                    console.log('已取消');
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                }
            });
            
            // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareQQ({
                title: wxRegister.title,
                desc: wxRegister.desc,
                link: wxRegister.link,
                imgUrl: wxRegister.imgUrl,
                trigger: function (res) {
                    console.log('用户点击分享到QQ');
                },
                complete: function (res) {
                    console.log(JSON.stringify(res));
                },
                success: function (res) {
                    console.log('已分享');
                },
                cancel: function (res) {
                    console.log('已取消');
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                }
            });
            
            // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareWeibo({
                title: wxRegister.title,
                desc: wxRegister.desc,
                link: wxRegister.link,
                imgUrl: wxRegister.imgUrl,
                trigger: function (res) {
                    console.log('用户点击分享到微博');
                },
                complete: function (res) {
                    console.log(JSON.stringify(res));
                },
                success: function (res) {
                    console.log('已分享');
                },
                cancel: function (res) {
                    console.log('已取消');
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                }
            });            
            // 6 设备信息接口
            // 6.1 获取当前网络状态
            wx.getNetworkType({
                success: function (res) {
                    console.log(res.networkType);
                },
                fail: function (res) {
                    alert("网络不给力!");
                    console.log(JSON.stringify(res));
                }
            });
        });             
        wx.error(function(res){
            // alert("请求失败!");
        });     
    },
    xmlHttp:null,
    loadXMLDoc:function(url,func){
        if(window.XMLHttpRequest){
            wsShare.xmlHttp = new XMLHttpRequest();
        }else{
            wsShare.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        wsShare.xmlHttp.open("GET",url,true);
        wsShare.xmlHttp.onreadystatechange = func;
        wsShare.xmlHttp.send();
    },
    register:function(wxRegister){
        wsShare.loadXMLDoc('url'+wxRegister.url,function(){//发送请求的URL
            if(wsShare.xmlHttp.readyState == 1){
                console.log("正在加载~");
            }else if(wsShare.xmlHttp.readyState == 2){
                console.log("加载完毕~");
            }else if(wsShare.xmlHttp.readyState == 3){
                console.log("正在处理~");
            }else if(wsShare.xmlHttp.readyState == 4 && wsShare.xmlHttp.status== 200){
                var data = {};
                data = JSON.parse(wsShare.xmlHttp.responseText);
                wsShare.wxconfig(data,wxRegister);
            }else{
                alert("请求失败!");
            }
        });
    }
}
