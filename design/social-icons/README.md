# Social icon sources

Vector sources for the icons on the social cards. They recreate the Figma
"icon effects" component: 15 blurred, offset copies of the glyph (the long
soft shadow), the glyph in a gradient, and an inner bevel.

The site uses PNG versions in `public/icons/social/`, rendered from these at
4x (704×704) with a transparent background. Safari renders SVG filters at 1x,
so using the SVGs directly makes the icons blurry on Retina screens.

To change an icon: edit the SVG, export it to PNG at 704×704 with a
transparent background, and replace the file in `public/icons/social/`.
