# harp-foundation

> The most advanced responsive front-end framework in the world. Quickly create prototypes and production code for sites and apps that work on any kind of device.

## Dependencies

* [Node.js](http://nodejs.org/) – _Server-side JavaScript runtime_
* [Harp](http://harpjs.com/) – _The static web server with built-in preprocessing_

## Install

To install Foundation, run the following command from the root of your Harp project:

```bash
harp install foundation
```

Your project will look something like this…

```
myproject/                  <-- Your project root (or public dir if in framework-mode)
  |- components/            <-- Harp puts components here
  |   +- harp-foundation/   <-- where this lib gets installed
  |       …
  |- main.scss              <-- where you reference Foundation 
  +- index.jade             <-- where you reference main.css
```

## Link

Now, from within a `.scss` file in your project, you can `@import` Foundation:

```scss
@import "components/harp-foundation/scss/foundation";
```

Or, just a portion of Foundation, like Normalize:

```scss
@import "components/harp-foundation/scss/normalize";
```

## License

This component is [Foundation](http://github.com/zurb/foundation), which is Copyright © 2013 ZURB, Inc. and MIT licensed.
