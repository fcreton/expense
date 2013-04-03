var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
    	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(errorCB, successCB);
    }
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        $('div#info').html(device.platform + ' ' + device.version);
    },

    // Query the database
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
    }

    // Query the success callback
    function querySuccess(tx, results) {
        var len = results.rows.length;
        var str = '';
        str += "DEMO table: " + len + " rows found.<br />";
        for (var i=0; i<len; i++){
        	str += "Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data + "<br />";
        }
        $('div#info').html(str);
        
    }

    // Transaction error callback
    function errorCB(err) {
    	$('div#info').html("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(errorCB);
    }
    
};

$( document ).ready(function() {
	//launch
	console.log('JQuery Loaded!');
	
	//init
	app.initialize();
	
	$('a#test').click(function( event ) {
        //alert( "Thanks for visiting!" );
        //$('div#info').html('This is a test!');
		app.queryDB();
        event.preventDefault();
    });
});