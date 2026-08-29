# Videos

| file         | where it plays               | Figma layer                              |
|--------------|------------------------------|------------------------------------------|
| `hero.mp4`   | full-bleed behind the hero   | `Enscape_2022-08-14-03-18-26 (2) 1`      |
| `footer.mp4` | full-bleed behind the footer | `01ae5350-5ef3-4ee1-94dc-31de27469fe1 1` |

Figma stores these as video *fills*, which its API does not expose as files, so
they are supplied separately rather than exported from the design.

`hero.mp4` autoplays on load. `footer.mp4` is loaded lazily: `script.js` attaches
its `<source>` only once the footer comes within 600px of the viewport, because
the clip is 4K and around 15 MB. Until then the element shows its poster frame.

Both `<video>` elements have a poster exported from Figma
(`assets/img/hero-poster.jpg`, `assets/img/footer-poster.jpg`), so the page still
looks right if a video is missing or blocked.

Keep replacements muted, loopable, and no wider than 1920px — neither video ever
renders wider than the content column.
