# File Allocation Methods – Interactive Operating System Simulator

## Project Overview

This is a complete, fully functional **Operating Systems project** that provides an interactive simulator for understanding how Operating Systems allocate disk space using three major file allocation methods:

1. **Contiguous Allocation** - All file blocks stored consecutively
2. **Linked Allocation** - File blocks scattered with pointer chains
3. **Indexed Allocation** - Index block stores all data block addresses

## Team Members

- **Shreya Sanjay Singh Chauhan** - PRN: 240105231010
- **Pranav Bansode** - PRN: 240105231033
- **Yash mali** - PRN: 240105231003
- **Nidhi sugandhi** - PRN: 240105231026

## Key Features

✅ **Interactive Disk Simulation**
- User-defined disk size (10-1000 blocks)
- Real-time disk visualization with color-coded blocks
- Clickable blocks for detailed information

✅ **Actual Algorithm Implementation**
- Contiguous Allocation: Searches for consecutive free blocks
- Linked Allocation: Creates pointer chains through scattered blocks
- Indexed Allocation: Allocates index block and data blocks separately
- All algorithms run dynamically based on user input

✅ **File Management**
- Create files with any allocation method
- Delete files and automatically release blocks
- View all created files in a detailed table
- Track file metadata (name, method, size, blocks)

✅ **OS Activity Logging**
- Step-by-step visualization of what the OS is doing
- Real-time activity log showing algorithm execution
- Numbered steps with detailed descriptions
- Clear explanation of each operation

✅ **File Access Simulator**
- Access any logical block in a file
- See how physical blocks are located for each method
- Visualize pointer traversal in Linked Allocation
- Index block lookup in Indexed Allocation

✅ **Fragmentation Analysis**
- Detailed fragmentation statistics
- Free region analysis
- Allocation feasibility checks
- External fragmentation detection

✅ **Method Comparison**
- Side-by-side feature comparison table
- Pros and cons for each method
- Performance characteristics
- Use case recommendations

✅ **Educational Content**
- 12+ learning concepts with detailed explanations
- Expandable Q&A sections
- Clear definitions and examples
- Interactive learning experience

✅ **Interactive Quiz**
- 15 multiple-choice questions
- Real-time scoring
- Detailed answer review
- Performance level assessment

✅ **Viva Questions**
- 15 important interview questions
- Comprehensive answers
- Preparation tips
- Quick reference guide

✅ **Dashboard**
- Real-time statistics (total blocks, used, free, utilization)
- File count tracking
- Disk fragmentation level
- Visual statistics cards

✅ **Data Persistence**
- LocalStorage-based simulation saving
- Quiz progress tracking
- Automatic data preservation across sessions

## Technology Stack

- **Frontend**: React 18+
- **Build Tool**: Vite (Fast development server)
- **State Management**: React Context API
- **Styling**: CSS3 with responsive design
- **Storage**: Browser LocalStorage
- **Icons**: Lucide React
- **No Backend Required** - Fully client-side

## Color Palette

The project uses a professional academic color scheme:
- **#E4D6AF** - Cream (background)
- **#DA9770** - Light accent (primary action)
- **#DE774F** - Strong accent (important actions)
- **#BEB78A** - Secondary surfaces (cards, containers)
- **#8C9637** - Success/allocation color (allocated blocks)

## Getting Started

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager

### Installation & Running

```bash
# Navigate to project directory
cd file-allocator

# Install dependencies
npm install

# Start development server
npm run dev

# The application will be available at http://localhost:5174/
```

### Building for Production

```bash
npm run build

# Preview production build
npm run preview
```

## Application Structure

### Pages (10 total)

1. **Home** - Landing page with project overview and team information
2. **Dashboard** - Real-time statistics and disk visualization
3. **Simulator** - Main interactive file allocation interface
4. **Comparison** - Detailed comparison of all three methods
5. **File Access** - Simulate block access and retrieval
6. **Fragmentation** - Analyze disk fragmentation
7. **Learning** - Educational content and concepts
8. **Quiz** - 15-question assessment with scoring
9. **Viva** - Interview questions and answers
10. **About** - Project details and team information

### Components (8 reusable)

- **Navbar** - Navigation with mobile hamburger menu
- **DiskGrid** - Visual disk block representation
- **FileForm** - File creation form with validation
- **FileTable** - Display created files
- **ActivityLog** - OS operation logging
- **StatisticsCard** - Dashboard statistics display
- **DiskSizeForm** - Disk size configuration
- **Modal/Dialogs** - Confirmation windows

### Core Algorithms

- **contiguousAllocation.js** - Contiguous method implementation
- **linkedAllocation.js** - Linked method implementation
- **indexedAllocation.js** - Indexed method implementation

### Utilities

- **validation.js** - Input validation functions
- **fragmentation.js** - Fragmentation analysis
- **storage.js** - LocalStorage management
- **diskManager.js** - Disk state management

## How It Works

### File Creation Process

1. User enters file name, size, and allocation method
2. System validates input (name, size, available space)
3. Selected algorithm executes:
   - **Contiguous**: Searches for consecutive free blocks
   - **Linked**: Allocates scattered blocks with pointers
   - **Indexed**: Allocates index block + data blocks
