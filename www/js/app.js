/* Function to check for network connectivity */
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() 
{
    /*cordova.plugins.backgroundMode.setDefaults({ title:'ICPAK LIVE', text:'ICPAK LIVE', silent: true});
    
    //check if background action is enabled
    var enabled = cordova.plugins.backgroundMode.isEnabled();
    if(enabled === false)
    {
        // Enable background mode
        cordova.plugins.backgroundMode.enable();
    }

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        
        //clear other timeouts
        //clearTimeout(all_message_timeout);
        //clearTimeout(single_message_timeout);
        
    };
    
    cordova.plugins.backgroundMode.onfailure = function(errorCode) {
        cordova.plugins.backgroundMode.configure({
                        text:errorCode
                    });        
    };*/
	document.addEventListener("backbutton", onBackKeyDown, false);
	//document.addEventListener("menubutton", onMenuKeyDown, false);
}

function back_refresh() {
	// Handle the back button
	myApp.showIndicator();
	
	
	mainView.router.back();
	mainView.router.refreshPage();
	
	myApp.hideIndicator();
}

function onBackKeyDown() {
	// Handle the back button
	
	mainView.router.back();
	// mainView.router.refreshPage();
	// mainView.router.refreshPreviousPage();
}

function onMenuKeyDown() {
	// Handle the back button
	alert('menu button');
}

$(document).ready(function(){
	//window.localStorage.clear();
	myApp.showIndicator();
	setTimeout(function () {
		myApp.hideIndicator();
		
		// change the page to home 
		
		mainView.router.loadPage('dist/about.html');
	 }, 2000);
});

function automatic_login()
{
	myApp.showIndicator();
	//window.localStorage.setItem("logged_in", 'no');
	var logged_in = window.localStorage.getItem("logged_in");
	
	if(logged_in == 'yes')
	{
		var first_login = window.localStorage.getItem("first_login");
		
		if(first_login == 'yes')
		{
			
			mainView.router.loadPage('dist/change_password.html');
		}
		
		else
		{
			
			mainView.router.loadPage('dist/dashboard.html');
		}
	}
		
	else
	{
		
		mainView.router.loadPage('dist/login.html');
	}
	myApp.hideIndicator();
}

$(document).ready(function()
{
	mainView.hideNavbar();
});

$(document).on('pageInit', '.page[data-page="index"]', function (e) 
{
	mainView.hideNavbar();
})

function HideModalPopup() 
{
	$("#ModalBehaviour").hide(); 
}

//Login member
$(document).on("submit","form#login_forum_member",function(e)
{
	e.preventDefault();
	myApp.showIndicator();
	//get form values
	var form_data = new FormData(this);
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.login_to_forum(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				window.localStorage.setItem("email_address", $("input[name=email_address]").val());
				window.localStorage.setItem("password", $("input[name=password]").val());
				window.localStorage.setItem("logged_in", 'yes');
				window.localStorage.setItem("member_no", data.result.member_no);
				window.localStorage.setItem("member_name", data.result.member_name);
				window.localStorage.setItem("date_of_birth", data.result.date_of_birth);
				window.localStorage.setItem("member_id", data.result.member_id);
				window.localStorage.setItem("member_type_id", data.result.member_type_id);
				window.localStorage.setItem("first_login", data.result.first_login);
				//alert(data.result.member_type_id);
				if(data.result.first_login == 'yes')
				{
					
					mainView.router.loadPage('dist/change_password.html');
				}
				
				else
				{
					
					mainView.router.loadPage('dist/dashboard.html');
				}
				myApp.hideIndicator();
				myApp.alert('You have successfully logged in', 'Login Response');
	
			}
			else
			{
				myApp.hideIndicator();
				myApp.alert(''+data.result+'', 'Login Response');
			}
        });
	}
	
	else
	{
		myApp.alert('No internet connection - please check your internet connection then try again', 'Login Error');
	}
	return false;
});

//Login member
$(document).on("submit","form#change_password",function(e)
{
	e.preventDefault();
	myApp.showIndicator();
	//get form values
	var form_data = new FormData(this);
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.change_password(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				myApp.hideIndicator();
				window.localStorage.setItem("first_login", 'no');
				myApp.alert('Password changed successfully', 'Login Response');
				
				mainView.router.loadPage('dist/dashboard.html');
	
			}
			else
			{
				myApp.hideIndicator();
				myApp.alert(''+data.result+'', 'DG');
			}
        });
	}
	
	else
	{
		myApp.alert('No internet connection - please check your internet connection then try again', 'DG');
	}
	return false;
});

function get_profile_details()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	
	service.getProfileDetails().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#my_profile" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
}


