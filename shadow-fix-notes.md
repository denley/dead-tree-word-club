# Shadow Fix Notes

Looking at the screenshot, the cover image area still shows a light beige/grey background extending below the actual cover art. The cover image wrapper div has `shadow-lg` and `overflow-hidden` with `width: 200px`. The image itself has `backgroundColor: #EDE8DD` which shows while loading.

The issue is that the cover image (Orbital) has a natural aspect ratio that's taller than wide, but the container seems to show extra space below. This could be because the image hasn't fully loaded in the screenshot, or the background color is visible at the bottom.

Looking more carefully at the top of the second screenshot - I can see the bottom of the current book section. The cover image area on the left shows a light beige rectangle that extends below where the actual cover art ends. This is the `backgroundColor: #EDE8DD` showing through.

The fix should remove the background color entirely, or make the container fit the image exactly.
