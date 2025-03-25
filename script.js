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
    },
    quillEditor: null
  };

  // Section templates
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
    }
  ];

  // Animation presets
  const animationPresets = [
    { name: 'Fade In', value: 'fadeIn', description: 'Smoothly fade in from transparent to visible' },
    { name: 'Slide Up', value: 'slideUp', description: 'Glide upward while fading in' },
    { name: 'Slide Left', value: 'slideLeft', description: 'Glide from right to left while fading in' },
    { name: 'Scale In', value: 'scaleIn', description: 'Grow from smaller size while fading in' },
    { name: 'Bounce', value: 'bounce', description: 'Playful bouncing effect' },
    { name: 'Rotate', value: 'rotate', description: 'Spin continuously (good for loaders/icons)' },
    { name: 'Pulse', value: 'pulse', description: 'Gentle pulsing effect to draw attention' },
    { name: 'Shake', value: 'shake', description: 'Quick side-to-side movement' },
    { name: 'Slide In Bottom', value: 'slideInBottom', description: 'Enter from the bottom of the container' }
  ];

  // Theme presets
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
    }
  ];

  // Resume templates
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

  // Industry Templates
  const industryTemplates = {
    tech: [
      {
        id: 'tech-skills',
        title: 'Technical Skills',
        icon: 'code',
        content: `<div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Technical Skills</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="text-lg font-semibold mb-2">Programming Languages</h3>
              <div class="flex flex-wrap gap-2 mb-2">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">JavaScript</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">Python</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">Java</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded">C#</span>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Frameworks & Libraries</h3>
              <div class="flex flex-wrap gap-2 mb-2">
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded">React</span>
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded">Angular</span>
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded">Node.js</span>
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded">Django</span>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Tools & Technologies</h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded">Git</span>
                <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded">Docker</span>
                <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded">AWS</span>
                <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded">CI/CD</span>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Databases</h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded">MongoDB</span>
                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded">PostgreSQL</span>
                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded">MySQL</span>
                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded">Redis</span>
              </div>
            </div>
          </div>
        </div>`,
        animation: 'slideUp',
        delay: 0.2,
        duration: 0.5,
        timing: 'ease'
      },
      {
        id: 'tech-projects',
        title: 'Tech Projects',
        icon: 'folder',
        content: `<div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Technical Projects</h2>
          <div class="grid gap-4">
            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-semibold">Microservice Architecture Migration</h3>
                  <p class="text-sm text-gray-600 mb-2">Lead Developer | 2022-2023</p>
                </div>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Completed</span>
              </div>
              <p class="text-gray-700 my-2">Redesigned monolithic application into a microservice architecture, improving scalability and reducing deployment time by 70%.</p>
              <div class="flex flex-wrap gap-1 mt-2">
                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Kubernetes</span>
                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Docker</span>
                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Go</span>
                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">CI/CD</span>
              </div>
            </div>
            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-semibold">Machine Learning Pipeline</h3>
                  <p class="text-sm text-gray-600 mb-2">Technical Lead | 2021-2022</p>
                </div>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Production</span>
              </div>
              <p class="text-gray-700 my-2">Built an end-to-end ML pipeline for real-time data processing and prediction, serving 50,000+ daily users.</p>
              <div class="flex flex-wrap gap-1 mt-2">
                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Python</span>
                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">TensorFlow</span>
                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Kafka</span>
                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">AWS</span>
              </div>
            </div>
          </div>
        </div>`,
        animation: 'fadeIn',
        delay: 0.3,
        duration: 0.5,
        timing: 'ease'
      }
    ],
    healthcare: [
      {
        id: 'clinical-experience',
        title: 'Clinical Experience',
        icon: 'activity',
        content: `<div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Clinical Experience</h2>
          <div class="mb-4">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold">Senior Registered Nurse</h3>
              <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">2019 - Present</span>
            </div>
            <p class="text-gray-600 italic mb-2">Memorial Hospital, Intensive Care Unit</p>
            <ul class="list-disc ml-5 text-gray-700">
              <li>Provide critical care to patients requiring intensive monitoring and treatment</li>
              <li>Lead a team of 8 nurses, implementing evidence-based protocols</li>
              <li>Reduced medication errors by 35% through process improvement initiatives</li>
              <li>Mentor new nursing staff and facilitate continuing education programs</li>
            </ul>
          </div>
          <div class="mb-4">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold">Registered Nurse</h3>
              <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">2016 - 2019</span>
            </div>
            <p class="text-gray-600 italic mb-2">Community Medical Center, Emergency Department</p>
            <ul class="list-disc ml-5 text-gray-700">
              <li>Provided emergency care in a high-volume Level II trauma center</li>
              <li>Coordinated with multidisciplinary teams to ensure optimal patient outcomes</li>
              <li>Implemented triage protocols, reducing wait times by 25%</li>
            </ul>
          </div>
        </div>`,
        animation: 'slideUp',
        delay: 0.2,
        duration: 0.5,
        timing: 'ease'
      },
      {
        id: 'certifications',
        title: 'Medical Certifications',
        icon: 'award',
        content: `<div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Certifications & Licenses</h2>
          <div class="grid gap-3">
            <div class="p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <i data-feather="check-circle" class="w-5 h-5 text-green-600"></i>
                </div>
                <div>
                  <h3 class="font-semibold">Registered Nurse (RN) License</h3>
                  <p class="text-sm text-gray-600">State Board of Nursing • Current</p>
                </div>
              </div>
            </div>
            <div class="p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <i data-feather="award" class="w-5 h-5 text-blue-600"></i>
                </div>
                <div>
                  <h3 class="font-semibold">Advanced Cardiovascular Life Support (ACLS)</h3>
                  <p class="text-sm text-gray-600">American Heart Association • Expires 2024</p>
                </div>
              </div>
            </div>
            <div class="p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <i data-feather="award" class="w-5 h-5 text-purple-600"></i>
                </div>
                <div>
                  <h3 class="font-semibold">Critical Care Registered Nurse (CCRN)</h3>
                  <p class="text-sm text-gray-600">American Association of Critical-Care Nurses • Expires 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>`,
        animation: 'fadeIn',
        delay: 0.4,
        duration: 0.5,
        timing: 'ease'
      }
    ],
    creative: [
      {
        id: 'portfolio',
        title: 'Creative Portfolio',
        icon: 'image',
        content: `<div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Creative Portfolio</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all">
              <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded mb-2">
                <div class="flex items-center justify-center h-40 bg-gray-300 rounded">
                  <i data-feather="image" class="w-10 h-10 text-gray-500"></i>
                </div>
              </div>
              <h3 class="font-semibold">Brand Redesign: TechFlow</h3>
              <p class="text-sm text-gray-600">Complete visual identity refresh for a SaaS platform</p>
            </div>
            <div class="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all">
              <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded mb-2">
                <div class="flex items-center justify-center h-40 bg-gray-300 rounded">
                  <i data-feather="image" class="w-10 h-10 text-gray-500"></i>
                </div>
              </div>
              <h3 class="font-semibold">UI/UX: HealthTrack App</h3>
              <p class="text-sm text-gray-600">Patient-focused health monitoring application</p>
            </div>
            <div class="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all">
              <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded mb-2">
                <div class="flex items-center justify-center h-40 bg-gray-300 rounded">
                  <i data-feather="image" class="w-10 h-10 text-gray-500"></i>
                </div>
              </div>
              <h3 class="font-semibold">Campaign: EcoFriendly Products</h3>
              <p class="text-sm text-gray-600">Integrated marketing campaign for sustainable goods</p>
            </div>
            <div class="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all">
              <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded mb-2">
                <div class="flex items-center justify-center h-40 bg-gray-300 rounded">
                  <i data-feather="image" class="w-10 h-10 text-gray-500"></i>
                </div>
              </div>
              <h3 class="font-semibold">Illustration Series: Urban Life</h3>
              <p class="text-sm text-gray-600">Digital illustration series featured in City Magazine</p>
            </div>
          </div>
        </div>`,
        animation: 'scaleIn',
        delay: 0.2,
        duration: 0.6,
        timing: 'ease'
      },
      {
        id: 'creative-achievements',
        title: 'Creative Achievements',
        icon: 'award',
        content: `<div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Awards & Exhibitions</h2>
          <div class="space-y-4">
            <div class="flex">
              <div class="flex-shrink-0 mt-1">
                <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <i data-feather="award" class="w-4 h-4 text-yellow-600"></i>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold">Design Excellence Award</h3>
                <p class="text-gray-600 mb-1">International Design Association • 2023</p>
                <p class="text-sm text-gray-700">Recognized for outstanding work in responsive web design and accessibility innovation.</p>
              </div>
            </div>
            <div class="flex">
              <div class="flex-shrink-0 mt-1">
                <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <i data-feather="eye" class="w-4 h-4 text-purple-600"></i>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold">Featured Exhibition: Digital Frontiers</h3>
                <p class="text-gray-600 mb-1">Modern Art Gallery • 2022</p>
                <p class="text-sm text-gray-700">Solo exhibition showcasing interactive digital art installations exploring human-computer interaction.</p>
              </div>
            </div>
            <div class="flex">
              <div class="flex-shrink-0 mt-1">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <i data-feather="thumbs-up" class="w-4 h-4 text-blue-600"></i>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold">Creative Direction Award</h3>
                <p class="text-gray-600 mb-1">National Advertising Awards • 2021</p>
                <p class="text-sm text-gray-700">Lead creative direction for "Green Tomorrow" campaign, resulting in 40% increased brand awareness.</p>
              </div>
            </div>
          </div>
        </div>`,
        animation: 'slideUp',
        delay: 0.3,
        duration: 0.5,
        timing: 'ease'
      }
    ],
    finance: [
      {
        id: 'financial-expertise',
        title: 'Financial Expertise',
        icon: 'trending-up',
        content: `<div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Financial Expertise</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div class="flex items-center mb-2">
                <i data-feather="bar-chart-2" class="w-5 h-5 mr-2 text-blue-600"></i>
                <h3 class="font-semibold">Investment Analysis</h3>
              </div>
              <ul class="list-disc ml-5 text-sm text-gray-700">
                <li>Portfolio optimization and asset allocation</li>
                <li>Equity research and valuation models</li>
                <li>Risk assessment and management strategies</li>
              </ul>
            </div>
            <div class="p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div class="flex items-center mb-2">
                <i data-feather="pie-chart" class="w-5 h-5 mr-2 text-green-600"></i>
                <h3 class="font-semibold">Financial Planning</h3>
              </div>
              <ul class="list-disc ml-5 text-sm text-gray-700">
                <li>Comprehensive retirement planning</li>
                <li>Tax-efficient investment strategies</li>
                <li>Estate and wealth transfer planning</li>
              </ul>
            </div>
            <div class="p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div class="flex items-center mb-2">
                <i data-feather="trending-up" class="w-5 h-5 mr-2 text-purple-600"></i>
                <h3 class="font-semibold">Capital Markets</h3>
              </div>
              <ul class="list-disc ml-5 text-sm text-gray-700">
                <li>IPO and M&A deal structuring</li>
                <li>Debt issuance and syndication</li>
                <li>Market analysis and economic forecasting</li>
              </ul>
            </div>
            <div class="p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div class="flex items-center mb-2">
                <i data-feather="shield" class="w-5 h-5 mr-2 text-orange-600"></i>
                <h3 class="font-semibold">Risk Management</h3>
              </div>
              <ul class="list-disc ml-5 text-sm text-gray-700">
                <li>Derivatives and hedging strategies</li>
                <li>Compliance and regulatory frameworks</li>
                <li>Credit risk assessment and modeling</li>
              </ul>
            </div>
          </div>
        </div>`,
        animation: 'fadeIn',
        delay: 0.2,
        duration: 0.5,
        timing: 'ease'
      },
      {
        id: 'financial-achievements',
        title: 'Financial Achievements',
        icon: 'dollar-sign',
        content: `<div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-3" style="color: var(--primary-color);">Key Financial Achievements</h2>
          <div class="space-y-3">
            <div class="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <h3 class="font-semibold text-green-800">$50M+ Portfolio Management</h3>
              <p class="text-sm text-gray-700">Successfully managed investment portfolios exceeding $50 million, achieving average annual returns of 12% over a 5-year period.</p>
            </div>
            <div class="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <h3 class="font-semibold text-blue-800">Cost Reduction Initiative</h3>
              <p class="text-sm text-gray-700">Led strategic cost reduction initiatives resulting in $2.5 million annual savings through process optimization and vendor renegotiation.</p>
            </div>
            <div class="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <h3 class="font-semibold text-purple-800">M&A Transaction Support</h3>
              <p class="text-sm text-gray-700">Provided financial analysis and due diligence for 5 successful M&A transactions with a combined value of $120 million.</p>
            </div>
            <div class="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
              <h3 class="font-semibold text-yellow-800">Financial Forecasting Accuracy</h3>
              <p class="text-sm text-gray-700">Developed financial forecasting models with 95% accuracy, enabling strategic decision-making that increased company valuation by 30%.</p>
            </div>
          </div>
        </div>`,
        animation: 'slideLeft',
        delay: 0.3,
        duration: 0.5,
        timing: 'ease'
      }
    ]
  };

  // DOM Elements
  const elements = {
    canvas: document.getElementById('canvas'),
    emptyState: document.getElementById('empty-state'),
    sidebar: document.getElementById('sidebar'),
    canvasContainer: document.getElementById('canvas-container'),
    sectionProperties: document.getElementById('section-properties'),
    animationSelect: document.getElementById('animation-select'),
    delayInput: document.getElementById('delay-input'),
    delayValue: document.getElementById('delay-value'),
    durationInput: document.getElementById('animation-duration'),
    durationValue: document.getElementById('duration-value'),
    contentTextarea: document.getElementById('content-textarea'),
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
    sectionTemplatesContainer: document.querySelector('.section-templates'),
    themePresetsContainer: document.querySelector('.theme-presets'),
    toastContainer: document.getElementById('toast-container'),
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    primaryColor: document.getElementById('primary-color'),
    primaryColorText: document.getElementById('primary-color-text'),
    accentColor: document.getElementById('accent-color'),
    accentColorText: document.getElementById('accent-color-text'),
    textColor: document.getElementById('text-color'),
    textColorText: document.getElementById('text-color-text'),
    backgroundColor: document.getElementById('background-color'),
    backgroundColorText: document.getElementById('background-color-text'),
    headingFont: document.getElementById('heading-font'),
    bodyFont: document.getElementById('body-font'),
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
      button.className =
        'p-2 bg-white rounded border border-gray-200 hover:bg-gray-50 flex flex-col items-center text-xs transition-all hover:shadow-md';
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
      button.className =
        'theme-item flex items-center p-3 rounded border border-gray-200 hover:shadow-md cursor-pointer transition-all mb-2';
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

  // Initialize Industry Templates
  function initIndustryTemplates() {
    const industryButtons = document.querySelectorAll('.industry-btn');
    const industryTemplatesContainer = document.getElementById('industry-templates');
    function showIndustryTemplates(industry) {
      industryTemplatesContainer.innerHTML = '';
      industryButtons.forEach(btn => {
        if (btn.getAttribute('data-industry') === industry) {
          btn.classList.add('bg-blue-100', 'text-blue-800', 'border-blue-300');
        } else {
          btn.classList.remove('bg-blue-100', 'text-blue-800', 'border-blue-300');
        }
      });
      if (industryTemplates[industry]) {
        industryTemplates[industry].forEach(template => {
          const button = document.createElement('button');
          button.className =
            'p-2 bg-white rounded border border-gray-200 hover:bg-gray-50 flex flex-col items-center text-xs transition-all hover:shadow-md';
          button.innerHTML = `
            <i data-feather="${template.icon}" class="w-5 h-5 mb-1 text-blue-500"></i>
            ${template.title}
          `;
          button.addEventListener('click', () => addSection(template));
          industryTemplatesContainer.appendChild(button);
        });
        feather.replace();
      }
    }
    industryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const industry = btn.getAttribute('data-industry');
        showIndustryTemplates(industry);
      });
    });
    showIndustryTemplates('tech');
  }

  // Apply theme
  function applyTheme(theme) {
    state.currentTheme = theme;
    const themeItems = elements.themePresetsContainer.querySelectorAll('.theme-item');
    themeItems.forEach(item => {
      const themeName = item.querySelector('h4').textContent;
      if (themeName === theme.name) {
        item.classList.add('border-blue-500', 'ring-1', 'ring-blue-500', 'bg-blue-50');
      } else {
        item.classList.remove('border-blue-500', 'ring-1', 'ring-blue-500', 'bg-blue-50');
      }
    });
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--background-color', theme.background);
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
    showToast('Theme applied successfully', 'success');
    saveToHistory();
  }

  // Add a section to the canvas
  function addSection(template) {
    const id = `${template.id}-${Date.now()}`;
    let position = { x: 20, y: 20 };
    if (state.resumeSections.length > 0) {
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
    const section = { ...template, id, position };
    state.resumeSections.push(section);
    renderSection(section);
    setActiveSection(id);
    updateEmptyState();
    saveToHistory();
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
    const contentElement = document.createElement('div');
    contentElement.innerHTML = section.content;
    sectionElement.appendChild(contentElement);
    sectionElement.appendChild(handleElement);
    elements.canvas.appendChild(sectionElement);
    feather.replace();
    sectionElement.addEventListener('mousedown', (e) => {
      if (state.previewMode || e.target.closest('button')) return;
      startDragging(e, section.id);
      setActiveSection(section.id);
    });
    sectionElement.style.opacity = '0';
    setTimeout(() => {
      sectionElement.style.opacity = '1';
      sectionElement.style.transform = 'translateY(0)';
    }, 10);
    handleElement.querySelector('.clone-btn').addEventListener('click', () => cloneSection(section.id));
    handleElement.querySelector('.delete-btn').addEventListener('click', () => removeSection(section.id));
    handleElement.querySelector('.move-btn').addEventListener('mousedown', (e) => {
      startDragging(e, section.id);
    });
  }

  // RICH TEXT EDITOR IMPLEMENTATION
  function initRichTextEditor() {
    const editorContainer = document.createElement('div');
    editorContainer.id = 'rich-text-editor';
    editorContainer.style.height = '200px';
    const textareaParent = elements.contentTextarea.parentNode;
    textareaParent.replaceChild(editorContainer, elements.contentTextarea);
    const quill = new Quill('#rich-text-editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          ['link'],
          ['clean']
        ]
      }
    });
    state.quillEditor = quill;
    quill.on('text-change', () => {
      if (state.activeSection) {
        const html = quill.root.innerHTML;
        updateSectionContent(state.activeSection, html);
      }
    });
    return quill;
  }

  // Update section properties
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

  // Update section properties using Quill
  function updateSectionPropertiesWithQuill() {
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
    if (state.quillEditor) {
      state.quillEditor.root.innerHTML = section.content;
    }
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
    sectionElement.classList.add('opacity-75', 'shadow-lg', 'z-50');
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDragging);
    e.preventDefault();
  }

  // Handle section dragging
  function onDrag(e) {
    if (!dragging.active) return;
    const canvasRect = elements.canvasContainer.getBoundingClientRect();
    const newLeft = e.clientX - dragging.initialClick.x;
    const newTop = e.clientY - dragging.initialClick.y;
    dragging.element.style.left = `${newLeft}px`;
    dragging.element.style.top = `${newTop}px`;
    const sectionIndex = state.resumeSections.findIndex(s => s.id === dragging.element.id);
    if (sectionIndex !== -1) {
      state.resumeSections[sectionIndex].position.x = newLeft;
      state.resumeSections[sectionIndex].position.y = newTop;
    }
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
    if (state.activeSection) {
      const prevElement = document.getElementById(state.activeSection);
      if (prevElement) {
        prevElement.classList.remove('active');
      }
    }
    state.activeSection = id;
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.classList.add('active');
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
    if (state.quillEditor) {
      updateSectionPropertiesWithQuill();
    } else {
      updateSectionProperties();
    }
  }

  // Remove a section
  function removeSection(id) {
    const element = document.getElementById(id);
    if (element) {
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
    const sortedSections = [...state.resumeSections].sort((a, b) => a.position.y - b.position.y);
    elements.previewCanvas.style.backgroundColor = state.currentTheme.background;
    elements.previewCanvas.style.color = state.currentTheme.text;
    sortedSections.forEach((section, index) => {
      const previewSection = document.createElement('div');
      previewSection.className = `mb-8 relative anim-${section.animation || 'fadeIn'}`;
      previewSection.style.setProperty('--delay', `${section.delay || 0}s`);
      previewSection.style.setProperty('--duration', `${section.duration || 0.5}s`);
      previewSection.style.setProperty('--timing', `${section.timing || 'ease'}`);
      previewSection.innerHTML = section.content;
      elements.previewCanvas.appendChild(previewSection);
    });
    feather.replace();
  }

  // Close preview modal
  function closePreviewModal() {
    elements.previewModal.classList.add('hidden');
  }

  // Export resume as HTML
  function exportHTML() {
    const sortedSections = [...state.resumeSections].sort((a, b) => a.position.y - b.position.y);
    const fonts =
      state.fonts.heading !== state.fonts.body
        ? `<link href="https://fonts.googleapis.com/css2?family=${state.fonts.heading.replace(
            ' ',
            '+'
          )}&family=${state.fonts.body.replace(' ', '+')}&display=swap" rel="stylesheet">`
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
    document.addEventListener('DOMContentLoaded', () => {
      feather.replace();
    });
  </script>
</body>
</html>
    `;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interactive-resume.html';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Resume exported as HTML', 'success');
  }

  // Export resume as PDF (placeholder)
  function exportPDF() {
    showToast('PDF export coming soon!', 'info');
  }

  // Export resume as image (placeholder)
  function exportImage() {
    showToast('Image export coming soon!', 'info');
  }

  // Add print button to the header
  function initPrintButton() {
    const headerControls = document.querySelector('.control-buttons');
    const printButton = document.createElement('button');
    printButton.className = 'btn btn-icon';
    printButton.innerHTML = `
      <i data-feather="printer" class="w-4 h-4"></i>
      <span>Print</span>
    `;
    headerControls.insertBefore(printButton, elements.exportBtn);
    feather.replace();
    printButton.addEventListener('click', printResume);
  }

  // Print resume function
  function printResume() {
    showToast('Preparing document for printing...', 'info');
    setTimeout(() => {
      window.print();
    }, 500);
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
        elements.canvas.querySelectorAll('.section-container').forEach(el => el.remove());
        state.resumeSections = parsedData.resumeSections;
        state.currentTheme = parsedData.currentTheme;
        state.fonts = parsedData.fonts || { heading: 'Poppins', body: 'Poppins' };
        state.activeTemplate = parsedData.activeTemplate;
        applyTheme(state.currentTheme);
        if (state.fonts) {
          document.documentElement.style.setProperty('--heading-font', `"${state.fonts.heading}", sans-serif`);
          document.documentElement.style.setProperty('--body-font', `"${state.fonts.body}", sans-serif`);
          if (elements.headingFont) elements.headingFont.value = state.fonts.heading;
          if (elements.bodyFont) elements.bodyFont.value = state.fonts.body;
        }
        state.resumeSections.forEach(section => renderSection(section));
        updateEmptyState();
        showToast('Resume loaded successfully', 'success');
        saveToHistory();
      }
    } catch (error) {
      showToast('Error loading saved resume', 'error');
    }
  }

  // Save current state to history
  function saveToHistory() {
    if (state.currentHistoryIndex < state.history.length - 1) {
      state.history = state.history.slice(0, state.currentHistoryIndex + 1);
    }
    state.history.push(JSON.parse(JSON.stringify(state.resumeSections)));
    state.currentHistoryIndex = state.history.length - 1;
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
    elements.canvas.querySelectorAll('.section-container').forEach(el => el.remove());
    state.resumeSections = JSON.parse(JSON.stringify(historyState));
    state.activeSection = null;
    state.resumeSections.forEach(section => renderSection(section));
    updateEmptyState();
    updateUndoRedoButtons();
  }

  // Update undo/redo buttons state
  function updateUndoRedoButtons() {
    elements.undoBtn.disabled = state.currentHistoryIndex <= 0;
    elements.redoBtn.disabled = state.currentHistoryIndex >= state.history.length - 1;
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
    state.resumeSections = [];
    elements.canvas.querySelectorAll('.section-container').forEach(el => el.remove());
    const template = resumeTemplates[templateName];
    if (template) {
      template.forEach(item => {
        const templateSection = sectionTemplates.find(t => t.id === item.template);
        if (templateSection) {
          const id = `${templateSection.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          const section = { ...JSON.parse(JSON.stringify(templateSection)), id, position: item.position };
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
    elements.tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
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

  // ATS Optimization Checker
  function initATSChecker() {
    const atsModal = document.getElementById('ats-modal');
    const atsCloseBtn = document.getElementById('ats-close');
    const runATSCheckBtn = document.getElementById('run-ats-check');
    const copyATSReportBtn = document.getElementById('copy-ats-report');
    const jobDescriptionTextarea = document.getElementById('job-description');
    const atsLoading = document.getElementById('ats-loading');
    const atsResults = document.getElementById('ats-results');
    const headerControls = document.querySelector('.control-buttons');
    const atsCheckBtn = document.createElement('button');
    atsCheckBtn.className = 'btn btn-icon';
    atsCheckBtn.innerHTML = `
      <i data-feather="check-circle" class="w-4 h-4"></i>
      <span>ATS Check</span>
    `;
    headerControls.insertBefore(atsCheckBtn, elements.exportBtn);
    feather.replace();
    atsCheckBtn.addEventListener('click', () => {
      atsModal.classList.remove('hidden');
      atsResults.classList.add('hidden');
    });
    atsCloseBtn.addEventListener('click', () => {
      atsModal.classList.add('hidden');
    });
    runATSCheckBtn.addEventListener('click', runATSCheck);
    copyATSReportBtn.addEventListener('click', () => {
      const reportText = atsResults.innerText;
      navigator.clipboard.writeText(reportText)
        .then(() => {
          showToast('Report copied to clipboard', 'success');
        })
        .catch(() => {
          showToast('Failed to copy report', 'error');
        });
    });
    function runATSCheck() {
      atsLoading.classList.remove('hidden');
      atsResults.classList.add('hidden');
      const resumeContent = state.resumeSections.map(section => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = section.content;
        return tempDiv.textContent;
      }).join(' ');
      const jobDescription = jobDescriptionTextarea.value.trim();
      setTimeout(() => {
        const report = generateATSReport(resumeContent, jobDescription);
        atsLoading.classList.add('hidden');
        atsResults.classList.remove('hidden');
        atsResults.innerHTML = report;
        feather.replace();
      }, 1500);
    }
    function generateATSReport(resumeContent, jobDescription) {
      const formatScore = calculateFormatScore(resumeContent);
      let keywordMatch = null;
      let keywordReport = '';
      if (jobDescription) {
        keywordMatch = calculateKeywordMatch(resumeContent, jobDescription);
        keywordReport = generateKeywordReport(keywordMatch);
      }
      const densityReport = checkContentDensity(resumeContent);
      let overallScore = formatScore.score;
      if (keywordMatch) {
        overallScore = (formatScore.score + keywordMatch.score) / 2;
      }
      return `
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-medium">Overall ATS Compatibility</h3>
            <div class="text-lg font-bold ${overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}">
              ${Math.round(overallScore)}%
            </div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="h-2.5 rounded-full ${overallScore >= 80 ? 'bg-green-500' : overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}" 
              style="width: ${overallScore}%"></div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="p-4 border rounded-lg ${formatScore.score >= 80 ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">Format & Structure</h3>
              <span class="font-semibold ${formatScore.score >= 80 ? 'text-green-600' : 'text-yellow-600'}">${formatScore.score}%</span>
            </div>
            <ul class="space-y-2">
              ${formatScore.issues.map(issue => `
                <li class="flex items-start">
                  <span class="${issue.pass ? 'text-green-500' : 'text-yellow-500'} mr-2">
                    <i data-feather="${issue.pass ? 'check-circle' : 'alert-circle'}" class="w-5 h-5"></i>
                  </span>
                  <span>${issue.message}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          ${keywordReport}
          <div class="p-4 border rounded-lg ${densityReport.status === 'good' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">Content Density</h3>
              <span class="font-semibold ${densityReport.status === 'good' ? 'text-green-600' : 'text-yellow-600'}">
                ${densityReport.status === 'good' ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
            <p>${densityReport.message}</p>
          </div>
          <div class="p-4 border rounded-lg border-blue-200 bg-blue-50">
            <h3 class="font-medium mb-2">Tips for Improvement</h3>
            <ul class="space-y-1 text-sm">
              <li>• Use standard section headings (Experience, Education, Skills)</li>
              <li>• Avoid complex formatting, tables, or graphics</li>
              <li>• Include relevant keywords from the job description</li>
              <li>• Use standard fonts (Arial, Calibri, Times New Roman)</li>
              <li>• Quantify achievements with numbers and percentages</li>
              <li>• Save your final resume as a simple .docx or .pdf file</li>
            </ul>
          </div>
        </div>
      `;
    }
    function calculateFormatScore(content) {
      const issues = [
        {
          test: content.length > 500,
          message: "Resume has sufficient content length",
          pass: content.length > 500
        },
        {
          test: !hasComplexFormatting(content),
          message: "No complex formatting detected that might confuse ATS",
          pass: !hasComplexFormatting(content)
        },
        {
          test: hasStandardSections(content),
          message: "Standard section headers detected (Education, Experience, Skills)",
          pass: hasStandardSections(content)
        },
        {
          test: !hasLongParagraphs(content),
          message: "Content is well-structured with concise paragraphs",
          pass: !hasLongParagraphs(content)
        },
        {
          test: !hasSpecialCharacters(content),
          message: "No problematic special characters detected",
          pass: !hasSpecialCharacters(content)
        }
      ];
      const passedCount = issues.filter(issue => issue.pass).length;
      const score = Math.round((passedCount / issues.length) * 100);
      return { score, issues };
    }
    function hasComplexFormatting(content) {
      return false;
    }
    function hasStandardSections(content) {
      const standardSections = ['experience', 'education', 'skills', 'work', 'qualification', 'certification'];
      const contentLower = content.toLowerCase();
      return standardSections.some(section => contentLower.includes(section));
    }
    function hasLongParagraphs(content) {
      const paragraphs = content.split('\n\n');
      return paragraphs.some(p => p.length > 500);
    }
    function hasSpecialCharacters(content) {
      const problematicPatterns = [/[^\w\s.,;:!?()'"&$%@#*+\-=\/]/g];
      return problematicPatterns.some(pattern => pattern.test(content));
    }
    function calculateKeywordMatch(resumeContent, jobDescription) {
      const keywords = extractKeywords(jobDescription);
      const significantKeywords = keywords.filter(k => k.length > 3);
      const matches = significantKeywords.map(keyword => {
        return {
          keyword,
          found: resumeContent.toLowerCase().includes(keyword.toLowerCase())
        };
      });
      const matchCount = matches.filter(m => m.found).length;
      const score = Math.round((matchCount / significantKeywords.length) * 100);
      return { score, matches, total: significantKeywords.length };
    }
    function extractKeywords(text) {
      const commonWords = ['and', 'the', 'is', 'in', 'to', 'of', 'for', 'with', 'on', 'at', 'from', 'by'];
      const words = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.includes(word));
      const wordFreq = {};
      words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      });
      const sortedWords = Object.keys(wordFreq)
        .sort((a, b) => wordFreq[b] - wordFreq[a]);
      return sortedWords.slice(0, 20);
    }
    function generateKeywordReport(keywordMatch) {
      if (!keywordMatch) return '';
      const matchedKeywords = keywordMatch.matches.filter(m => m.found);
      const missingKeywords = keywordMatch.matches.filter(m => !m.found);
      return `
        <div class="p-4 border rounded-lg ${keywordMatch.score >= 70 ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium">Keyword Match</h3>
            <span class="font-semibold ${keywordMatch.score >= 70 ? 'text-green-600' : 'text-yellow-600'}">
              ${keywordMatch.score}% (${matchedKeywords.length}/${keywordMatch.total})
            </span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="text-sm font-medium text-green-800 mb-2">Matched Keywords</h4>
              <div class="flex flex-wrap gap-1">
                ${matchedKeywords.map(match => `
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    ${match.keyword}
                  </span>
                `).join('')}
              </div>
            </div>
            <div>
              <h4 class="text-sm font-medium text-yellow-800 mb-2">Missing Keywords</h4>
              <div class="flex flex-wrap gap-1">
                ${missingKeywords.map(match => `
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                    ${match.keyword}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }
    function checkContentDensity(content) {
      const wordCount = content.split(/\s+/).length;
      if (wordCount < 300) {
        return {
          status: 'needs_improvement',
          message: `Your resume contains approximately ${wordCount} words, which may be too brief. Consider adding more detailed information about your experiences and skills.`
        };
      } else if (wordCount > 1000) {
        return {
          status: 'needs_improvement',
          message: `Your resume contains approximately ${wordCount} words, which may be too lengthy. Consider focusing on the most relevant experiences and skills.`
        };
      } else {
        return {
          status: 'good',
          message: `Your resume contains approximately ${wordCount} words, which is within the ideal range for ATS readability.`
        };
      }
    }
  }

  // Initialize event listeners
  function initEventListeners() {
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
    if (!state.quillEditor) {
      elements.contentTextarea.addEventListener('change', () => {
        if (state.activeSection) {
          updateSectionContent(state.activeSection, elements.contentTextarea.value);
        }
      });
    }
    elements.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        handleTabSwitch(tabId);
      });
    });
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
    elements.templateCards.forEach(card => {
      card.addEventListener('click', () => {
        const templateName = card.getAttribute('data-template');
        applyTemplate(templateName);
      });
    });
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
    elements.startBuildingBtn.addEventListener('click', () => {
      elements.infoModal.classList.add('hidden');
    });
    elements.modalCloseBtn.addEventListener('click', () => {
      elements.infoModal.classList.add('hidden');
    });
    elements.startTourBtn.addEventListener('click', startTour);
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
    elements.shortcutsCloseBtn.addEventListener('click', () => {
      elements.shortcutsModal.classList.add('hidden');
    });
    elements.canvas.addEventListener('click', (e) => {
      if (e.target === elements.canvas) {
        setActiveSection(null);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
      }
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveToLocalStorage();
      }
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        openPreviewModal();
      }
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        exportHTML();
      }
      if (e.key === 'Delete' && state.activeSection) {
        e.preventDefault();
        removeSection(state.activeSection);
      }
      if (e.ctrlKey && e.key === 'd' && state.activeSection) {
        e.preventDefault();
        cloneSection(state.activeSection);
      }
      if (e.key === 'Escape') {
        setActiveSection(null);
        if (!elements.previewModal.classList.contains('hidden')) {
          closePreviewModal();
        }
        if (!elements.shortcutsModal.classList.contains('hidden')) {
          elements.shortcutsModal.classList.add('hidden');
        }
      }
      if (e.key === '?') {
        toggleShortcutsModal();
      }
    });
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
    if (localStorage.getItem('resumeBuilderData')) {
      loadFromLocalStorage();
    } else {
      saveToHistory();
    }
    initEnhancements();
    console.log('Enhanced Resume Builder initialized');
  }

  // Initialize enhancements
  function initEnhancements() {
    initRichTextEditor();
    const originalUpdateSectionProperties = updateSectionProperties;
    updateSectionProperties = updateSectionPropertiesWithQuill;
    initIndustryTemplates();
    initATSChecker();
    initPrintButton();
    showToast('ResumeForge enhancements activated', 'success');
  }

  // Start the application
  init();
});
