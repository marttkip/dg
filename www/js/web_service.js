//login & registration functions
var Login_service = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id});
    }

    this.register_member = function(form_data) {
		var request = url + "login/register_user";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.login_to_forum = function(form_data) {
		var request = url + "login/login_forum_member";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.change_password = function(form_data) {
		var request = url + "login/change_password";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.login_automatic_to_forum = function(email_address_old,member_number_old) {
		var request = url + "login/login_forum_member";
        return $.ajax({url: request, data: {email_address :email_address_old ,member_number: member_number_old}, type: 'POST', processData: false,contentType: false});
    }
    this.getProfileDetails = function() {
		var request = url + "login/get_client_profile";
        return $.ajax({url: request});
    }
    this.registerProfessional = function(form_data) {
        var request = url + "login/register_professional";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

}

var EmployeeSermonService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id});
    }

    this.getallLatesSermon = function() {
		var request = url + "sermons/get_sermons" ;
        return $.ajax({url: request});
    }

    this.getLatestSermon = function() {
		var request = url + "sermons/get_latest_sermon" ;
        return $.ajax({url: request});
    }
    this.getSermonDetail = function(id) {
		var request = url + "sermons/get_sermons_detail" ;
        return $.ajax({url: url + "sermons/get_sermons_detail/" + id});
    }
}

var EmployeeNewsService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id});
    }
	
	this.get_forum_items = function(member_type_id)
	{
		if(member_type_id == 1)
		{
			var request = url + "news/get_blog_items/29" ;
			return $.ajax({url: request});
		}
		else if(member_type_id == 2)
		{
			var request = url + "news/get_blog_items/31" ;
			return $.ajax({url: request});
		}
		else if(member_type_id == 3)
		{
			var request = url + "news/get_blog_items/30" ;
			return $.ajax({url: request});
		}
		else if(member_type_id == 4)
		{
			var request = url + "news/get_blog_items/27" ;
			return $.ajax({url: request});
		}
		else
		{
			return false;
		}
	}

    this.get_junior = function() {
		var request = url + "news/get_blog_items/29" ;
        return $.ajax({url: request});
    }
    this.get_influencers = function() {
		var request = url + "news/get_blog_items/30" ;
        return $.ajax({url: request});
    }

    this.get_professionals = function() {
		var request = url + "news/get_blog_items/31" ;
        return $.ajax({url: request});
    }

    this.get_investors = function() {
		var request = url + "news/get_blog_items/27" ;
        return $.ajax({url: request});
    }

    this.getallLatesNews = function() {
		var request = url + "news/get_news" ;
        return $.ajax({url: request});
    }
    this.getNewsDetail = function(id) {
		var request = url + "news/get_news_detail" ;
        return $.ajax({url: url + "news/get_news_detail/" + id});
    }
    this.getBlogDetail = function(id, member_id) {
		var request = url + "news/get_forum_comments" ;
        return $.ajax({url: url + "news/get_forum_comments/" + id + "/" + member_id});
    }
    this.post_contact_us = function(form_data) {
		var request = url + "queries/contact_us";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

    this.getNewsComments = function(id) {
        return $.ajax({url: url + "news/get_news_comments/" + id});
    }
    this.getallinitiatives = function() {
		var request = url + "initiatives/get_initiatives" ;
        return $.ajax({url: request});
    }
    this.getInitiativeDetail = function(id,parent_id) {
		var request = url + "initiatives/get_news_detail" ;
        return $.ajax({url: url + "initiatives/get_initiative_detail/"+id+"/"+parent_id});
    }
    this.getallarms = function() {
		var request = url + "arms/get_arms" ;
        return $.ajax({url: request});
    }
    this.getArmsDetail = function(id) {
		var request = url + "arms/get_news_detail" ;
        return $.ajax({url: url + "arms/get_arms_detail/" + id});
    }
    this.getInitativePage = function(id) {
		var request = url + "initiatives/get_initiative_page" ;
        return $.ajax({url: url + "initiatives/get_initiative_page/" + id});
    }
    this.getCollegeDetail = function(id) {
		var request = url + "bible_school/get_college_details" ;
        return $.ajax({url: url + "bible_school/get_college_details/" + id});
    }
    this.getbibleschooldetail = function() {
		var request = url + "bible_school/get_bible_school_detail" ;
        return $.ajax({url: request});
    }
    this.add_comment = function(comment, post_id, member_id) {
		var request = url + "news/add_comment" ;
        return $.ajax({url: request, data: {comment :comment, post_id: post_id, member_id: member_id}, type: 'POST'});
    }
}