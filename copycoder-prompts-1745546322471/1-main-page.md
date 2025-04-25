Set up the frontend according to the following prompt:
  <frontend-prompt>
  Create detailed components with these requirements:
  1. Use 'use client' directive for client-side components
  2. Make sure to concatenate strings correctly using backslash
  3. Style with Tailwind CSS utility classes for responsive design
  4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
  5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
  6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
  7. Create root layout.tsx page that wraps necessary navigation items to all pages
  8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
  9. Accurately implement necessary grid layouts
  10. Follow proper import practices:
     - Use @/ path aliases
     - Keep component imports organized
     - Update current src/app/page.tsx with new comprehensive code
     - Don't forget root route (page.tsx) handling
     - You MUST complete the entire prompt before stopping
  </frontend-prompt>

  <summary_title>
QR Code Generator Dashboard UI Design
</summary_title>

<image_analysis>
1. Navigation Elements:
- Primary navigation: Website, PDF, List of Links, vCard, Business, Video, Images, Facebook, Instagram
- Top header bar with 4-step process: Select QR type → Add content → Design QR code → Download QR code
- Logo positioned in top-left corner "Online QR Generator"
- Help icon in top-right corner
- Progress indicators with numbered circles (1-4)

2. Layout Components:
- Main container width: ~1200px
- Header height: ~60px
- Card grid layout: 4x3 grid
- Cards dimensions: ~250px x 200px
- Consistent 20px spacing between cards
- Right-aligned device preview section

3. Content Sections:
- Hero text section with main heading
- QR type selection grid
- Mobile device preview frame
- Each card contains:
  - Icon (64x64px)
  - Title
  - Description text (2 lines max)

4. Interactive Controls:
- Clickable QR type cards
- Progress step indicators
- Help button
- Cards with hover state effects
- Mobile preview frame

5. Colors:
- Primary Green: #4CAF50
- Secondary Black: #333333
- Background Gray: #F5F5F5
- Card Background: #FFFFFF
- Text Gray: #666666
- Icon Green: #4CAF50

6. Grid/Layout Structure:
- 12-column grid system
- 20px gutters
- Responsive breakpoints at 1200px, 992px, 768px
- Card grid transforms to 2 columns on tablet
- Single column on mobile
</image_analysis>

<development_planning>
1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Header
│   │   ├── ProgressBar
│   │   └── QRTypeGrid
│   ├── features/
│   │   ├── QRTypeCard
│   │   ├── DevicePreview
│   │   └── HelpWidget
│   └── shared/
│       ├── Icons
│       └── Button
├── assets/
├── styles/
├── hooks/
└── utils/
```

2. Key Features:
- QR type selection system
- Step-by-step progress tracking
- Mobile preview rendering
- Card grid layout manager
- Responsive layout system

3. State Management:
```typescript
interface AppState {
  qrGenerator: {
    selectedType: QRType;
    currentStep: number;
    content: string;
    design: QRDesign;
  },
  ui: {
    isMobile: boolean;
    activeCard: string;
    helpOpen: boolean;
  }
}
```

4. Component Architecture:
- App (root)
  - Header
  - ProgressBar
  - QRTypeGrid
    - QRTypeCard[]
  - DevicePreview
  - HelpWidget

5. Responsive Breakpoints:
```scss
$breakpoints: (
  'desktop': 1200px,
  'tablet': 992px,
  'mobile': 768px,
  'small': 576px
);
```
</development_planning>