/*jslint browser: true*/
/*jslint white: true */
/*global $, jQuery, Materialize, Clipboard, tinymce, tinyMCE, alert*/

$(document).ready(function() {
  
  var url = $(location).attr("href");
  var loadInProgress = false;
   toast("Konnichiwa stranger!");
   console.log("SoftendoStudios v3.0.6"); 
   var Infot = "<div class='section profile-show-4 kurumi-info'><nav><div class='nav-wrapper'><p class='brand-logo'>Random Senko Section</p></div></nav><div class='card'><div class='card-content'><div class='row'><ul class='collection scrollable small-scrollable' id='kurumi-random'><img src='https://steamuserimages-a.akamaihd.net/ugc/782979477407175069/D93AD3F1DE41CCC1C736D619D03D87C9759E0394/?imw=5000&amp;imh=5000&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=false' width='285'></ul></div></div></div></div>";
   $(".actions-section").append(Infot);
   var ProfMedia = "<div class='section profile-show-5 kurumi-media'><nav><div class='nav-wrapper'><p class='brand-logo'>Profile Music</p></div></nav><div class='card'><div class='card-content'><div class='row'><ul class='collection scrollable small-scrollable' id='kurumi-media'><iframe src='https://www.youtube-nocookie.com/embed/videoseries?list=PL2RKSt6QUyBAS5TiQPDlE4ls_t6f01syl&amp;autoplay=1' title='YouTube video player' frameborder='0' allowfullscreen=''></iframe></ul></div></div></div></div>";
   $("a.button-collapse").addClass("buttonMenu");
   $("a.button-collapse").removeClass("button-collapse");

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
  $(".buttonMenu").sideNav();
  
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
  
onClick(".send-link", function() {
    console.log("Starting up!!");
	var WXP = "<div id='xp'><table><tbody><tr><td><iframe id='XPVM' src='https://softendo.github.io/dragooniaxp/index.html' width='821' height='604'></iframe></td></tr></tbody></table></div>";
	$(".profile-banner").append(WXP);
  });  
  
onClick(".tvbtn", function() {
	$(".primary-content").text("");
	$(".notif-section").remove();
    $(".primary-content").append("<div class='section notif-section'><div class='card'> <div class='card-content'> <div class='row'><iframe id='lpframe' src='https://softendo.github.io/tv' height='560' width='100%' allowfullscreen=''></iframe></div></div></div></div></div></div></div>");
  });
  
onClick(".osbtn", function() {
	$(".primary-content").text("");
	$(".notif-section").remove();
    $(".modals").append("<div class='section notif-section'><div class='card'> <div class='card-content'> <div class='row'><iframe id='lpframe' src='https://archive.org/details/softendoos-1.1' height='480' width='100%' allowfullscreen=''></iframe></div></div></div></div></div></div></div>");
  });
  
onClick(".smfbtn", function() {
	$(".primary-content").text("");
	$(".notif-section").remove();
    $(".modals").append("<div class='section notif-section'><div class='card'> <div class='card-content'> <div class='row'><iframe id='lpframe' src='https://softendo.github.io/marioflash/index.html' height='490' width='100%' allowfullscreen=''></iframe></div></div></div></div></div></div></div>");
  });
  
 onClick(".close-gw", function() {
    $("#window").remove();
  });
});