# Phantom Roads 🌃

### Every road has a story. Every city has something to discover.

**Phantom Roads** is an immersive, cinematic city-exploration website that transforms ordinary scrolling into a journey through atmospheric streets, hidden details, and destinations waiting to be explored.

Built around cinematic photography, scroll-driven animations, and interactive elements, the experience invites visitors to slow down, discover the little things, and choose how they want to explore a city.

---

## ✨ Overview

Most travel websites show you places. Phantom Roads is designed to make you feel like you're moving through them.

The experience unfolds through a sequence of full-screen scenes. As visitors scroll, backgrounds transition, camera movements create a sense of depth, and content enters the screen in carefully choreographed animations.

Starting with Lisbon, Portugal, the website combines warm sunset photography, rain-soaked cobblestone streets, glowing amber streetlights, and dark, atmospheric interface elements to create a distinctive visual identity.

## 🎬 The Experience

### 1. Hero — Enter the Journey

The opening screen introduces the Phantom Roads experience through a cinematic cityscape.

- Full-screen city photography.
- Elegant typography and minimal navigation.
- Atmospheric lighting and a darkened visual treatment.
- A clear call to action to begin exploring.
- A cinematic transition into the first scene.

### 2. NOTICE — These Roads Are Real

The journey begins with an invitation to notice the details that make a place unique.

- Immersive city-street background.
- Scroll-driven camera movement.
- Headline and supporting text positioned on the left.
- A discovery card on the right featuring a hidden architectural detail.
- Interactive reveal button.
- Animated journey progress indicator.

The goal is to make visitors feel that every street holds something worth discovering.

### 3. EXPLORE — Move the Way You Want

Visitors choose how they want to experience the city.

- A new cinematic street background.
- Driving and Walking mode cards.
- A focused driving image featuring a car on the road.
- A focused walking image featuring footsteps on cobblestones.
- Interactive selection states and subtle hover effects.
- Animated text and card entrances.

Instead of repeating the same cityscape in every card, each image represents a different way to experience the streets.

### 4. FEEL — Where to First?

The final scene opens the experience towards new destinations.

- A panoramic city-street background.
- Destination preview card.
- Rotating destination photographs with a simple crossfade.
- Destination name and location.
- A call to action to choose a city.

The destination preview keeps the interface simple while allowing different cities to be introduced visually.

---

## 🎨 Visual Direction

Phantom Roads follows a cinematic, atmospheric design language.

**Colour palette**
- Deep charcoal and near-black for the interface.
- Warm amber and golden tones from streetlights and sunsets.
- Muted teal for selected interactive elements.
- Soft ivory for headings and important text.

**Typography**
- Elegant serif typography for large headlines.
- Clean sans-serif typography for navigation, labels, descriptions, and buttons.

**Photography**
- Cinematic city streets and architecture.
- Rain-soaked cobblestones and reflective surfaces.
- Warm window lights and streetlamps.
- Atmospheric skies and distant city views.
- Close-up details that encourage exploration.

The visual experience prioritises photography, restrained interface elements, and smooth transitions over excessive decoration.

---

## ⚡ Animations & Interactions

The website uses scroll-driven animation to create the feeling of moving deeper into a city instead of simply scrolling through stacked sections.

| Effect | Purpose |
|---|---|
| Scroll-Linked Camera Push-In | Creates the illusion of travelling forward into a scene. |
| Pinned Scroll Storytelling | Keeps scenes in place while their animations progress. |
| Background Crossfade | Transitions between city images without abrupt cuts. |
| Staggered Text Reveal | Introduces headings and descriptions in sequence. |
| Directional Content Animation | Moves text towards the left and cards in from the right. |
| Animated Progress Indicator | Communicates the visitor's position in the journey. |
| Card Microinteractions | Adds subtle feedback to interactive elements. |
| Destination Image Crossfade | Rotates destination photographs smoothly. |
| Reduced-Motion Fallback | Provides a simpler experience for visitors who prefer less motion. |

Animations are coordinated with scroll progress so visitors can move forward or backward through the experience naturally.

---

## 🛠️ Tech Stack

- **HTML5** — Page structure and content.
- **CSS3** — Layout, responsive styling, backgrounds, and transitions.
- **JavaScript** — Interactions and animation logic.
- **GSAP** — Timeline-based animation.
- **GSAP ScrollTrigger** — Scroll-linked animations, pinned scenes, and scrubbed timelines.

The project uses a lightweight front-end approach, with the main experience built around existing HTML, CSS, JavaScript, and image assets.

---

## 📁 Project Structure

The main files are organised around the individual scenes and the shared journey animation.

```text
phantom-roads/
├── hero.html
├── hero.css
├── journey.css
├── scroll1.css
├── scroll2.css
├── scroll3.css
├── scroll1.js
├── scroll2.js
└── images/
    └── ...
```

**Note:** Adjust the file tree to match the actual repository, including any additional JavaScript files, folders, or assets.

### Key Files

| File | Responsibility |
|---|---|
| `hero.html` | Main page structure, navigation, and journey scenes. |
| `hero.css` | Hero styling and related visual elements. |
| `journey.css` | Shared scene layout, background layers, transitions, and responsive behaviour. |
| `scroll1.css` | NOTICE section styling. |
| `scroll2.css` | EXPLORE section styling. |
| `scroll3.css` | FEEL section styling. |
| `scroll1.js` | Main scroll-driven animation timeline. |
| `scroll2.js` | Driving and Walking mode-card interactions. |
| `images/` | Background photographs, card images, and other visual assets. |

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser.
- A code editor such as Visual Studio Code.
- A local development server.
- GSAP and ScrollTrigger available through the project's existing dependency or script setup.

### Installation

**1. Clone the repository**

```bash
git clone <your-repository-url>
```

**2. Navigate to the project directory**

```bash
cd phantom-roads
```

**3. Open the project in Visual Studio Code**

```bash
code .
```

**4. Start a local development server**

If you use the Live Server extension in VS Code, open `hero.html` and select **Open with Live Server**.

Alternatively, use any local server compatible with your project structure.

**5. Explore the experience**

Open the local development URL in your browser and scroll through the scenes to experience the transitions and interactions.

> Ensure that all image paths and GSAP script imports match your project structure.

---

## 📱 Responsive Design & Accessibility

Phantom Roads is designed to adapt to different screen sizes.

- Responsive layouts for desktop, tablet, and mobile.
- Background images sized to cover the viewport.
- Content positioning adjusted for smaller screens.
- Reduced-motion support for visitors who prefer simpler animations.
- Normal browser scrolling without mouse-wheel hijacking.
- Interactive elements designed to remain accessible and usable.

Because immersive full-screen layouts behave differently across devices, the experience should be tested at multiple viewport sizes.

---

## 🌱 Future Improvements

Potential additions include:

- More cities and destination collections.
- Additional hidden details to discover.
- A dedicated city-selection experience.
- More interactive exploration modes.
- Optional ambient city sounds.
- Further refinements to camera movement and scene transitions.

These are possible future enhancements rather than requirements for the current experience.

---

## 💡 Design Philosophy

**Notice the details. Explore at your own pace. Feel the journey.**

Phantom Roads is built around the idea that exploring a city is about more than reaching a destination. It's about the atmosphere of a street, the light falling across old buildings, and the small details that make a place memorable.

The goal is to create a web experience that feels less like navigating a website and more like stepping into another place.

---

**Phantom Roads — The world is closer than it looks.**