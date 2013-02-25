/*
---

description: |
             Eye following the mouse by moving inside a circular eye socket.
             We assume the eye is initially positioned at the center of the circle.
             Its position must be absolute or relative (we're using top and left)

authors:
- Goutte <antoine@goutenoir.com>

demo:
- http://jsfiddle.net/goutte/B2Nza

licence:
- GPL

requires:
- core/1.4.5:Class
- core/1.4.5:Element
- core/1.4.5:Array
- core/1.4.5:Options
- core/1.4.5:Events

provides:
- Eye

...
*/
var Eye = new Class ({

  Implements: [Options],

  options: {
    socketRadius: 5, // radius of the circle in which the eye can move
    stickToSocket: true, // constraint the eye to the perimeter of the circle
    behavior:     'follow',
    bindMouseMove: true,
    bindTouchMove: false,
    eventListenerElement: window
  },

  initialize: function (element, options) {
    if (options.eventListenerElement) options.eventListenerElement = document.id(options.eventListenerElement);
    this.setOptions(options);
    this.element = document.id(element);
    if (-1 == ['relative','absolute'].indexOf(this.element.getStyle('position')))
      throw new Error("Eye must be positioned as absolute or relative.");
    this.coordinates = this.element.getCoordinates();
    this.elementTop  = this.element.getStyle('top').toInt();
    this.elementLeft = this.element.getStyle('left').toInt();
    this.origElTop = this.elementTop;
    this.origElLeft = this.elementLeft;
    this.bindEyeMoveEvents();
    
    console.log({ 'top': this.origElTop, 'left': this.origElLeft })
    
    // move back to original when mouse leaves
    this.options.eventListenerElement.addEvent('mouseout', function(event){
      console.log('mouseout', this)
      var el = document.id(this.id)
      var x = this.origElTop - el.getStyle('height').toInt();
      var y = this.origElLeft - el.getStyle('width').toInt();
      console.log({ 'origX': x, 'origY': y });
      el.setPosition({ x:x, y:y });
    }.bind(this));
  },

  bindEyeMoveEvents: function () {
    if (this.options.bindMouseMove) {
      this.options.eventListenerElement.addEvent('mousemove', function(event){
        this.reactToEventPosition(event.page.x, event.page.y);
      }.bind(this));
    }
    if (this.options.bindTouchMove) {
      this.options.eventListenerElement.addEvent('touchmove', function(event){
        event.preventDefault();
        var touch = event.touches[0];
        this.reactToEventPosition(touch.pageX, touch.pageY);
      }.bind(this));
    }
  },

  /**
   * Makes the element move in the direction of the coords specified, but restraining itself in a circle
   * of radius options.socketRadius
   *
   * @param x
   * @param y
   */
  reactToEventPosition: function (x, y) {
    switch (this.options.behavior) {
      case 'flee':
        this.lookOpposite(x, y);
        break;
      case 'follow':
      default:
        this.lookAt(x, y);
    }
  },

  /**
   * Makes the element move in the direction of the coords specified, but restraining itself in a circle
   * of radius options.socketRadius
   *
   * @param x
   * @param y
   */
  lookAt: function (x, y, factor) {
    if (typeof factor == 'undefined' || null == factor) factor = 1;
    var eyeX = this.coordinates.left + this.coordinates.width / 2;
    var eyeY = this.coordinates.top + this.coordinates.height / 2;

    var newPos = this.normalize(x - eyeX, y - eyeY, this.options.socketRadius * factor);
    newPos.x = newPos.x + this.elementLeft;
    newPos.y = newPos.y + this.elementTop;
    this.element.setPosition(newPos);
  },

  /**
   * Makes the element move in the opposite direction of the coords specified, but restraining itself in a circle
   * of radius options.socketRadius
   *
   * @param x
   * @param y
   */
  lookOpposite: function (x, y) {
    this.lookAt(x, y, -1);
  },

  normalize: function (x, y, factor) {
    if (typeof factor == 'undefined' || null == factor) factor = 1;
    var r = {x:x, y:y};
    var norm = Math.sqrt(x*x + y*y);
    if (norm != 0 && (this.options.stickToSocket || norm > Math.abs(factor))) {
      r.x = x * factor / norm;
      r.y = y * factor / norm;
    }
    return r;
  }

});

var options = { socketRadius: 28 };
new Eye('left_eye', options);
new Eye('right_eye', options);
