'use strict'
var style = require('./styles/sliderStyles')
var EventManager = require('../lib/eventManager')
var yo = require('yo-yo')
var ui = require('../helpers/ui')

class Slider {
  constructor (_traceManager, _stepOverride) {
    this.event = new EventManager()
    this.traceManager = _traceManager
    this.max
    this.disabled = true
    this.view
    this.solidityMode = false
    this.stepOverride = _stepOverride

    this.previousValue = null
  }

  render () {
    var self = this
    var view = yo`<div>
        <input
          id='slider'
          style=${ui.formatCss(style.rule)}
          type='range'
          min=0
          max=${this.max}
          value=0
          onchange=${function () { self.onChange() }}
          oninput=${function () { self.onChange() }}
          disabled=${this.disabled} />
      </div>`
    if (!this.view) {
      this.view = view
    }
    return view
  }

  init (length) {
    var slider = this.view.querySelector('#slider')
    slider.setAttribute('max', length - 1)
    this.max = length - 1
    this.updateDisabled(length === 0)
    this.disabled = length === 0
    this.setValue(0)
  }

  onChange (event) {
    var value = parseInt(this.view.querySelector('#slider').value)
    if (this.stepOverride) {
      value = this.stepOverride(value)
      this.setValue(value)
    }
    if (value === this.previousValue) return
    this.previousValue = value
    this.event.trigger('moved', [value])
  }

  setValue (value) {
    this.view.querySelector('#slider').value = value
  }

  setReducedTrace (trace) {
    this.reducedTrace = trace
  }

  setSolidityMode (mode) {
    this.solidityMode = mode
  }

  updateDisabled (disabled) {
    if (disabled) {
      this.view.querySelector('#slider').setAttribute('disabled', true)
    } else {
      this.view.querySelector('#slider').removeAttribute('disabled')
    }
  }
}

module.exports = Slider
