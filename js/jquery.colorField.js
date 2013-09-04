// Stuart Romanek
// Party Time, Excellent
// http://romanek.us

$.pluginName = {
     id: 'colorField'
    ,version: '0.1'
};

$.fn.extend({
  colorField: function (options) {

    // A default of lum: 50 prevents either total white or total black on init
    var defaults = {
        color: {
          hue: 0,
          sat: 0,
          lum: 50
        },
        style:{
          hsl: 'hsl(0, 0%, 50%)'
          // rgb: ,
          // rgba: ,
          // hex : 
          // hsl: 'hey'
        },

        events: {
          click: null,
          mousemove: null,
          mousewheel: null,
          update: null
        }
        
    }

    var $self = this;
    var $el = $self.element;
    
    // Create the settings object
    // extend the default settings with user settings, deep copy
    $self.settings = {};
    $self.settings = $.extend(true, defaults, options);

    $self.on({
      mousemove: function(e){

        // Get X and Y position of element
        $self.x = e.pageX - $self.offset().left;
        $self.y = e.pageY - $self.offset().top;

        // Get height and width of element
        $self.h = $self.height();
        $self.w = $self.width();

        // Hue is determined by the mouse position along the X axis of the element.
        // Figure out what percentage along the X axis the mouse is and * 360 to get the relative hue
        // (0% left = hue 0, 100% left = hue 360)
        $self.settings.color.hue = Math.round($self.x / $self.w * 360);

        // Saturation is determined by the mouse position along the Y axis of element
        // Saturtion is a 100 based value, so find the relative percentage of the mouse position
        $self.settings.color.sat = Math.round(($self.y - $(window).scrollTop()) / $self.w * 100);

        $self.update();

        // If the user has passed any additional mousemove events, fire them
        if ($self.settings.events.mousemove){
          $self.settings.events.mousemove($self.settings.color);
        }
      },
      mousewheel: function(e){

        // Luminosity is based on the users scroll wheel movements
        // If the user scroll up, increment the lum and vice versa
       if(e.originalEvent.wheelDelta /120 > 0) {
          if ($self.settings.color.lum < 100){
            $self.settings.color.lum++;
          }
        }
        else{
          if($self.settings.color.lum > 0){
            $self.settings.color.lum--;
          }
        }
        $self.update();

        // Any additional mousewheel events, fire
        if ($self.settings.events.mousewheel){
          $self.settings.events.mousewheel($self.settings.color);
        }

        // Prevent browser scroll events 
        e.preventDefault();
      }
    });

    $self.update = function()
    {
      // Update the plugin instance's background to reflect changes
     $self.css('background-color', 'hsl('+$self.settings.color.hue+','+$self.settings.color.sat+'%, '+$self.settings.color.lum+'%)');

     // A user passed Update function can be userful to bind events that fire on both mousemove and mousewheel
     // Would a beforeUpdate / afterUpdate be useful user events?
      if ($self.settings.events.update){
        $self.settings.events.update($self.settings.color);
      }
    }

    $self.init = function(){
      // Set initial world
      $self.update();
      return $self;
    }

    // Set up any additional user events
    if ($self.settings.events.click){
      $self.on({
        click: function(){
          $self.settings.events.click($self.settings.color, $self.settings.style);
        }
      });
    }

    // Go
    $self.init();

  }
})