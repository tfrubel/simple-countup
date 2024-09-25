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
