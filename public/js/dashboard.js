
      // use delegated event handler
      // http://stackoverflow.com/questions/6658752/jquery-click-event-doesnt-work-on-dynamically-generated-elements
      // delegate vs on: 1.the input sequence diff. 2.delegate can add to future and more descendent ele
      $(document).ready( function() {
          $(".btn-info").click( function() {
            var classname = $(this).attr('class');
            
            if (classname.slice(-1) != 2) {
            //  bootstro.start(".bootstro2");
            //}
            
            //else {
              bootstro.start();
            }
            
          });
          $(".dashboard").fadeIn("slow");
          function parse(str) {
            var y = str.substr(0,4),
                m = str.substr(4,2) - 1,
                d = str.substr(6,2);
            var D = new Date(y,m,d);
            //console.log(D);
            return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
          };
          var comments = ["以前住的公寓正面","后门的横梁上分别写着bye和hi，看着挺亲切的，走的时候照的","","搬家时候拆的床","附近的一个公园","搬走那天，空荡荡的家","Kellog 商学院","我那几天就住这，这是学校里一个地方","芝加哥，芝加哥的几条大街都是建在像立交桥一样的，高出地面，这是在密歇根大街附近","以前的军港，现在成湖滨公园了", "远处有个灯塔","","","","芝加哥艺术学院，同时也是个美术馆，藏品很多，仔细看一天都逛不完，从古代到现代艺术应有尽有", "印象派馆的入口，这里的印象派藏品数量和质量应该都是欧洲之外顶尖的了","新印象派代表作：大碗岛的星期日下午，这是真迹", "这幅画本来是‘巴黎街头，雨天’，我就为了这幅画去的，不过那天刚好借到印第安纳去了","Paris Street: rainy day","大碗岛的星期日下午的姊妹篇","梵高的《自画像》那天也不再，这里尽莫奈的画就有30幅，梵高的也不少", "还是梵高的","莫奈的，城市画得很好","巴黎街头的作者画的，猪头和牛舌，画风挺前卫的，这里也有不少现代和当代艺术藏品，不过那些都很抽象，比如一张草纸上的涂鸦","这是欧洲一个公爵的私人财物，雕的挺精致的","二楼结束的一幅画，不太明白什么意思，那天手机快没电了，三楼还有当代和现代艺术，藏品也很多","Macy's 芝加哥的梅西百货， 男女服装厨具什么的都有卖，算是比较全的百货商场了， 美国超市一般是建在边远的小镇上","","市中心附近","美国肯德基，说实话来之前我就知道美国和中国肯德基不一样，但差别这么大还是让我吃惊。这里的肯德基基本下午6点就下班了，基本大城市才有。这里比较多的快餐店是赛百味，Donuts & Dokins和汉堡王","一个挺有名的商场的穹顶，让我很纳闷的是这里周六周日全天关闭，平时也只营业到下午6点","芝加哥有一条河贯穿，很像天津的感觉","双塔建筑，头几十层是停车场，被称为城中城，因为上面的高层据说有宾馆，餐厅，游泳池什么的","这条和上桥的密度很大，有不少人在河边纳凉，跑步","还有划皮划艇的，各种解说游轮经过","河边网密歇根大街走","密歇根大街南面的一个公园","千禧公园，正门的雕像","","千禧公园最有名的地方，镜面反射，走进了能看到自己，远看能看到附近的摩天大厦和蓝天白云","新家，学校公寓","","","没地去那几天躺着睡的", "芝加哥大学法学院", "校园中间有一片绿地", "第一次去芝加哥大学我才知道原来芝大到芝加哥的距离跟西北去芝加哥的距离差不多", "校园里最漂亮的一个建筑了，可能是教堂？不知道干什么用的，没进去。", "看那名字我还以为是列宁","地图上看上去不大，但这走一圈也不小","校园里中间还有一个小花园"];
          $.getJSON("images/album/imglist.json", function(data) {
            console.log(data);
            $.each(data, function(i, v) {
              //console.log(v);
              var file = "url(images/album/" + v + ")";
              //var file = "images/album"
              $(".jumbotron").append("<div class='box col-lg-11'><div class='imgbox col-lg-12'></div><div class='textbox col-lg-12'></div></div>");
              //$(".imgbox").last().css("background-image", "url(images/loginbg.jpg)");
              if (i == 0) {
                $(".imgbox").addClass('bootstro').attr( {
                  'data-bootstro-placement' : 'bottom',
                  'data-bootstro-content': '点击图片可以查看完整大图，进入后鼠标放在屏幕下方会出现缩放条'
                  });
                $('.textbox').addClass('bootstro').attr('data-bootstro-content', '一点评论，没什么其他效果');
              }
              $(".imgbox").last().css("background-image", file);
              if (i < comments.length) {
              //console.log();
              $(".textbox").last().text(comments[i]);
              var box = $(".box").last();
              $("<div class='date'></div>").css( {
                left : box.offset().left - 100,
                top : box.offset().top - box.outerHeight(true) + box.height()
              }).text(parse(v.substr(4, 11)).toString().substr(4, 11)).addClass(v.replace('.jpg','')).appendTo($(".col-lg-3"));
            }
              //$(".imgbox.").last().children().attr(src, file);
            });
          });

          window.singleview = null;
          var svMargins = {vertical: 140, horizontal: 120},
              Modernizr = window.Modernizr,
              _getFinalSizePosition = function(imgSize, wrapperSize) {
              var imgW = imgSize.width,
                  imgH = imgSize.height,
                  wrapperW = wrapperSize.width,
                  wrapperH = wrapperSize.height,
                  finalW, finalH, finalL, finalT;
              // check which image side is bigger
              if( imgW > imgH ) {

                finalW = wrapperW;
                // calculate the height given the finalW
                var ratio = imgW / wrapperW;

                finalH = imgH / ratio;
                
                if( finalH > wrapperH ) {

                  //checksource = true;
                  ratio = finalH / wrapperH;
                  finalW /= ratio;
                  finalH = wrapperH;               
                }
              }
              else {
                finalH = wrapperH;
                // calculate the width given the finalH
                var ratio = imgH / wrapperH;
                finalW = imgW / ratio;
                //checksource = true;
                if( finalW > wrapperW ) {
                  //checksource = false;
                  ratio = finalW / wrapperW;
                  finalW = wrapperW;
                  finalH /= ratio;
                }
              }
              return {
                width : finalW,
                height : finalH,
                left : wrapperW / 2 - finalW / 2,
                top : wrapperH / 2 - finalH / 2,
                //checksource : checksource
              };
          };

          $(".jumbotron").delegate('.imgbox', 'click', function() {
            if (!window.singleview) {
              window.singleview = true;
              $( '<div class="single-view"><div class="zoomwrapper"><div class="zoombar"><div class="zoomblock"></div></div></div><div class="options options-single"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></button></div></div>' )
              .appendTo( $(".dashboard") );
              $(".zoomwrapper").addClass('bootstro2').attr({
                'data-bootstro-placement':'top',
                'data-bootstro-content' : '鼠标放在屏幕会出现缩放条。'
              });
            }
            
            $(".btn-intro").addClass('btn-intro-2').removeClass("btn-intro");
            //$("btn-intro").trigger('click');
            /*
            $(".btn-intro-2").click(function() {
              bootstro.start(".bootstro2");
            });
            */
            $(".btn-info").animate({'right' : '+=50'}, 'slow' );
            var $singleview =  $(".dashboard").children('div.single-view'),
                $svclose = $singleview.find('button.btn-close'),
                img = new Image,
                $body = $("body"),
                $this = $(this),
                $window = $(window),
                $overlay = $(".overlay");
            img.src = $this.css('background-image').replace(/url\(|\)$/ig, "");

            //console.log(img.attr('src'));
            var $fly = $('<div></div>').addClass('img-fly').css( {
              'background-image' : $this.css('background-image'),
              'background-size' : 'cover',
              position : 'absolute',
              width : $this.outerWidth(),
              height : $this.outerHeight(),
              'border-radius': '3px 3px 0 0',
              left : $this.offset().left - $window.scrollLeft(),
              top : $this.offset().top - $window.scrollTop(),
              zIndex : 10000
            }).appendTo($singleview),

            wrapper = {
                  width : $window.width() - svMargins.horizontal, 
                  height : $window.height() - svMargins.vertical 
                },
            finalSizePosition = _getFinalSizePosition(img, wrapper);

            $(".zoomwrapper").show();
            $singleview.show();
            $overlay.fadeIn(300, function() {
              $body.css('overflow-y', 'hidden');
            });
            
            $fly.animate({
              width : finalSizePosition.width,
              height : finalSizePosition.height,
              left : finalSizePosition.left  + svMargins.horizontal / 2,
              top : finalSizePosition.top  + svMargins.vertical / 2
            }, 300, 'easeInOutCubic');
          
            window.svinfo = {
              singleview : $singleview,
              svclose : $svclose,
              item : $this,
              overlay : $overlay,
              svImg : $fly,
              img : img
            };
            
          });
          
          $(".dashboard").delegate('.btn.btn-default', 'click', function() {
            var svinfo = window.svinfo,
                $svImg = svinfo.svImg,
                $singleview = svinfo.singleview,
                $item = svinfo.item,
                $overlay = svinfo.overlay,
                img = svinfo.img;
             
            $(".btn-intro-2").removeClass("btn-intro-2").addClass("btn-intro");   
            $svImg.animate({
              width : $item.outerWidth(),
              height : $item.outerHeight(),
              'border-radius': '3px 3px 0 0',
              left : $item.offset().left - $(window).scrollLeft(),
              top : $item.offset().top - $(window).scrollTop()
            }, 300, 'easeInOutCubic', function() {
              $(this).remove();
              $svImg = null;
              $overlay.fadeOut(300, function() {
                $(this).hide();
              });
              $singleview.hide();
              $(".btn-info").animate({'right' : '-=50'}, 'slow');
              $(".zoomwrapper").hide();
              $("body").css('overflow-y', 'scroll');
              //$(document).scroll( scrollHandle );
          });  
      });
      var prev = -1,
      scrollHandle = function() {
        var $imgbox = $(".jumbotron").find(".imgbox");
        if ($imgbox.length > 0) {
          //console.log($imgbox);
          var off = $imgbox.eq(0).offset().top,
              interval = $(".box").outerHeight(true),
              $overlayBlur = $(".overlay-blur");
          if (!$(".single-view").is(":visible")) {
            var offsetY = $(document).scrollTop();
                $imgbox = $(".imgbox"),
                num = Math.round((offsetY - off) / interval);
            //console.log(num);
            if(num != prev) {            
        
              $overlayBlur.stop().fadeOut(500,function(){
                $(this).css({'background-image': $imgbox.eq(num).css('background-image')})
                .fadeIn(500);
              });  
                //console.log($(this));
              //});
              prev = num;
            }
          }
        }
      };
      $(document).scroll(scrollHandle);
      
      $('.jumbotron').delegate('.imgbox','mouseenter mouseleave', function(event) {
        //console.log(event);
        var classname = $(this).css('background-image').replace(/url\(|\)$/ig, "").replace(window.location.host, "").replace("http:///images/album/", "").replace('.jpg','');
        var date = $("."+classname);
        if ( event.type === 'mouseenter' ) {
          date.animate({left : 400, opacity : 1}, 300);
        }
        if (event.type === 'mouseleave') {
          date.animate({left : 200, opacity : 0}, 300);
        }
      });

      var pos = 0;
      $('.dashboard').delegate('.zoomwrapper','mouseenter mouseleave', function(event) {
        //console.log(event);
        var $bar = $(this).children(),
            $block = $bar.children(),
            img = new Image,
            $img = $(".img-fly");
        img.src = $img.css("background-image").replace(/url\(|\)$/ig, "");
        if ( event.type === 'mouseenter' ) {
          $bar.fadeIn(300, function() {
            var pos = ($img.width() - 0.1*img.width)/ img.width * parseFloat($bar.css('width'));
            //console.log(pos);
            $block.css('left', pos);
            //console.log(($img.width() - 0.1*img.width)/ img.width);
            $block.fadeIn(300, function() {
              $block.draggable({axis: 'x', containment: "parent"});
              $block.on('dragstop', function () {    
                var zoom = parseFloat($block.css('left')) / parseFloat($bar.css('width'));
                    zoomWidth =  zoom * img.width + 0.1*img.width,
                    zoomHeight = zoom * img.height + 0.1*img.height;
                
                // centered the image 
                $img.css({
                  height : zoomHeight,
                  width : zoomWidth,
                  top : '50%',
                  left : '50%',
                  transform : 'translate(-50%, -50%)'
                });
              });
              $block.trigger('dragstop');
            });
          });
        };
        
        if (event.type === 'mouseleave') {
          $bar.fadeOut(300, function() {
            $block.fadeOut(300);
          });
        };
      });
      

      /*
      $(".jumbotron").delegate(".imgbox", "hover", );
      find(".imgbox").hover( function() {
        var classname = $(this).css('background-image').replace(/url\(|\)$/ig, "").replace(window.location.host, "");
        var date = $(classname);
        console.log(classname);
        $(this).oleft = $(this).left;
        date.animate({left : "+=" + date.css('width')/2, display : inline}, 300);
      },
      function () {
        var classname = $(this).css('background-image').replace(/url\(|\)$/ig, "").replace(window.location.host, "");
        var date = $(classname);
        date.animate({left : $(this).oleft, display : none}, 300);
      }
      );
*/
    });
      