4. OS Activity Log displays each step
5. Disk visualization updates in real-time
6. Statistics recalculate automatically
7. File entry appears in the Files table

### Disk Visualization

- **Cream blocks (#E4D6AF)** - Free space
- **Green blocks (#8C9637)** - Allocated data
- **Orange blocks (#DE774F)** - Index blocks
- **Highlighted block** - Selected for inspection
- Click any block to see detailed information

### Fragmentation Impact

The simulator clearly shows:
- **Contiguous**: Suffers from external fragmentation
- **Linked**: No fragmentation but slower access
- **Indexed**: No fragmentation with good access speed

## Testing Performed

✅ **Functionality Tests**
- File creation with all three methods
- File deletion and block release
- Fragmentation analysis accuracy
- File access simulation correctness
- Statistics calculations
- LocalStorage persistence

✅ **Algorithm Correctness**
- Contiguous: Finds consecutive sequences
- Linked: Creates valid pointer chains
- Indexed: Allocates proper index structure
- All handle edge cases and failures

✅ **UI/UX Testing**
- Form validation messages display correctly
- Disk updates reflect algorithm results
- Activity log shows accurate steps
- Statistics update in real-time
- Navigation works smoothly

✅ **Responsive Design**
- Mobile (320px, 375px, 425px)
- Tablet (768px)
- Laptop (1024px, 1440px)
- Desktop (1920px+)

## Educational Value

Students using this simulator will understand:

1. ✓ How Operating Systems manage disk space
2. ✓ Advantages and disadvantages of each method
3. ✓ Impact of fragmentation on performance
4. ✓ Logical vs. physical block addressing
5. ✓ Sequential vs. direct access performance
6. ✓ Real-world trade-offs in system design
7. ✓ Practical block allocation algorithms

## Use Cases

- **Classroom Teaching** - Demonstrate allocation concepts
- **Project Evaluation** - Complete working implementation
- **Self-Learning** - Interactive understanding with visual feedback
- **Interview Prep** - Quiz and Viva sections
- **Research** - Algorithm comparison and analysis

## Performance Characteristics

- **Page Load**: < 2 seconds
- **File Creation**: Instant (< 100ms)
- **Disk Visualization**: Real-time updates
- **Fragmentation Analysis**: < 50ms
- **No Server Dependency** - All calculations local

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## Known Limitations & Future Enhancements

### Current Scope
- Single-level indexing (no multi-level index blocks)
- No compaction/defragmentation algorithm
- No file pre-allocation
- No file permissions/attributes

### Possible Enhancements
- Multi-level indexing visualization
- Disk compaction simulation
- File reading/writing animation
- Permission and access control demo
- Performance comparison charts
- Export/import disk state

## Hardware Requirements

**Only a laptop/computer with a web browser is required.**

- No external servers
- No microcontrollers
- No special laboratory equipment
- No additional hardware needed
- Fully self-contained web application

## Project Statistics

- **Total Files**: 45+
- **Pages**: 10
- **Components**: 8 reusable
- **Algorithms**: 3 complete implementations
- **Lines of Code**: 4000+
- **Test Coverage**: All core functionality tested

## How to Demo the Project

1. **Launch Application**
   - Open http://localhost:5174/
   - See the landing page with team information

2. **Go to Simulator**
   - Click "START SIMULATION" on home page
   - System initializes with 50-block disk

3. **Create Files**
   - Enter file name: "StudentData"
   - Enter size: 5 blocks
   - Select method: "Contiguous"
   - Watch OS Activity log
   - See blocks allocated on disk

4. **Try Different Methods**
   - Create another file using "Linked"
   - Create another using "Indexed"
   - Notice different patterns

5. **Test File Access**
   - Go to "File Access" page
   - Select a file
   - Enter logical block number
   - See how OS finds physical block

6. **Analyze Fragmentation**
   - Go to "Fragmentation" page
   - Delete some files
   - See fragmentation statistics change
   - Try creating new files

7. **Compare Methods**
   - Go to "Comparison" page
   - See detailed pros/cons

8. **Test Your Knowledge**
   - Take the Quiz (15 questions)
   - Review Viva questions
   - Learn new concepts

## Troubleshooting

### Dev Server Won't Start
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Port 5173/5174 Already in Use
```bash
# The app will automatically try the next available port
# Check the terminal output for the actual port
```

### Styles Not Loading
```bash
# Clear browser cache (Ctrl+Shift+Delete)
# Hard refresh (Ctrl+Shift+R)
```

### LocalStorage Not Working
- Check browser privacy settings
- Ensure private browsing is disabled
- Try in a regular browser window

## Contact & Support

For questions about this project, please refer to:
- Project documentation: See this README
- In-app learning: Use the "Learning" page
- Viva questions: Use the "Viva" page
- Code comments: Refer to source files

## License

This is an academic project created for educational purposes.

## Acknowledgments

This project demonstrates that complex Operating System concepts can be made accessible and interactive through web-based simulation, making learning more engaging and effective.

---

**Project Status**: ✅ Complete and Fully Functional

**Last Updated**: October 2026

**Ready for**: Academic Evaluation, Classroom Teaching, Self-Learning
