// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather icons
    feather.replace();
    
    // Global state
    const state = {
        resumeSections: [],
        history: [],
        currentHistoryIndex: -1,
        activeSection: null,
        previewMode: false,
        currentTheme: null,
        activeTemplate: null,
        lastSaved: null,
        fonts: {
            heading: 'Poppins',
            body: 'Poppins'
        }
    };
    
    // Section templates with improved content
    const sectionTemplates = [
        {
            id: 'about',
            title: 'About Me',
            icon: 'user',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">About Me</h2>
                <p class="text-gray-700 mb-3">A passionate professional with expertise in web development and user experience design. I enjoy creating intuitive, accessible digital experiences that solve real problems for users.</p>
                <p class="text-gray-700">I thrive in collaborative environments and bring a blend of technical skill and creative thinking to every project.</p>
            </div>`,
            animation: 'fadeIn',
            delay: 0,
            duration: 0.5,
            timing: 'ease'
        },
        {
            id: 'experience',
            title: 'Experience',
            icon: 'briefcase',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Work Experience</h2>
                <div class="mb-4">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">Senior Frontend Developer</h3>
                        <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">2020 - Present</span>
                    </div>
                    <p class="text-gray-600 italic mb-2">Innovative Tech Solutions</p>
                    <ul class="list-disc ml-5 text-gray-700">
                        <li>Led development of the company's flagship product, increasing user engagement by 35%</li>
                        <li>Mentored junior developers and implemented code review processes</li>
                        <li>Modernized legacy codebase, reducing load times by 40%</li>
                    </ul>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">UI Developer</h3>
                        <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">2018 - 2020</span>
                    </div>
                    <p class="text-gray-600 italic mb-2">Digital Creations Inc.</p>
                    <ul class="list-disc ml-5 text-gray-700">
                        <li>Developed responsive web applications for clients in finance and healthcare sectors</li>
                        <li>Collaborated with UX designers to implement pixel-perfect interfaces</li>
                    </ul>
                </div>
            </div>`,
            animation: 'slideUp',
            delay: 0.2,
            duration: 0.5,
            timing: 'ease'
        },
        {
            id: 'education',
            title: 'Education',
            icon: 'book',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Education</h2>
                <div class="mb-4">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">MSc Computer Science</h3>
                        <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">2016 - 2018</span>
                    </div>
                    <p class="text-gray-600 italic mb-2">University of Technology</p>
                    <p class="text-gray-700">Specialized in Human-Computer Interaction and Web Technologies. Graduated with honors.</p>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">BSc Information Systems</h3>
                        <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">2012 - 2016</span>
                    </div>
                    <p class="text-gray-600 italic mb-2">State University</p>
                    <p class="text-gray-700">Dean's List, President of Web Development Club</p>
                </div>
            </div>`,
            animation: 'slideLeft',
            delay: 0.4,
            duration: 0.5,
            timing: 'ease'
        },
        {
            id: 'skills',
            title: 'Skills',
            icon: 'code',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Skills</h2>
                <div class="mb-3">
                    <h3 class="text-lg font-semibold mb-2">Technical Skills</h3>
                    <div class="flex flex-wrap gap-2 mb-2">
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">JavaScript</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">React</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">Node.js</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">TypeScript</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">HTML5/CSS3</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">GraphQL</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">Webpack</span>
                    </div>
                </div>
                <div class="mb-3">
                    <h3 class="text-lg font-semibold mb-2">Soft Skills</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded">Team Leadership</span>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded">Project Management</span>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded">Problem Solving</span>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded">Communication</span>
                    </div>
                </div>
                <div>
                    <h3 class="text-lg font-semibold mb-2">Languages</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded">English (Native)</span>
                        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded">Spanish (Fluent)</span>
                        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded">French (Intermediate)</span>
                    </div>
                </div>
            </div>`,
            animation: 'scaleIn',
            delay: 0.6,
            duration: 0.5,
            timing: 'ease'
        },
        {
            id: 'projects',
            title: 'Projects',
            icon: 'folder',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Projects</h2>
                <div class="mb-4 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">E-commerce Platform</h3>
                        <a href="#" class="text-blue-600 hover:underline">View Project</a>
                    </div>
                    <p class="text-gray-700 my-2">A full-featured online shopping platform built with React, Node.js, and MongoDB.</p>
                    <div class="flex flex-wrap gap-1">
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">React</span>
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Node.js</span>
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">MongoDB</span>
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Stripe</span>
                    </div>
                </div>
                <div class="mb-4 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-semibold">Task Management App</h3>
                        <a href="#" class="text-blue-600 hover:underline">View Project</a>
                    </div>
                    <p class="text-gray-700 my-2">A collaborative task management application with real-time updates.</p>
                    <div class="flex flex-wrap gap-1">
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Vue.js</span>
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Firebase</span>
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Tailwind CSS</span>
                    </div>
                </div>
            </div>`,
            animation: 'slideInBottom',
            delay: 0.8,
            duration: 0.5,
            timing: 'ease'
        },
        {
            id: 'contact',
            title: 'Contact',
            icon: 'mail',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Contact Information</h2>
                <div class="space-y-3">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <i data-feather="mail" class="w-5 h-5 text-blue-600"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Email</p>
                            <p class="font-medium">yourname@example.com</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <i data-feather="phone" class="w-5 h-5 text-green-600"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Phone</p>
                            <p class="font-medium">(123) 456-7890</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <i data-feather="map-pin" class="w-5 h-5 text-purple-600"></i>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Location</p>
                            <p class="font-medium">San Francisco, CA</p>
                        </div>
                    </div>
                    <div class="pt-2">
                        <p class="text-lg font-medium mb-2">Connect with me</p>
                        <div class="flex gap-2">
                            <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <i data-feather="linkedin" class="w-5 h-5 text-gray-700"></i>
                            </a>
                            <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <i data-feather="github" class="w-5 h-5 text-gray-700"></i>
                            </a>
                            <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <i data-feather="twitter" class="w-5 h-5 text-gray-700"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`,
            animation: 'pulse',
            delay: 1.0,
            duration: 0.5,
            timing: 'ease'
        },
    ];
    
    // Animation presets with enhanced options
    const animationPresets = [
        { name: 'Fade In', value: 'fadeIn', description: 'Smoothly fade in from transparent to visible' },
        { name: 'Slide Up', value: 'slideUp', description: 'Glide upward while fading in' },
        { name: 'Slide Left', value: 'slideLeft', description: 'Glide from right to left while fading in' },
        { name: 'Scale In', value: 'scaleIn', description: 'Grow from smaller size while fading in' },
        { name: 'Bounce', value: 'bounce', description: 'Playful bouncing effect' },
        { name: 'Rotate', value: 'rotate', description: 'Spin continuously (good for loaders/icons)' },
        { name: 'Pulse', value: 'pulse', description: 'Gentle pulsing effect to draw attention' },
        { name: 'Shake', value: 'shake', description: 'Quick side-to-side movement' },
        { name: 'Slide In Bottom', value: 'slideInBottom', description: 'Enter from the bottom of the container' },
    ];
    
    // Theme presets with improved color combinations
    const themePresets = [
        { 
            name: 'Professional', 
            primary: '#2563eb', 
            accent: '#dbeafe', 
            text: '#1e293b', 
            background: '#ffffff',
            description: 'Clean and professional look with blue accents'
        },
        { 
            name: 'Creative', 
            primary: '#ec4899', 
            accent: '#fce7f3', 
            text: '#18181b', 
            background: '#fdfcfd',
            description: 'Bold pink tones for creative industries' 
        },
        { 
            name: 'Minimal', 
            primary: '#525252', 
            accent: '#f5f5f5', 
            text: '#171717', 
            background: '#fafafa',
            description: 'Simple monochrome design for a clean look'
        },
        { 
            name: 'Bold', 
            primary: '#ea580c', 
            accent: '#ffedd5', 
            text: '#1c1917', 
            background: '#fff7ed',
            description: 'Attention-grabbing orange for standout resumes'
        },
        { 
            name: 'Dark', 
            primary: '#8b5cf6', 
            accent: '#4c1d95', 
            text: '#e2e8f0', 
            background: '#1e1b4b',
            description: 'Elegant dark theme with purple accents'
        },
        { 
            name: 'Nature', 
            primary: '#10b981', 
            accent: '#ecfdf5', 
            text: '#064e3b', 
            background: '#f0fdf4',
            description: 'Fresh green palette inspired by nature'
        },
        { 
            name: 'Ocean', 
            primary: '#0284c7', 
            accent: '#e0f2fe', 
            text: '#0c4a6e', 
            background: '#f0f9ff',
            description: 'Calming blue tones reminiscent of the ocean'
        },
        { 
            name: 'Sunset', 
            primary: '#b45309', 
            accent: '#fef3c7', 
            text: '#78350f', 
            background: '#fffbeb',
            description: 'Warm gradient inspired by sunset colors'
        },
    ];
    
    // Resume templates - layouts for quick start
    const resumeTemplates = {
        modern: [
            { template: 'about', position: { x: 50, y: 50 } },
            { template: 'experience', position: { x: 50, y: 250 } },
            { template: 'skills', position: { x: 50, y: 550 } },
            { template: 'education', position: { x: 50, y: 800 } }
        ],
        creative: [
            { template: 'about', position: { x: 400, y: 50 } },
            { template: 'skills', position: { x: 50, y: 50 } },
            { template: 'experience', position: { x: 50, y: 300 } },
            { template: 'projects', position: { x: 50, y: 600 } },
            { template: 'contact', position: { x: 400, y: 600 } }
        ],
        minimal: [
            { template: 'about', position: { x: 50, y: 50 } },
            { template: 'experience', position: { x: 50, y: 200 } },
            { template: 'education', position: { x: 50, y: 450 } },
            { template: 'skills', position: { x: 50, y: 650 } }
        ],
        professional: [
            { template: 'about', position: { x: 50, y: 50 } },
            { template: 'skills', position: { x: 500, y: 50 } },
            { template: 'experience', position: { x: 50, y: 250 } },
            { template: 'education', position: { x: 50, y: 550 } },
            { template: 'contact', position: { x: 500, y: 550 } }
        ],
        elegant: [
            { template: 'about', position: { x: 50, y: 50 } },
            { template: 'experience', position: { x: 50, y: 200 } },
            { template: 'education', position: { x: 500, y: 200 } },
            { template: 'skills', position: { x: 50, y: 500 } },
            { template: 'projects', position: { x: 50, y: 700 } }
        ],
        tech: [
            { template: 'about', position: { x: 50, y: 50 } },
            { template: 'skills', position: { x: 50, y: 200 } },
            { template: 'projects', position: { x: 50, y: 400 } },
            { template: 'experience', position: { x: 50, y: 700 } },
            { template: 'education', position: { x: 500, y: 700 } }
        ]
    };
    
    // DOM Elements
    const elements = {
        // Main containers
        canvas: document.getElementById('canvas'),
        emptyState: document.getElementById('empty-state'),
        sidebar: document.getElementById('sidebar'),
        canvasContainer: document.getElementById('canvas-container'),
        
        // Section properties
        sectionProperties: document.getElementById('section-properties'),
        animationSelect: document.getElementById('animation-select'),
        delayInput: document.getElementById('delay-input'),
        delayValue: document.getElementById('delay-value'),
        durationInput: document.getElementById('animation-duration'),
        durationValue: document.getElementById('duration-value'),
        contentTextarea: document.getElementById('content-textarea'),
        
        // Buttons
        previewBtn: document.getElementById('preview-btn'),
        exportBtn: document.getElementById('export-btn'),
        exportHtmlBtn: document.getElementById('export-html'),
        exportPdfBtn: document.getElementById('export-pdf'),
        exportImageBtn: document.getElementById('export-image'),
        undoBtn: document.getElementById('undo-btn'),
        redoBtn: document.getElementById('redo-btn'),
        saveBtn: document.getElementById('save-btn'),
        cloneSectionBtn: document.getElementById('clone-section-btn'),
        deleteSectionBtn: document.getElementById('delete-section-btn'),
        
        // Modals
        infoModal: document.getElementById('info-modal'),
        previewModal: document.getElementById('preview-modal'),
        previewCanvas: document.getElementById('preview-canvas'),
        previewCloseBtn: document.getElementById('preview-close'),
        previewEditBtn: document.getElementById('preview-edit-btn'),
        previewExportBtn: document.getElementById('preview-export-btn'),
        startBuildingBtn: document.getElementById('start-building-btn'),
        modalCloseBtn: document.getElementById('modal-close'),
        startTourBtn: document.getElementById('start-tour-btn'),
        shortcutsModal: document.getElementById('shortcuts-modal'),
        shortcutsCloseBtn: document.getElementById('shortcuts-close'),
        
        // Tour elements
        tourOverlay: document.getElementById('tour-overlay'),
        tourSkipBtn: document.getElementById('tour-skip'),
        tourNextBtn: document.getElementById('tour-next'),
        tourNextBtn2: document.getElementById('tour-next-2'),
        tourNextBtn3: document.getElementById('tour-next-3'),
        tourPrevBtn: document.getElementById('tour-prev'),
        tourPrevBtn2: document.getElementById('tour-prev-2'),
        tourPrevBtn3: document.getElementById('tour-prev-3'),
        tourFinishBtn: document.getElementById('tour-finish'),
        tourSteps: [
            document.getElementById('tour-step-1'),
            document.getElementById('tour-step-2'),
            document.getElementById('tour-step-3'),
            document.getElementById('tour-step-4')
        ],
        
        // Containers
        sectionTemplatesContainer: document.querySelector('.section-templates'),
        themePresetsContainer: document.querySelector('.theme-presets'),
        toastContainer: document.getElementById('toast-container'),
        
        // Tabs
        tabButtons: document.querySelectorAll('.tab-btn'),
        tabContents: document.querySelectorAll('.tab-content'),
        
        // Color pickers
        primaryColor: document.getElementById('primary-color'),
        primaryColorText: document.getElementById('primary-color-text'),
        accentColor: document.getElementById('accent-color'),
        accentColorText: document.getElementById('accent-color-text'),
        textColor: document.getElementById('text-color'),
        textColorText: document.getElementById('text-color-text'),
        backgroundColor: document.getElementById('background-color'),
        backgroundColorText: document.getElementById('background-color-text'),
        
        // Font selectors
        headingFont: document.getElementById('heading-font'),
        bodyFont: document.getElementById('body-font'),
        
        // Template cards
        templateCards: document.querySelectorAll('.template-card')
    };
    
    // Dragging state
    let dragging = {
        active: false,
        element: null,
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,
        initialClick: { x: 0, y: 0 }
    };
    
    // Initialize section templates
    function initSectionTemplates() {
        sectionTemplates.forEach(template => {
            const button = document.createElement('button');
            button.className = 'p-2 bg-white rounded border border-gray-200 hover:bg-gray-50 flex flex-col items-center text-xs transition-all hover:shadow-md';
            button.innerHTML = `
                <i data-feather="${template.icon}" class="w-5 h-5 mb-1 text-blue-500"></i>
                ${template.title}
            `;
            button.addEventListener('click', () => addSection(template));
            elements.sectionTemplatesContainer.appendChild(button);
        });
        feather.replace();
    }
    
    // Initialize theme presets
    function initThemePresets() {
        themePresets.forEach(theme => {
            const button = document.createElement('div');
            button.className = 'theme-item flex items-center p-3 rounded border border-gray-200 hover:shadow-md cursor-pointer transition-all mb-2';
            button.innerHTML = `
                <div class="flex items-center justify-center w-10 h-10 rounded-full mr-3" style="background-color: ${theme.primary}">
                    <div class="w-5 h-5 rounded-full" style="background-color: ${theme.accent}"></div>
                </div>
                <div>
                    <h4 class="font-medium text-sm">${theme.name}</h4>
                    <p class="text-xs text-gray-500">${theme.description}</p>
                </div>
            `;
            button.addEventListener('click', () => applyTheme(theme));
            elements.themePresetsContainer.appendChild(button);
        });
        
        // Set default theme
        applyTheme(themePresets[0]);
    }
    
    // Initialize animation options
    function initAnimationOptions() {
        animationPresets.forEach(preset => {
            const option = document.createElement('option');
            option.value = preset.value;
            option.textContent = preset.name;
            elements.animationSelect.appendChild(option);
        });
    }
    
    // Apply theme
    function applyTheme(theme) {
        state.currentTheme = theme;
        
        // Update theme items
        const themeItems = elements.themePresetsContainer.querySelectorAll('.theme-item');
        themeItems.forEach(item => {
            const themeName = item.querySelector('h4').textContent;
            if (themeName === theme.name) {
                item.classList.add('border-blue-500', 'ring-1', 'ring-blue-500', 'bg-blue-50');
            } else {
                item.classList.remove('border-blue-500', 'ring-1', 'ring-blue-500', 'bg-blue-50');
            }
        });
        
        // Update CSS variables
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--accent-color', theme.accent);
        document.documentElement.style.setProperty('--text-color', theme.text);
        document.documentElement.style.setProperty('--background-color', theme.background);
        
        // Update color picker inputs
        if (elements.primaryColor) {
            elements.primaryColor.value = theme.primary;
            elements.primaryColorText.value = theme.primary;
        }
        
        if (elements.accentColor) {
            elements.accentColor.value = theme.accent;
            elements.accentColorText.value = theme.accent;
        }
        
        if (elements.textColor) {
            elements.textColor.value = theme.text;
            elements.textColorText.value = theme.text;
        }
        
        if (elements.backgroundColor) {
            elements.backgroundColor.value = theme.background;
            elements.backgroundColorText.value = theme.background;
        }
        
        // Show a notification
        showToast('Theme applied successfully', 'success');
        
        saveToHistory();
    }
    
    // Add a section to the canvas
    function addSection(template) {
        const id = `${template.id}-${Date.now()}`;
        
        // Calculate position
        let position = { x: 20, y: 20 };
        if (state.resumeSections.length > 0) {
            // Place new section below the bottom-most section
            const bottomSection = [...state.resumeSections].sort((a, b) => 
                (a.position.y + getElementHeight(a.id)) - (b.position.y + getElementHeight(b.id))
            ).pop();
            
            if (bottomSection) {
                const bottomSectionHeight = getElementHeight(bottomSection.id);
                position = {
                    x: bottomSection.position.x,
                    y: bottomSection.position.y + bottomSectionHeight + 20
                };
            }
        }
        
        const section = {
            ...template,
            id,
            position,
        };
        
        state.resumeSections.push(section);
        renderSection(section);
        setActiveSection(id);
        updateEmptyState();
        saveToHistory();
        
        // Show feather icons in the section content
        setTimeout(() => {
            feather.replace();
        }, 100);
        
        showToast(`Added ${template.title} section`, 'info');
    }
    
    // Get element height
    function getElementHeight(id) {
        const element = document.getElementById(id);
        return element ? element.offsetHeight : 100;
    }
    
    // Render a section on the canvas
    function renderSection(section) {
        const sectionElement = document.createElement('div');
        sectionElement.id = section.id;
        sectionElement.className = 'section-container';
        sectionElement.style.left = `${section.position.x}px`;
        sectionElement.style.top = `${section.position.y}px`;
        
        // Add handle for dragging, cloning, and deleting
        const handleElement = document.createElement('div');
        handleElement.className = 'section-handle';
        handleElement.innerHTML = `
            <button class="clone-btn" title="Clone Section">
                <i data-feather="copy" class="w-4 h-4"></i>
            </button>
            <button class="delete-btn" title="Delete Section">
                <i data-feather="trash-2" class="w-4 h-4"></i>
            </button>
            <button class="move-btn" title="Move Section">
                <i data-feather="move" class="w-4 h-4"></i>
            </button>
        `;
        
        // Set content
        const contentElement = document.createElement('div');
        contentElement.innerHTML = section.content;
        
        sectionElement.appendChild(contentElement);
        sectionElement.appendChild(handleElement);
        elements.canvas.appendChild(sectionElement);
        
        // Initialize feather icons
        feather.replace();
        
        // Add event listeners
        sectionElement.addEventListener('mousedown', (e) => {
            // Ignore if in preview mode or if clicking on a button
            if (state.previewMode || e.target.closest('button')) return;
            
            startDragging(e, section.id);
            setActiveSection(section.id);
        });
        
        // Make section initially visible with animation
        sectionElement.style.opacity = '0';
        setTimeout(() => {
            sectionElement.style.opacity = '1';
            sectionElement.style.transform = 'translateY(0)';
        }, 10);
        
        // Clone button
        handleElement.querySelector('.clone-btn').addEventListener('click', () => cloneSection(section.id));
        
        // Delete button
        handleElement.querySelector('.delete-btn').addEventListener('click', () => removeSection(section.id));
        
        // Move button (for touch devices)
        handleElement.querySelector('.move-btn').addEventListener('mousedown', (e) => {
            startDragging(e, section.id);
        });
    }
    
    // Update section properties panel
    function updateSectionProperties() {
        if (!state.activeSection) {
            elements.sectionProperties.classList.add('hidden');
            return;
        }
        
        const section = state.resumeSections.find(s => s.id === state.activeSection);
        if (!section) return;
        
        elements.sectionProperties.classList.remove('hidden');
        elements.animationSelect.value = section.animation || '';
        elements.delayInput.value = section.delay || 0;
        elements.delayValue.textContent = `${section.delay || 0}s`;
        elements.durationInput.value = section.duration || 0.5;
        elements.durationValue.textContent = `${section.duration || 0.5}s`;
        elements.contentTextarea.value = section.content;
    }
    
    // Start dragging a section
    function startDragging(e, id) {
        const sectionElement = document.getElementById(id);
        const section = state.resumeSections.find(s => s.id === id);
        
        if (!sectionElement || !section) return;
        
        dragging.active = true;
        dragging.element = sectionElement;
        dragging.startX = e.clientX;
        dragging.startY = e.clientY;
        dragging.initialClick = {
            x: e.clientX - section.position.x,
            y: e.clientY - section.position.y
        };
        dragging.startLeft = section.position.x;
        dragging.startTop = section.position.y;
        
        // Add dragging class
        sectionElement.classList.add('opacity-75', 'shadow-lg', 'z-50');
        
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDragging);
        
        // Prevent default to avoid text selection while dragging
        e.preventDefault();
    }
    
    // Handle section dragging
    function onDrag(e) {
        if (!dragging.active) return;
        
        // Calculate new position with consideration for scroll position
        const canvasRect = elements.canvasContainer.getBoundingClientRect();
        const canvasScrollLeft = elements.canvasContainer.scrollLeft;
        const canvasScrollTop = elements.canvasContainer.scrollTop;
        
        const newLeft = e.clientX - dragging.initialClick.x;
        const newTop = e.clientY - dragging.initialClick.y;
        
        // Update element position
        dragging.element.style.left = `${newLeft}px`;
        dragging.element.style.top = `${newTop}px`;
        
        // Update state
        const sectionIndex = state.resumeSections.findIndex(s => s.id === dragging.element.id);
        if (sectionIndex !== -1) {
            state.resumeSections[sectionIndex].position.x = newLeft;
            state.resumeSections[sectionIndex].position.y = newTop;
        }
        
        // Auto-scroll the canvas if dragging near edges
        const margin = 50;
        const scrollSpeed = 10;
        
        if (e.clientY < canvasRect.top + margin) {
            elements.canvasContainer.scrollTop -= scrollSpeed;
        } else if (e.clientY > canvasRect.bottom - margin) {
            elements.canvasContainer.scrollTop += scrollSpeed;
        }
        
        if (e.clientX < canvasRect.left + margin) {
            elements.canvasContainer.scrollLeft -= scrollSpeed;
        } else if (e.clientX > canvasRect.right - margin) {
            elements.canvasContainer.scrollLeft += scrollSpeed;
        }
    }
    
    // Stop dragging
    function stopDragging() {
        if (dragging.active) {
            // Remove dragging classes
            dragging.element.classList.remove('opacity-75', 'shadow-lg', 'z-50');
            
            dragging.active = false;
            dragging.element = null;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDragging);
            saveToHistory();
        }
    }
    
    // Set active section
    function setActiveSection(id) {
        // Remove active class from previous active section
        if (state.activeSection) {
            const prevElement = document.getElementById(state.activeSection);
            if (prevElement) {
                prevElement.classList.remove('active');
            }
        }
        
        state.activeSection = id;
        
        // Add active class to new active section
        if (id) {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('active');
                
                // Ensure the active section is visible in the viewport
                const canvasContainer = elements.canvasContainer;
                const elementRect = element.getBoundingClientRect();
                const containerRect = canvasContainer.getBoundingClientRect();
                
                if (elementRect.top < containerRect.top) {
                    canvasContainer.scrollTop += elementRect.top - containerRect.top - 20;
                } else if (elementRect.bottom > containerRect.bottom) {
                    canvasContainer.scrollTop += elementRect.bottom - containerRect.bottom + 20;
                }
            }
        }
        
        updateSectionProperties();
    }
    
    // Remove a section
    function removeSection(id) {
        const element = document.getElementById(id);
        if (element) {
            // Add a removal animation
            element.style.opacity = '0';
            element.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                element.remove();
                
                state.resumeSections = state.resumeSections.filter(section => section.id !== id);
                
                if (state.activeSection === id) {
                    setActiveSection(null);
                }
                
                updateEmptyState();
                saveToHistory();
                
                showToast('Section removed', 'info');
            }, 300);
        }
    }
    
    // Clone a section
    function cloneSection(id) {
        const section = state.resumeSections.find(s => s.id === id);
        if (!section) return;
        
        const newId = `${section.id.split('-')[0]}-${Date.now()}`;
        const newSection = {
            ...JSON.parse(JSON.stringify(section)),
            id: newId,
            position: {
                x: section.position.x + 20,
                y: section.position.y + 20
            }
        };
        
        state.resumeSections.push(newSection);
        renderSection(newSection);
        setActiveSection(newId);
        saveToHistory();
        
        showToast('Section cloned', 'success');
    }
    
    // Update section animation
    function updateSectionAnimation(id, animation) {
        const sectionIndex = state.resumeSections.findIndex(s => s.id === id);
        if (sectionIndex !== -1) {
            state.resumeSections[sectionIndex].animation = animation;
            saveToHistory();
        }
    }
    
    // Update section delay
    function updateSectionDelay(id, delay) {
        const sectionIndex = state.resumeSections.findIndex(s => s.id === id);
        if (sectionIndex !== -1) {
            state.resumeSections[sectionIndex].delay = delay;
            elements.delayValue.textContent = `${delay}s`;
            saveToHistory();
        }
    }
    
    // Update section duration
    function updateSectionDuration(id, duration) {
        const sectionIndex = state.resumeSections.findIndex(s => s.id === id);
        if (sectionIndex !== -1) {
            state.resumeSections[sectionIndex].duration = duration;
            elements.durationValue.textContent = `${duration}s`;
            saveToHistory();
        }
    }
    
    // Update section content
    function updateSectionContent(id, content) {
        const sectionIndex = state.resumeSections.findIndex(s => s.id === id);
        if (sectionIndex !== -1) {
            state.resumeSections[sectionIndex].content = content;
            
            // Update the DOM
            const element = document.getElementById(id);
            if (element) {
                const contentElement = element.querySelector('div:first-child');
                if (contentElement) {
                    contentElement.innerHTML = content;
                    feather.replace();
                }
            }
            
            saveToHistory();
        }
    }
    
    // Open preview modal
    function openPreviewModal() {
        elements.previewModal.classList.remove('hidden');
        elements.previewCanvas.innerHTML = '';
        
        // Sort sections by vertical position
        const sortedSections = [...state.resumeSections].sort((a, b) => a.position.y - b.position.y);
        
        // Apply current theme
        elements.previewCanvas.style.backgroundColor = state.currentTheme.background;
        elements.previewCanvas.style.color = state.currentTheme.text;
        
        // Add sections to preview
        sortedSections.forEach((section, index) => {
            const previewSection = document.createElement('div');
            previewSection.className = `mb-8 relative anim-${section.animation || 'fadeIn'}`;
            previewSection.style.setProperty('--delay', `${section.delay || 0}s`);
            previewSection.style.setProperty('--duration', `${section.duration || 0.5}s`);
            previewSection.style.setProperty('--timing', `${section.timing || 'ease'}`);
            previewSection.innerHTML = section.content;
            
            elements.previewCanvas.appendChild(previewSection);
        });
        
        // Re-initialize feather icons
        feather.replace();
    }
    
    // Close preview modal
    function closePreviewModal() {
        elements.previewModal.classList.add('hidden');
    }
    
    // Export resume as HTML
    function exportHTML() {
        // Sort sections by vertical position
        const sortedSections = [...state.resumeSections].sort((a, b) => a.position.y - b.position.y);
        
        const fonts = state.fonts.heading !== state.fonts.body 
            ? `<link href="https://fonts.googleapis.com/css2?family=${state.fonts.heading.replace(' ', '+')}&family=${state.fonts.body.replace(' ', '+')}&display=swap" rel="stylesheet">`
            : `<link href="https://fonts.googleapis.com/css2?family=${state.fonts.heading.replace(' ', '+')}&display=swap" rel="stylesheet">`;
        
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Resume</title>
    ${fonts}
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    <style>
        :root {
            --primary-color: ${state.currentTheme.primary};
            --accent-color: ${state.currentTheme.accent};
            --text-color: ${state.currentTheme.text};
            --background-color: ${state.currentTheme.background};
            --heading-font: "${state.fonts.heading}", sans-serif;
            --body-font: "${state.fonts.body}", sans-serif;
        }
        
        body {
            font-family: var(--body-font);
            background-color: var(--background-color);
            color: var(--text-color);
            margin: 0;
            padding: 0;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: var(--heading-font);
        }
        
        .resume-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideLeft {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        
        @keyframes slideInBottom {
            from { opacity: 0; transform: translateY(100%); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .anim-fadeIn {
            animation: fadeIn var(--duration) var(--timing) forwards;
            animation-delay: var(--delay);
            opacity: 0;
        }
        
        .anim-slideUp {
            animation: slideUp var(--duration) var(--timing) forwards;
            animation-delay: var(--delay);
            opacity: 0;
            transform: translateY(20px);
        }
        
        .anim-slideLeft {
            animation: slideLeft var(--duration) var(--timing) forwards;
            animation-delay: var(--delay);
            opacity: 0;
            transform: translateX(20px);
        }
        
        .anim-scaleIn {
            animation: scaleIn var(--duration) var(--timing) forwards;
            animation-delay: var(--delay);
            opacity: 0;
            transform: scale(0.9);
        }
        
        .anim-bounce {
            animation: bounce var(--duration) var(--timing);
            animation-delay: var(--delay);
        }
        
        .anim-rotate {
            animation: rotate var(--duration) var(--timing) infinite;
            animation-delay: var(--delay);
        }
        
        .anim-pulse {
            animation: pulse var(--duration) var(--timing) infinite;
            animation-delay: var(--delay);
        }
        
        .anim-shake {
            animation: shake var(--duration) var(--timing);
            animation-delay: var(--delay);
        }
        
        .anim-slideInBottom {
            animation: slideInBottom var(--duration) var(--timing) forwards;
            animation-delay: var(--delay);
            opacity: 0;
            transform: translateY(100%);
        }
    </style>
</head>
<body>
    <div class="resume-container">
        ${sortedSections.map((section, index) => `
        <div class="anim-${section.animation || 'fadeIn'}" style="--delay: ${section.delay || 0}s; --duration: ${section.duration || 0.5}s; --timing: ${section.timing || 'ease'};">
            ${section.content}
        </div>
        `).join('\n')}
    </div>
    <script>
        // Initialize Feather icons after the DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            feather.replace();
        });
    </script>
</body>
</html>
        `;
        
        // Create and download the file
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'interactive-resume.html';
        a.click();
        URL.revokeObjectURL(url);
        
        showToast('Resume exported as HTML', 'success');
    }
    
    // Export resume as PDF (placeholder - would require additional libraries)
    function exportPDF() {
        showToast('PDF export coming soon!', 'info');
    }
    
    // Export resume as image (placeholder - would require additional libraries)
    function exportImage() {
        showToast('Image export coming soon!', 'info');
    }
    
    // Save current state to localStorage
    function saveToLocalStorage() {
        const saveData = {
            resumeSections: state.resumeSections,
            currentTheme: state.currentTheme,
            fonts: state.fonts,
            activeTemplate: state.activeTemplate
        };
        
        try {
            localStorage.setItem('resumeBuilderData', JSON.stringify(saveData));
            state.lastSaved = new Date();
            showToast('Resume saved locally', 'success');
        } catch (error) {
            showToast('Error saving resume', 'error');
        }
    }
    
    // Load state from localStorage
    function loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('resumeBuilderData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                
                // Clear current sections from DOM
                elements.canvas.querySelectorAll('.section-container').forEach(el => el.remove());
                
                // Restore state
                state.resumeSections = parsedData.resumeSections;
                state.currentTheme = parsedData.currentTheme;
                state.fonts = parsedData.fonts || { heading: 'Poppins', body: 'Poppins' };
                state.activeTemplate = parsedData.activeTemplate;
                
                // Apply theme
                applyTheme(state.currentTheme);
                
                // Apply fonts
                if (state.fonts) {
                    document.documentElement.style.setProperty('--heading-font', `"${state.fonts.heading}", sans-serif`);
                    document.documentElement.style.setProperty('--body-font', `"${state.fonts.body}", sans-serif`);
                    
                    if (elements.headingFont) elements.headingFont.value = state.fonts.heading;
                    if (elements.bodyFont) elements.bodyFont.value = state.fonts.body;
                }
                
                // Render sections
                state.resumeSections.forEach(section => renderSection(section));
                
                // Update UI
                updateEmptyState();
                
                showToast('Resume loaded successfully', 'success');
                
                // Initialize history
                saveToHistory();
            }
        } catch (error) {
            showToast('Error loading saved resume', 'error');
        }
    }
    
    // Save current state to history
    function saveToHistory() {
        // If we're in the middle of history and make a new change,
        // we need to remove all future states
        if (state.currentHistoryIndex < state.history.length - 1) {
            state.history = state.history.slice(0, state.currentHistoryIndex + 1);
        }
        
        // Save deep copy of current state
        state.history.push(JSON.parse(JSON.stringify(state.resumeSections)));
        state.currentHistoryIndex = state.history.length - 1;
        
        // Update undo/redo buttons
        updateUndoRedoButtons();
    }
    
    // Undo last action
    function undo() {
        if (state.currentHistoryIndex > 0) {
            state.currentHistoryIndex--;
            restoreFromHistory();
            showToast('Undo successful', 'info');
        }
    }
    
    // Redo last undone action
    function redo() {
        if (state.currentHistoryIndex < state.history.length - 1) {
            state.currentHistoryIndex++;
            restoreFromHistory();
            showToast('Redo successful', 'info');
        }
    }
    
    // Restore state from history
    function restoreFromHistory() {
        const historyState = state.history[state.currentHistoryIndex];
        
        // Clear current sections
        elements.canvas.querySelectorAll('.section-container').forEach(el => el.remove());
        
        // Reset state
        state.resumeSections = JSON.parse(JSON.stringify(historyState));
        state.activeSection = null;
        
        // Render sections
        state.resumeSections.forEach(section => renderSection(section));
        
        // Update UI
        updateEmptyState();
        updateUndoRedoButtons();
    }
    
    // Update undo/redo buttons state
    function updateUndoRedoButtons() {
        elements.undoBtn.disabled = state.currentHistoryIndex <= 0;
        elements.redoBtn.disabled = state.currentHistoryIndex >= state.history.length - 1;
        
        // Update button opacity
        if (state.currentHistoryIndex <= 0) {
            elements.undoBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            elements.undoBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        
        if (state.currentHistoryIndex >= state.history.length - 1) {
            elements.redoBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            elements.redoBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
    
    // Show toast notification
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = 'info';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'alert-circle';
        
        toast.innerHTML = `
            <i data-feather="${icon}" class="toast-icon"></i>
            <span class="toast-message">${message}</span>
        `;
        
        elements.toastContainer.appendChild(toast);
        feather.replace();
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // Update empty state visibility
    function updateEmptyState() {
        if (state.resumeSections.length === 0) {
            elements.emptyState.style.display = 'flex';
        } else {
            elements.emptyState.style.display = 'none';
        }
    }
    
    // Apply a template
    function applyTemplate(templateName) {
        // Clear current sections
        state.resumeSections = [];
        elements.canvas.querySelectorAll('.section-container').forEach(el => el.remove());
        
        // Get template
        const template = resumeTemplates[templateName];
        
        if (template) {
            // Add each section from the template
            template.forEach(item => {
                const templateSection = sectionTemplates.find(t => t.id === item.template);
                if (templateSection) {
                    const id = `${templateSection.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
                    const section = {
                        ...JSON.parse(JSON.stringify(templateSection)),
                        id,
                        position: item.position
                    };
                    
                    state.resumeSections.push(section);
                    renderSection(section);
                }
            });
            
            state.activeTemplate = templateName;
            updateEmptyState();
            saveToHistory();
            
            showToast(`Applied ${templateName} template`, 'success');
        }
    }
    
    // Start the tour
    function startTour() {
        elements.infoModal.classList.add('hidden');
        elements.tourOverlay.classList.remove('hidden');
        showTourStep(0);
    }
    
    // Show a specific tour step
    function showTourStep(index) {
        elements.tourSteps.forEach((step, i) => {
            if (i === index) {
                step.classList.remove('hidden');
            } else {
                step.classList.add('hidden');
            }
        });
    }
    
    // Handle tab switching
    function handleTabSwitch(tabId) {
        // Update tab buttons
        elements.tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update tab content
        elements.tabContents.forEach(content => {
            if (content.id === `${tabId}-tab`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
    
    // Update font settings
    function updateFonts() {
        document.documentElement.style.setProperty('--heading-font', `"${state.fonts.heading}", sans-serif`);
        document.documentElement.style.setProperty('--body-font', `"${state.fonts.body}", sans-serif`);
    }
    
    // Show shortcuts modal
    function toggleShortcutsModal() {
        const isHidden = elements.shortcutsModal.classList.contains('hidden');
        if (isHidden) {
            elements.shortcutsModal.classList.remove('hidden');
        } else {
            elements.shortcutsModal.classList.add('hidden');
        }
    }
    
    // Initialize event listeners
    function initEventListeners() {
        // Section property change events
        elements.animationSelect.addEventListener('change', () => {
            if (state.activeSection) {
                updateSectionAnimation(state.activeSection, elements.animationSelect.value);
            }
        });
        
        elements.delayInput.addEventListener('input', () => {
            if (state.activeSection) {
                updateSectionDelay(state.activeSection, parseFloat(elements.delayInput.value));
            }
        });
        
        elements.durationInput.addEventListener('input', () => {
            if (state.activeSection) {
                updateSectionDuration(state.activeSection, parseFloat(elements.durationInput.value));
            }
        });
        
        elements.contentTextarea.addEventListener('change', () => {
            if (state.activeSection) {
                updateSectionContent(state.activeSection, elements.contentTextarea.value);
            }
        });
        
        // Tab navigation
        elements.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                handleTabSwitch(tabId);
            });
        });
        
        // Font selection
        if (elements.headingFont) {
            elements.headingFont.addEventListener('change', () => {
                state.fonts.heading = elements.headingFont.value;
                updateFonts();
            });
        }
        
        if (elements.bodyFont) {
            elements.bodyFont.addEventListener('change', () => {
                state.fonts.body = elements.bodyFont.value;
                updateFonts();
            });
        }
        
        // Color picker events
        if (elements.primaryColor) {
            elements.primaryColor.addEventListener('input', () => {
                const color = elements.primaryColor.value;
                elements.primaryColorText.value = color;
                document.documentElement.style.setProperty('--primary-color', color);
            });
            
            elements.primaryColorText.addEventListener('change', () => {
                const color = elements.primaryColorText.value;
                elements.primaryColor.value = color;
                document.documentElement.style.setProperty('--primary-color', color);
            });
        }
        
        if (elements.accentColor) {
            elements.accentColor.addEventListener('input', () => {
                const color = elements.accentColor.value;
                elements.accentColorText.value = color;
                document.documentElement.style.setProperty('--accent-color', color);
            });
            
            elements.accentColorText.addEventListener('change', () => {
                const color = elements.accentColorText.value;
                elements.accentColor.value = color;
                document.documentElement.style.setProperty('--accent-color', color);
            });
        }
        
        if (elements.textColor) {
            elements.textColor.addEventListener('input', () => {
                const color = elements.textColor.value;
                elements.textColorText.value = color;
                document.documentElement.style.setProperty('--text-color', color);
            });
            
            elements.textColorText.addEventListener('change', () => {
                const color = elements.textColorText.value;
                elements.textColor.value = color;
                document.documentElement.style.setProperty('--text-color', color);
            });
        }
        
        if (elements.backgroundColor) {
            elements.backgroundColor.addEventListener('input', () => {
                const color = elements.backgroundColor.value;
                elements.backgroundColorText.value = color;
                document.documentElement.style.setProperty('--background-color', color);
            });
            
            elements.backgroundColorText.addEventListener('change', () => {
                const color = elements.backgroundColorText.value;
                elements.backgroundColor.value = color;
                document.documentElement.style.setProperty('--background-color', color);
            });
        }
        
        // Template selection
        elements.templateCards.forEach(card => {
            card.addEventListener('click', () => {
                const templateName = card.getAttribute('data-template');
                applyTemplate(templateName);
            });
        });
        
        // Button click events
        elements.previewBtn.addEventListener('click', openPreviewModal);
        elements.previewCloseBtn.addEventListener('click', closePreviewModal);
        elements.previewEditBtn.addEventListener('click', closePreviewModal);
        elements.previewExportBtn.addEventListener('click', () => {
            closePreviewModal();
            exportHTML();
        });
        
        elements.exportHtmlBtn.addEventListener('click', exportHTML);
        elements.exportPdfBtn.addEventListener('click', exportPDF);
        elements.exportImageBtn.addEventListener('click', exportImage);
        
        elements.undoBtn.addEventListener('click', undo);
        elements.redoBtn.addEventListener('click', redo);
        elements.saveBtn.addEventListener('click', saveToLocalStorage);
        
        elements.cloneSectionBtn.addEventListener('click', () => {
            if (state.activeSection) {
                cloneSection(state.activeSection);
            }
        });
        
        elements.deleteSectionBtn.addEventListener('click', () => {
            if (state.activeSection) {
                removeSection(state.activeSection);
            }
        });
        
        // Modal events
        elements.startBuildingBtn.addEventListener('click', () => {
            elements.infoModal.classList.add('hidden');
        });
        
        elements.modalCloseBtn.addEventListener('click', () => {
            elements.infoModal.classList.add('hidden');
        });
        
        elements.startTourBtn.addEventListener('click', startTour);
        
        // Tour navigation
        elements.tourSkipBtn.addEventListener('click', () => {
            elements.tourOverlay.classList.add('hidden');
        });
        
        elements.tourNextBtn.addEventListener('click', () => showTourStep(1));
        elements.tourNextBtn2.addEventListener('click', () => showTourStep(2));
        elements.tourNextBtn3.addEventListener('click', () => showTourStep(3));
        
        elements.tourPrevBtn.addEventListener('click', () => showTourStep(0));
        elements.tourPrevBtn2.addEventListener('click', () => showTourStep(1));
        elements.tourPrevBtn3.addEventListener('click', () => showTourStep(2));
        
        elements.tourFinishBtn.addEventListener('click', () => {
            elements.tourOverlay.classList.add('hidden');
        });
        
        // Shortcuts modal
        elements.shortcutsCloseBtn.addEventListener('click', () => {
            elements.shortcutsModal.classList.add('hidden');
        });
        
        // Click outside of a section to deselect
        elements.canvas.addEventListener('click', (e) => {
            if (e.target === elements.canvas) {
                setActiveSection(null);
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ignore if inside input or textarea
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            // Ctrl+Z for undo
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                undo();
            }
            
            // Ctrl+Y for redo
            if (e.ctrlKey && e.key === 'y') {
                e.preventDefault();
                redo();
            }
            
            // Ctrl+S for save
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                saveToLocalStorage();
            }
            
            // Ctrl+P for preview
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                openPreviewModal();
            }
            
            // Ctrl+E for export
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                exportHTML();
            }
            
            // Delete key to remove selected section
            if (e.key === 'Delete' && state.activeSection) {
                e.preventDefault();
                removeSection(state.activeSection);
            }
            
            // Ctrl+D to duplicate selected section
            if (e.ctrlKey && e.key === 'd' && state.activeSection) {
                e.preventDefault();
                cloneSection(state.activeSection);
            }
            
            // Esc to deselect
            if (e.key === 'Escape') {
                setActiveSection(null);
                
                // Also close modals if open
                if (!elements.previewModal.classList.contains('hidden')) {
                    closePreviewModal();
                }
                
                if (!elements.shortcutsModal.classList.contains('hidden')) {
                    elements.shortcutsModal.classList.add('hidden');
                }
            }
            
            // ? key to show shortcuts
            if (e.key === '?') {
                toggleShortcutsModal();
            }
        });
        
        // Set up auto-save every 60 seconds
        setInterval(() => {
            if (state.resumeSections.length > 0 && (state.lastSaved === null || new Date() - state.lastSaved > 60000)) {
                saveToLocalStorage();
            }
        }, 60000);
    }
    
    // Initialize the application
    function init() {
        initSectionTemplates();
        initThemePresets();
        initAnimationOptions();
        initEventListeners();
        
        // Check for saved data
        if (localStorage.getItem('resumeBuilderData')) {
            loadFromLocalStorage();
        } else {
            // Initialize history
            saveToHistory();
        }
        
        console.log('Enhanced Resume Builder initialized');
    }
    
    // Start the application
    init();
});
