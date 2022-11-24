/*jslint browser: true*/
/*jslint white: true */
/*global $, jQuery, Materialize, Clipboard, tinymce, tinyMCE, alert*/

$(document).ready(function() {
  
  var url = $(location).attr("href");
  var loadInProgress = false;
    
    

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
  
  /****
  EXTRA
  ****/
  
  if (inURL("/game") && !inURL("/games")) {
    var notifCheckPageToUse = "game.php";
  } else {
    var notifCheckPageToUse = "index.php";
  }
  
  // Stay online and check for notifications/messages
  var numTimes = 0;
  
  function stayOnline() {
    if (numTimes < 50 && !inURL("messages")) {
      postData(notifCheckPageToUse, {check_stuff: 1}, function(output) {
        var returnMessage = getMessage(output);
        if (returnMessage) {
          Materialize.toast(returnMessage, 8000);
        }
      }, true);
      numTimes++;
    } else if (numTimes < 50) {
      postData(notifCheckPageToUse, {empty_var: 1}, function(output) {
        console.log("Never gonna give you up, never gonna let you down...");
      }, true);
    }
  }
  
  setInterval(stayOnline, 58000 * 5);
  
  onClick(".notif-toast", function(e) {
    var notification = parseInt($(this).attr("notif"));
    postData(notifCheckPageToUse, {specific_notif: notification}, function(output) {
      var empty_var = 1;
    }, true);
    $(".notifications-button").removeClass("alert-glow");
  });
  
  onClick(".message-toast", function(e) {
    $(".messages-button").removeClass("alert-glow");
  });
  
  // Are you sure popup
  if (inURL("/game") && !inURL("/games")) {
    setTimeout(function() {
      $(window).bind("beforeunload", function() {
        return "Make sure you've saved your work!";
      });
    }, 30000);
  }
  
  // Page sections -- active (FAQ, TERMS, PRIVACY) 
  if (inURL("/faq") || inURL("/privacy") || inURL("/terms")) {
    $(".table-of-contents a").click(function(e) {
      $(".table-of-contents .active").removeClass("active");
      $(this).addClass("active");
    });
  }
  
  // Prevent dangerous site modification
  $(".stylish").remove();
  
  // Scroll to bottom of messages div on load
  $("#conversation").animate({ scrollTop: $('#conversation').prop("scrollHeight")}, 500);
  
//  // Making sure a user doesn't spam click ads...
//  var isOverGoogleAd = false;
//  
//  $(".adsbygoogle").mouseover(function() {
//    isOverGoogleAd = true;
//  }).mouseout(function() {
//    isOverGoogleAd = false;
//  });
//  
//  $(window).blur(function() {
//    
//    if (isOverGoogleAd) {
//      
//      adClickURL = window.location.href;
//      
//      postData("index.php", {adclick: 1, adclick_url: adClickURL}, function(output) {
//        console.log("Ad clicked");
//      }, true);
//      
//    }
//    
//  });

  
  
  /************
  *************
      AJAX
  *************
  ************/

  
  /***
  HOME
  ***/
  
  // Update collection function
  function updateCollections() {
    setTimeout(function() {
      // Refresh collections
      getData(url, {location: "collections"}, function(output) {
        var browserData = $(output).find("#level-browser").html();
        $("#level-browser").html(browserData);
        initializeModals();
        if (activateForcePeek) {
          forcePeekInitialize();
        }
      });
    }, 500);
  }
  
  function updateCollection(collectionID) {
    setTimeout(function() {
      // Refresh collection
      getData(url, {location: "collection", collection: collectionID}, function(output) {
        var browserData = $(output).find("#level-browser").html();
        $("#level-browser").html(browserData);
        initializeModals();
        if (activateForcePeek) {
          forcePeekInitialize();
        }
      });
    }, 500);
  }
  
  // Add suggestion
  onClick(".add-suggestion", function(e) {
    e.preventDefault();
    // Get suggestion
    var suggestion = $("#suggestion").val();
    postData("index.php", {suggestion: suggestion}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      $("#suggestion").val("");
    });
  });
  
  // Change level browser location
  onClick(".menu-bar-item", function(e) {
    e.preventDefault();
    // Get location
    var location = $(this).attr("location");
    // Grab data
    getData(url, {location: location}, function(output) {
      var browserData = $(output).find("#level-browser").html();
      $("#level-browser").html(browserData).hide().fadeIn();
      // Adjust location
      $("#level-browser").attr("location", location);
      // Reinitialize 
      initializeModals();
      if (activateForcePeek) {
        forcePeekInitialize();
      }
    });
    // Adjust menu bar
    $(".menu-bar-list .col.active").removeClass("active");
    $(this).parent().addClass("active");
  });
  
  // Enter level collection
  onClick(".level-collection", function(e) {
    e.preventDefault();
    if (!$(e.target).attr("noforce")) {
      // Get collection
      var collection = $(this).attr("collection");
      // Grab data
      getData(url, {location: "collection", collection: collection}, function(output) {
        var browserData = $(output).find("#level-browser").html();
        $("#level-browser").html(browserData).hide().fadeIn();
        // Adjust location
        $("#level-browser").attr("location", "collection").attr("collection", collection);
        // Reinitialize 
        initializeModals();
        if (activateForcePeek) {
          forcePeekInitialize();
        }
      });
    }
  });
  
  // Remove item
  onClick(".item-remove", function(e) {
    e.preventDefault();
    // Get location
    var location = $("#level-browser").attr("location");
    // Get level ID
    var levelID = $(this).parents().eq(2).attr("level");
    // Get collection ID
    var collectionID = $(this).parents().eq(4).attr("collection");
    postData(url, {remove_item: 1, location: location, level_id: levelID, collection_id: collectionID}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      if (success) {
        $(".collection-item[level='" + levelID + "']").fadeOut();
      }
    });
  });
  
  var collectionID;
  // Collection settings
  onClick(".collection-settings", function(e) {
    e.preventDefault();
    // Get collection ID
    collectionID = $(this).parents().eq(2).attr("collection");
    // Build modal if doesn't already exist
    if (!$("#collection-settings").length) {
      $(".modals").append("<div id='collection-settings' class='modal'><div class='modal-content'></div></div>");  
    }
    // Send collection ID, get return data
    postData("collection-settings.php", {collection: collectionID}, function(output) {
      var returnData = $(output).find(".modal-content").html();
      // Insert return data
      $("#collection-settings").find(".modal-content").html(returnData);
      // Open modal
      $("#collection-settings").openModal();
      // Update text fields
      Materialize.updateTextFields();
    });
  });
  
  onClick(".rename-collection", function(e) {
    e.preventDefault();
    // Get name
    var name = $("#collection-settings").find("#collection-name").val();
    // Get description
    var description = $("#collection-settings").find("#collection-description").val();
    // Get series
    var series = parseInt($("#collection-settings").find("#collection-series:checked").length);
    // Send data
    postData("collection-settings.php", {collection: collectionID, rename_collection: 1, collection_name: name, collection_description: description, collection_series: series}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#collection-settings").closeModal();
        // Update level browser
        updateCollections();
      }
    });
  });
  
  onClick(".delete-collection", function(e) {
    e.preventDefault();
    // Send data
    postData("collection-settings.php", {collection: collectionID, delete_collection: 1}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#collection-settings").closeModal();
        // Update level browser
        updateCollections();
      }
    });
  });
  
  onClick(".add-collection", function(e) {
    if (!$("#add-collection").length) {
      $(".modals").append("<div id='add-collection' class='modal'><div class='modal-content'></div></div>");  
    }
    getData("add-collection.php", {empty_var: 1}, function(output) {
      var returnData = $(output).find(".modal-content").html();
      // Insert return data
      $("#add-collection").find(".modal-content").html(returnData);
      // Open modal
      $("#add-collection").openModal();
      // Update text fields
      Materialize.updateTextFields();
    });
  });
  
  onClick(".add-collection-btn", function(e) {
    e.preventDefault();
    var name = $.trim($("#add-collection #collection-name").val());
    postData("add-collection.php", {add_collection: 1, collection_name: name}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#add-collection").closeModal();
        setTimeout(function() {
          $("#add-collection").remove();
        }, 500);
        updateCollections();
      }
    });
  });
  
  onClick(".add-collection-level", function(e) {
    e.preventDefault();
    collectionID = $(this).parents().eq(2).attr("collection");
    // Build modal if doesn't already exist
    if (!$("#add-collection-level").length) {
      $(".modals").append("<div id='add-collection-level' class='modal'><div class='modal-content' style='min-height: 400px;'></div></div>");  
    }
    // Send collection ID, get return data
    postData("add-collection-level.php", {collection: collectionID}, function(output) {
      var returnData = $(output).find(".modal-content").html();
      // Insert return data
      $("#add-collection-level").find(".modal-content").html(returnData);
      // Open modal
      $("#add-collection-level").openModal();
      // Initialize
      $("select").material_select();
      // Update text fields
      Materialize.updateTextFields();
    });
  });
  
  onClick(".add-to-collection", function(e) {
    e.preventDefault();
    var levelsToAdd = $("#levels-to-add").val();
    postData("add-collection-level.php", {add_collection_levels: 1, collection: collectionID, levels_to_add: levelsToAdd}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#add-collection-level").closeModal();
        setTimeout(function() {
          $("#add-collection-level").remove();
        }, 500);
        updateCollection(collectionID);
      }
    });
  });
  
  
  /******
  CONTEST
  ******/
  
  // Enter level into contest
  onClick(".enter-level-button", function(e) {
    e.preventDefault();
    var levelID = $("#choices").val();
    postData(url, {enter_contest: 1, level_id: levelID}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#enter-contest").closeModal();
        oneSec(function() {
          reload(".submissions-section", url);
        });
      }
    });
  });
  
  // Judge rate entry
  onClick(".save-review", function(e) {
    e.preventDefault();
    var entryID = $(this).parents().eq(3).attr("entry");
    var entryRate = $("#entry-" + entryID).find(".entry-rate").val();
    var entryReview = $("#entry-" + entryID).find(".entry-review").val();
    postData(url, {save_review: 1, entry_id: entryID, entry_rate: entryRate, entry_review: entryReview}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#entry-" + entryID).closeModal();
        oneSec(function() {
          reload(".submissions-section", url);
          oneSec(function() {
            $(".modal-trigger").leanModal();
          });
        });
      }
    });
  });
  
  
  /***********
  EDIT ACCOUNT
  ***********/
  
  // Personal Info
  function changeInformation() {
    // Get data
    var email = $("#email").val();
    var location = $("#location").val();
    var about = $("#aboutme").val();
    var youtube = $("#youtube").val();
    var facebook = $("#facebook").val();
    var website = $("#website").val();
    // Send data
    postData(url, {change_information: 1, email: email, location: location, about: about, facebook: facebook, youtube: youtube, website: website}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
    });
  }
  
  // Password
  function changePassword() {
    // Get password data
    var currentPassword = $("#current-password").val();
    var newPassword = $("#new-password").val();
    var confirmPassword = $("#confirm-password").val();
    // Send data
    postData(url, {change_password: 1, current_password: currentPassword, new_password: newPassword, confirm_password: confirmPassword}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      if (success) {
        $("#current-password").val("");
        $("#new-password").val("");
        $("#confirm-password").val("");
      }
      toast(returnMessage);
    });
  }
  
  // Save Account Settings
  onClick(".save-account", function(e) {
    e.preventDefault();
    changeInformation();
    
    if ($("#current-password").val().length > 0) {
      changePassword();
    }
    
  });
  
  // Class
  onClick(".change-permissions", function(e) {
    e.preventDefault();
    var userClass = $("#class").val();
    postData(url, {change_permissions: 1, class: userClass}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
    });
  });
  
  /***********
  FILE MANAGER
  ***********/
  
  // File uploader
  onClick(".upload-image", function() {
    $(".file-upload").trigger("click");
  });
  
  $("#imageUploadForm").on("submit", function(e) {
    e.preventDefault();
    if ($(".file-upload").get(0).files.length) {
      toast("Uploading...");
      var formData = new FormData(this);
      // Send file to PHP
      $.ajax({
        type:'POST',
        url: url,
        data: formData,
        cache:false,
        contentType: false,
        processData: false,
        success:function(data){
          var returnMessage = getMessage(data);
          var success = getSuccess(data);
          toast(returnMessage);
          if (success) {
            oneSec(function() {
              // Update files list
              reload(".files-section", url, function() {
                $(".modal-trigger").leanModal();
              });
            });
          }
          // Prevent errors upon cancel if user uploads another file
          $("#imageUploadForm").trigger("reset");
        },
        error: function(data){
          toast("An error occurred. Error #: 100");
        }
      });
    }
  });
  
  $(".file-upload").on("change", function(event) {
    $("#imageUploadForm").submit();
  });
  
  // Open Files
  onClick(".open-file", function() {
    var fileID = $(this).attr("file-id");
    var fileUserID = $(this).attr("file-user-id");
    $($(this).attr("href")).load("file.php?id=" + fileID + "&user_id=" + fileUserID + " .modal-content");
  });
  
  // Delete files
  onClick(".file .delete-file", function(e) {
    e.preventDefault;
    var fileID = $(this).parents().eq(2).attr("file");
    postData(url, {delete_file: 1, file_id: fileID}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#file-" + fileID).closeModal();
        $(".open-file[file-id=" + fileID + "]").remove();
      }
    });
  });
  
  /*******
  MESSAGES
  *******/
  
  // Scroll function
  function scrollConversation() {
    $("#conversation").animate({ scrollTop: $('#conversation').prop("scrollHeight")}, 500);
  }
  
  // Mark notifications as read
  onClick(".notifications-button", function() {
    postData("notifications.php", {notifications_read: 1}, () => { var empty = 0; }, true);
    $(this).removeClass("alert-glow");
  });
  
  // Add contact
  onClick(".add-contact-btn", function(e) {
    e.preventDefault();
    var contactUsername = $("#contact-username").val();
    postData(url, {add_contact: 1, contact_username: contactUsername}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#new-contact").closeModal();
        oneSec(function() {
          reload(".contacts-section .collection", url, function() {
            $(".tooltipped").tooltip({delay: 50});
          });
        });
      }
    });
  });
  
  // Load contact messages
  onClick(".contact", function(e) {
    e.preventDefault();
    var contactID = $(this).attr("contact");
    postData(url, {contact_id: contactID}, function(output) {
      var newConversation = $(output).find("#conversation").parent().html();
      $("#conversation").parent().html(newConversation);
      scrollConversation();
    }, true);
  });
  
  // Load unread messages
  onClick(".view-unread", function(e) {
    e.preventDefault();
    getData(url, {empty_var: 1}, function(output) {
      var messages = $(output).find("#conversation").parent().html();
      $("#conversation").parent().html(messages);
    })
  });
  
  // Load new messages
  function loadNewMessages() {
    var contactID = $("#conversation").attr("contact");
    if (contactID) {
      var messageBelow = 0;
      postData(url, {get_messages: 1, contact_id: contactID}, function(output) {
        // Find any messages from other user
        $(output).find(".message-from-sender").each(function(index) {
          // If not already viewed
          if ($(this).parent().attr("viewed") == 0) {
            // Append new message
            var newMessage = $(this).parent().html();
            var finalMessage = "<div class='message-container' viewed='1'>" + newMessage + "</div>";
            $("#conversation").append(finalMessage);
            messageBelow += $(".message-container:last").height();
          }
        }, true);
        // If new message
        if (messageBelow) {
          // If user is scrolled to bottom
          if ($("#conversation").scrollTop() + $("#conversation").innerHeight() + messageBelow + 100 >= $("#conversation")[0].scrollHeight) {
            scrollConversation();
          } else {
            // Alert user of new message
            toast("New message below!");
          }
        }
        // Mark messages as read
        postData(url, {read_messages: 1, contact_id: contactID}, function(output) {

        }, true);
      }, true);
    }
  }
  
  if (inURL("/messages")) {
    setInterval(loadNewMessages, 5000);
  }
  
  // Send message
  $(document).on("keypress", "#messenger-textarea", function(e) {
    // If enter key pressed
    if (e.which == 13) {
      e.preventDefault();
      var contactID = $("#conversation").attr("contact");
      // Get message and send it
      var message = $(this).val();
      $("#messenger-textarea").val("");
      postData(url, {send_message: 1, message: message, get_messages: 1, contact_id: contactID}, function(output) {
        var returnMessage = getMessage(output);
        var success = getSuccess(output);
        toast(returnMessage);
        // If success, load new messages
        if (success) {
          loadNewMessages();
          // Remove "No messages yet"
          if ($("h5:contains('No messages yet')").length) {
            $("h5:contains('No messages yet')").fadeOut();
          }
          // Add user's message
          postData(url, {get_last_message: 1, contact_id: contactID}, function(output) {
            var lastMessage = $(output).find(".message-from-user:last").parent().html();
            $("#conversation").append("<div class='message-container'>" + lastMessage + "</div>");
            scrollConversation();
          }, true);
        } else {
          $("#messenger-textarea").val(message);
        }
      }, true);
    }
  }); 
  
  
  // New invitation
  onClick("#new-invitation .send-invitation", function(e) {
    e.preventDefault;
    var recipient = $.trim($("#new-invitation #recipient").val());
    var level = $("#new-invitation #level").val();
    postData(url, {new_invitation: 1, recipient: recipient, level: level}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#new-invitation").closeModal();
        $("#new-invitation #recipient").val("");
        $("#new-invitation #level").val("");
      }
    });
  });
  
  /***********
  USER PROFILE
  ************/
  
  // Report user
  onClick("#report .send-report", function(e) {
    e.preventDefault();
    var reason = $.trim($("#report #report-reason").val());
    postData(url, {report_user: 1, report_reason: reason}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#report").closeModal();
        $("#report #report-reason").val("");
      }
    });
  });
  
  // Send warning
  onClick("#send-warning .send-warning", function(e) {
    e.preventDefault;
    var warning = $("#send-warning #warning").val();
    postData(url, {send_warning: 1, warning: warning}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#send-warning").closeModal();
        $("#send-warning #warning").val("");
      }
    });
  });
  
  // Function: Update profile stats
  function updateProfileStats() {
    oneSec(function() {
      $(".profile-header .card-content").load(url + " .profile-header .card-content .row");
    });
  }
  
  // Ban
  onClick("#ban .submit-ban", function(e) {
    e.preventDefault;
    var reason = $.trim($("#ban #reason").val());
    var length = parseInt($("#ban #length").val());
    var permanent = parseInt($("#ban #permanent:checked").length);
    var comments = parseInt($("#ban #comments-delete:checked").length);
    var rates = parseInt($("#ban #rates-delete:checked").length);
    var levels = parseInt($("#ban #levels-delete:checked").length);
    var profile = parseInt($("#ban #profile-delete:checked").length);
    var block = parseInt($("#ban #ip-ban:checked").length);
    postData(url, {ban: 1, reason: reason, length: length, permanent: permanent, comments: comments, rates: rates, levels: levels, profile: profile, block: block}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#ban").closeModal();
        updateProfileStats();
        // Change button and text to unban
       $("a[href='#ban']").find(".actions-icon").text("undo");
        $("a[href='#ban']").parent().attr("data-tooltip", "Unban");
        $("a[href='#ban']").removeClass("modal-trigger").addClass("unban-user").attr("href", "").find("p.medium-title").text("Unban");
      }
    });
  });
  
  // Unban
  onClick(".unban-user", function(e) {
    e.preventDefault();
    postData(url, {unban: 1}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        updateProfileStats();
        // Change button and text to ban
        $(".unban-user").find(".actions-icon").text("cancel");
        $(".unban-user").parent().attr("data-tooltip", "Ban");
        $(".unban-user").removeClass("unban-user").addClass("modal-trigger").attr("href", "#ban").find("p.medium-title").text("Ban");
        $(".modal-trigger").leanModal();
        $(".lean-overlay").remove();
      }
    });
  });
  
  // Ignore User
  onClick(".ignore", function(e) {
    e.preventDefault();
    postData(url, {ignore_user: 1}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        // Change button and text to unignore
        $(".ignore").find(".actions-icon").text("check_circle");
        $(".ignore").parent().attr("data-tooltip", "Unignore User");
        $(".ignore").removeClass("ignore").addClass("unignore").find("p.medium-title").text("Unignore User");
      }
    });
  });
  
  // Unignore user
  onClick(".unignore", function(e) {
    e.preventDefault();
    postData(url, {unignore_user: 1}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      var change = $(output).find(".change").html();
      toast(returnMessage);
      if (success) {
        changeToIgnore();
      }
      if (change) {
        changeToIgnore();
      }
    });
  });
  
  // Add to Friends
  onClick(".add-friend", function(e) {
    e.preventDefault();
    postData(url, {add_friend: 1}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        updateProfileStats();
        // Change button and text to remove
        $(".add-friend").find(".actions-icon").text("remove_circle");
        $(".add-friend").parent().attr("data-tooltip", "Remove from Friends List");
        $(".add-friend").removeClass("add-friend").addClass("remove-friend").find("p.medium-title").text("Remove from Friends List");
      }
    });
  });
  
  // Function: change to add friend button
  function changeToAdd() {
    $(".remove-friend").find(".actions-icon").text("person_add");
    $(".remove-friend").parent().attr("data-tooltip", "Add to Friends List");
    $(".remove-friend").removeClass("remove-friend").addClass("add-friend").find("p.medium-title").text("Add to Friends List");
  }
  
  // Function: change to ignore user button
  function changeToIgnore() {
    $(".unignore").find(".actions-icon").text("block");
    $(".unignore").parent().attr("data-tooltip", "Ignore User");
    $(".unignore").removeClass("unignore").addClass("ignore").find("p.medium-title").text("Ignore User");
  }
  
  // Remove Friend on Profile Page
  onClick(".remove-friend", function(e) {
    e.preventDefault();
    postData(url, {remove_friend: 1}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      var change = $(output).find(".change").html();
      toast(returnMessage);
      if (success) {
        updateProfileStats();
        changeToAdd();
      }
      if (change) {
        changeToAdd();
      }
    });
  });
  
  // Remove friend from friends page
  onClick(".friends-remove-friend", function(e) {
    e.preventDefault();
    var friend = parseInt($(this).attr("friend"));
    postData(url, {remove_friend: 1, friend: friend}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      if (success) {
        $(".friends-remove-friend[friend='" + friend + "']").parents().eq(2).slideUp();
      }
      toast(returnMessage);
    });
  });
  
  // Update profile
  onClick(".save-profile", function(e) {
    e.preventDefault();
    var profileContent = tinyMCE.activeEditor.getContent({format: 'raw'});
    postData(url, {update_profile: 1, profile_content: profileContent}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
    });
  });
  
  // Update appearance
  onClick(".save-appearance", function(e) {
    e.preventDefault();
    var backgroundColor = parseInt($("#background").val());
    var backgroundImage = $("#background-image").val();
    var bannerImage = $("#banner-image").val();
    var iconImage = $("#icon-image").val();
    postData(url, {update_appearance: 1, background: backgroundColor, background_image: backgroundImage, banner_image: bannerImage, icon_image: iconImage}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
    });
  });
  
  // Profile banner show more
  onClick(".profile-banner .activator", function(e) {
    e.preventDefault();
    $(".profile-user-icon").fadeOut();
    $(".profile-user-media").fadeOut();
  });
  
  onClick(".profile-banner .banner-hide-reveal", function(e) {
    e.preventDefault();
    $(".profile-user-icon").fadeIn();
    $(".profile-user-media").fadeIn();
  });
  
  /****
  LEVEL
  *****/
  
  var levelID = parseInt($(".level-section").attr("level"));

  var addLevelCallback = function() {
    $("#edit-level .modal-content").html("Loading...");
    $("#add-level select").material_select();
    onClick(".save-level, .publish-level", function(e) {
      e.preventDefault();
      var action;
      if ($(this).hasClass("publish-level")) {
        action = "publish";
      } else {
        action = "save";
      }
      var name = $.trim($("#level-name").val());
      var game = parseInt($("#level-game").val());
      var difficulty = parseInt($("#level-difficulty").val());
      var code = $.trim($("#level-code").val());
      var description = $.trim($("#level-description").val());
      var contributors = $.trim($("#level-contributors").val());
      postData("add-level.php", {action: action, name: name, game: game, difficulty: difficulty, code: code, description: description, contributors: contributors}, function(output) {
        if ($(output).find(".level-success").html()) {
          $(".modal-content").html($(output).find(".level-success").html());
        } else {
          var returnMessage = getMessage(output);
          toast(returnMessage);
        }
      });
    });
  };
  
  var editLevelCallback = function() {
    $("#add-level .modal-content").html("Loading");
    onClick(".save-level, .publish-level", function(e) {
      e.preventDefault();
      var action;
      if ($(this).hasClass("publish-level")) {
        action = "publish";
      } else {
        action = "save";
      }
      var name = $("#level-name").val();
      var game = parseInt($("#level-game").val());
      var difficulty = parseInt($("#level-difficulty").val());
      var code = $.trim($("#level-code").val());
      var description = $.trim($("#level-description").val());
      var contributors = $.trim($("#level-contributors").val());
      postData("edit-level.php", {level_id: levelID, action: action, name: name, game: game, difficulty: difficulty, code: code, description: description, contributors: contributors}, function(output) {
        if ($(output).find(".level-success").html()) {
          $(".modal-content").html($(output).find(".level-success").html());
        } else {
          var returnMessage = getMessage(output);
          var success = getSuccess(output);
          toast(returnMessage);
          if (success) {
            oneSec(function() {
              reload(".level-section", url, function() {
                $("#edit-level").closeModal();
                toast("Updated!");
              });
            });
          }
        }
      });
    });
  }
  
  var deleteLevelCallback = function() {
    onClick(".delete-level-btn, .restore-level-btn", function(e) {
      var action;
      if ($(".delete-level").find("p.medium-title").text() == "Delete Level" || $(".delete-level").parent().attr("data-tooltip") == "Delete Level") {
        action = "delete";
      } else {
        action = "restore";
      }
      e.preventDefault();
      postData("delete-level.php", {level_id: levelID, action: action}, function(output) {
        var returnMessage = getMessage(output);
        var success = getSuccess(output);
        var redirect = $(output).find(".redirect").html();
        toast(returnMessage);
        $("#delete-level").closeModal();
        if ($(".delete-level").find("p.medium-title").text() == "Delete Level" || $(".delete-level").parent().attr("data-tooltip") == "Delete Level") {
          oneSec(function() {
            $(".delete-level").find("p.medium-title").text("Restore Level");
            $(".delete-level").find(".actions-icon").text("restore");
            $(".delete-level").parent().attr("data-tooltip", "Restore Level");
          }); 
        } else {
          $(".delete-level").find("p.medium-title").text("Delete Level");
          $(".delete-level").find(".actions-icon").text("delete");
          $(".delete-level").parent().attr("data-tooltip", "Delete Level");
        }
        updateStats();
        if (redirect) {
          history.back();
        }
      });
    });
  }
  
  var publishLevelCallback = function() {
    $("#publish-level select").material_select();
    onClick("#publish-level-direct", function(e) {
      e.preventDefault();
      var levelID = $.trim($("#level").val());
      postData("publish-level.php", {publish: 1, level_id: levelID}, function(output) {
        if ($(output).find(".level-success").html()) {
          $(".modal-content").html($(output).find(".level-success").html());
        } else {
          var returnMessage = getMessage(output);
          toast(returnMessage);
        }
      });
    });
  };
  
  var playlistOptionsCallback = function() {
    onClick(".update-playlists", function(e) {
      e.preventDefault();
      var addTo = parseInt($("#add-to").val());
      var removeFrom = parseInt($("#remove-from").val());
      postData("playlist-options.php", {level_id: levelID, change_playlists: 1, add_to: addTo, remove_from: removeFrom}, function(output) {
        var returnMessage = getMessage(output);
        var success = getSuccess(output);
        toast(returnMessage);
        if (success) {
          $("#playlist-options").closeModal();
        }
      });
    });
  };
  
  var shareLevelCallback = function() {
    onClick(".send-invitation", function(e) {
      e.preventDefault();
      var to = $("#recipient").val();
      postData("share-level.php", {send_invitation: 1, recipient: to, level_id: levelID}, function(output) {
        var returnMessage = getMessage(output);
        var success = getSuccess(output);
        toast(returnMessage);
        if (success) {
          $("#share-level").closeModal();
        }
      });
    });
  };
  
  var editImagesCallback = function() {
    onClick(".add-image", function(e) {
      e.preventDefault();
      var image = $("#image-url").val();
      postData("edit-images.php", {level_id: levelID, add_image: 1, image: image}, function(output) {
        var returnMessage = getMessage(output);
        var success = getSuccess(output);
        toast(returnMessage);
        if (success) {
          $("#edit-images").closeModal();
          reload(".level-description", url, function() {
            $("#level-images-slider").slider({
              indicators: true,
              height: 200,
              interval: 3000
            });
          });
        }
      });
    });
    onClick(".delete-image", function(e) {
      e.preventDefault();
      var imageID = $(this).attr("image");
      postData("edit-images.php", {delete_image: 1, image_id: imageID, level_id: levelID}, function(output) {
        var returnMessage = getMessage(output);
        var success = getSuccess(output);
        toast(returnMessage);
        if (success) {
          $(".delete-image[image='" + imageID + "']").parent().fadeOut();
          reload(".level-description", url, function() {
            $("#level-images-slider").slider({
              indicators: true,
              height: 200,
              interval: 3000
            });
          });
        }
      });
    });
  }
  
  // Add play to play count
  onClick(".add-play", function(e) {
    postData(url, {add_play: 1}, function(output) {
      console.log("Play recorded!");
    }, true);
  });
  
  $(".level-code-textarea").bind("copy", function() {
    postData(url, {add_play: 1}, function(output) {
      console.log("Play recorded!");
    }, true);
  });
  
  // Add to favorites
  onClick(".favorite", function(e) {
    e.preventDefault();
    postData(url, {favorite: 1}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
      if ($(".favorite").find("p.medium-title").text() == "Add to Favorites" || $(".favorite").parent().attr("data-tooltip") == "Add to Favorites") {
        $(".favorite").find("p.medium-title").text("Remove from Favorites");
        $(".favorite").find(".actions-icon").text("favorite");
        $(".favorite").parent().attr("data-tooltip", "Remove from Favorites");
      } else {
        $(".favorite").find("p.medium-title").text("Add to Favorites");
        $(".favorite").find(".actions-icon").text("favorite_border");
        $(".favorite").parent().attr("data-tooltip", "Add to Favorites");
      }
    });
  });
  
  // Add to play later
  onClick(".later", function(e) {
    e.preventDefault();
    postData(url, {play_later: 1}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
      if ($(".later").find("p.medium-title").text() == "Play Later" || $(".later").parent().attr("data-tooltip") == "Play Later") {
        $(".later").find("p.medium-title").text("Remove from Play Later");
        $(".later").parent().attr("data-tooltip", "Remove from Play Later");
      } else {
        $(".later").find("p.medium-title").text("Play Later");
        $(".later").parent().attr("data-tooltip", "Play Later");
      }
    });
  });
  
  // Add to featured
  onClick(".featured", function(e) {
    e.preventDefault();
    postData(url, {featured: 1}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
      if ($(".featured").find("p.medium-title").text() == "Add to Featured" || $(".featured").parent().attr("data-tooltip") == "Add to Featured") {
        $(".featured").find("p.medium-title").text("Remove from Featured");
        $(".featured").parent().attr("data-tooltip", "Remove from Featured");
      } else {
        $(".featured").find("p.medium-title").text("Add to Featured");
        $(".featured").parent().attr("data-tooltip", "Add to Featured");
      }
    });
  });
  
  
  // Open Game button for games not listed
  if (inURL("/level") && !inURL("/levels")) {
    onClick(".open-game", function(e) {
      e.preventDefault();
      toast("Game in description!");
    });
  }
  
  /*****
  THEMES
  *****/
  
  var changeThemeCallback = function() {
    $("#change-theme .carousel").carousel();
    onClick(".theme-choice", function(e) {
      e.preventDefault();
      var theme = $(this).attr("theme");
      postData("change-theme.php", {change_theme: 1, theme: theme}, function(output) {
        var returnMessage = getMessage(output);
        if (returnMessage) {
          var success = getSuccess(output);
          if (success) {
            if (theme % 2 == 0) {
              $(".theme-type").attr("href", "css/dark.css");
            } else {
              $(".theme-type").attr("href", "css/light.css");
            }
            var themeFile = Math.ceil(theme / 2);
            $(".theme-color").attr("href", "css/" + themeFile + ".css");
            $(".logo-image").attr("src", "images/logos/" + themeFile + ".png");
          } else {
            toast(returnMessage);
          }
        }
      });
    });
  };

  
  /*******
  SETTINGS
  *******/
  
  var settingsCallback = function() {
    // Reinitialize
    $("select").material_select();
    // Update settings
    onClick(".save-settings", function(e) {
      e.preventDefault();
      var notification = parseInt($("#notification").val());
      var action = parseInt($("#action:checked").length);
      var mute = parseInt($("#mute:checked").length);
      var timezone = $("#timezone").val();
      postData("settings.php", {save_settings: 1, notification: notification, action: action, mute: mute, timezone: timezone}, function(output) {
        var returnMessage = getMessage(output);
        var success = getSuccess(output);
        if (success) {
          $("#settings").closeModal();
        }
        toast(returnMessage);
      });
    });
  }
  
  var addNewsCallback = function() {
    $("#edit-post .modal-content").html("Loading...");
    $("#add-news select").material_select();
    $("#add-news textarea").characterCounter();
    onClick(".publish-post", function(e) {
      e.preventDefault();
      var title = $.trim($("#post-title").val());
      var category = parseInt($("#post-category").val());
      var content = $.trim($("#post-content").val());
      postData("add-news.php", {add_post: 1, post_title: title, post_category: category, post_content: content}, function(output) {
        var returnMessage = getMessage(output);
        var success = getSuccess(output);
        toast(returnMessage);
        if (success) {
          $("#add-news").closeModal();
          setTimeout(function() {
            location.reload();
          }, 1000);
        }
      });
    });
  };
  
  var editPostCallback = function() {
    $("#add-news .modal-content").html("Loading...");
    $("#edit-post select").material_select();
    $("#edit-post textarea").characterCounter();
    onClick(".edit-post", function(e) {
      e.preventDefault();
      var title = $.trim($("#post-title").val());
      var category = parseInt($("#post-category").val());
      var content = $.trim($("#post-content").val());
      postData("edit-post.php", {edit_post: 1, post_title: title, post_category: category, post_content: content, post_id: postID}, function(output) {
        var returnMessage = getMessage(output);
        var success = getSuccess(output);
        toast(returnMessage);
        if (success) {
          $("#edit-post").closeModal();
          setTimeout(function() {
            location.reload();
          }, 1000);
        }
      });
    });
  };

  var deletePostCallback = function() {
    onClick(".delete-post-btn", function(e) {
      e.preventDefault();
      postData("delete-post.php", {delete_post: 1, post_id: postID}, function(output) {
        var returnMessage = getMessage(output);
        var success = getSuccess(output);
        toast(returnMessage);
        if (success) {
          $("#delete-post").closeModal();
          setTimeout(function() {
            location.reload();
          }, 1000);
        }
      });
    });
  };
    
  // Edit Post
  $("a[href='#edit-post']").click(function() {
    $("#edit-post").find(".modal-content").html("Loading...");
    postID = $(this).attr("post");
    loadDynamicModal("edit-post", editPostCallback, "post_id", postID);
  });
  
  // Delete post
  $("a[href='#delete-post']").click(function() {
    postID = $(this).attr("post");
    loadDynamicModal("delete-post", deletePostCallback, "post_id", postID);
  });
  
  function initializeModals() {

    loadModal("add-level", addLevelCallback, 1);
    loadDynamicModal("edit-level", editLevelCallback, "level_id", levelID, 1);
    loadDynamicModal("delete-level", deleteLevelCallback, "level_id", levelID, 1);
    loadDynamicModal("playlist-options", playlistOptionsCallback, "level_id", levelID, 1);
    loadModal("publish-level", publishLevelCallback, 1);
    loadModal("change-theme", changeThemeCallback, 1, "modal-mini");
    loadModal("change-theme-mobile", changeThemeCallback, 1);
    loadModal("settings", settingsCallback, 0);
    loadDynamicModal("share-level", shareLevelCallback, "level_id", levelID, 0);
    loadDynamicModal("edit-images", editImagesCallback, "level_id", levelID, 1);
    loadModal("add-news", addNewsCallback);
    
  }
  
  initializeModals();
  
  
  /****
  CBGS
  ****/
  var cbgID;
  onClick(".submit-cbg-button", function() {
    var title = $("#add-cbg #cbg-title").val();
    var description = $("#add-cbg #cbg-description").val();
    var cbgUrl = $("#add-cbg #cbg-url").val();
    postData(url, {add_cbg: 1, title: title, description: description, url: cbgUrl}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#add-cbg").closeModal();
        reload(".cbgs-section", url);
        $("#cbg-url").val("");
        $("#cbg-title").val("");
        $("#cbg-description").val("");
      }
    });
  });
  
  onClick(".edit-cbg", function(e) {
    
    e.preventDefault();
    
    $("#add-cbg #cbg-url").val("");
    $("#add-cbg #cbg-title").val("");
    $("#add-cbg #cbg-description").val("");
    
    cbgID = $(this).parents().eq(2).attr("cbg");
    postData(url, {edit_cbg: 1, cbg_id: cbgID}, function(output) {
      var modalContent = $(output).find("#edit-cbg-content-wrapper").html();
      $("#edit-cbg").html(modalContent);
      $("#edit-cbg").openModal();
    });
                  
  });
  
  onClick(".delete-cbg", function(e) {
    
    e.preventDefault();
    
    cbgID = $(this).parents().eq(2).attr("cbg");
    postData(url, {delete_cbg: 1, cbg_id: cbgID}, function(output) {
      var modalContent = $(output).find("#delete-cbg-content-wrapper").html();
      $("#delete-cbg").html(modalContent);
      $("#delete-cbg").openModal();
    });
    
  });
  
  onClick(".edit-cbg-button", function(e) {
    
    e.preventDefault();
    
    var title = $("#edit-cbg #edit-cbg-title").val();
    var description = $("#edit-cbg #edit-cbg-description").val();
    var cbgUrl = $("#edit-cbg #edit-cbg-url").val();
    postData(url, {submit_edited: 1, title: title, description: description, url: cbgUrl, cbg_id: cbgID}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#edit-cbg").closeModal();
        reload(".cbgs-section", url);
        $("#cbg-url").val("");
        $("#cbg-title").val("");
        $("#cbg-description").val("");
      }
    });
    
  });
  
  onClick(".delete-cbg-button", function(e) {
    
    e.preventDefault();
    
    postData(url, {submit_delete: 1, cbg_id: cbgID}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $("#delete-cbg").closeModal();
        reload(".cbgs-section", url);
      }
    });
    
  });
  
  // CBGs filter function
  function cbgFilter() {
    var search = $.trim($("#search").val());
    var sort = $.trim($("#sort").val());
    getData(url, {search: search, sort: sort}, function(output) {
      var results = $(output).find(".cbgs-section .card-content .row").html();
      $(".cbgs-section .card-content .row").html(results).hide().slideDown("slow");
    });
  }
  
  // CBGs Search
  $("#cbgs .cbgs-section #search").keyup(function() {
    delay(function() {
      cbgFilter();
    }, 1000);
  });
  
  // CBGs sort by
  $("#cbgs #sort").change(function() {
    cbgFilter();
  });
  
  /**************
  LEVEL FILTERING
  **************/
  
