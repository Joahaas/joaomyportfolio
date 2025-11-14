# João Fonseca — Portfolio

Editorial-style portfolio website for fintech, digital banking, and AI product design.

## Design Philosophy

Inspired by contemporary editorial design, this portfolio features:
- **Split-screen layouts** - Large project showcases with abstract geometric elements
- **Bold typography** - High-impact headlines and clear hierarchy
- **Minimalist aesthetic** - Clean black and white color scheme
- **Immersive projects** - Full-screen case study presentations

## Features

✨ **Editorial Split-Screen Design**
- 60/40 split layouts alternating left/right
- Large project imagery with text overlays
- Abstract geometric shapes as design accents

🎨 **Visual Design**
- High contrast black/white aesthetic
- Bold typography with Satoshi font
- Smooth scroll animations
- Parallax effects on geometric shapes

📱 **Fully Responsive**
- Adapts beautifully to all screen sizes
- Mobile-optimized layouts
- Touch-friendly interactions

⚡ **Performance Optimized**
- Smooth animations with CSS transforms
- Intersection Observer for efficient scroll effects
- Optimized image loading

## Structure

```
/
├── index.html          # Main HTML with project showcases
├── styles.css          # Editorial-style CSS
├── script.js           # Smooth animations & interactions
├── assets/
│   └── photome.jpeg   # Profile photo
└── README.md          # This file
```

## Adding New Projects

Each project uses a split-screen layout. Add a new section like this:

```html
<section class="project-hero">
    <div class="project-split">
        <div class="project-main">
            <div class="project-image">
                <img src="YOUR_IMAGE_URL" alt="Project Name">
                <div class="project-overlay">
                    <h1 class="project-title">Project Name</h1>
                    <div class="project-tagline">
                        <p class="tagline-main">Your main tagline here.</p>
                        <p class="tagline-sub">Supporting description text.</p>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-name">Project Name</h3>
                <p class="project-description">Detailed project description...</p>
                <div class="project-meta">
                    <span class="meta">2024</span>
                    <span class="meta">Category</span>
                    <span class="meta">Type</span>
                </div>
            </div>
        </div>
        <div class="project-side">
            <div class="geometric-shape shape-X"></div>
        </div>
    </div>
</section>
```

### Alternating Layouts

For variety, alternate between normal and reverse layouts:
- Use `<div class="project-split">` for image on left
- Use `<div class="project-split reverse">` for image on right

### Geometric Shapes

There are 5 predefined geometric shapes (`.shape-1` through `.shape-5`):
- `shape-1`: Skewed parallelogram
- `shape-2`: Rotated skew
- `shape-3`: Angular polygon clip
- `shape-4`: Skewed rectangle
- `shape-5`: Rotated square (used in About section)

Feel free to create custom shapes by adding new `.shape-X` classes in CSS.

## Customization

### Colors

The design uses a minimal black/white palette:
- **Primary Black**: `#0a0a0a`
- **White**: `#ffffff`
- **Gray tones**: `#666`, `#999`, `#fafafa`

To customize:
1. Search for `#0a0a0a` in `styles.css`
2. Replace with your brand color

### Typography

Using **Satoshi** font family:
- Bold (700) for headlines
- Medium (500) for subheadings
- Regular (400) for body text

To change fonts:
1. Update font link in `index.html` `<head>`
2. Update `font-family` in `styles.css`

### Images

Replace placeholder images:
- Project images: 1200x800px recommended
- Profile photo: `assets/photome.jpeg`
- Use high-quality images for best results

### Contact Information

Update in the Contact Section:
- Email address
- LinkedIn URL
- Twitter/X handle

## Best Practices

📸 **Images**
- Use high-resolution images (min 1200px wide)
- Optimize for web (compress without losing quality)
- Consider using WebP format for better compression

🎨 **Design**
- Keep text overlays legible with sufficient contrast
- Maintain consistent spacing between sections
- Use geometric shapes sparingly for visual interest

⚡ **Performance**
- Lazy load images if you have many projects
- Optimize image file sizes
- Test on various devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2024 João Fonseca. All rights reserved.

---

**Questions or want to collaborate?**  
hello@joaofonseca.com
