// トグルメニュー
$(function() {
    // アクティブクラスのつけ外し
    $('.js-toggle-btn').on('click', function() {
        if($(this).hasClass('is-active')) {
            $('.js-toggle-btn').removeClass('is-active');
            $('.js-toggle-menu').removeClass('is-active');
        } else {
            $('.js-toggle-btn').addClass('is-active');
            $('.js-toggle-menu').addClass('is-active');
        }
    });
    // リンクをクリックしたらボタンとメニューを元に戻す
    $('.js-toggle-menu a').on('click', function() {
        $('.js-toggle-btn').removeClass('is-active');
        $('.js-toggle-menu').removeClass('is-active');
    });
    // リンクをクリックした時のスムーススクロール
    $('a[href^="#"]').on('click',function() {
        var speed = 400;
        var href = $(this).attr('href');
        var target = $(href == '#' || href == '' ? 'html': href);
        var buffer = 100;
        var position = $(target).offset().top - buffer;
        $('html,body').animate({scrollTop:position},speed,'swing');
        return false;
    });
});

// スクロールするとフワッと現れるやつ
$(function() {
    $(window).scroll(function() {
        $('.js-effect-fade').each(function() {
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if(scroll > elemPos - windowHeight) {
                $(this).addClass('js-effect-scroll');
            }
        });
    });
    // スクロールしなくてもフワッと現れる
    $(window).scroll();
});

// FAQのスライドイン

$(function() {
    $('.js-question').on('click',function() {
        if($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $(this).next().slideUp();
        } else {
            $(this).addClass('is-active');
            $(this).next().slideDown();
        }
    });
});


$(function() {
    $('.works-items').slick({
        centerMode: true,
        centerPadding: '100px',
        // centerPadding: '60px',
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
    });    
});

// フォームバリデーション

$(function() {
    // リアルタイムチェック
    $('#name').on('blur',function() {
        let value = $(this).val();
        if(value == "" ) {
            $(this).prev().html('').append('お名前を入力してください');
        } else {
            $(this).prev().html('');
        }
    });

    $('#mail').on('blur', function() {
        let value = $(this).val();
        if(value == "") {
            $(this).prev().html('').append('メールアドレスを入力してください');
        } else {
            $(this).prev().html('');
        }
    });

    $('#content').on('blur', function() {
        let value = $(this).val();
        if(value == "") {
            $(this).prev().html('').append('お問い合わせ内容を入力してください');
        } else {
            $(this).prev().html('');
        }
    });
    $('#privacy').on('blur', function() {
        if(!$(this).prop('checked')) {
            $('.privacy-error').html('').append('プライバシーポリシーに同意の上、チェックしてください')
        } else {
            $('.privacy-error').html('');
        }
    });

    // 送信前チェック
    $('.submit-btn').on('click', function() {
        var sendFlag = true;
        if($('#name').val() == "") {
            $('#name').prev().html('').append('お名前を入力してください');
            sendFlag = false;
        }
        if($('#mail').val() == "") {
            $('#mail').prev().html('').append('メールアドレスを入力してください');
            sendFlag = false;
        }
        if($('#content').val() == "") {
            $('#content').prev().html('').append('お問い合わせ内容を入力してください');
            sendFlag = false;
        }
        if(!$('#privacy').prop('checked')) {
            $('.privacy-error').html('').append('プライバシーポリシーに同意の上、チェックしてください')
            sendFlag = false;
        }
        
        if(sendFlag == false)  {
            return false;
        }
    });
});

// フォーム送信後のメッセージ

$(document).ready(function () {

    $('.c-form').submit(function (event) {
      var formData = $('.c-form').serialize();
      $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSejYe6_5Ua2EDcqQD5o_DxRJnv-zgp7LN-JNF_WkMhnPhJItA/viewform?usp=sf_link",
        data: formData,
        type: "POST",
        dataType: "xml",
        statusCode: {
          0: function () {
            $(".thx-message").slideDown();
            $(".submit-btn").fadeOut();
            //window.location.href = "thanks.html";
          },
          200: function () {
            $(".false-message").slideDown();
          }
        }
      });
      event.preventDefault();
    });

  });