//get a logged in user's details
function get_event_user()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	service.get_event_user().done(function (employees) {


		var data = jQuery.parseJSON(employees);
		var first_name = data.member_first_name;
		var email = data.member_email;
		var member_id = data.member_id;
		var member_no = data.member_code;

		window.localStorage.setItem("member_id", member_id);
		window.localStorage.setItem("member_first_name", first_name);
		window.localStorage.setItem("member_email", email);
		window.localStorage.setItem("member_no", member_no);

		$( "#questionForm_email" ).val( email );
		$( "#questionForm_user" ).val( first_name );
		$( "#questionForm_id" ).val( member_id );
		$( "#app_user" ).html( first_name );
	});
}

//get a logged in user's details
function get_social_user()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	service.get_event_user().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		var email = data.member_email;
		var member_id = data.member_id;
		
		$( "#social_member_email1" ).val( email );
		$( "#social_member_id1" ).val( member_id );
		
		$( "#social_member_email2" ).val( email );
		$( "#social_member_id2" ).val( member_id );
		
	});
}

function set_news_data()
{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		service.getallLatesNews().done(function (employees) {
		
		var data = jQuery.parseJSON(employees);
		
		window.localStorage.setItem("news_history", data.result);
		window.localStorage.setItem("total_news", data.total);
	});
}
function load_messages()
{
	var messages = window.localStorage.getItem("news_history");
	$("#icpak_news").html(messages);
}

function change_to_arms()
{
	get_arms_items();
	window.location.href = "arms.html";
}

//Share post
$(document).on("click","a.share_post",function(e)
{
	e.preventDefault();
	
	var message = $( "#content" ).val();
	var subject = $( "#title" ).val();
	var file = $( "#image" ).val();
	var url = null;
	window.plugins.socialsharing.share(
		  message,
		  subject,
		  file,
		  url,
		  function(result) {/*alert('success: ' + result)*/},
		  function(result) {/*alert('error: ' + result)*/}
	 );
	return false;
});

function refresh_sermons_timer()
{
	var service = new EmployeeSermonService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	service.getallLatesSermon().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			var total_sermons = window.localStorage.getItem("total_sermons");
			var new_sermons = data.total_received;
			window.localStorage.setItem("new_sermons", new_sermons);
			
			if(total_sermons != data.total_received)
			{
				window.localStorage.setItem("sermons_list", data.result);
			}
		}
	});
}

function refresh_sermons_display()
{
	var total_sermons = window.localStorage.getItem("total_sermons");
	var new_sermons = window.localStorage.getItem("new_sermons");
	
	//case of new adds
	if(new_sermons != total_sermons)
	{
		window.localStorage.setItem("total_sermons", new_sermons);
		var sermons_list = window.localStorage.getItem("sermons_list");
		$( "#all_sermons" ).html( sermons_list );
	}
}

function get_sermon_description(id)
{
	myApp.showIndicator();
	//var sermon_details = null;
	var sermon_details = window.localStorage.getItem("sermon_details"+id);
	
	if((sermon_details == "") || (sermon_details == null) || (sermon_details == "null"))
	{
		var service = new EmployeeSermonService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.getSermonDetail(id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				window.localStorage.setItem("sermon_details"+id, data.result);
				$( "#sermons_detail" ).html( data.result );
				myApp.hideIndicator();
			}
			
			else
			{
				myApp.alert('Oops. Unable to get sermon', 'DG');
				myApp.hideIndicator();
			}
		});
	}
	
	else
	{
		setTimeout(function () {
			// change the page to home 
			$( "#sermons_detail" ).html( sermon_details );
			myApp.hideIndicator();
		 }, 3000);
	}
}

function refresh_events_timer()
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
			var total_events = window.localStorage.getItem("total_events");
			var new_events = data.total_received;
			window.localStorage.setItem("new_events", new_events);
			
			if(total_events != data.total_received)
			{
				window.localStorage.setItem("events_list", data.result);
			}
		}
	});
}

function refresh_events_display()
{
	var total_events = window.localStorage.getItem("total_events");
	var new_events = window.localStorage.getItem("new_events");
	
	//case of new adds
	if(new_events != total_events)
	{
		window.localStorage.setItem("total_events", new_events);
		var events_list = window.localStorage.getItem("events_list");
		$( "#news_events" ).html( events_list );
	}
}

function get_news_description(id)
{
	myApp.showIndicator();
	
	//get event details
	var event_details = window.localStorage.getItem("event_details"+id);
	//var event_details = null;
	
	if((event_details == "") || (event_details == null) || (event_details == "null"))
	{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.getNewsDetail(id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				window.localStorage.setItem("event_details"+id, data.result);
				$( "#event_details" ).html( data.result );
				myApp.hideIndicator();
			}
			
			else
			{
				myApp.alert('Oops. Unable to get event', 'DG');
				myApp.hideIndicator();
			}
		});
	}
	
	else
	{
		setTimeout(function () {
			// change the page to home 
			$( "#event_details" ).html( event_details );
			myApp.hideIndicator();
		 }, 3000);
	}
	
	//display comments
	window.localStorage.setItem("comment_post_id", id);
	display_comments(id);
}

