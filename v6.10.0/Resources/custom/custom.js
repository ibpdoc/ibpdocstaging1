$(document).ready(function(){

    var $videos = $('.videoWrapper');
    var videoExists = $videos.length > 0;
    if (videoExists) {
        console.log("There are videos on the page.");
    var vidx = 0;
    $(".videoWrapper").each(function(){
        $(this).attr("id","video-" + vidx);
        var currentWrapper = $('#video-' + vidx);
        var iframeHTML = $(currentWrapper).find('iframe');
        var videoURL = $(iframeHTML).attr("src");
        videoURL = videoURL.replace("https://www.youtube.com/embed/","");
        videoURL = videoURL.replace(/\?$/, '');
        var videoID = videoURL;
        var videoStructure = '<div class="videoThumbnail"><div class="playOverlay"></div><img src="https://img.youtube.com/vi/'+ videoID + '/0.jpg"></div>';
        $(videoStructure).prependTo(this);
        var thisOverlay = $(currentWrapper).find('.playOverlay');
        $(iframeHTML).prependTo(thisOverlay);
        vidx++
        $(this).css("display","inline-block");
    });

    var modal = '<div id="modalDiv" class="modalBack"><div class="modal"><div class="modalContent"></div></div></div>';
    $(modal).insertBefore("#video-0");
    var modalBackground = document.getElementById("modalDiv");
    var content = modalBackground.querySelector(".modalContent");
    
    window.onclick = function (event) {
          if (event.target == modalBackground) {
              closeModal();
          } 
    }
    $(".videoWrapper .playOverlay").click(function() {
          modalBackground.style.display = "flex";
          var frame = $(this);
          var str = frame[0].innerHTML;
          console.log(str);
          content.innerHTML = str;
      });
    
      function closeModal() {
          modalBackground.style.display = "none";
          content.innerHTML = "";
      }
    }

    var $gifs = $('.gifWrapper');
    var gifExists = $gifs.length > 0;
    if (gifExists) {
        console.log("There are gifs on the page.");
    var gifx = 0;
    $(".gifWrapper").each(function(){
        $(this).attr("id","gif-" + gifx);
        var link = $(this).find('a').parent().html();
        var overlay = "<div class='playOverlay'>" + link + "</div>";
        $(overlay).prependTo(this);
        gifx++
        
    });
}
});
    
    $(function() {

    /* Custom clipboard bookmarks */
    
    var clipboardButton = '<span class="clipboard"><button title="Copy web link"></button></span>';
    $(clipboardButton).appendTo('.topic-layout h1');
    $(clipboardButton).appendTo('.topic-layout h2');
    $('.clipboard').click( function() {
     var headingLink = $(this).parent().children('a:first-child');
     var currentURL = window.location.href;
     currentURL = currentURL.split('#')[0];
     var clipboardText = currentURL + "#" + headingLink.attr('name');
     var inputArea = $('<input class="clipInput">').val(clipboardText).appendTo('body').select()
     document.execCommand('copy');
     $('.clipInput').remove();
    return false;
    });

    /* Custom top bar */

    $('.custom-top-bar').prependTo('.title-bar.tab-bar');
    $('.home-page .custom-top-bar').prependTo('.off-canvas-content.inner-wrap');
    $('.custom-top-bar>ul>li.has-child>a').on('click', function(e){
    e.preventDefault();
    });

    $('.custom-top-bar>ul>li.has-child').on('click', function(){
        $(this).find('ul').toggleClass('open');
        var $menu = $('li.has-child');
        $(document).click(e => {
            if (!$menu.is(e.target)
            && $menu.has(e.target).length === 0)
            {
              $menu.find('ul').removeClass('open');
           }
          });
    });

    /* Custom footer layout */

    $('.custom-footer-wrapper').appendTo('.main-section');
	var techDoc = $('.footer-col-right .footer-item p:nth-child(2) a:nth-child(2)').attr('href');
    if (typeof attr !== typeof undefined && attr !== false) { 
        techDoc=techDoc.toLowerCase();
        $('.footer-col-right .footer-item p:nth-child(2) a:nth-child(2)').attr("href", techDoc);
    }
    $('.footer-col-right .footer-item p:nth-child(2) a:nth-child(2)').attr("href", techDoc);
    $('.footer-col-left').css('display','flex');
    $('.footer-col-middle').css('display','flex');
    $('.custom-footer').css('display','flex');
    $('.custom-footer').css('position','relative');
    $('.custom-footer').css('visibility','visible');


    /* Custom version menu */

    var menuItems = '';
    for(var v in versionData) {
    mLabel = v;
    mTarget = versionData[v].url;
    menuItems=menuItems+"<li><a href='"+ mTarget + "'>" + mLabel + "</a></li>";
    }
    $(menuItems).insertBefore('.custom-top-bar>ul>li>ul.version-menu-parent>li:first-child');
    var VersionNo = $('.GeneralVersionNumber').text();
    $('.custom-top-bar ul ul a').each(function() {
    if ($(this).text() == VersionNo) {
    $(this).addClass('selected');
    }
    });
});