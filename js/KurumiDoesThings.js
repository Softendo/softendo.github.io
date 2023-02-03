/*jslint browser: true*/
/*jslint white: true */
/*global $, jQuery, Materialize, Clipboard, tinymce, tinyMCE, alert*/

$(document).ready(function() {
  
  var url = $(location).attr("href");
  var loadInProgress = false;
   toast("Konnichiwa stranger!");
   console.log("SoftendoStudios v3.0.1"); 
   var Infot = "<div class='section profile-show-4 kurumi-info'><nav><div class='nav-wrapper'><p class='brand-logo'>Random Senko Section</p></div></nav><div class='card'><div class='card-content'><div class='row'><ul class='collection scrollable small-scrollable' id='kurumi-random'><img src='https://steamuserimages-a.akamaihd.net/ugc/782979477407175069/D93AD3F1DE41CCC1C736D619D03D87C9759E0394/?imw=5000&amp;imh=5000&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=false' width='285'></ul></div></div></div></div>";
   $(".actions-section").append(Infot);
   var ProfMedia = "<div class='section profile-show-5 kurumi-media'><nav><div class='nav-wrapper'><p class='brand-logo'>Profile Music</p></div></nav><div class='card'><div class='card-content'><div class='row'><ul class='collection scrollable small-scrollable' id='kurumi-media'><iframe src='https://www.youtube-nocookie.com/embed/videoseries?list=PL2RKSt6QUyBAS5TiQPDlE4ls_t6f01syl&amp;autoplay=1' title='YouTube video player' frameborder='0' allowfullscreen=''></iframe></ul></div></div></div></div>";
   $(".actions-section").append(ProfMedia);
   var Smth = "<a class='blue-shell'><u>Click to blue shell this user.</u></a>";
   $(".comment-info").append(Smth);
   var dragoonianame = "<p><a href='profile?user_id=7561'>DragooniaShade</a></p>";
   $("h4.card-title.truncate").text("");
   $("h4.card-title.truncate").append(dragoonianame);
   $("img.tooltipped").attr("data-tooltip", "Kingdom of Dragoonialand");
   $("img.tooltipped").attr("src", "https://cdn.discordapp.com/attachments/1042892196896047176/1064650575179944017/DragooniaFlag.png");
   $("div.col.s1.center-align").eq(0).find("h4.card-title").text("77");
   $("img.responsive-img").eq(3).attr("src", "images/achievements/45.png");
   $("p.achievement-description").eq(3).text("Be a member for a certain number of days. This achievement is broken.");
   var POGAchievement = "<div class='collection-item achievement row valign-wrapper'> <div class='col s2 no-padding achievement-image valign'> <img src='https://cdn.discordapp.com/attachments/1042892196896047176/1065072273985380573/greatbadge.png' class='responsive-img'> </div><div class='col s6 achievement-info valign'> <p class='achievement-title text mega-title'>Useless Achievement</p><p class='achievement-description text text-wrap medium-title'>Rate one level.</p></div><div class='col s4 achievement-progress no-padding valign'> <div class='progress-wrapper no-padding'> <p class='progress-subtitle text'>1/1</p><div class='progress'> <div class='determinate' style='width: 100%'></div></div><p class='progress-reward medium-title text align-center'>Reward: 0XP</p></div></div></div>";
   $(".achievements").append(POGAchievement);

  /****************
  GENERAL FUNCTIONS
  ****************/
  
  function inURL(string) {
    if (window.location.href.indexOf(string) > -1) {
      return true;
    } else {
      return false;
    }
  }
  
  function onClick(element, func) {
    $(document).off("click", element);
    $(document).on("click", element, func);
  }
  
  function getMessage(data) {
    return $(data).find(".return-message").html();
  }
  
  function getSuccess(data) {
    return $(data).find(".success").html();
	console.log("Some random function was called."); 
  }
  
  function toast(message) {
    Materialize.toast(message, 4000);
  }
  
  function oneSec(func) {
    setTimeout(func, 1000);
  }
  
  var delay = (function() {
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  }());
  
  function reload(element, url, callback) {
    // Load from page, then remove the unneeded parent div
    $(element).load(url + " " + element, function() {
      $(this).children().unwrap();
      callback(); // callback if necessary
    });
  }
  
  function postData(url, data, func, secret) {
//    // Let user know
//    if (!secret) {
//        let loadingMessages = ["Just a moment...", "One sec...", "Just a sec...", "Loading..."];
//        let random = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
//        if (random.constructor === Array) {
//            for (let i = 0; i < random.length; i++) {
//                setTimeout(() => {
//                    toast(random[i]);
//                }, i * 1200);
//            }
//        } else {
//            toast(random);
//        }
//    }
    // Shortened AJAX function
    if (!loadInProgress) {
      loadInProgress = true
      $.ajax({
        url: url,
        type: "POST",
        data: data,
        success: function(returnData) {
          func(returnData);
          loadInProgress = false;
        },
        error: function(error) {
          loadInProgress = false;
        }
      });
    }
  }
  

 
  function getData(url, data, func) {
    // Shortened AJAX function
    $.ajax({
      url: url,
      type: "GET",
      data: data,
      success: function(returnData) {
        func(returnData);
      },
      error: function(returnData) {
        console.log("An error occurred. Error #: 101");
      }
    });
  }
  
  function loadModal(modal, callback, bottomSheet, additionalClass) {
    // Check modal type
    if (bottomSheet) {
      bottomSheet = "bottom-sheet";
    } else {
      bottomSheet = "";
    }
    if (!additionalClass) {
      additionalClass = "";
    }
    // Create modal if not already set
    if (!$("#" + modal).length) {
      $(".modals").append("<div id='" + modal + "' class='modal " + bottomSheet + " " + additionalClass + "'><div class='modal-content'></div></div>");
    }
    // Wait for click on modal link
    $("a[href='#" + modal + "']").click(function() {
      $("#" + modal).load(modal + ".php .modal-content", callback);
      $("#" + modal + " select").material_select();
    });
  }
  
  function loadDynamicModal(modal, callback, dataName, data, bottomSheet, additionalClass) {
    var dataObj = {};
    dataObj[dataName] = data;
    // Check modal type
    if (bottomSheet) {
      bottomSheet = "bottom-sheet";
    } else {
      bottomSheet = "";
    }
    if (!additionalClass) {
      additionalClass = "";
    }
    // Create modal if not already set
    if (!$("#" + modal).length) {
      $(".modals").append("<div id='" + modal + "' class='modal " + bottomSheet + "'><div class='modal-content'></div></div>");
    }
    // Wait for modal click
    onClick("a[href='#" + modal + "']", function() {
      // Send data to modal to get information back
      postData(modal + ".php", dataObj, function(output) {
        // Load information into modal
        var modalHTML = "<div class='modal-content'>" + $(output).find(".modal-content").html() + "</div>";
        $("#" + modal).html(modalHTML);
        $("#" + modal + " select").material_select();
        callback();
      });
    });
  }
  
  // Search
  function searchResults(wait, container) {
    $(wait).keyup(function() {
      // Wait for user to stop typing
      delay(function() {
        var search = $.trim($("#search").val());
        // Get search results
        getData(url, {search: search}, function(output) {
          var results = $(output).find(container).html();
          $(container).html(results).hide().slideDown("slow");
        });
      }, 1000);
    });
  }
  
  /*******************
  INITIATE MATERIALIZE 
  *******************/
  
  // Linkify
  $(".level-description").linkify({
    target: "_blank"
  });
  
  // Parallax
  $(".parallax").parallax();
  
  // Navigation Active Class
  var link = $("main").attr("id");
  $('.navigation a[href^="' + link + '"]').parent().addClass("active");
  
  // Dropdowns
  $(".dropdown-button").dropdown({
    inDuration: 300,
    outDuration: 200,
    constrain_width: false,
    gutter: 0,
    hover: false,
    belowOrigin: true,
    alignment: 'left'
  });
  
  // Mobile Menu
  $(".button-collapse").sideNav();
  
  // Tabs
  $('ul.tabs').tabs();
  
  // Tooltips
  $('.tooltipped').tooltip();
  
  // Collapsible Structures
  $('.collapsible').collapsible({
    accordion: true
  });
  
  // Modals
  $('.modal-trigger').leanModal({
      dismissible: true, 
      opacity: '.5',
      in_duration: 300,
      out_duration: 200
  });
  
  // Select
  $('select').material_select();
  
  // Slider
  $('#homepage-slider').slider({
    indicators: false
  });
  
  $("#level-images-slider").slider({
    indicators: true,
    height: 200,
    interval: 3000
  });

  // Copy to Clipboard
  var clipboard = new Clipboard(".copy-trigger");
  onClick(".copy-trigger", function(e) {
    e.preventDefault();
  });
  clipboard.on("success", function(e) {
    toast("Code copied!");
  });
  
  // Carousel
  $(".carousel").carousel();
  
  // Select Textarea
  $(".level-code-textarea").focus(function() {
    $(this).select();
    $(this).mouseup(function() {
      $(this).unbind("mouseup");
      return false;
    });
  });
  
  // Textarea Editor
   tinymce.init({
        selector: ".tinymce-textarea"
    });
    
    tinymce.init({
        selector: ".tinymce-textarea-dark"
    });
  
  
//   tinymce.init({
//     selector: '.tinymce-textarea',
//     menubar: 'file edit insert view format table tools',
//     plugins: 'autolink lists link image charmap preview hr pagebreak autosave nonbreaking template searchreplace visualblocks visualchars code codesample fullscreen insertdatetime media nonbreaking save table contextmenu emoticons paste textcolor colorpicker textpattern imagetools',
//     fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
//     toolbar1: 'insertfile undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent restore',
//     toolbar2: 'preview | link image media codesample |  fontsizeselect forecolor backcolor emoticons',
//     contextmenu: 'inserttable cell row column deletetable | fullscreen preview code',
//     removed_menuitems: 'newdocument',
//     image_advtab: true,
//     // content_css: ['css/styles.css', 'css/materialize.css'],
//     min_height: 400,
//     autosave_interval: '15s',
//     autosave_restore_when_empty: false,
//     autosave_ask_before_unload: false,
//     autosave_retention: '43200m',
//     nonbreaking_force_tab: true,
//     browser_spellcheck: true,
//     templates: [
//       {title: 'Template #1', description: 'This is a test template!', content: 'My content'},
//       {title: 'Template #2', description: 'This is a test template!', content: 'My content 2'}
//     ],
//     invalid_styles: 'position display'
//   });
  
//   tinymce.init({
//     selector: '.tinymce-textarea-dark',
//     skin_url: 'css/tinymce-dark',
//     menubar: 'file edit insert view format table tools',
//     plugins: 'autolink lists link image charmap preview hr pagebreak autosave nonbreaking template searchreplace visualblocks visualchars code codesample fullscreen insertdatetime media nonbreaking save table contextmenu emoticons paste textcolor colorpicker textpattern imagetools',
//     fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
//     toolbar1: 'insertfile undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent restore',
//     toolbar2: 'preview | link image media codesample |  fontsizeselect forecolor backcolor emoticons',
//     contextmenu: 'inserttable cell row column deletetable | fullscreen preview code',
//     removed_menuitems: 'newdocument',
//     image_advtab: true,
//     // content_css: ['css/styles.css', 'css/materialize.css'],
//     min_height: 400,
//     autosave_interval: '15s',
//     autosave_restore_when_empty: false,
//     autosave_ask_before_unload: false,
//     autosave_retention: '43200m',
//     nonbreaking_force_tab: true,
//     browser_spellcheck: true,
//     invalid_styles: 'position display'
//   });
  
onClick(".send-link", function() {
    console.log("Starting up!");
	var WXP = "<div id='xp'><table><tbody><tr><td><iframe id='XPVM' src='https://softendo.github.io/dragooniaxp/index.html' width='821' height='604'></iframe></td></tr></tbody></table></div>";
	$(".profile-banner").append(WXP);
  });  
  
onClick(".profile-banner", function() {
    console.log("bruh");
    var audio = new Audio('https://cdn.discordapp.com/attachments/1042892196896047176/1060362135462490272/bruh.mp3');
    audio.play();
  });
  
onClick(".brand-logo", function() {
    toast("This profile uses the 'Kurumi Profile Enhancement System'.");
  });
  
 onClick(".blue-shell", function() {
    console.log("Yes.");
	toast("Did you expect something to happen clicking on that button? Well too bad.");
  });

    
/********** PAINT TEASER *********/
if (document.getElementById('paint')) {
  
  console.log("Hi");
    
var width = 100,
height = document.getElementsByTagName('body')[0].clientHeight - 20,
c = document.getElementById('paint'),
ctx = c.getContext('2d');
c.width = width;
c.height = height;
    
var paint = [];
var colors = ["#3e474f", "#00BCF0", "#F8CD46", "#88CA5E", "#BE8252", "#AF343A"];

var totalPaints = 6;
var size = 4;

function initPaint(){
//    for (var i = 0; i < totalPaints; i++){
//        addPaint();
//    }
    // Add first paint
    addPaint(colors[0]);
    setTimeout(() => { addPaint(colors[1]) }, 1000);
    setTimeout(() => { addPaint(colors[2]) }, 2700);
    setTimeout(() => { addPaint(colors[3]) }, 3500);
    setTimeout(() => { addPaint(colors[4]) }, 3900);
    setTimeout(() => { addPaint(colors[1]) }, 6000);
    setTimeout(() => { addPaint(colors[5]) }, 6700);
    
    setInterval( update, 40 );
}

function drawPaint(x,y,size, colour) {
    ctx.beginPath();
    ctx.arc(x, y, size ,0 , Math.PI*2, true);
    ctx.closePath();
	ctx.fillStyle=colour;
	ctx.fill();
}

function update(){
    for (var i = 0; i < paint.length; i++){
        paint[i].y = paint[i].y + paint[i].v;
//        if (paint[i].y > height + 60){
//            paint.splice(i,1);
//            addPaint();
//        }
        drawPaint(paint[i].x, paint[i].y, paint[i].s, paint[i].c);
    }
}

function addPaint(color){
    //Try 50 times
    var i = 50;
    while(i > 0){
        size = Math.random() * size + 2;
        x = Math.random() * width;

        found = false;

        //Dont Allow drips ontop of each other (Overtaking drops destroy the prettyness)
        for (var j = 0; j < paint.length; j++){
            if ((x + size > paint[j].x) && (x - size < paint[j].x + paint[j].s)){
                found = true;
                break;
            }

            if ((x - size < paint[j].x) && (x + size > paint[j].x - paint[j].s)){
                found = true;
                break;
            }
        }

        if (found === false){
            paint.push({s:size,
                       x:x,
                       y:-60,
                       v:(Math.random() * 1.5) + 0.5,
                       c:color});
			i--;
            return;
        }
    }
}

initPaint();
    
}
  
});