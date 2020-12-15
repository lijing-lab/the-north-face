define([],function(){
    return {
        init:function(){
            const $lunbo = $('.lunbo-banner');
            const $ulist = $('.lunbo-banner ul');
            const $piclist = $('.lunbo-banner ul li');
            const $btnlist = $('.lunbo-banner ol li');
            const $leftarrow = $('.left');
            const $rightarrow = $('.right');
            let timer = null;
            let $num = 0; 
            const $liwidth = $piclist.eq(0).width(); //1个li的宽度
            $ulist.width($liwidth * $piclist.size());
            
            $btnlist.on('click', function() {
                $num = $(this).index() - 1; 
                tabSwitch();

            });
            $lunbo.hover(function() {
                clearInterval(timer); 
            }, function() {
                timer = setInterval(function() {
                    $rightarrow.click();
                }, 3000);
            });

            $rightarrow.on('click', function() {
                tabSwitch();
            });

            $leftarrow.on('click', function() {
                $num -= 2; 
                tabSwitch();
            });

            function tabSwitch() {
                $num++; 
                if ($num === $btnlist.size() + 1) {
                    $ulist.css('left', 0);
                    $num = 1;
                }

                if ($num === -1) {
                    $ulist.css('left', -$liwidth * $btnlist.size());
                    $num = $btnlist.size() - 1;
                }

                if ($num === $btnlist.size()) {
                    $btnlist.eq(0).addClass('active').siblings('li').removeClass('active');
                } else {
                    $btnlist.eq($num).addClass('active').siblings('li').removeClass('active');
                }

                $ulist.stop(true).animate({
                    left: -$liwidth * $num
                    }  );
                }

            timer = setInterval(function() {
                $rightarrow.click();
            }, 3000);

            // 渲染男装
            const $clolist = $('.boylist');
            $.ajax({
                url: 'http://localhost/the-north-face/php/indexdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                console.log(data);
                $.each(data, function(index, value) {
                    if(index<4){
                        console.log(index);
                    $strhtml += `
                        <li style="position:relative">
                            <img index="${index}" class="lazy" src="${value.url}" />
                            <div style="position:absolute,left:0,top:0">
                            <p class="look" style="display:none">查看搭配</p></div>
                        </li>
                    `;}
                });
               
                $clolist.html($strhtml);                      
            })

            // $('.look').on('click',function(){
            //     console.log(10000000);
            // });
            
            // 渲染女装
            const $clolist1 = $('.girllist');
            $.ajax({
                url: 'http://localhost/the-north-face/php/indexdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml1 = '';
                console.log(data);
                $.each(data, function(index, value) {
                    if(index>=4){
                        console.log(index);
                    $strhtml1 += `
                        <li class="boxli" style="position:relative">
                            <img class="lazy" src="${value.url}" />
                            <div style="position:absolute,left:0,top:0">
                            <p class="look" style="display:none">查看搭配</p></div>
                        </li>
                    `;
                    }
                });
                $clolist1.html($strhtml1);                      
            })

            // tab切换
            const $change=$('.change ul li');
            const $changeClo=$('.change-clo .item');
            var $timer = null;
            $change.on('click', function() {
                var $this = $(this);
                $timer = setTimeout(function() {
                    $this.addClass('active').siblings('li').removeClass('active');
                    $changeClo.eq($this.index()).addClass('show').siblings('.item').removeClass('show');
                }, 30);
            });

            $change.on('mouseout', function() {
                clearTimeout($timer);
            }); 
 

            // var oUl=document.querySelector('.boylist');
            // // console.log(oUl);
            // var mask=document.createElement('div');
            // mask.className='mask';
            // var index=null;
            // var list=null;
            // oUl.addEventListener('mouseover',function(e){
            //     var e=e||window.event;
            //     if(e.target.nodeName==='LI'){
            //         alert(e.target);
            //         index=e.target.getAttribute('index');
            //         // alert(index);
            //         list=this.children;
            //         list[index].appendChild(mask);
            //         this.addEventListener('mouseout',function(e){
            //         if(e.target.nodeName==='LI'){
            //             list[index].removeChild(mask);
            //         }    
            //     },true);
            //     }               
            // },true);




            var $oul=$('.boylist');
            $oul.on('mouseover','li',function(){
                var $index=$(this).index();
                console.log($(this));
                $oul.find('li').eq($index).find('div').addClass('mask').siblings().removeClass('mask');
                $oul.find('li').eq($index).find('div').find('p').css({
                    "display":"block"
                });
                const $pdapei=$oul.find('li').eq($index).find('div').find('p');
                $pdapei.on('click',function(){
                    // console.log(1);
                    alert(111);
                })
            });
            $oul.on('mouseout','li',function(){
                var $index=$(this).index();
                console.log($(this));
                $oul.find('li').eq($index).find('div').removeClass('mask');
                $oul.find('li').eq($index).find('div').find('p').css({
                    "display":"none"
                });
            });

            var $oulgirl=$('.girllist');
            $oulgirl.on('mouseover','.boxli',function(){
                var $index1=$(this).index();              
                $oulgirl.find('.boxli').eq($index1).find('div').addClass('mask').siblings().removeClass('mask');
                $oulgirl.find('.boxli').eq($index1).find('div').find('p').css({
                    "display":"block"
                });
                const $pdapei1=$oulgirl.find('.boxli').eq($index1).find('div').find('p');
                $pdapei1.on('click',function(){
                    console.log(1);
                })
            });
            $oulgirl.on('mouseout','.boxli',function(){
                var $index1=$(this).index();
                $oulgirl.find('.boxli').eq($index1).find('div').removeClass('mask');
                $oulgirl.find('.boxli').eq($index1).find('div').find('p').css({
                    "display":"none"
                });
            });
            // 最佳销售单品
            const $saleLunbo=$('.sale-lunbo');
            const $salediv=$('.sale-banner div');
            const $salelist=$('.sale-banner div ul');
            const $salebtn=$('.sale-banner ol li');
            const $leftsale = $('.sale-left');
            const $rightsale = $('.sale-right');
            let timer1=null;
            let $number=0;
            const $divwidth=$salelist.eq(0).width();
            console.log($divwidth);
            $salediv.width($divwidth*$salelist.size());
            console.log();

            $salebtn.on('click',function(){
                $number=$(this).index()-1;
                tabSwitch1();
            });
            $saleLunbo.hover(function(){
                clearInterval(timer1);
            },function(){
                timer1=setInterval(function(){
                    $rightsale.click();
                },3000)
            });
            $rightsale.on('click',function(){
                tabSwitch1();
            });
            $leftsale.on('click',function(){
                $number-=2;
                tabSwitch1();
            });
            function tabSwitch1(){
                $number++;
                if($number===$salebtn.size()+1){
                    $salediv.css('left',0)
                    $number=1;
                }

                if($number===-1){
                    $salediv.css('left',-$divwidth*$salebtn.size());
                    $number=$salebtn.size()-1;
                }
                if($number===$salebtn.size()){
                    $salebtn.eq(0).addClass('active1').siblings('li').removeClass('active1');
                }else{
                    $salebtn.eq($number).addClass('active1').siblings('li').removeClass('active1');
                }

                $salediv.stop(true).animate({
                    left:-$divwidth*$number
                });
            }
            timer1=setInterval(function(){
                $rightsale.click();
            },3000);


            // 回到顶部
            let $totop=$('.totop');
            $totop.on('click',function(){
                $('body').animate({
                    scrollTop:0
                },1000)
            });
            
        }
    }
});