function display_comments(id)
{
	//get event comments
	var event_comments = window.localStorage.getItem("event_comments"+id);
	//var event_comments = null;
	
	if((event_comments == "") || (event_comments == null) || (event_comments == "null"))
	{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.getNewsComments(id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				window.localStorage.setItem("event_comments"+id, data.result);
				$( "#forum_comments" ).html( data.result );
			}
		});
	}
	
	else
	{
		$( "#event_comments" ).html( event_comments );
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.getNewsComments(id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				window.localStorage.setItem("event_comments"+id, data.result);
				$( "#forum_comments" ).html( data.result );
			}
		});
	}
}

function refresh_blog_timer(id)
{
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	var member_id = window.localStorage.getItem("member_id");
	
	service.getBlogDetail(id, member_id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			var total_blog = window.localStorage.getItem("total_blog"+id);
			var new_blog = data.total_received;
			window.localStorage.setItem("new_blog"+id, new_blog);
			
			if(total_blog != data.total_received)
			{
				window.localStorage.setItem("blog_list"+id, data.result);
			}
		}
	});
}

function refresh_blog_display(id)
{
	var total_blog = window.localStorage.getItem("total_blog"+id);
	var new_blog = window.localStorage.getItem("new_blog"+id);
	var first_load = window.localStorage.getItem("first"+id);
	
	//case of new adds
	if((new_blog != total_blog) && (first_load == 'no'))
	{
		window.localStorage.setItem("total_blog"+id, new_blog);
		var blog_list = window.localStorage.getItem("blog_list"+id);
		$( "#blog_details" ).html( blog_list );
	}
}

function get_blog_description(id)
{
	myApp.showIndicator();
	
	//get event details
	var blog_details = window.localStorage.getItem("blog_details"+id);
	var blog_details = null;
	window.localStorage.setItem("first"+id, 'no');
	
	if((blog_details == "") || (blog_details == null) || (blog_details == "null"))
	{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		var member_id = window.localStorage.getItem("member_id");
		
		service.getBlogDetail(id, member_id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			//alert('here');
			if(data.message == "success")
			{//alert(data.result);
				window.localStorage.setItem("first"+id, 'yes');
				window.localStorage.setItem("blog_details"+id, data.result);
				window.localStorage.setItem("blog_title"+id, data.post_title);
				window.localStorage.setItem("blog_content"+id, data.post_content);
				window.localStorage.setItem("forum_post_id", id);
				$( "#blog_details" ).html( data.result );
				$( "h3#forum-title" ).html( data.post_title );
				myApp.hideIndicator();
			}
			
			else
			{
				myApp.alert('Oops. Unable to get blog', 'DG');
				myApp.hideIndicator();
			}
		});
	}
	
	else
	{
		setTimeout(function () {
			// change the page to home 
			var blog_title = window.localStorage.getItem("blog_title"+id);
			window.localStorage.setItem("post_id", id);
			$( "#blog_details" ).html( blog_details );
			$( "#forum-title" ).html( blog_title );
			myApp.hideIndicator();
		 }, 3000);
	}
	
	var refresh_blog_selection2 = setInterval(function(){ refresh_blog_timer(id) }, 2000);
	var refresh_blog_display2 = setInterval(function(){ refresh_blog_display(id) }, 4000);
}

//Login member
$(document).on("click","a.post-notification",function(e)
{
	var post_id = window.localStorage.getItem("forum_post_id");
	var blog_title = window.localStorage.getItem("blog_title"+post_id);
	var blog_content = window.localStorage.getItem("blog_content"+post_id);
	myApp.addNotification({
		title: blog_title,
		message: blog_content
	});	
});

//Login member
$(document).on("click","a.add-comment",function()
{
	myApp.showIndicator();
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		var member_id = window.localStorage.getItem("member_id");
		var comment = $("#post_comment").val();
		var post_id = window.localStorage.getItem("forum_post_id");
		service.add_comment(comment, post_id, member_id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				myApp.hideIndicator();
				$("#post_comment").val('');
				get_blog_description(post_id);
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
		myApp.alert('No internet connection - please check your internet connection then try again', 'DG');
		myApp.hideIndicator();
	}
	return false;
});

//Login member
$(document).on("submit","form#CommentForm",function(e)
{
	e.preventDefault();
	myApp.showIndicator();
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		var member_id = window.localStorage.getItem("member_id");
		var comment = $("textarea[name=comment]").val();
		var post_id = $("input[name=post_id]").val();
		service.add_comment(comment, post_id, member_id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				myApp.hideIndicator();
				display_comments(post_id);
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
		myApp.alert('No internet connection - please check your internet connection then try again', 'DG');
		myApp.hideIndicator();
	}
	return false;
});

