$(document).ready(function(){
  
	
 
    (function(){
        
    	//登录按钮属性
     	$('body').on('click', '#btn_login', function(e){
    	    e.preventDefault();
    	    window.open("../main/index.html","_self");
    	});
     	
     	
     	$("body").on("click",".side-menu > li > a, .side-menu > li > ul > li > a",function(e){
     		e.preventDefault();
     		var $this = $(this);
     		var href = $this.attr("href");
     		if (href=="")
     			return 
     		$("#main-content").load(href,{},function(){
     			$(".page-title").text(href);
     			
     			if($("[class*='form-validation']")[0]) {
     			    $("[class*='form-validation']").validationEngine();

     			    //Clear Prompt
     			    $('body').on('click', '.validation-clear', function(e){
	     				e.preventDefault();
	     				$(this).closest('form').validationEngine('hide');
     			    });
     			}
     			
     			 
     			
     		});
     	});
     	
     	 //$('#sidebar_right').toggleClass('toggled');
    })();

    
    
   
     
});
