/* Function to check for network connectivity */

function is_connected()
{
	navigator.network.isReachable(base_url, function(status) {
		var connectivity = (status.internetConnectionStatus || status.code || status);
		if (connectivity === NetworkStatus.NOT_REACHABLE) {
			return false;
			//alert("No internet connection - we won't be able to show you any maps");
		} else {
			return true;
			//alert("We can reach Google - get ready for some awesome maps!");
		}
	});
}

// document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready

function onDeviceReady() {   

	$( "#loader-wrapper" ).addClass( "display_none" );
	var bible_school_detail = window.localStorage.getItem("bible_school_detail");
	var college_detail = window.localStorage.getItem("college_detail");


	$( "#bible_school_detail").html(bible_school_detail);
    $( "#college_detail").html(college_detail);
}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	//automatic_login();
});

function get_news_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallLatesNews().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#icpak_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("news_history", data.result);
			window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{

		}
	});
}

function get_initiative_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallinitiatives().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			// alert(data.result);
			$( "#initiatives_list" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("initiatives_list", data.result);
			// window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{

		}
	});
}

function get_arms_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallarms().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );

			$( "#arms_list" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("arms_list", data.result);
			// window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			var arms_list = window.localStorage.getItem("arms_list");
			$( "#arms_list").html(arms_list);
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
}

function get_college_details(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getCollegeDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// alert(data.result);
			$( "#college_detail" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("college_detail", data.result);
		}
		
		else
		{
			var college_detail = window.localStorage.getItem("college_detail");
			$( "#college_detail").html(college_detail);
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
}


function bible_school_detail()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getbibleschooldetail().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#bible_school_detail" ).addClass( "display_block" );
			$( "#bible_school_detail" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("bible_school_detail", data.result);
		}
		
		else
		{
			var bible_school_detail = window.localStorage.getItem("bible_school_detail");
			$( "#bible_school_detail").html(bible_school_detail);
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
}


function get_arms_description(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getArmsDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );

			$( "#arms_detail" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );

		}
		
		else
		{

		}
	});
}

//pass the variable in the link as follows e.g. news.html?id=1
//on the news.html page get the parameter by javascript as follows var id = getURLParameter('id');
//the function to get the url parameter is defined below
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}




