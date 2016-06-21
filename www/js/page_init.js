var refresh_ads_selection;
var refresh_ads_display;

$$(document).on('pageInit', '.page[data-page="login-screen"]', function (e) 
{
	automatic_login();
	myApp.hideIndicator();
})

$$(document).on('pageInit', '.page[data-page="change-password-screen"]', function (e) 
{
	$('#change_password_member_email').val(window.localStorage.getItem("email_address"));
})

$$(document).on('pageInit', '.page[data-page="influencers"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_influencers().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#influencers_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("influencers_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
})
$$(document).on('pageInit', '.page[data-page="juniors"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_junior().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#junior_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			$( "#junior-button" ).addClass( "display_none" );
			$( "#junior-message" ).addClass( "display_block" );
			window.localStorage.setItem("junior_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
})

$$(document).on('pageInit', '.page[data-page="professionals"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_professionals().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#professionals_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("professionals_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
});

$$(document).on('pageInit', '.page[data-page="investors"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_investors().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#investors_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("investors_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
});

$$(document).on('pageInit', '.page[data-page="sermons"]', function (e) 
{
	myApp.showIndicator();
	
	var sermons_list = window.localStorage.getItem("sermons_list");
	if((sermons_list == "") || (sermons_list == null) || (sermons_list == "null"))
	{
		var service = new EmployeeSermonService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.getallLatesSermon().done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				$( "#all_sermons" ).html( data.result );
				window.localStorage.setItem("sermons_list", data.result);
				window.localStorage.setItem("total_sermons", data.total_received);
			}
		});
	}
	
	else
	{
		$( "#all_sermons" ).html( sermons_list );
	}
	
	refresh_ads_selection = setInterval(function(){ refresh_sermons_timer() }, 20000);
	refresh_ads_display = setInterval(function(){ refresh_sermons_display() }, 30000);
	
	myApp.hideIndicator();
	
	// Pull to refresh advertisments
	var ptrContent = $$('.pull-to-refresh-sermons-content');
	 
	// Add 'refresh' listener on it
	ptrContent.on('refresh', function (e) {
		// Emulate 2s loading
		setTimeout(function () {
			var service = new EmployeeSermonService();
			service.initialize().done(function () {
				console.log("Service initialized");
			});
			
			service.getallLatesSermon().done(function (employees) {
				var data = jQuery.parseJSON(employees);
				
				if(data.message == "success")
				{
					$( "#all_sermons" ).html( data.result );
					window.localStorage.setItem("sermons_list", data.result);
					window.localStorage.setItem("total_sermons", data.total_received);
					myApp.pullToRefreshDone(ptrContent);
				}
			});
		}, 2000);
	});
});

$$(document).on('pageInit', '.page[data-page="event-page"]', function (e) 
{
	myApp.showIndicator();
	
	var events_list = window.localStorage.getItem("events_list");
	if((events_list == "") || (events_list == null) || (events_list == "null"))
	{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		//get client's credentials
		
		service.getallLatesNews().done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				$( "#news_events" ).html( data.result );
				window.localStorage.setItem("events_list", data.result);
				window.localStorage.setItem("total_events", data.total_received);
			}
		});
	}
	
	else
	{
		$( "#news_events" ).html( events_list );
	}
	
	var refresh_events_selection = setInterval(function(){ refresh_events_timer() }, 20000);
	var refresh_events_selection = setInterval(function(){ refresh_events_display() }, 30000);
	
	myApp.hideIndicator();
	
	// Pull to refresh advertisments
	var ptrContent = $$('.pull-to-refresh-events-content');
	 
	// Add 'refresh' listener on it
	ptrContent.on('refresh', function (e) {
		// Emulate 2s loading
		setTimeout(function () {
			var service = new EmployeeNewsService();
			service.initialize().done(function () {
				console.log("Service initialized");
			});
			
			//get client's credentials
			
			service.getallLatesNews().done(function (employees) {
				var data = jQuery.parseJSON(employees);
				
				if(data.message == "success")
				{
					$( "#news_events" ).html( data.result );
					window.localStorage.setItem("events_list", data.result);
					window.localStorage.setItem("total_events", data.total_received);
					myApp.pullToRefreshDone(ptrContent);
				}
			});
		}, 2000);
	});

});

