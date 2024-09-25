# CountUp Animation Function

The `countUp` function animates numbers within elements that have the `data-countup` attribute when they come into the viewport. This function supports different easing options for the animation.

## Usage

### HTML Setup

To use the `countUp` function, add elements with the `data-countup` attribute to your HTML. Here’s an example:

```html
<span data-countup data-countup-number="1000" data-countup-duration="3000" data-countup-easing="ease-out">0</span>
<span data-countup data-countup-number="500" data-countup-duration="2000" data-countup-easing="ease-in-out">0</span>
<span data-countup data-countup-number="200" data-countup-duration="1500" data-countup-easing="linear">0</span>
```

Attributes
Each element that uses the data-countup attribute should include the following:

- `data-countup-number`: The number that the element should count up to.
- `data-countup-duration`: The duration of the animation in milliseconds.
- `data-countup-easing`: The easing function to use for the animation. This can be one of the following values: `ease-in`, `ease-out`, `ease-in-out`, or `linear`.
  