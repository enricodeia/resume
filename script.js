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
        currentTheme: null
    };
    
    // Section templates
    const sectionTemplates = [
        {
            id: 'about',
            title: 'About Me',
            icon: 'user',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-2">About Me</h2>
                <p class="text-gray-700">A passionate professional with expertise in...</p>
            </div>`,
            animation: 'fadeIn',
            delay: 0,
        },
        {
            id: 'experience',
            title: 'Experience',
            icon: 'briefcase',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-2">Experience</h2>
                <div class="mb-4">
                    <h3 class="text-xl font-semibold">Senior Developer</h3>
                    <p class="text-gray-600">Company Name | 2020 - Present</p>
                    <p class="text-gray-700">Led development of...</p>
                </div>
            </div>`,
            animation: 'slideUp',
            delay: 0.2,
        },
        {
            id: 'education',
            title: 'Education',
            icon: 'book',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-2">Education</h2>
                <div class="mb-4">
                    <h3 class="text-xl font-semibold">MSc Computer Science</h3>
                    <p class="text-gray-600">University Name | 2016 - 2018</p>
                </div>
            </div>`,
            animation: 'slideLeft',
            delay: 0.4,
        },
        {
            id: 'skills',
            title: 'Skills',
            icon: 'code',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-2">Skills</h2>
                <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">JavaScript</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">HTML/CSS</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">React</span>
                </div>
            </div>`,
            animation: 'scaleIn',
            delay: 0.6,
        },
        {
            id: 'projects',
            title: 'Projects',
            icon: 'folder',
            content: `<div class="flex flex-col">
                <h2 class="text-2xl font-bold mb-2">Projects</h2>
                <div class="mb-4">
                    <h3 class="text-xl font-semibold">Project Name</h3>
                    <p class="text-gray-700">A description of the project and your role...</p>
                </div>
            </div>`,
            animation: 'bounce',
            delay: 0.8,
        },
    ];
    
    // Animation presets
    const animationPresets = [
        { name: 'Fade In', value: 'fadeIn' },
        { name: 'Slide Up', value: 'slideUp' },
        { name: 'Slide Left', value: 'slideLeft' },
        { name: 'Scale In', value: 'scaleIn' },
        { name: 'Bounce', value: 'bounce' },
    ];
    
    // Theme presets
    const themePresets = [
        { name: 'Professional', primary: '#2563eb', secondary: '#dbeafe', text: '#1e293b', background: '#ffffff' },
        { name: 'Creative', primary: '#ec4899', secondary: '#fce7f3', text: '#18181b', background: '#fdfcfd' },
        { name: 'Minimal', primary: '#525252', secondary: '#f5f5f5', text: '#171717', background: '#fafafa' },
        { name: 'Bold', primary: '#ea580c', secondary: '#ffedd5', text: '#1c1917', background: '#fff7ed' },
        { name: 'Dark', primary: '#8b5cf6', secondary: '#1e1b4b', text: '#e2e8f0', background: '#0f172a' },
    ];
    
    // DOM Elements
    const elements = {
        canvas: document.getElementById('canvas'),
        emptyState: document.getElementById('empty-state'),
        sectionProperties: document.getElementById('section-properties'),
        animationSelect: document.getElementById('animation-select'),
        delayInput: document.getElementById('delay-input'),
        contentTextarea: document.getElementById('content-textarea'),
        previewBtn: document.getElementById('preview-btn'),
        exportBtn: document.getElementById('export-btn'),
        undoBtn: document.getElementById('undo-btn'),
        redoBtn: document.getElementById('redo-btn'),
        cloneSectionBtn: document.getElementById('clone-section-btn'),
        deleteSectionBtn: document.getElementById('delete-section-btn'),
        infoModal: document.getElementById('info-modal'),
        startBuildingBtn: document.getElementById('start-building-btn'),
        sectionTemplatesContainer: document.querySelector('.section-templates'),
        themePresetsContainer: document.querySelector('.theme-presets'),
        canvasContainer: document.getElementById('canvas-container')
    };
    
    // Dragging state
    let dragging = {
        active: false,
        element: null,
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0
    };
    
    // Initialize section templates
    function initSectionTemplates() {
        sectionTemplates.forEach(template => {
            const button = document.createElement('button');
            button.className = 'p-2 bg-white rounded border border-gray-200 hover:bg-gray-50 flex flex-col items-center text-xs';
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
            const button = document.createElement('button');
            button.className = 'p-2 rounded border border-gray-200 hover:bg-gray-50 flex items-center text-xs';
            button.innerHTML = `
                <div class="w-4 h-4 rounded-full mr-2" style="background-color: ${theme.primary}"></div>
                ${theme.name}
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
        
        // Update theme buttons
        const themeButtons = elements.themePresetsContainer.querySelectorAll('button');
        themeButtons.forEach(button => {
            if (button.textContent.trim() === theme.name) {
                button.classList.add('border-blue-500', 'ring-1', 'ring-blue-500');
            } else {
                button.classList.remove('border-blue-500', 'ring-1', 'ring-blue-500');
            }
        });
        
        // Update CSS variables
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--text-color', theme.text);
        document.documentElement.style.setProperty('--background-color', theme.background);
        
        // Update canvas background in preview mode
        if (state.previewMode) {
            elements.canvas.style.backgroundColor = theme.background;
            elements.canvas.style.color = theme.text;
        }
    }
    
    // Add a section to the canvas
    function addSection(template) {
        const id = `${template.id}-${Date.now()}`;
        const section = {
            ...template,
            id,
            position: { x: 20, y: state.resumeSections.length * 20 + 20 },
        };
        
        state.resumeSections.push(section);
        renderSection(section);
        setActiveSection(id);
        updateEmptyState();
        saveToHistory();
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
            <button class="clone-btn">
                <i data-feather="copy" class="w-4 h-4 text-gray-500"></i>
            </button>
            <button class="delete-btn">
                <i data-feather="trash-2" class="w-4 h-4 text-gray-500"></i>
            </button>
            <button class="move-btn">
                <i data-feather="move" class="w-4 h-4 text-gray-500"></i>
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
        dragging.startLeft = section.position.x;
        dragging.startTop = section.position.y;
        
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDragging);
        
        // Prevent default to avoid text selection while dragging
        e.preventDefault();
    }
    
    // Handle section dragging
    function onDrag(e) {
        if (!dragging.active) return;
        
        const dx = e.clientX - dragging.startX;
        const dy = e.clientY - dragging.startY;
        
        const newLeft = dragging.startLeft + dx;
        const newTop = dragging.startTop + dy;
        
        // Update element position
        dragging.element.style.left = `${newLeft}px`;
        dragging.element.style.top = `${newTop}px`;
        
        // Update state
        const sectionIndex = state.resumeSections.findIndex(s => s.id === dragging.element.id);
        if (sectionIndex !== -1) {
            state.resumeSections[sectionIndex].position.x = newLeft;
            state.resumeSections[sectionIndex].position.y = newTop;
        }
    }
    
    // Stop dragging
    function stopDragging() {
        if (dragging.active) {
            dragging.active = false;
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
            }
        }
        
        updateSectionProperties();
    }
    
    // Remove a section
    function removeSection(id) {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
        
        state.resumeSections = state.resumeSections.filter(section => section.id !== id);
        
        if (state.activeSection === id) {
            setActiveSection(null);
        }
        
        updateEmptyState();
        saveToHistory();
    }
    
    // Clone a section
    function cloneSection(id) {
        const section = state.resumeSections.find(s => s.id === id);
        if (!section) return;
        
        const newId = `${section.id.split('-')[0]}-${Date.now()}`;
        const newSection = {
            ...section,
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
                }
            }
            
            saveToHistory();
        }
    }
    
    // Toggle preview mode
    function togglePreviewMode() {
        state.previewMode = !state.previewMode;
        
        if (state.previewMode) {
            // Enter preview mode
            elements.previewBtn.innerHTML = '<i data-feather="eye-off" class="w-4 h-4 mr-1"></i> Exit Preview';
            elements.canvasContainer.classList.add('bg-gray-800');
            elements.canvas.classList.add('preview-mode', 'shadow-lg');
            elements.canvas.style.backgroundColor = state.currentTheme.background;
            elements.canvas.style.color = state.currentTheme.text;
            
            // Hide section handles and make them non-interactive
            document.querySelectorAll('.section-container').forEach(section => {
                section.style.opacity = '0';
            });
            
            // Create preview elements
            createPreviewElements();
        } else {
            // Exit preview mode
            elements.previewBtn.innerHTML = '<i data-feather="eye" class="w-4 h-4 mr-1"></i> Preview';
            elements.canvasContainer.classList.remove('bg-gray-800');
            elements.canvas.classList.remove('preview-mode', 'shadow-lg');
            elements.canvas.style.backgroundColor = '';
            elements.canvas.style.color = '';
            
            // Show section handles and make them interactive
            document.querySelectorAll('.section-container').forEach(section => {
                section.style.opacity = '1';
            });
            
            // Remove preview elements
            document.querySelectorAll('.preview-section').forEach(el => el.remove());
        }
        
        feather.replace();
    }
    
    // Create preview elements
    function createPreviewElements() {
        // Sort sections by vertical position
        const sortedSections = [...state.resumeSections].sort((a, b) => a.position.y - b.position.y);
        
        // Create preview container
        const previewContainer = document.createElement('div');
        previewContainer.className = 'absolute inset-0 p-8';
        elements.canvas.appendChild(previewContainer);
        
        // Add each section
        sortedSections.forEach((section, index) => {
            const previewSection = document.createElement('div');
            previewSection.className = 'preview-section mb-8';
            previewSection.innerHTML = section.content;
            
            // Apply animation class
            if (section.animation) {
                previewSection.classList.add(`anim-${section.animation}`);
                previewSection.style.animationDelay = `${section.delay || 0}s`;
            }
            
            previewContainer.appendChild(previewSection);
        });
    }
    
    // Export resume as HTML
    function exportHTML() {
        // Sort sections by vertical position
        const sortedSections = [...state.resumeSections].sort((a, b) => a.position.y - b.position.y);
        
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Resume</title>
    <style>
        :root {
            --primary-color: ${state.currentTheme.primary};
            --secondary-color: ${state.currentTheme.secondary};
            --text-color: ${state.currentTheme.text};
            --background-color: ${state.currentTheme.background};
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            margin: 0;
            padding: 0;
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
        
        .anim-fadeIn {
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        }
        
        .anim-slideUp {
            opacity: 0;
            transform: translateY(20px);
            animation: slideUp 0.5s ease forwards;
        }
        
        .anim-slideLeft {
            opacity: 0;
            transform: translateX(20px);
            animation: slideLeft 0.5s ease forwards;
        }
        
        .anim-scaleIn {
            opacity: 0;
            transform: scale(0.9);
            animation: scaleIn 0.5s ease forwards;
        }
        
        .anim-bounce {
            animation: bounce 0.5s ease;
        }
    </style>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
    <div class="resume-container">
        ${sortedSections.map((section, index) => `
        <div class="anim-${section.animation || 'fadeIn'}" style="animation-delay: ${section.delay || 0}s;">
            ${section.content}
        </div>
        `).join('\n')}
    </div>
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
        }
    }
    
    // Redo last undone action
    function redo() {
        if (state.currentHistoryIndex < state.history.length - 1) {
            state.currentHistoryIndex++;
            restoreFromHistory();
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
        
        // Update button styles
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
    
    // Update empty state visibility
    function updateEmptyState() {
        if (state.resumeSections.length === 0) {
            elements.emptyState.style.display = 'flex';
        } else {
            elements.emptyState.style.display = 'none';
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
        
        elements.delayInput.addEventListener('change', () => {
            if (state.activeSection) {
                updateSectionDelay(state.activeSection, parseFloat(elements.delayInput.value));
            }
        });
        
        elements.contentTextarea.addEventListener('change', () => {
            if (state.activeSection) {
                updateSectionContent(state.activeSection, elements.contentTextarea.value);
            }
        });
        
        // Button click events
        elements.previewBtn.addEventListener('click', togglePreviewMode);
        elements.exportBtn.addEventListener('click', exportHTML);
        elements.undoBtn.addEventListener('click', undo);
        elements.redoBtn.addEventListener('click', redo);
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
        
        // Close info modal
        elements.startBuildingBtn.addEventListener('click', () => {
            elements.infoModal.classList.add('hidden');
        });
        
        // Click outside of a section to deselect
        elements.canvas.addEventListener('click', (e) => {
            if (e.target === elements.canvas) {
                setActiveSection(null);
            }
        });
    }
    
    // Initialize the application
    function init() {
        initSectionTemplates();
        initThemePresets();
        initAnimationOptions();
        initEventListeners();
        
        // Initialize history
        saveToHistory();
        
        console.log('Resume Builder initialized');
    }
    
    // Start the application
    init();
});
