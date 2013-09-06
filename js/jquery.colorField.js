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
        style:{},
        events: {
          click: null,
          mousemove: null,
          mousewheel: null,
          update: null
        },
        active: true
        
    }

    var $self = this;
    var $el = $self.element;
    
    // Create the settings object
    // extend the default settings with user settings, deep copy
    $self.settings = {};
    $self.settings = $.extend(true, defaults, options);

    $self.on({
      mousemove: function(e){

        if ($self.settings.active == true){
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

          // If the user has passed any additional mousemove events, fire them
          if ($self.settings.events.mousemove){
            $.proxy( $self.settings.events.click($self), $self );
          }
        }

        $self.update();

      },
      mousewheel: function(e){

        if ($self.settings.active == true){
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

          // Any additional mousewheel events, fire
          if ($self.settings.events.mousewheel){
            $.proxy( $self.settings.events.mousewheel($self), $self );
          }
        }

        $self.update();

        // Prevent browser scroll events 
        e.preventDefault();
      }
    });

    $self.update = function()
    {
      
      // Do color conversions
      $self.settings.color.rgb = $self.toRGB($self.settings.color.hue / 360, $self.settings.color.sat / 100, $self.settings.color.lum / 100);
      $self.settings.color.hex = $self.toHex($self.settings.color.rgb);

      // Update style object
      $self.settings.style.hsl = 'hsl(' + $self.settings.color.hue + ', ' + $self.settings.color.sat + '%, '+ $self.settings.color.lum +'%)';
      $self.settings.style.rgb = 'rgb(' + $self.settings.color.rgb[0] + ', ' + $self.settings.color.rgb[1] + ', '+ $self.settings.color.rgb[2] +')';
      $self.settings.style.hex = '#' + $self.settings.color.hex[0] + $self.settings.color.hex[1] + $self.settings.color.hex[2];

      // Update the plugin instance's background to reflect changes
      $self.css('background-color', $self.settings.style.hsl);

     // A user passed Update function can be userful to bind events that fire on both mousemove and mousewheel
     // Would a beforeUpdate / afterUpdate be useful user events?
      if ($self.settings.events.update){
        $.proxy( $self.settings.events.update($self), $self );
      }
    }

    $self.toggleActive = function(){
      if ($self.settings.active == true){
        $self.settings.active = false;
      } else{
        $self.settings.active = true;
      }
    }

    $self.toRGB = function (h, s, l){
      // HSL to RGB
      // nabbed from http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
      var r, g, b;

      if(s == 0){
        r = g = b = l; // achromatic
      }else{
        function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }

      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    $self.toHex = function(rgb){
      // RGB to Hex
      function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }

      return [componentToHex(rgb[0]), componentToHex(rgb[1]), componentToHex(rgb[2])];
    }

    $self.init = function(){
      // Set initial world
      $self.update();
      // return $self;
    }

    // Set up any additional user events
    if ($self.settings.events.click){
      $self.on({
        click: function(){
          $.proxy( $self.settings.events.click($self), $self );
        }
      });
    }

    // Go
    $self.init();
    return $self;
  }
})