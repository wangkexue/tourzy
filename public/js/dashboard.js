
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
          var comments = ["some text here","some text here","","some text here","",""];
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
                  'data-bootstro-content': 'Click into single-view. A zoom bar(hover to show) at the bottom of single-view'
                  });
                $('.textbox').addClass('bootstro').attr('data-bootstro-content', 'just some comment');
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
      