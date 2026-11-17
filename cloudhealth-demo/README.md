# CloudHealth walkthroughs

Self-contained, clickable walkthroughs built from screenshots of a
CloudHealth demo sandbox. They are static: the screens are images with
clickable areas, not a live product.

One file, `cloudhealth-walkthroughs.html`, holds all three scenarios:

1. Where is our AI spend going?
2. Bring your own data (Data Connect and custom datasets)
3. Are we actually saving money?

## Use it

Open the file in a modern browser. Its images and font are embedded, so it
works from anywhere: an email attachment, a downloads folder, a shared drive.
The Scenario dropdown in the top bar switches between the three.

Three ways through each one:

- **Start tour**: numbered steps with Next / Back.
- **Explore**: click highlighted areas, or jump with the screen tabs. "Show hotspots" reveals what is clickable.
- **Blue "i" markers**: explain a card or control without navigating.

The header and left menu stay fixed and the content scrolls inside the frame,
as in the product.

## Change it

Everything is defined in `build.py`: which captures make up each screen, the
clickable areas, the explanatory text, the tour steps and the replaced names.
Coordinates are pixels in the original capture. `template.html` is the page
itself. After editing, rebuild:

    python3 build.py

Needs Python 3 with Pillow and NumPy. `captures/` holds the source screenshots
(not all are used); `fonts/` holds Metropolis (SIL Open Font License).
