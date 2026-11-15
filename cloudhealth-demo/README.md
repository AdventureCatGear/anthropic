# CloudHealth walkthroughs

Three self-contained, clickable walkthroughs built from screenshots of a
CloudHealth demo sandbox. They are static: the screens are images with
clickable areas, not a live product.

| File | Walkthrough |
|---|---|
| `ai-spend.html` | Where is our AI spend going? |
| `bring-your-data.html` | Bring your own data (Data Connect and custom datasets) |
| `savings.html` | Are we actually saving money? |

## Use them

Open any of the three files in a modern browser. Each has its images and font
embedded, so a file works on its own; keep the three in one folder and the
dropdown in the top bar switches between them.

Three ways through each one:

- **Start tour**: numbered steps with Next / Back.
- **Explore**: click highlighted areas, or jump with the screen tabs. "Show hotspots" reveals what is clickable.
- **Blue "i" markers**: explain a card or control without navigating.

The header and left menu stay fixed and the content scrolls inside the frame,
as in the product.

## Change them

Everything is defined in `build.py`: which captures make up each screen, the
clickable areas, the explanatory text, the tour steps and the replaced names.
Coordinates are pixels in the original capture. `template.html` is the page
itself. After editing, rebuild:

    python3 build.py

Needs Python 3 with Pillow and NumPy. `captures/` holds the source screenshots
(not all are used); `fonts/` holds Metropolis (SIL Open Font License).
