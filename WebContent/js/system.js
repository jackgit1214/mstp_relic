if(typeof jQuery === "undefined"){
	throw new Error("system requires jQuery");
};

$(document).ready(
	function() {
		(function() {
			// 登录按钮属性
			$('body').on('click', '#btn_login', function(e) {
				e.preventDefault();
				window.open("../main/index.html", "_self");
			});
			$("body").on("click",".side-menu > li > a, .side-menu > li > ul > li > a",function(e) {
				e.preventDefault();
				var $this = $(this);
				var href = $this.attr("href");
				if (href == "") return  ;
				$("#main-content").load(href,{},function() {
					//$(".page-title").text(href);
					if ($("[class*='form-validation']")[0]) {
						$("[class*='form-validation']").validationEngine();
						$('body').on('click','.validation-clear',function(e) {
							e.preventDefault();
							$(this).closest('form').validationEngine('hide');
						});			
					};
				});
			});				

	})();
	$.SystemApp.controlSidebar.activate();
});


///系统控制脚本
$.SystemApp = {};

$.SystemApp.options = {
	controlSidebarOptions : {
		// 控制sidebar选择器
		toggleBtnSelector : "[data-toggle='control-sidebar']",
		// sidebar选择器
		selector : ".control-sidebar",
		
		slide : true
	}
};

/*
 * ControlSidebar ============== Adds functionality to the right sidebar
 * 
 * @type Object @usage $.AdminLTE.controlSidebar.activate(options)
 */
$.SystemApp.controlSidebar = {

	// instantiate the object
	activate : function() {
		// Get the object
		var _this = this;
		// Update options
		var o = $.SystemApp.options.controlSidebarOptions;
		// Get the sidebar
		var sidebar = $(o.selector);
		// The toggle button
		var btn = $(o.toggleBtnSelector);

		// Listen to the click event
		btn.on('click', function(e) {
			e.preventDefault();
			// If the sidebar is not open
			if (!sidebar.hasClass('control-sidebar-open')
					&& !$('body').hasClass('control-sidebar-open')) {
				// Open the sidebar
				_this.open(sidebar, o.slide);
			} else {
				_this.close(sidebar, o.slide);
			}
		});

		// If the body has a boxed layout, fix the sidebar bg position
		var bg = $(".control-sidebar-bg");
		_this._fix(bg);

		// If the body has a fixed layout, make the control sidebar fixed
		if ($('body').hasClass('fixed')) {
			_this._fixForFixed(sidebar);
		} else {
			// If the content height is less than the sidebar's height, force
			// max height
			if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
				_this._fixForContent(sidebar);
			}
		}
	},
	// Open the control sidebar
	open : function(sidebar, slide) {
		
		// Slide over content
		if (slide) {
			sidebar.addClass('control-sidebar-open');
		} else {
			// Push the content by adding the open class to the body instead
			// of the sidebar itself
			$('body').addClass('control-sidebar-open');
		}
	},
	// Close the control sidebar
	close : function(sidebar, slide) {
		
		if (slide) {
			sidebar.removeClass('control-sidebar-open');
		} else {
			$('body').removeClass('control-sidebar-open');
		}
	},
	_fix : function(sidebar) {
		var _this = this;
		if ($("body").hasClass('layout-boxed')) {
			sidebar.css('position', 'absolute');
			sidebar.height($(".wrapper").height());
			if (_this.hasBindedResize) {
				return;
			}
			$(window).resize(function() {
				_this._fix(sidebar);
			});
			_this.hasBindedResize = true;
		} else {
			sidebar.css({
				'position' : 'fixed',
				'height' : 'auto'
			});
		}
	},
	_fixForFixed : function(sidebar) {
		sidebar.css({
			'position' : 'fixed',
			'max-height' : '100%',
			'overflow' : 'auto',
			'padding-bottom' : '50px'
		});
	},
	_fixForContent : function(sidebar) {
		$(".content-wrapper, .right-side").css('min-height', sidebar.height());
	}
};