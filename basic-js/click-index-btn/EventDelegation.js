        var btnss = btnWrapper.getElementsByTagName('button')
        
        btnWrapper.addEventListener("click",function(e) { 
            var e = e || window.event;
            var target = e.target || e.srcElement;
            var li = btns 
            for(var i in li){
                if(target === li[i] || target === btnss[i] ){
                   console.log(`当前时间 ${Date.now()}: debug 的数据是 i: `, i)
                }
              }
            })
