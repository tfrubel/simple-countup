# CountUp Animation Function

The `countUp` function animates numbers within elements that have the `data-countup` attribute when they come into the viewport. This function supports different easing options for the animation.

## Usage

### JS Setup

```js
function countUp() {
  const elements = document.querySelectorAll("[data-countup]");

  // Easing functions
  const easeOut = function (t) {
    return 1 - Math.pow(1 - t, 3);
  }; // cubic ease-out
  const easeInOut = function (t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }; // cubic ease-in-out

  // Function to get the easing function based on the attribute
  function getEasingFunction(easing) {
    switch (easing) {
      case "ease-out":
        return easeOut;
      case "ease-in-out":
        return easeInOut;
      default:
        return function (t) {
          return t;
        }; // Linear easing by default
    }
  }

  function animateCountUp(element) {
    const endValue = parseInt(element.getAttribute("data-countup-number"), 10);
    const duration = parseInt(element.getAttribute("data-countup-duration"), 10);
    const easingType = element.getAttribute("data-countup-easing") || "linear"; // default to linear
    const easingFunction = getEasingFunction(easingType);

    let startTime = null;
    let startValue = 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / duration, 1);
      const easedProgress = easingFunction(progressPercent); // Apply the easing function
      const currentValue = Math.floor(easedProgress * (endValue - startValue) + startValue);
      element.textContent = currentValue.toString();

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        element.textContent = endValue.toString(); // Ensure the final number is exact
      }
    }

    requestAnimationFrame(step);
  }

  const observerOptions = {
    threshold: 1, // Trigger when 100% of the element is in view
  };

  function handleIntersection(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !entry.target.hasAttribute("data-countup-done")) {
        animateCountUp(entry.target);
        entry.target.setAttribute("data-countup-done", "true"); // Mark the element to prevent re-animation
        observer.unobserve(entry.target); // Stop observing once the animation is complete
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  elements.forEach(function (element) {
    observer.observe(element);
  });
}

// Call this function on page load or when the document is ready
document.addEventListener("DOMContentLoaded", countUp);
```

### TS Setup

```ts
export function countUp(): void {
  const elements = document.querySelectorAll<HTMLElement>("[data-countup]");

  // Easing functions
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3); // cubic ease-out
  const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // cubic ease-in-out

  // Function to get the easing function based on the attribute
  function getEasingFunction(easing: string | null) {
    switch (easing) {
      case "ease-out":
        return easeOut;
      case "ease-in-out":
        return easeInOut;
      default:
        return (t: number) => t; // Linear easing by default
    }
  }

  function animateCountUp(element: HTMLElement): void {
    const endValue = parseInt(element.getAttribute("data-countup-number")!, 10);
    const duration = parseInt(element.getAttribute("data-countup-duration")!, 10);
    const easingType = element.getAttribute("data-countup-easing") || "linear"; // default to linear
    const easingFunction = getEasingFunction(easingType);

    let startTime: number | null = null;
    let startValue = 0;

    function step(timestamp: number): void {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / duration, 1);
      const easedProgress = easingFunction(progressPercent); // Apply the easing function
      const currentValue = Math.floor(easedProgress * (endValue - startValue) + startValue);
      element.textContent = currentValue.toString();

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        element.textContent = endValue.toString(); // Ensure the final number is exact
      }
    }

    requestAnimationFrame(step);
  }

  const observerOptions: IntersectionObserverInit = {
    threshold: 1, // Trigger when 100% of the element is in view
  };

  function handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.hasAttribute("data-countup-done")) {
        animateCountUp(entry.target as HTMLElement);
        entry.target.setAttribute("data-countup-done", "true"); // Mark the element to prevent re-animation
        observer.unobserve(entry.target); // Stop observing once the animation is complete
      }
    });
  }

  const observer: IntersectionObserver = new IntersectionObserver(handleIntersection, observerOptions);

  elements.forEach((element) => {
    observer.observe(element);
  });
}

```

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
  