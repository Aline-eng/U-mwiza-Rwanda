# Design System - U'mwiza Rwanda

## 🎨 Visual Identity

### Brand Colors

**Primary Palette (Blue)**
```
Blue 50:  #eff6ff - Backgrounds, subtle highlights
Blue 100: #dbeafe - Hover states, light backgrounds
Blue 200: #bfdbfe - Borders, dividers
Blue 300: #93c5fd - Disabled states
Blue 400: #60a5fa - Interactive elements
Blue 500: #3b82f6 - Links, secondary buttons
Blue 600: #2563eb - Primary buttons, main actions (PRIMARY)
Blue 700: #1d4ed8 - Hover states for primary
Blue 800: #1e40af - Active states
Blue 900: #1e3a8a - Text emphasis
```

**Secondary Palette (Green)**
```
Green 50:  #f0fdf4 - Success backgrounds
Green 100: #dcfce7 - Light success states
Green 200: #bbf7d0 - Success borders
Green 300: #86efac - Success icons
Green 400: #4ade80 - Success interactive
Green 500: #10b981 - Success primary (SECONDARY)
Green 600: #059669 - Success emphasis
Green 700: #047857 - Success dark
Green 800: #065f46 - Success darker
Green 900: #064e3b - Success darkest
```

**Accent Colors**
```
Amber 500: #f59e0b - Warnings, highlights
Red 500:   #ef4444 - Errors, critical actions
Gray 50:   #f9fafb - Page backgrounds
Gray 100:  #f3f4f6 - Card backgrounds
Gray 200:  #e5e7eb - Borders
Gray 500:  #6b7280 - Secondary text
Gray 900:  #111827 - Primary text
```

### Typography

**Font Families**
- **Primary**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono (for code/data)

**Font Sizes**
```
xs:   12px / 0.75rem
sm:   14px / 0.875rem
base: 16px / 1rem
lg:   18px / 1.125rem
xl:   20px / 1.25rem
2xl:  24px / 1.5rem
3xl:  30px / 1.875rem
4xl:  36px / 2.25rem
5xl:  48px / 3rem
6xl:  60px / 3.75rem
```

**Font Weights**
```
Light:      300
Regular:    400
Medium:     500
Semibold:   600
Bold:       700
Extrabold:  800
```

**Line Heights**
```
Tight:   1.25
Snug:    1.375
Normal:  1.5
Relaxed: 1.625
Loose:   2
```

### Spacing Scale

```
0:    0px
1:    4px
2:    8px
3:    12px
4:    16px
5:    20px
6:    24px
8:    32px
10:   40px
12:   48px
16:   64px
20:   80px
24:   96px
32:   128px
```

### Border Radius

```
none: 0px
sm:   2px
md:   4px
lg:   8px
xl:   12px
2xl:  16px
3xl:  24px
full: 9999px
```

### Shadows

```
sm:   0 1px 2px 0 rgb(0 0 0 / 0.05)
md:   0 4px 6px -1px rgb(0 0 0 / 0.1)
lg:   0 10px 15px -3px rgb(0 0 0 / 0.1)
xl:   0 20px 25px -5px rgb(0 0 0 / 0.1)
2xl:  0 25px 50px -12px rgb(0 0 0 / 0.25)
```

## 🧩 Component Library

### Buttons

**Primary Button**
```tsx
<button className="bg-primary-600 text-white px-6 py-2.5 rounded-lg 
  hover:bg-primary-700 active:bg-primary-800 
  transition-colors duration-200 font-medium
  disabled:bg-gray-300 disabled:cursor-not-allowed">
  Primary Action
</button>
```

**Secondary Button**
```tsx
<button className="border-2 border-primary-600 text-primary-600 px-6 py-2.5 
  rounded-lg hover:bg-primary-50 active:bg-primary-100 
  transition-colors duration-200 font-medium">
  Secondary Action
</button>
```

**Danger Button**
```tsx
<button className="bg-red-500 text-white px-6 py-2.5 rounded-lg 
  hover:bg-red-600 active:bg-red-700 
  transition-colors duration-200 font-medium">
  Delete
</button>
```

**Ghost Button**
```tsx
<button className="text-gray-700 px-6 py-2.5 rounded-lg 
  hover:bg-gray-100 active:bg-gray-200 
  transition-colors duration-200 font-medium">
  Cancel
</button>
```

### Cards

