# Image Requirements for U'mwiza Rwanda Platform

## 📸 Required Images

### Children Photos
Place all children photos in: `frontend/public/images/`

**Required Files:**
1. **amani.jpg** - Girl, age 10-12, for Amani Uwase
2. **jean.jpg** - Boy, age 8-10, for Jean Mugabo  
3. **grace.jpg** - Girl, age 13-15, for Grace Ishimwe
4. **david.jpg** - Boy, age 10-12, for David Nkurunziza
5. **placeholder.jpg** - Generic placeholder for missing photos

**Image Specifications:**
- Format: JPG or PNG
- Recommended size: 400x400px to 800x800px
- Aspect ratio: Square (1:1) or Portrait (3:4)
- File size: Under 500KB each
- Quality: High resolution, clear face visibility

### Landing Page Images (Optional but Recommended)
Place in: `frontend/public/images/`

6. **hero-background.jpg** - Community/children group photo (1920x1080px)
7. **mission-image.jpg** - Community work/helping hands (800x600px)
8. **impact-image.jpg** - Happy children in school (800x600px)

### Logo (If Available)
9. **logo.png** - Organization logo with transparent background (512x512px)

---

## 📁 Directory Structure

```
frontend/public/images/
├── amani.jpg          ← Girl photo
├── jean.jpg           ← Boy photo
├── grace.jpg          ← Girl photo
├── david.jpg          ← Boy photo
├── placeholder.jpg    ← Default image
├── hero-background.jpg (optional)
├── mission-image.jpg  (optional)
├── impact-image.jpg   (optional)
└── logo.png          (optional)
```

---

## 🎨 Image Guidelines

### For Children Photos:
- ✅ Clear, well-lit photos
- ✅ Smiling, friendly expressions
- ✅ School uniform or casual clothing
- ✅ Neutral or outdoor background
- ✅ Age-appropriate appearance
- ❌ No blurry or dark photos
- ❌ No inappropriate content
- ❌ No watermarks or text overlays

### For Landing Page:
- ✅ High quality, professional photos
- ✅ Showing community, education, or support activities
- ✅ Diverse representation
- ✅ Positive, hopeful imagery
- ❌ No stock photo watermarks
- ❌ No copyrighted images without permission

---

## 🔧 How to Add Images

### Step 1: Create Images Directory
```bash
cd frontend/public
mkdir images
```

### Step 2: Add Your Images
Copy your image files into `frontend/public/images/`

### Step 3: Verify Image Paths
Images will be accessible at:
- `http://localhost:3000/images/amani.jpg`
- `http://localhost:3000/images/jean.jpg`
- etc.

### Step 4: Test in Browser
1. Start the frontend: `npm run dev`
2. Navigate to: `http://localhost:3000/images/amani.jpg`
3. Verify image loads correctly

---

## 🖼️ Current Image Usage

### Children List Page
- Shows child photo in card format
- Falls back to placeholder if image missing
- Path: `/images/{firstName.toLowerCase()}.jpg`

### Child Profile Page
- Large profile photo in header
- Photo in media tab
- Falls back to placeholder if missing

### Dashboard
- Small thumbnail photos in recent activity
- Profile pictures for staff members

---

## 📝 Image Naming Convention

**Pattern:** `{firstName}.jpg` (all lowercase)

**Examples:**
- Amani Uwase → `amani.jpg`
- Jean Mugabo → `jean.jpg`
- Grace Ishimwe → `grace.jpg`
- David Nkurunziza → `david.jpg`

---

## 🚨 Important Notes

1. **Privacy & Consent**: Ensure you have proper consent to use children's photos
2. **Copyright**: Only use images you have rights to use
3. **File Size**: Optimize images to reduce load time (use tools like TinyPNG)
4. **Backup**: Keep original high-resolution copies in a separate folder
5. **Testing**: Always test images in both development and production

---

## 🔄 Fallback Behavior

If an image is missing, the system will:
1. Try to load the specified image path
2. If fails, show placeholder image
3. If placeholder missing, show gray background with initials

---

## ✅ Quick Checklist

Before testing:
- [ ] Created `frontend/public/images/` directory
- [ ] Added amani.jpg
- [ ] Added jean.jpg
- [ ] Added grace.jpg
- [ ] Added david.jpg
- [ ] Added placeholder.jpg
- [ ] Verified all images are under 500KB
- [ ] Tested images load in browser
- [ ] Checked images display correctly on children list page
- [ ] Checked images display correctly on child profile page

---

## 🆘 Troubleshooting

**Images not showing?**
1. Check file names match exactly (case-sensitive on some systems)
2. Verify images are in `frontend/public/images/` not `frontend/images/`
3. Clear browser cache (Ctrl+Shift+R)
4. Check browser console for 404 errors
5. Verify image file extensions (.jpg not .jpeg)

**Images too large?**
- Use online tools: TinyPNG, Squoosh, or ImageOptim
- Target: Under 500KB per image
- Maintain quality while reducing file size

---

**Last Updated**: January 2025
**Status**: Ready for image upload