$$(document).on('pageInit', '.page[data-page="single-event"]', function (e) 
{
	var comment_post_id = window.localStorage.getItem("comment_post_id");
	$("#comment_post_id").val(comment_post_id);
});

$$(document).on('pageInit', '.page[data-page="forum"]', function (e) 
{
	myApp.showIndicator();
	
	var web_service = new EmployeeNewsService();
	web_service.initialize().done(function () {
		console.log("Service initialized");
	});
	var member_type_id = window.localStorage.getItem("member_type_id");
		
	var forum_list = window.localStorage.getItem("forum_list");
	//forum_list = null;
	
	if((forum_list == "") || (forum_list == null) || (forum_list == "null"))
	{
		if(member_type_id > 0)
		{
			web_service.get_forum_items(member_type_id).done(function (employees) {
				var data = jQuery.parseJSON(employees);
				
				if(data.message == "success")
				{
					$( "#all_forums" ).html( data.result );
					window.localStorage.setItem("forum_list", data.result);
					window.localStorage.setItem("total_forum", data.total_received);
				}
				
				else
				{
					myApp.hideIndicator();
					myApp.alert(data.result, 'Error');
				}
			});
		}
		
		else
		{
			// myApp.hideIndicator();
			// myApp.alert("Please check your membership type then try again", 'Error');
			myApp.alert("Please log in as a member to access the forums", 'Error');
			
			var mainView = myApp.addView('.view-main');
			mainView.router.loadPage('dist/dashboard.html');
		}
	}
	
	else
	{
		$( "#all_forums" ).html( forum_list );
	}
	
	refresh_ads_selection = setInterval(function(){ refresh_forum_timer() }, 20000);
	refresh_ads_display = setInterval(function(){ refresh_forum_display() }, 30000);
	
	myApp.hideIndicator();
	
	// Pull to refresh advertisments
	var ptrContent = $$('.pull-to-refresh-forum-content');
	 
	// Add 'refresh' listener on it
	ptrContent.on('refresh', function (e) {
		// Emulate 2s loading
		setTimeout(function () {
			web_service.get_forum_items(member_type_id).done(function (employees) {
				var data = jQuery.parseJSON(employees);
				
				if(data.message == "success")
				{
					$( "#all_forums" ).html( data.result );
					window.localStorage.setItem("forum_list", data.result);
					window.localStorage.setItem("total_forum", data.total_received);
					myApp.pullToRefreshDone(ptrContent);
				}
				
				else
				{
					// myApp.hideIndicator();
					// myApp.alert("Please check your membership type then try again", 'Error');
					myApp.alert("Please log in as a member to access the forums", 'Error');
			
					var mainView = myApp.addView('.view-main');
					mainView.router.loadPage('dist/dashboard.html');
				}
			});
		}, 2000);
	});
});

$$(document).on('pageInit', '.page[data-page="single-event"]', function (e) 
{
});

$$(document).on('pageInit', '.page[data-page="dashboard"]', function (e) 
{
	var member_type_id = window.localStorage.getItem("member_type_id");

	if(member_type_id == null)
	{
		$( "#footer-links" ).removeClass( "display_none" );
		$( "#sign-in-button" ).removeClass( "display_none" );
	}
	else
	{
		$( "#footer-links" ).addClass( "display_none" );
		$( "#sign-in-button" ).addClass( "display_none" );
		
	}
});

$$(document).on('pageInit', '.page[data-page="blog-single"]', function (e) 
{
	var post_id = window.localStorage.getItem("forum_post_id");
	$("#forum_post_id").val(post_id);
});

	