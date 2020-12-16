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


            var $mask = $('#mask-big'); 
            var $login = $('.loginit'); 
            var $closeBtn = $('.close-btn'); 



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
                url: 'http://10.31.161.52/the-north-face/php/indexdata.php',
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
                            <div class="mask" style="diaplay:none,position:absolute,left:0,top:0">
                            <p class="look" style="">查看搭配</p></div>
                        </li>
                    `;}
                });
               
                $clolist.html($strhtml);                      
            })

            
            
            // 渲染女装
            const $clolist1 = $('.girllist');
            $.ajax({
                url: 'http://10.31.161.52/the-north-face/php/indexdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml1 = '';
                console.log(data);
                $.each(data, function(index, value) {
                    if(index>=4){
                        console.log(index);
                    $strhtml1 += `
                       
                        <li style="position:relative">
                            <img index="${index}" class="lazy" src="${value.url}" />
                            <div class="mask" style="diaplay:none,position:absolute,left:0,top:0">
                            <p class="look" style="">查看搭配</p></div>
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
 


            var $oul=$('.boylist');
            console.log($login);
            $oul.on('mouseover','li',function(){
                var $index=$(this).index();
                console.log($index);
                console.log($(this));
                const $pdapei=$oul.find('li').eq($index).find('div').find('p');
                $pdapei.on('click',function(){
                    $mask.css({
                        "display":"block"
                    })
                    $login.eq($index).css({
                        "display":"block",
                        })
                    })
                });
                $closeBtn.on('click', function() {
                    $mask.css({
                        "display":"none"
                    })
                    $login.css({
                        "display":"none",
                    })
                })

          

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