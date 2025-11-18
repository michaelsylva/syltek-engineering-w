# Planning Guide

A professional, modern website showcasing Syltek Engineering's precision mechanical engineering services, biomedical automation expertise, and comprehensive prototyping capabilities with an immersive 3D experience that demonstrates technical sophistication.

**Experience Qualities**:
1. **Technical Excellence** - Clean, precision-focused design that mirrors the accuracy and attention to detail inherent in mechanical engineering work
2. **Approachable Innovation** - Balance high-tech sophistication with warmth and accessibility to make complex engineering services feel tangible and trustworthy
3. **Dimensional Depth** - Interactive 3D elements that bring engineering concepts to life and demonstrate spatial thinking capabilities

**Complexity Level**: Content Showcase (information-focused)
  - Multi-section informational site with services, expertise, process knowledge, and capabilities—focused on presenting technical content clearly with interactive 3D enhancements rather than complex application state

## Essential Features

### Interactive 3D Engineering Component Hero
- **Functionality**: Animated 3D mechanical assembly (gear system, linear actuator, or robotic arm) that responds to mouse movement and scroll
- **Purpose**: Immediately communicates technical expertise and engineering sophistication while creating memorable first impression
- **Trigger**: Page load with continuous subtle animation; mouse interaction adds parallax effect
- **Progression**: Page loads → 3D component fades in with assembly animation → User scrolls/moves mouse → Component responds with smooth rotation/perspective shifts → Draws attention to hero content
- **Success criteria**: 3D renders smoothly at 60fps on desktop, degrades gracefully on mobile, doesn't obstruct key messaging

### Service Sections Navigation
- **Functionality**: Smooth scroll navigation between major service categories with visual indicators
- **Purpose**: Guide visitors through comprehensive service offerings in digestible sections
- **Trigger**: Click on navigation links or scroll naturally through page
- **Progression**: User clicks service nav → Smooth scroll to section → Section animates into view → Active nav item highlights → User absorbs content
- **Success criteria**: All sections accessible within 2 clicks, clear visual hierarchy, mobile-friendly navigation

### Expertise & Team Showcase
- **Functionality**: Professional presentation of Frank Sylva's experience and technical capabilities
- **Purpose**: Build credibility and trust through demonstrated expertise and longevity
- **Trigger**: User scrolls to team/expertise section
- **Progression**: Section enters viewport → Content fades in with stagger → Skills/tools display in organized grid → Contact CTA becomes prominent
- **Success criteria**: Expertise clearly communicated, professional tone maintained, easy path to contact

### Process & Tools Knowledge Base
- **Functionality**: Organized display of manufacturing processes and software capabilities with expandable details
- **Purpose**: Educate potential clients on available capabilities and demonstrate comprehensive toolset
- **Trigger**: User navigates to capabilities section or expands individual process cards
- **Progression**: User views process grid → Clicks process card → Detailed information expands → User learns technical details → Can compare multiple processes
- **Success criteria**: Information well-organized, technical details accessible without overwhelming, visual clarity maintained

### Contact & Inquiry System
- **Functionality**: Clear contact information and optional inquiry form for project discussions
- **Purpose**: Convert interested visitors into leads and consultations
- **Trigger**: User clicks contact CTA or scrolls to footer
- **Progression**: User identifies need → Finds contact section → Views contact options → Initiates communication
- **Success criteria**: Multiple contact methods visible, professional presentation, mobile-accessible

## Edge Case Handling
- **3D Performance Issues**: Detect device capabilities and disable/simplify 3D on low-performance devices while maintaining visual appeal
- **Long Content Sections**: Implement progressive disclosure with "read more" for detailed technical specifications
- **Mobile Navigation**: Hamburger menu with full-screen overlay for comprehensive navigation on small screens
- **Slow Network**: Optimize 3D model size, lazy load section content, show skeleton loaders for smooth perceived performance
- **Browser Compatibility**: Graceful fallback to 2D hero animation if WebGL unavailable

## Design Direction
The design should evoke precision engineering, technical excellence, and innovative sophistication—feeling both cutting-edge and trustworthy, with a clean minimal interface that lets the impressive 3D work and technical capabilities take center stage while maintaining warmth through subtle gradients and approachable typography.

## Color Selection
Triadic color scheme balancing industrial blue, energetic accent, and neutral sophistication to communicate technical precision with innovative energy.

- **Primary Color**: Deep Technical Blue `oklch(0.45 0.15 250)` - Communicates engineering precision, trust, and technical depth; used for headers, key CTAs, and navigation
- **Secondary Colors**: 
  - Slate Gray `oklch(0.35 0.02 250)` - Professional neutrality for text and supporting elements
  - Cool Neutral `oklch(0.92 0.01 250)` - Clean background and card surfaces
