/* --------------
   These are here if needed. This file is not being included yet.
   -------------- */

jQuery(document).ready(function($) {


  /*
   * => FEATURE BOX LINKS (AUTO ADD LINKS TO ICON)
   * ---------------------------------------------------------------------------*/
  $('.x-feature-box').each(function() {
    var self = $(this),
        icon_href = self.find('.x-feature-box-text a:last-child').attr('href');
    if ( icon_href.length > 0 ) {
      $(self).find('.x-feature-box-graphic-inner > *').wrap(function() {
        return '<a href="' + icon_href + '" target="_blank"></a>';
      });
    }
  });


  /*
   * => FULL SCREEN
   * => Author: William <hello@bigwilliam.com>
   * ---------------------------------------------------------------------------*/
  var fullscreenStuff = function(element, minusEl) {
    var thisH, totalMinus=0, newHeight=0, windowH=jQuery(window).height();
    if (minusEl.length > 0) {
      for ( var i=0; i<minusEl.length; i++) {
        thisH = jQuery(minusEl[i]).outerHeight( true );
        totalMinus += thisH;
      }
    }
    newHeight = windowH - totalMinus;
    // Fullscreen this sucker
    jQuery(element).outerHeight(newHeight);
  };
  
  var activateFullscreen = function() {
    // EDIT THE PARAMETERS BELOW
    // Parameter 1 is the element to become fullscreen
    // Parameter 2 is an array of other elements to subtract from the calculation (keeps them on the screen also)
    fullscreenStuff('#fullscreenMe', ['#keepOnScreen', '#wpadminbar', '.masthead']);
  };
  activateFullscreen();
  
  // Re-calculate if window resized
  window.onresize = function() {
    var doit;
    clearTimeout(doit);
    doit = setTimeout(function() {
      activateFullscreen();
    }, 100);
  };


  /*
   * => VERTICAL ALIGN ELEMENTS. Use CSS flex first, or use JS as backup.
   * ---------------------------------------------------------------------------*/

  var verticalAlign = function(items) {}


  /*
   * => WAIT FOR FINAL EVENTS: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
   * ---------------------------------------------------------------------------*/

  var waitForFinalEvent = (function() {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();


  /*
   * => READMORE LINKS. Use these if the readmore.js library is included
   * ---------------------------------------------------------------------------*/
  

  $('.readmore').readmore({
    collapsedHeight: 155,
    moreLink: '<a href="#" class="read-more-link">Read more</a>',
    lessLink: '<a href="#" class="read-less-link">Close</a>'
  });

  $('.readmore-small').readmore({
    collapsedHeight: 55,
    moreLink: '<a href="#" class="read-more-link">Read more</a>',
    lessLink: '<a href="#" class="read-less-link">Close</a>'
  });

  
  /*
   * => TRANSPARENT NAV - CHANGES IT WHEN PAGE IS SCROLLED
   * ---------------------------------------------------------------------------*/
  

  if ( $("body").hasClass("transparent-nav") ) {     
    var scroll_pos = 0;
    $(document).scroll(function() { 
      scroll_pos = $(this).scrollTop();
      if(scroll_pos > 50) {
        $("body.transparent-nav").addClass('fill-nav');
      } else {
        $("body.transparent-nav").removeClass('fill-nav');
      }
    });
  }



  /*
   * => SCROLL TO SECITON BASED ON PARAMETER IN URL
   * => Usage example: "www.example.com/?open=secondDiv"
   *
   * => X may come with this built-in already. TODO: verify this.
   * ---------------------------------------------------------------------------*/
  

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  /* Check URL for the parameter */
  

  var open = getUrlParameter('open');

  if ( open !== undefined ) {
    // var anchor = '#' + openanchor;
    setTimeout(function() {
      var anchor = $(".content #" + open);
      var theOffset = $(anchor).offset();
      $('body,html').animate({ scrollTop: theOffset.top - 100 });
    }, 410); 
  }

});

/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 * This method is used in the Sage WP Boilerplate theme
 * https://github.com/roots/sage/blob/master/assets/scripts/main.js
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.