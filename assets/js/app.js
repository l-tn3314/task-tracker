// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import "bootstrap";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

$(function() {
  function create_timeblock(starttime, endtime) {
    let newTimeblock = "<div>Added: " + starttime + " - " + endtime + "</div>"
    $('#added-timeblocks').append(newTimeblock); 
  }

  $('.timeblock-create-button').click((ev) => {
    let task_id = $(ev.target).data('task-id');
    let starttime = $('#create-timeblock-start').val();
    let endtime = $('#create-timeblock-end').val();

    let text = JSON.stringify({
      timeblock: {
        task_id: task_id,
        starttime: starttime,
        endtime: endtime,
      }
    });  
    
    $.ajax(timeblock_path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: text,
      success: (resp) => {
        console.log("success");
        create_timeblock(starttime, endtime);
      },
      error: (resp) => {
        console.log(resp);
        alert("failed to create - format should be: \nYYYY-MM-DD HH:MM:SS");
      },
    }); 
  });

  $('.timeblock-update-button').click((ev) => {
    let timeblock_id = $(ev.target).data('timeblock-id');
    console.log("update button click");
    let starttime = $('#timeblock-start-' + timeblock_id).val();
    let endtime = $('#timeblock-end-' + timeblock_id).val();  

    let text = JSON.stringify({
      timeblock: {
        starttime: starttime,
        endtime: endtime,
      }
    });

    $.ajax(`${timeblock_path}/${timeblock_id}`, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: text,
      success: (resp) => {
        alert("update successful!");
        console.log("success");
      },
      error: (resp) => {
        alert("failed to update - format should be: \nYYYY-MM-DD HH:MM:SS");
        console.log(resp);
      },
    });
  });

  $('.timeblock-delete-button').click((ev) => {
    let timeblock_id = $(ev.target).data('timeblock-id');
    console.log("delete button click");
    
    $.ajax(`${timeblock_path}/${timeblock_id}`, {
      method: "delete",
      success: (resp) => {
        console.log("deleted")
        $('#timeblock-' + timeblock_id).remove(); 
      },
      error: (resp) => {
        console.log(resp);
      },
    });
  });
});
