# jQuery Color Field v0.00002

Simple mouse-driven HSL color picker. Super alpha, getting messy in here

## Basic Useage
`var canvas = $('#your-canvas').colorField();`

## Passing settings
You can pass all the inital color settings to colorfield

```
var canvas = $('#your-canvas').colorField({
  color: {
    hue: 20,
    sat: 92,
    lum: 75
  }
});
```

## Attaching events
Currently available:

1. **mousemove** and **mousewheel** (after the plugin does its thing)
2. **click**
3. **update** (attaches to the $self.update function, runs on init, mousemove, and mousewheel)

```
var canvas = $('.canvas').colorField({
  color: {
    lum: 43
  },
  events: {
    update: function(settings){
      $('.output').text('Hue:' + settings.color.hue + ' Saturation:' + settings.color.sat + ' Luminosity:' + settings.color.lum + ' Active:' + settings.active);
    },
    click: function(settings){
      if (settings.active == true){
        settings.active = false;
      } else {
        settings.active = true;
      }
    }
  }
});
```

## the Settings object
```
settings: {
  color: {
    hue: int,
    sat: int,
    lum: int
  },
  events: {
    click: function(settings) {...},
    mousewheel: function(settings) {...},
    mousemove: function(settings) {...},
    update: function(settings) {...}
  },
  style: { //incomplete
    hsl: str,
    rgb: str,
    hex: str
  },
  active: bool,
  activeToggle: function(){
    if (settings.active == true){
      settings.active = false;
    } else {
      settings.active = true;
    }
  }
}
```

## TODO
1. Create a Style object with pre-formatted CSS strings based on picker actions
2. Complete and test events in the Events object
3. --Activate / Deactivate API-- Refactor activeToggle
4. Custom color ranges
5. Make neat demos

## First Rodeo
My first open souce jquery plugin. You know better? I want to hear it.

## License

This plugin is available under [the MIT license](http://mths.be/mit).

_– [Stuart Romanek](http://romanek.us)_