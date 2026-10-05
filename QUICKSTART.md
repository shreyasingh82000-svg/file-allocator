# Quick Start Guide - File Allocation Methods Simulator

## 🚀 Get Started in 3 Steps

### Step 1: Open Terminal/PowerShell

```powershell
# Navigate to the project directory
cd "C:\Users\Shreya Singh\Desktop\OS\file-allocator"
```

### Step 2: Start the Development Server

```powershell
npm run dev
```

You should see:
```
  VITE v8.3.2  ready in 324 ms
  ➜  Local:   http://localhost:5174/
```

### Step 3: Open Browser

Open your browser and go to:
```
http://localhost:5174/
```

---

## 📍 Navigation Guide

### Home Page
- See project title and team members
- Click **START SIMULATION** to begin
- Click **ABOUT PROJECT** for details

### Dashboard
- View real-time statistics (blocks, files, utilization)
- See fragmentation analysis
- View all created files
- Monitor disk fragmentation

### Simulator (Main Feature)
1. **Create a File**:
   - Enter file name: `StudentData`
   - Enter size: `5`
   - Select method: `Contiguous`
   - Click **Create File**

2. **Watch the Magic**:
   - See blocks turn green on disk
   - Watch the OS Activity Log
   - Check statistics update

3. **Try Other Methods**:
   - Create another file using `Linked`
   - Create another using `Indexed`
   - See different patterns

4. **Delete Files**:
   - Click trash icon to delete
   - Blocks become free again

### File Access
1. Select a file from dropdown
2. Enter a logical block number
3. See how OS finds the physical block
4. Watch the step-by-step process

### Comparison
- See all three methods side-by-side
- Detailed pros and cons
- Performance characteristics

### Fragmentation
- Analyze free space distribution
- See fragmentation statistics
- Understand external fragmentation

### Learning
- Expand each concept to learn more
- Understand terminology
- Quick reference guide

### Quiz
- Take 15-question test
- Get instant feedback
- See your score and performance

### Viva
- Read important interview questions
- Study comprehensive answers
- Prepare for exams

### About
- Full project details
- Technology stack
- Feature list
- Team information

---

## 🎯 Demo Scenario (5 minutes)

1. **Go to Simulator** (1 min)
   - Click Simulator in navbar
   - Start with fresh 50-block disk

2. **Create Contiguous File** (1 min)
   - Name: `File1`
   - Size: `4`
   - Method: `Contiguous`
   - Click Create File
   - Observe green blocks appear consecutively

3. **Create Linked File** (1 min)
   - Name: `File2`
   - Size: `3`
   - Method: `Linked`
   - Click Create File
   - Observe scattered blocks appear

4. **Delete and Watch Fragmentation** (1 min)
   - Delete File1
   - Go to Fragmentation page
   - See free blocks are now scattered
   - Try to create new contiguous file (may fail)

5. **Try File Access** (1 min)
   - Go to File Access
   - Select File2 (Linked)
   - Enter logical block 2
   - Watch pointer traversal
   - See physical block calculation

---

## 🔧 Keyboard Shortcuts

| Action | How |
|--------|-----|
| Go to Home | Click "File Allocator" logo |
| Go to Simulator | Click "Simulator" in navbar |
| Mobile Menu | Click hamburger ☰ on small screens |
| Expand Section | Click any heading to expand/collapse |
| Inspect Block | Click any block on disk |
| Delete File | Click trash icon in file table |
| Submit Form | Press Enter or click button |

---

## 📊 Color Reference

| Color | Meaning |
|-------|---------|
| 🟨 Cream (#E4D6AF) | Free blocks |
| 🟩 Green (#8C9637) | Allocated data blocks |
| 🟧 Orange (#DE774F) | Index blocks |
| 🟪 Light Purple (#BEB78A) | Card backgrounds |
| 🔗 Tan (#DA9770) | Accent/buttons |

---

## 💾 Data Persistence

Your work is automatically saved!
- Disk state is saved to browser LocalStorage
- Quiz progress is saved
- Files and statistics persist
- Refresh page - everything still there!

To clear saved data:
- Go to Settings (if available)
- Click "Clear Saved Data"
- Confirm deletion

---

## 🐛 Troubleshooting

### Issue: Can't see the application
**Solution**: 
- Make sure you're at http://localhost:5174/
- Check terminal for errors
- Try `npm run dev` again

### Issue: Port 5174 is already in use
**Solution**: 
- Another app is using it
- Terminal shows next available port
- Use that port instead

### Issue: Styles look broken
**Solution**: 
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Try a different browser

### Issue: Can't create file
**Possible reasons**:
- Not enough disk space
- No consecutive blocks (for Contiguous)
- Duplicate file name
- Invalid file size
**Check**: Error message will tell you why!

---

## ✨ Best Practices

1. **Start with Simulator**
   - Understand the interface
   - Create files with different methods
   - Watch the allocation process

2. **Use File Access Page**
   - See how blocks are located
   - Compare method differences
   - Understand logical vs physical blocks

3. **Check Fragmentation**
   - Delete files and see patterns
   - Understand external fragmentation
   - See why Contiguous fails sometimes

4. **Use Quiz to Test**
   - After learning a concept
   - Review your answers
   - Study the explanations

5. **Reference Viva Questions**
   - During preparation
   - For interview practice
   - To understand key concepts

---

## 📚 Learn More

- **In-App Learning**: Go to "Learning" page
- **Read Project Details**: Go to "About" page
- **See Comparison**: Go to "Comparison" page
- **Check README**: Read README_PROJECT.md
- **Study Code**: Look at src/ directory

---

## 🎓 Educational Objectives

After using this simulator, you'll understand:

✅ How operating systems allocate disk space
✅ Advantages and disadvantages of each method
✅ Why fragmentation matters
✅ How to calculate physical block addresses
✅ Difference between sequential and direct access
✅ Real-world trade-offs in system design

---

## 🚀 Pro Tips

1. **Load Demo**: Click "Load Demo" button to see preset scenario
2. **Change Disk Size**: Use "Change Disk Size" to start fresh
3. **Reset**: Click "Reset Simulation" to clear everything
4. **Expand Explanations**: Click cards to see more details
5. **Try Edge Cases**: Create files until disk is full to see failures

---

## 📞 Need Help?

- Check in-app "Learning" page
- Read "About" section
- Look at "Viva" questions
- Check this QUICKSTART file
- Review README_PROJECT.md

---

## ✅ Project Verification

The project is fully functional when:
- ✅ Dev server starts without errors
- ✅ Browser shows the landing page
- ✅ Can navigate to all 10 pages
- ✅ Can create files with all three methods
- ✅ Disk visualization updates correctly
- ✅ Activity log shows steps
- ✅ Statistics calculate correctly
- ✅ Quiz displays questions and scores
- ✅ Data persists after refresh

---

## 🎉 You're Ready!

Everything is set up and working. Start exploring the File Allocation Methods Simulator and learn how operating systems manage disk space!

**Happy Learning! 📖**

---

*Last Updated: October 5, 2026*
*Status: ✅ Project Complete*
