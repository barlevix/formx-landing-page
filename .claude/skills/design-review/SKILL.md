{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 ---\
name: design-review\
description: Review implemented web pages against the source Figma design and identify and fix visual discrepancies.\
---\
\
# Design Review\
\
Your job is to perform a strict visual QA review of the implemented page.\
\
The Figma design is the source of truth.\
\
Do not redesign, improve, reinterpret, or simplify the design unless explicitly asked.\
\
## Review process\
\
Before considering an implementation complete:\
\
1. Inspect the relevant Figma frames and components.\
2. Inspect the implemented page.\
3. Compare the implementation against Figma section by section.\
4. Identify visual discrepancies.\
5. Fix the discrepancies in the code.\
6. Review the result again.\
\
Do not accept "close enough" when a discrepancy can reasonably be fixed.\
\
## What to compare\
\
### Layout\
Check:\
- container widths\
- section heights\
- margins\
- padding\
- gaps\
- alignment\
- grid structure\
- positioning\
- element proportions\
- whitespace\
\
### Typography\
Check:\
- font family\
- font size\
- font weight\
- line height\
- letter spacing\
- text width\
- line breaks\
- alignment\
- hierarchy\
\
Pay particular attention to headline wrapping. A headline breaking onto different lines can significantly change the composition.\
\
### Colors and styling\
Check:\
- background colors\
- text colors\
- borders\
- border radius\
- shadows\
- gradients\
- opacity\
- strokes\
\
Use the actual values from Figma whenever available.\
\
### Images and media\
Check:\
- image dimensions\
- aspect ratio\
- crop\
- object positioning\
- scale\
- masks\
- border radius\
- relationship between image and surrounding content\
\
Do not substitute assets when the correct asset exists in Figma or the project.\
\
### Components\
Check:\
- buttons\
- navigation\
- cards\
- forms\
- icons\
- logos\
- tags\
- repeated components\
\
Repeated elements should behave consistently.\
\
## Responsive review\
\
Do not assume that responsive design means simply shrinking the desktop layout.\
\
For each available Figma breakpoint:\
- compare against its corresponding Figma frame\
- preserve the intended composition\
- verify spacing\
- verify typography\
- verify image cropping\
- verify stacking/order\
- verify navigation behavior\
\
For widths without a supplied Figma design, infer responsive behavior conservatively from the existing designs.\
\
Do not invent new layouts unless necessary.\
\
## Prioritize perceptual accuracy\
\
When reviewing differences, prioritize them in this order:\
\
1. Overall composition and proportions\
2. Typography and headline wrapping\
3. Major spacing and alignment\
4. Image scale and cropping\
5. Component dimensions\
6. Colors and visual styling\
7. Small decorative details\
\
Fix large perceptual differences before minor pixel-level differences.\
\
## Avoid\
\
Do not:\
- redesign sections\
- add decorative elements\
- introduce gradients that are not in Figma\
- add shadows that are not in Figma\
- change typography because another option looks "better"\
- replace custom design decisions with generic UI patterns\
- add unnecessary cards or containers\
- over-componentize simple structures\
- change content unless explicitly requested\
\
## Code quality\
\
Visual accuracy should not come at the expense of fragile code.\
\
Prefer:\
- reusable components for genuinely repeated patterns\
- existing project tokens\
- clean CSS\
- sensible responsive rules\
- existing project conventions\
\
Avoid arbitrary hacks when the same result can be achieved with a clear layout rule.\
\
## Final review\
\
Before declaring the task complete, review the full page once more.\
\
Ask:\
\
- Does the overall page feel compositionally identical to Figma?\
- Are the major sections positioned and proportioned correctly?\
- Does the typography behave the same way?\
- Are images cropped and positioned correctly?\
- Are desktop and mobile both accurate?\
- Did I accidentally introduce any design decisions that are not present in Figma?\
\
If meaningful discrepancies remain, continue fixing them before considering the implementation complete.}