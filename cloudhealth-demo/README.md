# CloudHealth clickthrough demo

A self-contained, clickable walkthrough built from four screenshots of a
CloudHealth demo sandbox (Home, AI & Tokenomics, and two AI cost reports).
It is a static demo: the screens are images with clickable hotspots, not a
live product.

## Use it

Open `index.html` in any modern browser. The file has the screenshots embedded,
so that one file is all you need: email it, put it on a USB stick or shared
drive, or drop it on any static host.

- **Click** highlighted areas to move between screens, as you would in the product.
- **Info markers** (blue "i") explain what a card or control does.
- **Start tour** runs a 15-step guided story: total cloud spend → AI spend → individual model.
- Keys: `H` show hotspots · `T` tour · `←` `→` tour steps · `F` fit to window · `Esc` close.

## Change it

Edit `demo.template.html` (screens, hotspot rectangles and tour text are plain
data at the top of the script), replace images in `screens/`, then rebuild:

    node build.mjs
