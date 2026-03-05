# Shadow Issue Analysis

Looking at the CurrentBookHero component:
- The cover image wrapper has `style={{ width: "200px" }}` and `className="relative rounded-xl overflow-hidden shadow-lg"`
- The image has `style={{ minHeight: "280px", backgroundColor: "#EDE8DD" }}`
- The `minHeight: 280px` is the problem — if the actual cover image is shorter than 280px, the background color (#EDE8DD) fills the remaining space, making the shadow appear to extend beyond the image
- The shadow-lg class on the wrapper div creates a shadow around the full 280px min-height container, not just the image

Fix: Remove the minHeight and instead let the image determine its own height. Use aspect-ratio or just let it be natural. The background color can stay as a fallback while loading.
