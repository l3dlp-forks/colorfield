# jQuery Color Field v0.00001

Simple HSL color picker. Super alpha, watch your step

## Basic Useage
`$('#your-canvas').colorField();`

## Passing settings
You can pass all the inital color settings to colorfield

```
$('#your-canvas').colorField({
  color: {
    hue: 20,
    sat: 92,
    lum: 75
  }
});
```

## Attaching custom events and reading the color object
Currently available:

1. mousemove and mousewheel (after the plugin does its thing)
2. click
3. update (attaches to the $self.update function, runs on init, mousemove, and mousewheel)

```
$('#your-canvas').colorField({
  events: {
    click: function(color){
      console.log(color.hue);
      console.log(color.sat);
      console.log(color.lum);
    },
    update: function(color){
      console.log('It all sounds pretty glamorous but it's business-as-usual at Kramerica');
    }
  }
});
```

## TODO
1. Create a Style object with pre-formatted CSS strings based on picker actions
2. Complete and test events in the Events object
3. Activate / Deactivate API
4. Custom color ranges
5. Make neat demos

## First Rodeo
My first open souce jquery plugin. You know better? I want to hear it.

## License

This plugin is available under [the MIT license](http://mths.be/mit).

_– [Stuart Romanek](http://romanek.us)_