# jQuery Color Field v0.00003

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

You can pass a custom color range to colofield that limits the hue spectrum
Currently you can pass an array with two values defining the range of hue (0 - 360).
** Note: This is not a gradation but defining what part of the spectrum to use. **

```
var canvas = $('#your-canvas').colorField({
  range: [72, 150]
});
```

## Attaching events
Currently available:

1. **mousemove**
2. **mousewheel**
2. **click**
3. **update** (attaches to the $self.update function, runs on init, mousemove, and mousewheel)

```
var canvas = $('#your-canvas').colorField({
  color: {
    lum: 43
  },
  events: {
    update: function(colorfield){
      $('.output').text('Hue:' + colorfield.settings.color.hue + ' Saturation:' + colorfield.settings.color.sat + ' Luminosity:' + colorfield.settings.color.lum + ' Active:' + colorfield.settings.active);
    },
    click: function(colorfield){
      colorfield.toggleActive();
      console.log('color object');
      console.log(colorfield.settings.color);
      console.log('preformatted style css styles');
      console.log(colorfield.settings.style);
    }
  }
});
```

## Interacting with Colorfield
You can change the active state of Colorfield by changing the value of settings.active

The following renders a disabled Colorfield
```
var canvas = $('#you-canvas').colorField({
  events: {
    update: function(colorfield){
      colorfield.settings.active = false
    }
  }
});
```

You can toggle the state of active like this:
```
var canvas = $('#your-canvas').colorField({
  events: {
    click: function(colorfield){
      colorfield.toggleActive();
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
    lum: int,
    rgb: [r,g,b],
    hex: [r,g,b]
  },
  range: null,
  events: {
    click: function(colorfield) {...},
    mousewheel: function(colorfield) {...},
    mousemove: function(colorfield) {...},
    update: function(colorfield) {...}
  },
  style: {
    hsl: str, // hsl(h,s%,l%)
    rgb: str, // rgb(r,g,b)
    hex: str // #rgb
  },
  active: bool
}
```

## TODO
* ~~Create a Style object with pre-formatted CSS strings based on picker actions~~
* ~~Complete and test events in the Events object~~
* ~~Activate / Deactivate API~~
* ~~Custom color ranges~~
* Touch support
* Make neat demos

## First Rodeo
My first open souce jquery plugin. You know better? I want to hear it.

## License

This plugin is available under [the MIT license](http://mths.be/mit).

_– [Stuart Romanek](http://romanek.us)_