function refresh_forum_timer()
{
	var service = new EmployeeNewsService();
	service.initialize().done(function () {});
	
	var member_type_id = window.localStorage.getItem("member_type_id");
	
	service.get_forum_items(member_type_id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			var total_forum = window.localStorage.getItem("total_forum");
			var new_forum = data.total_received;
			window.localStorage.setItem("new_forum", new_forum);
			
			if(total_forum != data.total_received)
			{
				window.localStorage.setItem("forum_list", data.result);
			}
		}
		
		else
		{
			myApp.hideIndicator();
			// myApp.alert("Please check your membership type then try again", 'Error');
			myApp.alert("Please log in as a member to access the forums", 'Error');
			
			
			mainView.router.loadPage('dist/dashboard.html');
		}
	});
}

function refresh_forum_display()
{
	var total_forum = window.localStorage.getItem("total_forum");
	var new_forum = window.localStorage.getItem("new_forum");
	var forum_list = window.localStorage.getItem("forum_list");
	
	if(forum_list == " ")
	{
		new_forum = total_forum;
		window.localStorage.setItem("total_forum", new_forum);
	}
	
	//case of new adds
	if(new_forum != total_forum)
	{
		window.localStorage.setItem("total_forum", new_forum);
		$( "#all_forums" ).html( forum_list );
	}
}

$(document).on("submit","form#ContactFormHe",function(e)
{
	e.preventDefault();
	myApp.showIndicator();
	
	//get form values
	var form_data = new FormData(this);

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
		});
		
		service.post_contact_us(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				myApp.hideIndicator();
				myApp.alert("Thank you for contact us, we will address your issue and get back to you shortly.", 'DG');
		
			}
			else
			{
				myApp.hideIndicator();
				myApp.alert(data.result, 'DG');
			}
        });
	}
	
	else
	{
		myApp.hideIndicator();
		myApp.alert("No internet connection - please check your internet connection then try again", 'DG');
	}
	return false;
});

//pass the variable in the link as follows e.g. news.html?id=1
//on the news.html page get the parameter by javascript as follows var id = getURLParameter('id');
//the function to get the url parameter is defined below
function getURLParameter(name)
{
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}


function refresh_initiatives_timer()
{
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	service.getallinitiatives().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			var total_initiatives = window.localStorage.getItem("total_initiatives");
			var new_initiatives = data.total_received;
			window.localStorage.setItem("new_initiatives", new_initiatives);
			
			if(total_initiatives != data.total_received)
			{
				window.localStorage.setItem("initiatives_list", data.result);
			}
		}
	});
}

function refresh_initiatives_display()
{
	var total_initiatives = window.localStorage.getItem("total_initiatives");
	var new_initiatives = window.localStorage.getItem("new_initiatives");
	
	//case of new adds
	if(new_initiatives != total_initiatives)
	{
		window.localStorage.setItem("total_initiatives", new_initiatives);
		var initiatives_list = window.localStorage.getItem("initiatives_list");
		$( "#all_initiatives" ).html( initiatives_list );
	}
}

function get_initiative_page(id)
{
	myApp.showIndicator();
	//var sermon_details = null;
	var initiative_items = window.localStorage.getItem("initiative_items"+id);
	//initiative_items = null;
	if((initiative_items == "") || (initiative_items == null) || (initiative_items == "null"))
	{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.getInitativePage(id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				window.localStorage.setItem("initiative_items"+id, data.result);
				$( "#initiative_items" ).html( data.result );
				myApp.hideIndicator();
			}
			
			else
			{
				myApp.hideIndicator();
				myApp.alert('Oops. Unable to get initiatives', 'DG');
			}
		});
	}
	
	else
	{
		setTimeout(function () {
			// change the page to home 
			$( "#initiative_items" ).html( initiative_items );
			myApp.hideIndicator();
		 }, 3000);
	}
}

function get_initiatives_description(id, parent_id)
{
	myApp.showIndicator();
	//var sermon_details = null;
	var initiative_details = window.localStorage.getItem("initiative_details"+id);
	
	if((initiative_details == "") || (initiative_details == null) || (initiative_details == "null"))
	{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.getInitiativeDetail(id,parent_id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				window.localStorage.setItem("initiative_details"+id, data.result);
				$( "#initiatives_detail" ).html( data.result );
				myApp.hideIndicator();
			}
			
			else
			{
				myApp.alert('Oops. Unable to get initiative', 'DG');
				myApp.hideIndicator();
			}
		});
	}
	
	else
	{
		setTimeout(function () {
			// change the page to home 
			$( "#initiatives_detail" ).html( initiative_details );
			myApp.hideIndicator();
		 }, 3000);
	}
}