- **Accent Color**: Electric Cyan `oklch(0.70 0.18 210)` - Innovation and technology; highlights interactive elements, 3D components, and hover states
- **Foreground/Background Pairings**:
  - Background (Cool White `oklch(0.98 0.005 250)`): Deep charcoal text `oklch(0.25 0.02 250)` - Ratio 13.2:1 ✓
  - Card (Cool Neutral `oklch(0.92 0.01 250)`): Deep charcoal text `oklch(0.25 0.02 250)` - Ratio 11.8:1 ✓
  - Primary (Technical Blue `oklch(0.45 0.15 250)`): White text `oklch(0.98 0.005 250)` - Ratio 8.5:1 ✓
  - Accent (Electric Cyan `oklch(0.70 0.18 210)`): Deep charcoal text `oklch(0.25 0.02 250)` - Ratio 5.2:1 ✓
  - Muted (Light Gray `oklch(0.88 0.01 250)`): Muted text `oklch(0.50 0.02 250)` - Ratio 4.8:1 ✓

## Font Selection
Typography should convey technical precision and modern professionalism using a geometric sans-serif for headlines paired with a highly legible humanist sans for body text.

- **Typographic Hierarchy**:
  - H1 (Company Name/Hero): Space Grotesk Bold/56px/tight (-0.02em) - Strong, geometric, technical presence
  - H2 (Section Headers): Space Grotesk SemiBold/36px/tight (-0.01em) - Clear hierarchy
  - H3 (Service Titles): Space Grotesk Medium/24px/normal - Subsection clarity  
  - H4 (Process Names): Space Grotesk Medium/18px/normal - Detail headers
  - Body (Descriptions): Inter Regular/16px/relaxed (1.6) - Exceptional readability for technical content
  - Small (Captions/Meta): Inter Regular/14px/normal - Supporting information
  - Button/CTA: Space Grotesk SemiBold/16px/wide (0.02em) - Clear calls to action

## Animations
Animations should feel engineered and precise—mechanical movements with realistic easing that mirror the physical world of automation and robotics, balanced with subtle micro-interactions that provide tactile feedback without distracting from technical content.

- **Purposeful Meaning**: 3D component animations mirror real mechanical assembly/disassembly; scroll-triggered reveals simulate precision manufacturing processes; hover states provide immediate tactile feedback like physical buttons
- **Hierarchy of Movement**: 
  - Primary: 3D hero component with continuous subtle rotation and parallax interaction
  - Secondary: Section fade-in with stagger on scroll for visual rhythm
  - Tertiary: Button hover states, card elevations, icon micro-interactions

## Component Selection
- **Components**: 
  - Hero: Custom 3D Three.js component with `Card` overlay for company introduction
  - Navigation: `NavigationMenu` for desktop, `Sheet` drawer for mobile with smooth scroll links
  - Service Grid: `Card` components with `HoverCard` for expanded service details
  - Team Section: `Avatar` for profile image with `Badge` for expertise tags
  - Process Grid: `Accordion` for expandable manufacturing process details
  - Tools Display: `Tabs` for software categories with icon grid inside
  - Contact: `Card` with contact info, optional `Dialog` for inquiry form
  - Footer: Simple footer with `Separator` and link groups

- **Customizations**: 
  - Custom Three.js 3D component (mechanical gear assembly or linear actuator system)
  - Gradient mesh backgrounds for hero and section dividers
  - Custom scroll progress indicator
  - Animated metric counters for years of experience

- **States**: 
  - Buttons: Default with subtle shadow → Hover with accent color shift and slight elevation → Active with press effect
  - Cards: Default flat → Hover with border glow and elevation → Focus with ring
  - 3D Component: Idle rotation → Mouse proximity amplifies rotation → Scroll position changes assembly state
  - Navigation: Transparent on top → Solid background on scroll with backdrop blur

- **Icon Selection**: 
  - Phosphor icons for: `Cube` (3D/CAD), `Gear` (mechanical), `Robot` (automation), `Flask` (biomedical), `PrinterFill` (3D printing), `Wrench` (tools), `ChartLine` (precision), `Lightning` (automation software), `Phone`/`Envelope` (contact)

- **Spacing**: 
  - Section padding: py-20 (desktop), py-12 (mobile)
  - Card padding: p-6
  - Grid gaps: gap-6 (card grids), gap-8 (section spacing)
  - Container max-width: max-w-7xl mx-auto px-4

- **Mobile**: 
  - Hero: 3D component scales down, reduced complexity for performance
  - Navigation: Hamburger menu with full-screen `Sheet` overlay
  - Service Grid: Single column stack on mobile, 2-col on tablet, 3-col on desktop
  - Process Accordion: Full-width stack on mobile with easier tap targets
  - Typography: Scale down by 30% (H1: 38px, H2: 28px, Body: 15px)
  - Reduce animation complexity on mobile for performance