**Basic Card**
```tsx
<div className="bg-white rounded-xl shadow-md p-6 
  hover:shadow-lg transition-shadow duration-200">
  {/* Content */}
</div>
```

**Interactive Card**
```tsx
<div className="bg-white rounded-xl shadow-md p-6 
  hover:shadow-xl hover:scale-[1.02] 
  transition-all duration-200 cursor-pointer">
  {/* Content */}
</div>
```

**Stat Card**
```tsx
<div className="bg-gradient-to-br from-primary-500 to-primary-600 
  text-white rounded-xl p-6 shadow-lg">
  <div className="text-4xl font-bold mb-2">450+</div>
  <div className="text-primary-100">Families Supported</div>
</div>
```

### Form Inputs

**Text Input**
```tsx
<input 
  type="text"
  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed"
  placeholder="Enter text..."
/>
```

**Select Dropdown**
```tsx
<select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
  bg-white">
  <option>Select option</option>
</select>
```

**Textarea**
```tsx
<textarea 
  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    resize-none"
  rows={4}
  placeholder="Enter description..."
/>
```

### Badges

**Status Badges**
```tsx
// Active
<span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
  Active
</span>

// Pending
<span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
  Pending
</span>

// Inactive
<span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
  Inactive
</span>
```

### Alerts

**Success Alert**
```tsx
<div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
  <div className="flex items-center">
    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
    <p className="text-green-700">Operation completed successfully!</p>
  </div>
</div>
```

**Error Alert**
```tsx
<div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
  <div className="flex items-center">
    <XCircle className="h-5 w-5 text-red-500 mr-3" />
    <p className="text-red-700">An error occurred. Please try again.</p>
  </div>
</div>
```

### Tables

**Data Table**
```tsx
<div className="overflow-x-auto rounded-lg border border-gray-200">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          Data
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Modals

**Modal Overlay**
```tsx
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
    <div className="p-6">
      {/* Modal content */}
    </div>
  </div>
</div>
```

### Loading States

**Spinner**
```tsx
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
```

**Skeleton Loader**
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

## 📱 Responsive Breakpoints

```
sm:  640px  - Mobile landscape
md:  768px  - Tablet
lg:  1024px - Desktop
xl:  1280px - Large desktop
2xl: 1536px - Extra large desktop
```

## ✨ Animations

### Transitions
```css
transition-all duration-200 ease-in-out
transition-colors duration-200
transition-transform duration-300
```

### Hover Effects
```css
hover:scale-105
hover:shadow-lg
hover:bg-primary-700
hover:-translate-y-1
```

### Entrance Animations
```tsx
// Fade In
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>

// Slide Up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// Scale In
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
```

## 🎯 Layout Patterns

### Container
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Grid Layouts
```tsx
// 2 Column
<div className="grid md:grid-cols-2 gap-6">

// 3 Column
<div className="grid md:grid-cols-3 gap-6">

// 4 Column
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

// Responsive
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

### Flex Layouts
```tsx
// Center
<div className="flex items-center justify-center">

// Space Between
<div className="flex items-center justify-between">

// Vertical Stack
<div className="flex flex-col space-y-4">

// Horizontal Stack
<div className="flex items-center space-x-4">
```

## 🌐 Accessibility

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
```

### ARIA Labels
```tsx
<button aria-label="Close modal">
<input aria-describedby="email-error">
<div role="alert" aria-live="polite">
```

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order should be logical
- Focus indicators must be visible

## 📐 Icon System

Using **Lucide React** icons:
- Size: 20px (h-5 w-5) for inline
- Size: 24px (h-6 w-6) for buttons
- Size: 32px (h-8 w-8) for headers
- Color: Inherit from parent or use text-{color}

## 🎨 Dark Mode (Future)

Prepare components with dark mode variants:
```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
```

## 📝 Content Guidelines

### Headings
- H1: Page titles (text-4xl or text-5xl)
- H2: Section titles (text-3xl or text-4xl)
- H3: Subsection titles (text-2xl or text-3xl)
- H4: Card titles (text-xl or text-2xl)

### Body Text
- Primary: text-base (16px)
- Secondary: text-sm (14px)
- Small: text-xs (12px)

### Emphasis
- Bold: font-semibold or font-bold
- Color: text-primary-600 or text-secondary-600
- Uppercase: uppercase tracking-wider

## 🚀 Performance

- Use Next.js Image component for all images
- Lazy load components below the fold
- Minimize animation complexity
- Use CSS transforms over position changes
- Implement skeleton loaders for async content
