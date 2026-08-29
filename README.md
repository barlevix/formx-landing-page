# FormX — Landing Page

Static implementation of the Figma design
[Formx - LP](https://www.figma.com/design/61k4Ujyjwm3C0JStyI7vM1/Formx---LP)
(`Form X - LP - Desktop`, node `364:9709`, and `Form X - LP - Mobile`, node `364:9837`).

No build step, no framework, no dependencies — plain HTML, CSS and one JS file.

## Run it

```bash
python3 serve.py
```

Then open http://127.0.0.1:5173. Any static server works; `serve.py` just points
one at `site/`. To deploy, upload the contents of `site/`.

## Structure

```
site/
  index.html      one page, semantic sections in Figma order
  styles.css      tokens → mobile layout → desktop overrides (@media ≥1024px)
  script.js       content data + quiz, gallery, lightbox and reveal behaviour
  assets/
    img/          photography, the wireframe GIF, the strengths sprite sheet
    svg/          logos, star rating, the three process icons, favicon
    video/        the two background clips — see assets/video/README.md
```

`styles.css` is mobile-first. The desktop frame's proportions are expressed in
`cqw` against `.main` (a container query context), so type and text-box widths
scale with the content column instead of jumping at the breakpoint. Comments
mark the Figma value each one reproduces, e.g. `/* 195px @375 */`.

## Before this goes live

Two things are deliberately unfinished, and both are marked in the code.

**1. The form does not send anything yet.** Set `LEAD_ENDPOINT` at the top of the
lead-submission block in `script.js` to your CRM or form URL. While it is `null`
the form still validates and steps through, but the success screen says plainly
that nothing was sent, and the console logs a warning — no silent fake success.

**2. Some copy is placeholder.** Everything in the Figma file is reproduced
verbatim. These are not in the file and need real copy:

| Where | What |
| --- | --- |
| `SPACES` in `script.js` | Reveal copy for *The Lounge*, *The Sanctuary* and *Wellness Space*. Only *Culinary Space* exists in Figma (component `378:797`); the other three are drafted in the same voice. |
| `PROJECTS` in `script.js` | The three gallery projects. The Figma file annotates these as placeholders; the images are reused interior shots. |
| Quiz steps 2 and 3 | The design specifies only step 1. Timeline and contact steps were added so *Continue* leads somewhere. |

## Video

`site/assets/video/hero.mp4` and `footer.mp4` are the two background videos.
Figma stores them as video *fills*, which its API does not export, so they were
supplied separately. Each `<video>` also carries a poster frame exported from
Figma, so the page still renders correctly if a video fails to load.

The hero video autoplays on load. The footer video is 4K and ~15 MB, so its
`<source>` is only attached once the footer is within 600px of the viewport —
until then its poster stands in and nothing is downloaded. Re-encoding the
footer clip at 1920px wide would cut several megabytes off that; it renders no
wider than the content column.

## Decisions taken where the design left a gap

- **The sticky rail sets the content width.** The brief says the form is sticky;
  the Figma frame can only draw it once, parked at the top right of a 1440px
  page. Making it genuinely sticky means the content column is `1440 − 552`
  everywhere, so the gallery's second card peeks by ~100px rather than the
  ~650px the static frame shows. Every other section already lived inside that
  column in the design and is reproduced at its Figma position.
  (Note: the brief said the form is on the *left*; the design puts it on the
  right, and the design was followed.)
- **The fifth quiz option.** Figma repeats "Single-family home" twice. Two
  identical radio buttons would be broken, so the fifth reads "Not sure yet".
- **Clicking a project card opens a lightbox** with that project's gallery, per
  the brief. The Figma "Explore more" link pointed off-site to
  `formx.com/gallery/…`; that URL is kept on each project in `PROJECTS`.
- **Step headings wrap from their container width** rather than hard `<br>`s, so
  "Designed for you" is one line on mobile and two on desktop, as in both
  frames. Headings that Figma breaks explicitly (the hero, "California,",
  "Fully custom.", "Lightning fast") keep their `<br>`.
- **A minimal `© FormX` line** was added to the footer. The design has no
  footer furniture at all.

## Motion

The 5-second attract loop on the quiz — options pulsing to 1.05 in sequence, the
CTA outline blinking, the byline stroke thickening — is the Figma timeline
(`get_motion_context` on `364:9778`), reproduced as CSS keyframes with the same
durations and easing. The review strip scrolls right-to-left and pauses on hover
or focus. Everything is disabled under `prefers-reduced-motion`.

On desktop the *Future Living* tiles reveal on hover or keyboard focus; on
mobile they open as they scroll into view, per the Figma annotations.

## Fonts

Satoshi from [Fontshare](https://www.fontshare.com/fonts/satoshi); Plus Jakarta
Sans and Noto Serif (condensed via its `wdth` axis) from Google Fonts. All three
are the families used in the Figma file. Self-host them if you would rather not
depend on those CDNs.
