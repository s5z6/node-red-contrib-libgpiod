# node-red-contrib-libgpiod

[![npm](https://img.shields.io/npm/v/node-red-contrib-libgpiod?style=plastic)](https://www.npmjs.com/package/node-red-contrib-libgpiod)

A set of input and output nodes for controlling General Purpose Input and Outputs (GPIOs) though libgpiod (ioctl)

### Requirements

- [node-libgpiod](https://github.com/sombriks/node-libgpiod) (native nodejs bindings for libgpiod)

### Install

```
cd ~/.node-red
npm install node-red-contrib-libgpiod
```

### Usage

in nodes configuration choose device and correct pin number  
for output inject msg.payload = true/1 for high state and false/0 for low state  
for input inject any value to trigger reading

### Tested on

- [LTPPxG2](https://tibbo.com/store/tps/ltpp3g2.html) with sp7021 SoC (32 bits, 512MB ram) running Yocto