//  if (inURL("/levels?")) {
//    filterLevels();
//  }
  
  function delayFilter() {
    delay(function() {
      filterLevels();
    }, 1000);
  }
  
  var name, game, difficulty, minRating, levelClass, sort, playlist;
  function filterLevels() {
    name = $.trim($("#search").val());
    game = $("#game").val();
    difficulty = $("#difficulty").val();
    minRating = $("#min-rating").val();
    levelClass = $.trim($("#level-class").val());
    sort = $.trim($("#sort").val());
    playlist = $.trim($("#playlist").val());
    getData(url, {name: name, game: game, difficulty: difficulty, min_rating: minRating, level_class: levelClass, sort: sort, playlist: playlist}, function(output) {
      // Get results and display them with animation
      var results = $(output).find(".table-container").html();
      $(".table-container").html(results).hide().slideDown("slow");
    });
  }
  
  // check if filter needed immediately
//  if (inURL("/levels")) {
//    name = $.trim($("#search").val());
//    creator = $.trim($("#creator").val());
//    game = $("#game").val();
//    difficulty = $("#difficulty").val();
//    minRating = $("#min-rating").val();
//    levelClass = $.trim($("input[name=level-type]:checked").val());
//    sort = $.trim($("#sort").val());
//
//    // Left to right: filter, value, default
//    var filters = [["name", name, ""], ["creator", creator, ""], ["game", game, "all"], ["difficulty", difficulty, "all"], ["min_rating", minRating, "0"], ["level_class", levelClass, ""], ["sort", sort, "newest"]];
//
//    $.each(filters, function(index, value) {
//      var urlString = value[0] + "=" + value[1] + "&";
//      if (!inURL(value[0] + "=" + value[1] + "&") && value[1] !== value[2]) {
//        filterLevels();
//      }
//    });
//  }
  
  $(".filters-section #creator, .levels-section #search").keyup(function() {
    delayFilter();
  });
  
  $(".filters-section #game, .filters-section #difficulty, .filters-section #min-rating, .sort-section #sort, #level-class").change(function() {
    filterLevels();
  });
  
  $(".filters-section button[type='reset'], .filters-section input[type='radio']").click(function() {
    $("#playlist").val("");
    filterLevels();
  });
  
  // Search functions
  searchResults("#comments .comments-section #search", ".comments");
  searchResults("#friends .friends-section #search", ".friends-section .card-content .row");
  searchResults("#rates .rates-section #search", ".rates-section .card-content .row");
  
  /***********
  MEMBERS PAGE
  ***********/
  
  // Members filter function
  function memberFilter() {
    var search = $.trim($("#search").val());
    var sort = $.trim($("#sort").val());
    getData(url, {search: search, sort: sort}, function(output) {
      var results = $(output).find(".members-section .card-content .row").html();
      $(".members-section .card-content .row").html(results).hide().slideDown("slow");
    });
  }
  
  // Members Search
  $("#members .members-section #search").keyup(function() {
    delay(function() {
      memberFilter();
    }, 1000);
  });
  
  // Members sort by
  $("#members #sort").change(function() {
    memberFilter();
  });
  
  // Verify user
  onClick(".verify-user", function(e) {
    e.preventDefault();
    var userID = $(this).attr("user");
    postData(url, {verify: userID}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      if (success) {
        $(".verify-user[user='" + userID + "']").parents().eq(1).find(".verification").html("Yes");
        $(".verify-user[user='" + userID + "']").parent().html("");
      }
      toast(returnMessage);
    });
  });
  
  // Ignore user
  onClick(".ignore-user", function(e) {
    e.preventDefault();
    var userID = $(this).attr("user");
    postData(url, {ignore: userID}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      if (success) {
        $(".ignore-user[user='" + userID + "']").parents().eq(1).find(".verification").html("No");
      }
      toast(returnMessage);
    });
  });
  
  /*************
  RATE FUNCTIONS
  *************/
  
  // Update level stats
  function updateStats() {
    reload(".level-stats", url);
  }
  
  // On level load
  if (inURL("level.php?") || inURL("level?")) {
    // Put page access time
    let timeAccess = Math.floor(Date.now() / 1000);
    $("body").attr("page-accessed", timeAccess);
  }
  
  // On review typing
  onClick("#content", (e) => {
    // Put review start typing
    if (!$("body").attr("started-typing")) {
      let timeTyping = Math.floor(Date.now() / 1000);
      $("body").attr("started-typing", timeTyping);
    }
  });
  
  // Add Rate
  onClick(".submit-rate", function(e) {
    e.preventDefault();
    var difficulty = parseInt($("#difficulty").val());
    var rating = parseInt($("#rating").val());
    var content = $("#content").val();
    var startedTyping = $("body").attr("started-typing");
    var pageAccessed = $("body").attr("page-accessed");
    postData(url, {submit_rate: 1, difficulty: difficulty, rating: rating, content: content, started_typing: startedTyping, page_accessed: pageAccessed}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        if (!$(".rates").length) {
          var ratesBox = "<div class='row'><div class='col s12 m12 l12'><h5 class='heading comments-heading'>What Others are Saying</h5><div class='collection rates'></div></div></div>";
          $(".level-rates").append(ratesBox);
        }
        $(".rates").prepend("<div class='collection-item rate-container' id='new-rate'></div>");
        $("#new-rate").load(url + " .rates .rate-container:lt(1)", function() {
          $("#new-rate .rate-container").unwrap();
        }).hide().fadeIn("slow");
        $(".level-rates .row").first().slideUp(500, function() {
          $(this).remove();
        });
        updateStats();
      }
    });
  });
  
  // Prepare rate
  function prepareRate() {
    var cancelRate = $(".old-rate").html();
    $(".old-rate").parent().html(cancelRate);
    $(".edit-area").remove();
    $(".delete-area").remove();
  }
  
  // Edit Rate
  onClick(".rate-edit", function(e) {
    e.preventDefault();
    prepareRate();
    var oldRate = $.trim($(this).parents().eq(2).find("p.comment").html());
    var wrappedRate = $("<div>" + oldRate + "</div>");
    wrappedRate.find("br").remove();
    var editableRate = $.trim(wrappedRate.html());
    var editBox = "<div class='edit-area'><textarea name='edit-content' class='materialize-textarea edit-content' length='5000' maxlength='5000'>" + editableRate + "</textarea><div class='col s12'><a class='btn waves-effect post-edit-rate'>Save Changes <i class='material-icons right margin-left-10'>update</i></a></div></div>";
    $(this).parents().eq(2).find("p.comment").html("<div class='old-rate'>" + oldRate + "</div>");
    $(this).parents().eq(2).find("p.comment").append(editBox);
    $(this).parents().eq(2).find("p.comment .old-rate").hide();
    $(".edit-area").hide().fadeIn();
    $('.edit-content').trigger('autoresize');
  });
  
  onClick(".post-edit-rate", function(e) {
    e.preventDefault();
    var editedRate = $(".edit-content").val();
    var rateID = parseInt($(this).parents().eq(5).attr("rate"));
    postData(url, {edit_rate: 1, rate_id: rateID, rate_content: editedRate}, function(output) {
      editedRate = editedRate.replace(/\n/g, "<br>\n");
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      if (success) {
        $(".old-rate").parent().html(editedRate);
      }
      toast(returnMessage);
    });
  });
  
  // Delete rate
  onClick(".rate-delete", function(e) {
    e.preventDefault();
    var rateID = $(this).attr("rate");
    postData(url, {delete_rate: 1, rate_id: rateID}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $(".rate-container[rate=" + rateID + "]").fadeOut(500, function() {
          $(this).remove();
          if (!$(".rate-container").length) {
            $(".rates").parents().eq(1).fadeOut(500, function() {
              $(this).remove();
            });
          }
        });
        // Check if user can re-rate
        $.get(url, function(data) {
          // Check if user can rate in general
          var form = $(data).find(".rate-level-form").html();
          if (form !== undefined && !$(".rate-level-form").length) {
            var formBox = "<div class='row'>" + $(data).find(".level-rates .row").first().html() + "</div>";
            $(".level-rates").prepend(formBox);
            $(".level-rates .row").first().hide().slideDown();
            $("select").material_select();
          }
        });
        updateStats();
      }
    });
  });
  
  // Rate delete from rates page
  onClick("#rates .delete-rate", function(e) {
    e.preventDefault();
    var rateID = $(this).attr("rate");
    postData(url, {remove_rate: 1, rate: rateID}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $(".rate-container[rate='" + rateID + "']").slideUp();
      }
    });
  });
  
  
  
  /****************
  COMMENT FUNCTIONS 
  ****************/
  
  // Add Comment
  onClick(".post-comment", function(e) {
    e.preventDefault();
    var comment = $(".comment-content").val();
    var private = parseInt($(".comment-private:checked").length);
    $(".comment-content").val("");
    $(".comment-content").trigger("autoresize");
    postData(url, {add_comment: 1, comment_content: comment, comment_private: private}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        $(".comments").prepend("<div class='collection-item comment-container' id='new-comment'></div>");
        $("#new-comment").load(url + " .comments .comment-container:lt(1)", function() {
          $("#new-comment").removeAttr("id");
        }).hide().fadeIn("slow");
        var numLoaded = parseInt($(".more-comments").attr("loaded")) + 1;
        $(".more-comments").attr("loaded", numLoaded);
      }
    });
  });
  
  // Comment action
  function prepareAction() {
    var cancelComment = $(".old-comment").html();
    $(".old-comment").parent().html(cancelComment);
    $(".reply-area").remove();
    $(".edit-area").remove();
    $(".delete-area").remove();
  }
  
  // Add Reply
  onClick(".comment-reply", function(e) {
    e.preventDefault();
    prepareAction();
    var replyBox = "<div class='row reply-area'><form class='margin-top-10 col s12' action method='post'><div class='input-field col s12 margin-bottom-10'><textarea name='reply-content' class='materialize-textarea reply-content' length='5000' maxlength='5000'></textarea><label for='reply-content'>Reply:</label></div><div class='col s12'><a class='btn waves-effect post-reply'>Post Reply <i class='material-icons right margin-left-10'>send</i></a></div></form></div>";
    $(this).parents().eq(3).append(replyBox);
    $(".reply-area").hide().fadeIn();
    $(".reply-content").characterCounter();
  });
  
  onClick(".post-reply", function(e) {
    e.preventDefault();
    var reply = $(".reply-content").val();
    var parent_id = parseInt($(this).parents().eq(4).attr("comment"));
    var reply_to = parseInt($(this).parents().eq(4).attr("user"));
    $(".reply-content").val("");
    $(".reply-area").fadeOut();
    postData(url, {add_reply: 1, reply_content: reply, parent_id: parent_id, reply_to: reply_to}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      if (success) {
        var result = $(output).find(".new-reply").html();
        $(".comment-container[comment='" + parent_id + "']").last().after(result);
      }
    });
  });

  // Load More Comments
  onClick(".more-comments", function(e) {
    e.preventDefault();
    var start_at = $(this).attr("loaded");
    postData(url, {more_comments: 1, load_comments: 1, start_at: start_at}, function(output) {
      $(".comments .more-comments-container").before($(output).find(".comments").html());
      $(".more-comments-container").first().remove();
      var numLoaded = parseInt($(".more-comments").attr("loaded")) + 5;
      $(".more-comments").attr("loaded", numLoaded);
    });
  });
  
  // Load More Replies
  onClick(".more-replies", function(e) {
    e.preventDefault();
    var parentID = parseInt($(this).attr("comment"));
    var startAt = parseInt($(this).attr("loaded"));
    postData(url, {more_replies: 1, parent_id: parentID, start: startAt}, function(output) {
      $(".comments .more-replies-container[comment='" + parentID + "']").before($(output).find(".replies").html());
      $(".more-replies-container[comment='" + parentID + "']").remove();
    });
  });
  
  // Delete comment
  onClick(".comment-delete", function(e) {
    e.preventDefault();
    var commentID = $(this).attr("comment");
    postData(url, {delete_comment: 1, comment_id: commentID}, function(output) {
      $(".comment-container[comment=" + commentID + "]").fadeOut();
      $(".more-replies-container[comment=" + commentID + "]").fadeOut();
      var currentLoaded = $(".more-comments").attr("loaded");
      $(".more-comments").attr("loaded", currentLoaded - 1);
      toast("Comment deleted!");
      
    });
  });
  
  // Delete comment (on comments page)
  onClick(".comments-comment-delete", function(e) {
    e.preventDefault();
    var commentID = $(this).attr("comment");
    postData(url, {delete_comment: 1, comment_id: commentID}, function(data) {
      $(".comment-container[comment=" + commentID + "]").fadeOut();
      toast("Comment deleted!");
      
    });
  });
  
  // Delete reply
  onClick(".reply-delete", function(e) {
    e.preventDefault();
    var commentID = $(this).attr("comment");
    postData(url, {delete_comment: 1, comment_id: commentID}, function(output) {
      $(".comment-container[reply=" + commentID + "]").fadeOut();
      var currentLoaded = $(".more-replies").attr("loaded");
      $(".more-replies").attr("loaded", currentLoaded - 1);
      toast("Comment deleted!");
      
    });
  });
  
  // Edit Comment
  var reply;
  onClick(".comment-edit", function(e) {
    e.preventDefault();
    prepareAction();
    var oldComment = $(this).parents().eq(2).find("p.comment").html();
    var wrappedComment = $("<div>" + oldComment + "</div>");
    reply = wrappedComment.find("a.reply-link").wrap('<p/>').parent().html();
    wrappedComment.find("p").remove();
    wrappedComment.find("br").remove();
    var editableComment = $.trim(wrappedComment.html());
    var editBox = "<div class='edit-area'><textarea name='edit-content' class='materialize-textarea edit-content' length='5000' maxlength='5000'>" + editableComment + "</textarea><div class='col s12'><a class='btn waves-effect post-edit'>Save Changes <i class='material-icons right margin-left-10'>update</i></a></div></div>";
    $(this).parents().eq(2).find("p.comment").html("<div class='old-comment'>" + oldComment + "</div>");
    $(this).parents().eq(2).find("p.comment").append(editBox);
    $(this).parents().eq(2).find("p.comment .old-comment").hide();
    $(".edit-area").hide().fadeIn();
    $('.edit-content').trigger('autoresize');
  });
  
  onClick(".post-edit", function(e) {
    e.preventDefault();
    var editedComment = $(".edit-content").val();
    if ($(this).parents().eq(5).hasClass("comment-reply-container")) {
      var commentID = parseInt($(this).parents().eq(5).attr("reply"));
    } else {
      var commentID = parseInt($(this).parents().eq(5).attr("comment"));
    }
    postData(url, {edit_comment: 1, comment_id: commentID, comment_content: editedComment}, function(output) {
      editedComment = editedComment.replace(/\n/g, "<br>\n");
      if ($(".old-comment").parents().eq(3).hasClass("comment-reply-container")) {
        $(".old-comment").parent().html(reply + " " + editedComment);
      } else {
        $(".old-comment").parent().html(editedComment);
      }
      toast("Comment edited!");
    });
  });

  
  /******************
  DASHBOARD FUNCTIONS
  ******************/
  
  // Add Tip
  onClick(".add-tip", function(e) {
    e.preventDefault();
    var tip = $("#tip").val();
    var dyk = parseInt($("#dyk:checked").length);
    postData(url, {add_tip: 1, tip: tip, dyk: dyk}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
      $("#tip").val("");
    });
  });
  
  // Add Playlist
  onClick(".add-playlist-btn", function(e) {
    e.preventDefault();
    var name = $("#playlist-name").val();
    postData(url, {add_playlist: 1, playlist_name: name}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
      $("#add-playlist").closeModal();
    });
  });
  
  // Add notification
  onClick(".send-notification", function(e) {
    e.preventDefault();
    var to = $("#notification-user").val();
    var content = $("#notification-content").val();
    var link = $("#notification-url").val();
    postData(url, {add_notification: 1, to: to, content: content, link: link}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
    });
  });
  
  // Change notice
  onClick(".add-notice", function(e) {
    e.preventDefault();
    var notice = $("#notice-content").val();
    postData(url, {add_notice: 1, notice: notice}, function(output) {
      var returnMessage = getMessage(output);
      toast(returnMessage);
    });
  });
  
  // Mass Comment
  onClick(".send-mass-comment", function(e) {
    e.preventDefault();
    var message = $("#mass-comment-textarea").val();
    toast("Sending...");
    postData(url, {send_mass_comment: 1, mass_comment: message}, function(output) {
      var returnMessage = getMessage(output);
      var success = getSuccess(output);
      toast(returnMessage);
      $("#mass-comment").closeModal();
    });
  });
  
  // Mark report as checked
  onClick(".check-report", function(e) {
    e.preventDefault();
    var reportID = $(this).attr("report-id");
    postData(url, {report_id: reportID}, function(output) {
      $("tr[report-id='" + reportID + "']").fadeOut();
    });
  });
  
  // Emergency text message
  onClick(".send-text", function(e) {
    e.preventDefault();
    var text = $("#text-textarea").val();
    postData(url, {emergency: 1, emergency_message: text}, function(output) {
      var returnMessage = getMessage(output);
      $("#text-textarea").val("");
      toast(returnMessage);
    });
  });
  
  // Delete error
  onClick(".remove-error", function(e) {
    e.preventDefault();
    var errorID = $(this).attr("error-id");
    postData(url, {remove_error: 1, error_id: errorID}, function(output) {
      $("a[error-id='" + errorID + "']").parents().eq(1).fadeOut();
    });
  });
  
  /****
  EXTRA
  ****/
  
//  // Undo delete
//  function activateUndo(type, id) {
//    $(".undo-delete").attr("type", type).attr("delete", id).fadeIn(500);  
//    hideUndo();
//  }
//  
//  function hideUndo() {
//    var timeout = setTimeout(function() {
//      $(".undo-delete").fadeOut(5000);
//    }, 5000);
//    $(".undo-delete").hover(function(e) {
//      $(this).stop();
//      $(this).fadeIn(1);
//      hideUndo();
//      clearTimeout(timeout);
//    });
  //}
//  
//  onClick(".undo-delete", function(e) {
//    e.preventDefault();
//    var deleteID = $(this).attr("delete");
//    var deleteType = $(this).attr("type");
//    postData("index.php", {undo_delete: 1, delete_id: deleteID, delete_type: deleteType}, function(output) {
//      var returnMessage = getMessage(output);
//      var success = getSuccess(output);
//      toast(returnMessage);
//      if (success) {
//        $(".undo-delete").fadeOut(500);
//      }
//    });
//  });
  
  // Accept warning
  onClick(".accept-button", function(e) {
    e.preventDefault();
    postData(url, {accept_warning: 1}, function(output) {
      $(".accept-button").parents().eq(7).fadeOut();
    });
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