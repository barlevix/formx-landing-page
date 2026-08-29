{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 ---\
name: landing-page\
description: Build production-quality landing pages from supplied designs with clean architecture, responsive behavior, strong performance, accessibility, SEO, and faithful visual implementation.\
---\
\
# Landing Page Development\
\
Build production-quality landing pages that faithfully implement the supplied design.\
\
When a Figma design is provided, treat it as the source of truth for visual decisions.\
\
Your responsibility is to translate the design into a fast, responsive, accessible, maintainable website \'97 not to redesign it.\
\
## Core principles\
\
Prioritize:\
\
1. Fidelity to the supplied design\
2. Correct responsive behavior\
3. Clean and maintainable implementation\
4. Performance\
5. Accessibility\
6. SEO\
7. Appropriate interaction and motion\
\
Do not sacrifice visual fidelity for unnecessary abstraction or engineering complexity.\
\
---\
\
# Before implementation\
\
Before writing significant code:\
\
1. Inspect the relevant Figma frames.\
2. Understand the full page structure.\
3. Identify available desktop and mobile designs.\
4. Identify repeated components.\
5. Identify fonts, colors, spacing patterns and assets.\
6. Inspect the existing project structure and conventions.\
7. Reuse existing dependencies and components when appropriate.\
\
Do not begin by inventing a generic component system.\
\
---\
\
# Figma\
\
When Figma is available:\
\
- Use Figma as the source of truth.\
- Inspect actual values rather than estimating when possible.\
- Use the correct assets from Figma.\
- Preserve typography and visual hierarchy.\
- Preserve intentional whitespace.\
- Preserve image crops and positioning.\
- Preserve unusual or art-directed layout decisions.\
\
Do not "improve" or normalize intentional design decisions.\
\
If something appears unconventional but clearly intentional in Figma, implement it faithfully.\
\
---\
\
# Page structure\
\
Use semantic HTML whenever appropriate.\
\
Prefer elements such as:\
\
- header\
- nav\
- main\
- section\
- article\
- footer\
- button\
- form\
- label\
\
Avoid unnecessary wrapper elements.\
\
The DOM structure should remain understandable and reasonably simple.\
\
---\
\
# Components\
\
Create components when they:\
\
- repeat\
- have meaningful behavior\
- represent a clear reusable UI pattern\
- make the implementation easier to understand\
\
Do not create components simply to reduce line count.\
\
Avoid excessive abstraction.\
\
A one-off decorative element does not necessarily need its own component.\
\
---\
\
# CSS and styling\
\
Follow the styling approach already used by the project.\
\
Prefer clear layout systems such as:\
\
- CSS Grid\
- Flexbox\
- sensible container rules\
- responsive sizing\
- reusable design tokens when appropriate\
\
Avoid large amounts of arbitrary absolute positioning when normal layout techniques can reproduce the design.\
\
Absolute positioning is acceptable when it is genuinely part of the visual composition.\
\
Avoid magic numbers unless they correspond to intentional design values.\
\
---\
\
# Typography\
\
Typography is a major part of the design.\
\
Match:\
\
- font family\
- font size\
- font weight\
- line height\
- letter spacing\
- text width\
- alignment\
- capitalization\
- headline wrapping\
\
Use the actual font files or font source intended by the project when available.\
\
Do not substitute fonts without a reason.\
\
Pay special attention to headline line breaks.\
\
Do not add manual `<br>` elements purely to force a screenshot match unless the line break is clearly intentional or required by the design.\
\
Prefer reproducing wrapping through correct typography and container width.\
\
---\
\
# Responsive behavior\
\
Responsive implementation must preserve the design intent.\
\
Do not simply scale the desktop design down.\
\
When desktop and mobile Figma frames exist:\
\
- treat both as source-of-truth reference points\
- determine what changes between them\
- implement the transition intelligently\
\
Check:\
\
- stacking\
- ordering\
- spacing\
- typography\
- image crops\
- navigation\
- alignment\
- visibility\
- section proportions\
- interactive elements\
\
For intermediate widths without supplied designs, interpolate conservatively.\
\
Avoid unnecessary breakpoints.\
\
Use breakpoints when the composition actually requires them.\
\
The page should work across common viewport widths, not only at the exact Figma frame sizes.\
\
---\
\
# Images\
\
Use the correct supplied assets whenever available.\
\
Preserve:\
\
- aspect ratio\
- crop\
- focal point\
- scale\
- positioning\
\
Use `object-fit` and `object-position` intentionally.\
\
Avoid stretching images.\
\
Optimize image delivery appropriately for the framework.\
\
Where supported, provide responsive image sizing.\
\
Do not ship unnecessarily large image files.\
\
---\
\
# Performance\
\
Keep the landing page lightweight.\
\
Prioritize:\
\
- fast initial render\
- good Largest Contentful Paint\
- minimal layout shift\
- efficient image loading\
- appropriate lazy loading\
- reasonable JavaScript bundle size\
\
Do not add a dependency for something that can be implemented simply with the existing stack.\
\
Avoid unnecessary client-side JavaScript.\
\
Do not lazy-load the primary above-the-fold visual if doing so would harm LCP.\
\
Prevent layout shifts by defining image dimensions or aspect ratios where possible.\
\
---\
\
# Motion and interactions\
\
Implement motion only when:\
\
- it exists in the design\
- it has been requested\
- it clearly supports the intended experience\
\
Motion should feel intentional and restrained.\
\
Avoid generic AI-generated effects such as:\
\
- unnecessary fade-ins on every section\
- excessive floating elements\
- gratuitous parallax\
- random gradients\
- excessive hover animations\
- animations that delay access to content\
\
Respect `prefers-reduced-motion`.\
\
Interactions should not compromise usability or performance.\
\
---\
\
# Buttons and links\
\
Use buttons for actions and links for navigation.\
\
Implement:\
\
- hover states\
- focus states\
- active states where relevant\
- disabled states where relevant\
\
Clickable areas should be appropriately sized.\
\
Do not use non-semantic elements as buttons when a native button or link is appropriate.\
\
---\
\
# Forms\
\
If the landing page contains forms:\
\
- use proper labels\
- use correct input types\
- provide useful validation\
- provide clear error states\
- provide clear success states\
- preserve entered information when reasonable\
- make keyboard navigation work correctly\
\
Do not rely only on placeholder text as a label.\
\
Do not fake form submission.\
\
If backend functionality is not available, clearly separate the visual implementation from the missing integration.\
\
---\
\
# Accessibility\
\
Maintain visual fidelity while following practical accessibility standards.\
\
Ensure:\
\
- meaningful images have appropriate alt text\
- decorative images do not create unnecessary screen-reader noise\
- keyboard navigation works\
- interactive elements have visible focus states\
- form fields have labels\
- semantic HTML is used\
- heading hierarchy is logical\
- interactive elements are identifiable\
\
Do not alter the visual design unnecessarily in the name of accessibility when an equivalent accessible implementation is possible.\
\
---\
\
# SEO\
\
For public landing pages, implement basic technical SEO.\
\
Check:\
\
- page title\
- meta description\
- canonical URL when appropriate\
- Open Graph metadata\
- social sharing image when available\
- semantic heading structure\
- indexability\
- meaningful page content\
\
Use structured data only when it is genuinely applicable.\
\
Do not generate keyword-stuffed or generic SEO copy.\
\
---\
\
# Content\
\
Use the supplied copy exactly unless explicitly asked to edit it.\
\
Do not:\
\
- rewrite headlines\
- shorten copy\
- invent testimonials\
- invent company claims\
- invent statistics\
- invent customer logos\
- add marketing sections\
\
If content is missing, use an obvious temporary placeholder rather than presenting invented information as final content.\
\
---\
\
# Avoid generic AI design\
\
Do not introduce visual patterns merely because they are common in generated landing pages.\
\
Avoid adding without design justification:\
\
- excessive rounded cards\
- pill-shaped containers\
- gradients\
- glowing backgrounds\
- glassmorphism\
- unnecessary shadows\
- decorative blobs\
- generic icon circles\
- excessive section labels\
- random badges\
- floating cards\
- unnecessary animations\
\
The supplied design language should determine the visual result.\
\
---\
\
# Code quality\
\
Keep the code:\
\
- readable\
- maintainable\
- reasonably modular\
- consistent with the existing project\
- free of unnecessary duplication\
\
Do not over-engineer a marketing website.\
\
Prefer the simplest implementation that accurately reproduces the design and behaves correctly.\
\
Do not refactor unrelated parts of the project unless necessary.\
\
---\
\
# Verification\
\
Before considering the landing page complete:\
\
1. Compare the implementation against Figma.\
2. Check desktop.\
3. Check mobile.\
4. Check at least one intermediate viewport.\
5. Check navigation and interactions.\
6. Check forms if present.\
7. Check for overflow.\
8. Check for broken images.\
9. Check for console errors.\
10. Check typography and headline wrapping.\
11. Check major spacing and alignment.\
12. Check image cropping.\
13. Check accessibility basics.\
14. Check metadata.\
15. Check obvious performance issues.\
\
If a design-review skill is available, use its process for the final visual QA.\
\
Do not declare the implementation complete while meaningful visual or functional discrepancies remain.}