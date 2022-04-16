const { Chip, Line } = require('node-libgpiod')

module.exports = function (RED) {
  function setError(node, msg) {
    node.status({ text: msg, fill: 'red', shape: 'dot' })
    node.error(msg)
  }
  function GpioIn(config) {
    RED.nodes.createNode(this, config)
    var node = this
    node.status({})
    node.device = config.device || 'gpiochip0'
    node.pin = Number(config.pin)

    if (node.pin === undefined) {
      setError(node, 'No pin configured')
      return
    }

    try {
      node.chip = new Chip(node.device)
      node.line = new Line(node.chip, node.pin)
      node.line.requestInputMode()
    } catch (e) {
      setError(node, e.message)
      return
    }

    node.on('close', function (removed, done) {
      try {
        node.line.release()
      } catch (e) {}
      done()
    })

    node.on('input', function (msg, send, done) {
      if (!node.chip || !node.line || node.pin === undefined) {
        done(-1)
        return
      }
      try {
        const value = node.line.getValue()
        node.status({ text: `get: ${value}`, fill: 'green' })
        send({
          payload: value,
          topic: `gpio in #${this.pin}`,
          pin: node.pin,
          device: node.device,
          mode: 'in',
        })
        done()
      } catch (error) {
        setError(node, error.message)
      }
    })
  }

  RED.nodes.registerType('gpio-in', GpioIn)
}
