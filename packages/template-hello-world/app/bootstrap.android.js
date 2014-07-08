require("globals");
global.__extends = require("/modules/extends");

var MainActivity = require("/main");

// This Logic will merge with the iOS bootstrap when the application module from TNS evolves.
app.init({
             getActivity: function(intent) {
                 console.log("intent=" + intent)
                 if (intent.getAction() == android.content.Intent.ACTION_MAIN) {
                     return MainActivity;
                 } else {
                     fail("Unknown action");
                 }
             },

             onCreate: function() {
                 console.log("Application on create called");        
             } 
         });