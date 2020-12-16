define([],()=>{
    return {
        init:function(){
            const $username = $('#username');
            const $oForm =$('#registry'); 
            const $password = $('#password'); 
            const $email =$('#email'); 
            const aSpan = $('#registry span');

            var userflag = true;
            var passflag = true;
            var emailflag = true;
            $username.on('focus',function() {
                aSpan.eq(0).html('中英文均可，最长14个英文或7个汉字');
            });
    
            $username.on('blur', function() {
                if (this.value !== '') {
                    var strLen = this.value.replace(/[\u4e00-\u9fa5]/g, '**').length;
                    if (strLen > 0 && strLen <= 14) {
                        var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
                        if (reg.test(this.value)) {                  
                            $.ajax({
                                type: 'post',
                                url: 'http://10.31.161.52/the-north-face/php/loginregistry.php',
                                data: {
                                    xingming: $username.val()
                                }
                            }).done(function(data) { 
                                if (!data) { 
                                    aSpan.eq(0).css('color', 'green').html('√');
                                } else { 
                                    aSpan.eq(0).css('color', 'red').html('该用户名已存在');
                                }
                            });
                            userflag = true;
                        } else {
                            aSpan.eq(0).css('color', 'red').html('用户名格式有误');
                            userflag = false;
                        }
                    } else {
                        aSpan.eq(0).css('color', 'red').html('用户名长度有误');
                        userflag = false;
                    }
                }else {
                    aSpan.eq(0).css('color', 'red').html('用户名不能为空');
                    userflag = false;
                } 
            });
            
            $password.on('focus',function() {
                aSpan.eq(1).html('请输入密码,长度为8-14个字符') ;
            });

            $password.on('input',function() {
                if (this.value.length >= 8 && this.value.length <= 14) { //满足长度
                    var regnum = /\d+/;
                    var reguppercase = /[A-Z]+/;
                    var reglowercase = /[a-z]+/;
                    var other = /[\W_]+/; //特殊字符%&^$#@!*
                    var count = 0; //字符种类的统计结果。
                    if (regnum.test(this.value)) { //值存在数字
                        count++;
                    }
                    if (reguppercase.test(this.value)) {
                        count++;
                    }
                    if (reglowercase.test(this.value)) {
                        count++;
                    }
                    if (other.test(this.value)) {
                        count++;
                    }
                    switch (count) {
                        case 1:
                            aSpan.eq(1).css('color', 'red').html('弱');
                            passflag = false;
                            break;
                        case 2:
                        case 3:
                            aSpan.eq(1).css('color', 'orange').html('中') ;
                            passflag = true;
                            break;
                        case 4:
                            aSpan.eq(1).css('color', 'green').html('强');
                            passflag = true;
                            break;
                    }

            } else {
                aSpan.eq(1).css('color', 'red').html( '密码长度有误');
                passflag = false;
            }
        });

            $password.on('blur',function() {
                if (this.value !== '') {
                    if (passflag) {
                        aSpan.eq(1).css('color', 'red').html('√');
                    }
                } else {
                    aSpan.eq(1).css('color', 'red').html('密码不能为空');
                    passflag = false;
                }
            });

            $email.on('focus',function(){
                aSpan.eq(2).html('请输入正确的邮箱地址');
            });

            $email.on('blur',function(){
                if($email.val()!==''){
                    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                    if(reg.test($email.val())){
                        aSpan.eq(2).css('color', 'green').html("邮箱格式正确");
                    }else{
                        aSpan.eq(2).css('color', 'red').html("邮箱格式不正确");
                    }
                }else{
                    aSpan.eq(2).css('color', 'red').html('邮箱地址不能为空');
                }
            });

            $oForm.on('submit',function() {
                if ($username.val() === '') {
                    aSpan.eq(0).css('color', 'red').html('用户名不能为空');
                    userflag = false;
                }       
                if ($password.val()=== '') {
                    aSpan.eq(1).css('color', 'red').html('密码不能为空');
                    passflag = false;
                }
                if ($email.val()=== '') {
                    aSpan.eq(2).css('color', 'red').html('邮箱不能为空');
                    emailflag = false;
                }
                if (!userflag  || !passflag || !emailflag) {
                    return false;
                }
            });
        }
    }
});
