function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const nemsuColleges = {
    CAS: 'College of Arts and Science',
    CBM: 'College of Business and Management',
    CET: 'College of Engineering and Technology',
    CITE: 'College of Information Technology Education',
    CTE: 'College of Teacher Education'
};

function getDepartmentName(code) {
    if (!code) return '';
    const clean = String(code).trim().toUpperCase();
    return nemsuColleges[clean] || code;
}

const nemsuPrograms = {
    CAS: [
        'Bachelor of Arts in Economics',
        'Bachelor of Arts in English Language',
        'Batsilyer ng Sining sa Filipino',
        'Bachelor of Arts in Political Science',
        'Bachelor of Arts in Biology',
        'Bachelor of Arts in Environmental Science',
        'Bachelor of Arts in Mathematics',
        'Bachelor of Arts in Midwifery'
    ],
    CBM: [
        'Bachelor of Science in Business Administration Major in Financial Management',
        'Bachelor of Science in Business Administration Major in Marketing Management',
        'Bachelor of Science in Business Administration Major in Human Resources Management',
        'Bachelor of Science in Hospitality Management',
        'Bachelor of Public Administration'
    ],
    CET: [
        'Bachelor of Science in Civil Engineering'
    ],
    CITE: [
        'Bachelor Science in Computer Science'
    ],
    CTE: [
        'Bachelor of Early Childhood Education',
        'Bachelor of Elementary Education',
        'Bachelor of Secondary Education major in English',
        'Bachelor of Secondary Education major in Filipino',
        'Bachelor of Secondary Education major in Mathematics',
        'Bachelor of Secondary Education major in Science',
        'Bachelor of Physical Education',
        'Bachelor of Secondary Education major in Social Studies'
    ]
};

const nemsuDepartmentCompanies = {
    CITE: [
        { name: "TechNova Solutions", desc: "Software Development, Cloud Systems & AI Solutions" },
        { name: "Provincial ICT Operations Center", desc: "Network Infrastructure & Enterprise Computing" },
        { name: "NEMSU IT Services", desc: "Management Information Systems & Campus Networks" },
        { name: "Agusan Digital Media Hub", desc: "AI Multimedia, Mobile & Web Applications" },
        { name: "Caraga Software Labs & Innovation Hub", desc: "Full-Stack Web, Embedded Systems & QA" },
        { name: "CyberShield Surigao Solutions", desc: "Cybersecurity, SOC Monitoring & Infrastructure" }
    ],
    CBM: [
        { name: "Grand Horizon Hotel & Resort", desc: "Hospitality Management, Front Office & Concierge" },
        { name: "Surigao Metro Business Hub & Audit Co.", desc: "Corporate Finance, HR Operations & Management" },
        { name: "NEMSU Center for Accounting & Business Development", desc: "Treasury, Capital Budgeting & Auditing" },
        { name: "Provincial Department of Public Administration & Legal Affairs", desc: "Public Sector Administration & Governance" },
        { name: "Provincial Tourism & Hospitality Center", desc: "Tourism Development & Event Management" },
        { name: "Apex Commercial Marketing & Brand Bureau", desc: "Digital Marketing, Market Research & B2B Sales" },
        { name: "Caraga Microfinance & Enterprise Lending Corp.", desc: "Financial Management & Credit Portfolio Analysis" }
    ],
    CET: [
        { name: "Provincial Engineering & Infrastructure Office", desc: "Civil Infrastructure, Public Works & Structural Design" },
        { name: "Metro Surigao Builders Corp.", desc: "Construction Project Management & Quantity Surveying" },
        { name: "Caraga Regional Science & Environmental Research Lab", desc: "Geotechnical Engineering & Materials Testing" },
        { name: "Surigao Civil Works & Heavy Construction Inc.", desc: "Highway Engineering, Foundation & Site Supervision" },
        { name: "Caraga Structural CAD & Blueprint Center", desc: "Structural Analysis & AutoCAD / Civil 3D Modeling" },
        { name: "Provincial Water Resources & Irrigation Office", desc: "Hydraulics, Water Engineering & Surveying" }
    ],
    CTE: [
        { name: "NEMSU Laboratory High School", desc: "Basic Education Department & Secondary Pedagogy" },
        { name: "DepEd Surigao Division Elementary Training Schools", desc: "Elementary Education & Early Grade Classroom" },
        { name: "Provincial Reading & Early Childhood Center", desc: "Early Childhood Development & Literacy Facilitation" },
        { name: "Caraga Regional STEM Teacher Training Center", desc: "Secondary Science & Math Pedagogy Laboratory" },
        { name: "Surigao Center for Language & Cultural Pedagogy", desc: "Filipino & English Secondary Language Teaching" },
        { name: "Provincial Sports Academy & Recreation Complex", desc: "Physical Education, Sports Officiating & Coaching" },
        { name: "NEMSU Learning Resource & EdTech Center", desc: "Instructional Media & Curriculum Materials Design" }
    ],
    CAS: [
        { name: "Regional Data & Actuarial Analytics Bureau", desc: "Economics, Statistical Modeling & Quantitative Analysis" },
        { name: "Provincial Department of Public Administration & Legal Affairs", desc: "Political Science, Public Policy & Legal Research" },
        { name: "Caraga Regional Science & Environmental Research Lab", desc: "Biological Assays, Histology & Microbiology" },
        { name: "Provincial Environment & Natural Resources Office", desc: "Ecology, Environmental Compliance & GIS Mapping" },
        { name: "Provincial Maternal & Community Health Center", desc: "Clinical Midwifery, Reproductive & Neonatal Healthcare" },
        { name: "Agusan Digital Media Hub", desc: "English Language, Corporate Editorial & Technical Writing" },
        { name: "NEMSU Cultural & Language Heritage Center", desc: "Batsilyer ng Sining sa Filipino, Translation & Research" },
        { name: "Provincial Ecological Conservation & Marine Sanctuary", desc: "Environmental Impact Assessment & Biodiversity Monitoring" }
    ]
};

function updatePrograms() {
    const college = document.getElementById('reg-college').value;
    const programSelect = document.getElementById('reg-program');
    const programs = nemsuPrograms[college] || [];

    programSelect.innerHTML = '<option value="">-- Select Program --</option>';
    programSelect.disabled = programs.length === 0;
    programs.forEach(program => {
        const option = document.createElement('option');
        option.value = program;
        option.textContent = program;
        programSelect.appendChild(option);
    });
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.setAttribute('aria-pressed', String(isDark));
        btn.setAttribute('title', isDark ? 'Switch to day mode' : 'Switch to dark mode');
    });
}
function toggleTheme() {
    const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    localStorage.setItem('internms_theme', nextTheme);
    applyTheme(nextTheme);
    const themeSelect = document.getElementById('settings-theme');
    if (themeSelect) themeSelect.value = nextTheme;
}

function toggleProfileMenu() {
    closeNotifMenu();
    closeSidebarProfileMenu();
    const menu = document.getElementById('profile-menu');
    const button = document.getElementById('profile-menu-toggle');
    if (!menu || !button) return;
    const isOpen = menu.classList.toggle('hidden') === false;
    button.setAttribute('aria-expanded', String(isOpen));
}

function closeProfileMenu() {
    const menu = document.getElementById('profile-menu');
    const button = document.getElementById('profile-menu-toggle');
    if (!menu || !button) return;
    menu.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
}

function toggleSidebarProfileMenu() {
    closeProfileMenu();
    closeNotifMenu();
    const menu = document.getElementById('sidebar-profile-menu');
    const button = document.getElementById('sidebar-profile-toggle');
    if (!menu || !button) return;
    const isOpen = menu.classList.toggle('hidden') === false;
    button.setAttribute('aria-expanded', String(isOpen));
}

function closeSidebarProfileMenu() {
    const menu = document.getElementById('sidebar-profile-menu');
    const button = document.getElementById('sidebar-profile-toggle');
    if (!menu || !button) return;
    menu.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
}

function getReadNotifIds() {
    try {
        return new Set(JSON.parse(localStorage.getItem('internms_read_notifs') || '[]'));
    } catch {
        return new Set();
    }
}

function saveReadNotifIds(setObj) {
    localStorage.setItem('internms_read_notifs', JSON.stringify(Array.from(setObj)));
}

function buildUserNotifications() {
    const user = appState.currentUser;
    if (!user) return [];
    const items = [];
    const role = user.role;

    const bellSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`;
    const checkSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/></svg>`;
    const awardSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;
    const chatSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
    const alertSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;

    if (role === 'student') {
        const myLogs = (appState.logs || []).filter(l => l.student === user.name);
        myLogs.slice(0, 3).forEach(log => {
            items.push({
                id: `stu-log-${log.id}-${log.status}`,
                icon: checkSvg,
                title: log.status === 'Approved' ? `Log Endorsed: ${log.title}` : `Submitted: ${log.title}`,
                desc: `${log.hours} hrs • Status: ${log.status}`,
                time: log.date || 'Today',
                targetTab: log.kind === 'attendance' ? 'stu-attendance' : 'stu-dtr'
            });
        });

        const myAlerts = (appState.alerts || []).filter(a => a.student === user.name && a.warningStage !== 'complied' && a.status !== 'Resolved');
        myAlerts.forEach(a => {
            const stageCfg = typeof getWarningStageConfig === 'function' ? getWarningStageConfig(a) : { shortBadge: a.status || '1st Warning', defaultNote: a.note || '' };
            items.unshift({
                id: `stu-warn-${a.id}-${a.warningStage || a.status}`,
                icon: alertSvg,
                title: `OJT Intervention: ${stageCfg.shortBadge}`,
                desc: a.note || stageCfg.defaultNote,
                time: 'Coordinator Directive',
                targetTab: 'sec-chat'
            });
        });

        items.push({
            id: `stu-place-${user.id}-${user.company || 'none'}`,
            icon: awardSvg,
            title: user.company && user.company !== 'Unassigned' ? `Assigned HTE: ${user.company}` : 'AI Placement Matches Ready',
            desc: `5 curated HTE options matched for ${user.program || user.college || 'your program'}.`,
            time: 'Active Placement',
            targetTab: 'stu-placement'
        });
    } else if (role === 'admin' || role === 'coordinator') {
        const scopedLogs = typeof getScopedLogs === 'function' ? getScopedLogs() : (appState.logs || []);
        const pendingLogs = scopedLogs.filter(l => l.status === 'Pending Review');
        if (pendingLogs.length > 0) {
            items.push({
                id: `coord-pending-${pendingLogs.length}-${pendingLogs[0].id}`,
                icon: checkSvg,
                title: `${pendingLogs.length} Student Log(s) Awaiting Review`,
                desc: `Latest from ${pendingLogs[0].student}: ${pendingLogs[0].title}`,
                time: pendingLogs[0].date || 'Today',
                targetTab: 'adm-dashboard'
            });
        }

        const scopedAlerts = typeof getScopedAlerts === 'function' ? getScopedAlerts() : (appState.alerts || []);
        const openAlerts = scopedAlerts.filter(a => a.warningStage !== 'complied' && a.status !== 'Resolved');
        if (openAlerts.length > 0) {
            items.push({
                id: `coord-alerts-${openAlerts.length}`,
                icon: alertSvg,
                title: `${openAlerts.length} Open Intervention Alert(s)`,
                desc: `${openAlerts[0].student}: ${openAlerts[0].issue}`,
                time: 'Requires Attention',
                targetTab: 'adm-alerts'
            });
        }

        items.push({
            id: `coord-placement-${user.college || 'all'}`,
            icon: awardSvg,
            title: 'Department AI Placement Roster',
            desc: `Review student HTE company assignments for ${user.college || 'NEMSU'}.`,
            time: 'A.Y. 2025–2026',
            targetTab: 'adm-placement'
        });
    } else if (role === 'supervisor') {
        const pendingSupLogs = (appState.logs || []).filter(l => l.status === 'Pending Review');
        items.push({
            id: `sup-pending-${pendingSupLogs.length}`,
            icon: checkSvg,
            title: pendingSupLogs.length ? `${pendingSupLogs.length} Trainee Log(s) Pending Endorsement` : 'All Trainee Logs Reviewed',
            desc: pendingSupLogs.length ? `Latest from ${pendingSupLogs[0].student}: ${pendingSupLogs[0].title}` : 'Daily DTR & task logs are up to date.',
            time: 'HTE Portal',
            targetTab: 'sup-tasks'
        });
    }

    const myMessages = (appState.messages || []).filter(m => m.recipientId === user.id);
    if (myMessages.length > 0) {
        const lastMsg = myMessages[myMessages.length - 1];
        items.unshift({
            id: `msg-${lastMsg.id}`,
            icon: chatSvg,
            title: `Message from ${lastMsg.senderName}`,
            desc: lastMsg.text.slice(0, 60) + (lastMsg.text.length > 60 ? '...' : ''),
            time: lastMsg.time || 'Recent',
            targetTab: 'sec-chat'
        });
    }

    if (!items.length) {
        items.push({
            id: 'welcome-notif',
            icon: bellSvg,
            title: 'Welcome to NEMSU Internship Management System',
            desc: 'Your OJT portal notifications and updates will appear here.',
            time: 'Just now',
            targetTab: role === 'student' ? 'stu-dashboard' : (role === 'supervisor' ? 'sup-dashboard' : 'adm-dashboard')
        });
    }

    return items;
}

function renderNotifications() {
    const listEl = document.getElementById('notif-list');
    const badgeEl = document.getElementById('notif-badge');
    if (!listEl || !badgeEl) return;

    const notifs = buildUserNotifications();
    const readIds = getReadNotifIds();
    const unreadCount = notifs.filter(n => !readIds.has(n.id)).length;

    if (unreadCount > 0) {
        badgeEl.innerText = unreadCount > 9 ? '9+' : String(unreadCount);
        badgeEl.classList.remove('hidden');
    } else {
        badgeEl.classList.add('hidden');
    }

    listEl.innerHTML = notifs.map(n => {
        const isUnread = !readIds.has(n.id);
        return `
            <button type="button" class="notif-item ${isUnread ? 'unread' : ''}" onclick="handleNotificationClick('${esc(n.id)}', '${esc(n.targetTab)}')">
                <span class="notif-item-icon">${n.icon}</span>
                <span class="notif-item-body">
                    <span class="notif-item-title" style="display:block;">${esc(n.title)}</span>
                    <span class="notif-item-desc" style="display:block;">${esc(n.desc)}</span>
                    <span class="notif-item-time">${esc(n.time)}</span>
                </span>
                ${isUnread ? '<span class="notif-unread-dot" aria-label="Unread"></span>' : ''}
            </button>
        `;
    }).join('');
}

function toggleNotifMenu() {
    closeProfileMenu();
    closeSidebarProfileMenu();
    const menu = document.getElementById('notif-menu');
    const button = document.getElementById('notif-menu-toggle');
    if (!menu || !button) return;
    renderNotifications();
    const isOpen = menu.classList.toggle('hidden') === false;
    button.setAttribute('aria-expanded', String(isOpen));
}

function closeNotifMenu() {
    const menu = document.getElementById('notif-menu');
    const button = document.getElementById('notif-menu-toggle');
    if (!menu || !button) return;
    menu.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
}

function markAllNotificationsRead() {
    const notifs = buildUserNotifications();
    const readIds = getReadNotifIds();
    notifs.forEach(n => readIds.add(n.id));
    saveReadNotifIds(readIds);
    renderNotifications();
}

function handleNotificationClick(notifId, targetTab) {
    const readIds = getReadNotifIds();
    readIds.add(notifId);
    saveReadNotifIds(readIds);
    renderNotifications();
    closeNotifMenu();
    if (targetTab) {
        let matchingNav = null;
        document.querySelectorAll('.nav-item').forEach(el => {
            if (el.getAttribute('onclick')?.includes(`'${targetTab}'`)) matchingNav = el;
        });
        switchTab(targetTab, matchingNav);
    }
}

function setAvatar(imageId, initialsId, name, photo) {
    const image = document.getElementById(imageId);
    const initials = document.getElementById(initialsId);
    initials.textContent = name ? name.charAt(0).toUpperCase() : 'U';
    image.alt = photo ? `Profile photo for ${name}` : '';
    image.hidden = !photo;
    initials.hidden = Boolean(photo);
    if (photo) image.src = photo;
    else image.removeAttribute('src');
}

function getRoleLabel(role) {
    if (role === 'admin') return 'System Owner';
    if (role === 'coordinator') return 'OJT Coordinator';
    if (role === 'supervisor') return 'HTE Industry Supervisor';
    return 'Student Intern';
}

function quickFillLogin(id, pass) {
    const idEl = document.getElementById('login-id');
    const passEl = document.getElementById('login-pass');
    if (idEl) {
        idEl.value = id;
        idEl.focus();
    }
    if (passEl) {
        passEl.value = pass;
    }
}

function renderAccountProfile() {
    const user = appState.currentUser;
    if (!user) return;

    const roleLabel = getRoleLabel(user.role);
    document.getElementById('topbar-name').innerText = user.name || 'User';
    document.getElementById('topbar-role').innerText = roleLabel;
    document.getElementById('profile-name').innerText = user.name || 'User';
    document.getElementById('profile-role').innerText = roleLabel;
    document.getElementById('profile-id').innerText = user.id || 'Not set';
    document.getElementById('profile-college').innerText = user.college || user.company || 'Not set';
    document.getElementById('profile-program').innerText = user.program || user.title || 'Not set';
    setAvatar('topbar-avatar-image', 'topbar-avatar-initials', user.name, user.photo);
    setAvatar('profile-avatar-image', 'profile-avatar-initials', user.name, user.photo);
    if (document.getElementById('stu-prof-avatar-image') && document.getElementById('stu-prof-avatar-initials')) {
        setAvatar('stu-prof-avatar-image', 'stu-prof-avatar-initials', user.name, user.photo);
    }

    const topMenuLabel = document.getElementById('topbar-profile-menu-label');
    const sideMenuLabel = document.getElementById('sidebar-profile-menu-label');
    const menuText = user.role === 'student' ? 'Edit Profile & Resume' : 'My profile';
    if (topMenuLabel) topMenuLabel.innerText = menuText;
    if (sideMenuLabel) sideMenuLabel.innerText = menuText;

    // Synchronize NEMSU Intern Management System Bottom Sidebar Profile
    const sbName = document.getElementById('sidebar-user-name');
    const sbRole = document.getElementById('sidebar-user-role');
    const sbDept = document.getElementById('sidebar-user-dept');
    const sbAvatar = document.getElementById('sidebar-user-avatar');
    if (sbName) sbName.innerText = user.name || 'User';
    if (sbRole) sbRole.innerText = roleLabel;
    if (sbDept) {
        if (user.role === 'student') {
            sbDept.innerText = `${user.college || 'CITE'} · ${user.program || 'Intern'}`;
        } else if (user.role === 'admin' || user.role === 'coordinator') {
            sbDept.innerText = `${user.college || 'NEMSU'} Coordinator`;
        } else if (user.role === 'supervisor') {
            sbDept.innerText = `${user.company || 'Host Training Enterprise'}`;
        } else {
            sbDept.innerText = 'NEMSU Tandag Campus';
        }
    }
    if (sbAvatar) {
        if (user.photo) {
            sbAvatar.innerHTML = `<img src="${user.photo}" alt="" style="width:100%;height:100%;border-radius:7px;object-fit:cover;">`;
        } else {
            sbAvatar.innerText = (user.name || 'U').charAt(0).toUpperCase();
        }
    }

    renderNotifications();
}

function openProfileFromMenu() {
    closeProfileMenu();
    closeSidebarProfileMenu();
    closeNotifMenu();
    if (window.innerWidth <= 900) toggleSidebar(false);
    if (appState.currentUser && appState.currentUser.role === 'student') {
        switchTab('stu-profile', document.getElementById('nav-stu-profile'));
    } else {
        openProfileModal();
    }
}

function openProfileModal() {
    closeProfileMenu();
    closeSidebarProfileMenu();
    closeNotifMenu();
    if (window.innerWidth <= 900) toggleSidebar(false);
    renderAccountProfile();
    document.getElementById('profile-modal').classList.add('show');
    document.querySelector('#profile-modal .btn-icon').focus();
}

function openSettingsModal() {
    closeProfileMenu();
    closeSidebarProfileMenu();
    closeNotifMenu();
    if (window.innerWidth <= 900) toggleSidebar(false);
    document.getElementById('settings-theme').value = localStorage.getItem('internms_theme') || 'dark';
    document.getElementById('password-form').reset();
    document.getElementById('settings-modal').classList.add('show');
    document.querySelector('#settings-modal .btn-icon').focus();
}

function closeAccountModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
    const toggleBtn = document.getElementById('profile-menu-toggle');
    if (toggleBtn) toggleBtn.focus();
}

function handleProfilePhotoChange(event) {
    const file = event.target.files[0];
    const user = appState.currentUser;
    if (!file || !user) return;
    if (!file.type.startsWith('image/')) {
        alert('Choose an image file for your profile photo.');
        event.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const source = new Image();
        source.onload = () => {
            const size = Math.min(source.naturalWidth, source.naturalHeight);
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            canvas.getContext('2d').drawImage(
                source,
                (source.naturalWidth - size) / 2,
                (source.naturalHeight - size) / 2,
                size,
                size,
                0,
                0,
                256,
                256
            );

            const userRecord = usersDB.find(account => account.id === user.id);
            if (!userRecord) {
                alert('Could not find this account to save the photo.');
                return;
            }
            userRecord.photo = canvas.toDataURL('image/jpeg', 0.82);
            appState.currentUser = userRecord;
            persistUsers();
            renderAccountProfile();
            event.target.value = '';
        };
        source.onerror = () => alert('This image could not be opened. Choose another image.');
        source.src = reader.result;
    };
    reader.onerror = () => alert('This image could not be read. Choose another image.');
    reader.readAsDataURL(file);
}

function changePassword(event) {
    event.preventDefault();
    const user = appState.currentUser;
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const userRecord = user && usersDB.find(account => account.id === user.id);

    if (!userRecord || userRecord.pass !== currentPassword) {
        alert('The current password is incorrect.');
        return;
    }
    if (newPassword.length < 6) {
        alert('Use at least 6 characters for the new password.');
        return;
    }
    if (newPassword !== confirmPassword) {
        alert('The new passwords do not match.');
        return;
    }

    userRecord.pass = newPassword;
    appState.currentUser = userRecord;
    persistUsers();
    document.getElementById('password-form').reset();
    closeAccountModal('settings-modal');
    alert('Password updated.');
}

/* ================= FILE-BACKED APP DATA ================= */
const databaseApi = 'http://127.0.0.1:4173/api/database';
const usersDB = [];
let databaseReady = false;
let databaseSaveQueue = Promise.resolve();

/* ================= INITIAL MESSAGES FOR INTER-ROLE CHAT ================= */
const initialMessages = [
    {
        id: 1,
        senderId: 'admin',
        senderName: 'Dr. Roberto Silva',
        senderRole: 'admin',
        recipientId: 'student',
        text: 'Welcome to your OJT semester Jericho! Please ensure your daily time record and live camera task logs are updated daily.',
        time: 'Yesterday 8:30 AM'
    },
    {
        id: 2,
        senderId: 'student',
        senderName: 'Jericho B. Dominado',
        senderRole: 'student',
        recipientId: 'admin',
        text: 'Good morning Dr. Silva! Thank you sir. I just submitted my daily task log for database encoding at TechNova Solutions.',
        time: 'Yesterday 8:45 AM'
    },
    {
        id: 3,
        senderId: 'supervisor',
        senderName: 'Engr. Elena Rostova',
        senderRole: 'supervisor',
        recipientId: 'student',
        text: 'Hi Jericho, welcome to TechNova Solutions. Please report to Room 302 for the microservices orientation.',
        time: 'Yesterday 9:15 AM'
    },
    {
        id: 4,
        senderId: 'student',
        senderName: 'Jericho B. Dominado',
        senderRole: 'student',
        recipientId: 'supervisor',
        text: 'Good morning Engr. Elena! I have verified my live camera attendance and will proceed to Room 302.',
        time: 'Yesterday 9:20 AM'
    },
    {
        id: 5,
        senderId: 'supervisor',
        senderName: 'Engr. Elena Rostova',
        senderRole: 'supervisor',
        recipientId: 'admin',
        text: 'Greetings Dr. Silva. All CITE interns stationed at TechNova Solutions are performing well and logging their DTR on time.',
        time: 'Yesterday 3:00 PM'
    },
    {
        id: 6,
        senderId: 'admin',
        senderName: 'Dr. Roberto Silva',
        senderRole: 'admin',
        recipientId: 'supervisor',
        text: 'Thank you Engr. Elena! We appreciate TechNova Solutions continuing to mentor NEMSU interns.',
        time: 'Yesterday 3:45 PM'
    }
];

const appState = {
    currentUser: null,
    alerts: [],
    logs: [],
    messages: [],
    activeChatContactId: null,
    chatFilter: 'all'
};

function readLegacyArray(key) {
    const stored = localStorage.getItem(key);
    if (stored === null) return null;
    try {
        const value = JSON.parse(stored);
        return Array.isArray(value) ? value : null;
    } catch {
        return null;
    }
}

function persistDatabase() {
    if (!databaseReady) return;
    const snapshot = JSON.stringify({
        _migrationPending: false,
        users: usersDB,
        alerts: appState.alerts,
        logs: appState.logs,
        messages: appState.messages
    });
    databaseSaveQueue = databaseSaveQueue.then(async () => {
        const response = await fetch(databaseApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: snapshot
        });
        if (!response.ok) throw new Error(`Database save failed (${response.status}).`);
    }).catch(error => console.error('Could not save InternMS database:', error));
}

function persistUsers() { persistDatabase(); }
function persistLogs() { persistDatabase(); }
function persistMessages() { persistDatabase(); }

async function initializeDatabase() {
    const response = await fetch(databaseApi);
    if (!response.ok) throw new Error(`Database load failed (${response.status}).`);
    const database = await response.json();
    const migrationPending = database._migrationPending === true;
    const legacyUsers = migrationPending ? readLegacyArray('internms_users') : null;
    const legacyAlerts = migrationPending ? readLegacyArray('internms_alerts') : null;
    const legacyLogs = migrationPending ? readLegacyArray('internms_logs') : null;
    const legacyMessages = migrationPending ? readLegacyArray('internms_messages') : null;
    const users = legacyUsers || database.users || [];
    let rolesNormalized = false;

    users.forEach(user => {
        if (user.id === 'admin' && (user.role !== 'admin' || user.title !== 'System Owner')) {
            user.role = 'admin';
            user.title = 'System Owner';
            rolesNormalized = true;
        } else if (user.id !== 'admin' && user.role === 'admin') {
            user.role = 'coordinator';
            user.title = 'OJT Coordinator';
            rolesNormalized = true;
        }
    });

    if (!users.some(user => user.role === 'supervisor')) {
        const defaultSupervisor = (database.users || []).find(user => user.role === 'supervisor');
        if (defaultSupervisor) users.push(defaultSupervisor);
    }

    usersDB.splice(0, usersDB.length, ...users);
    appState.alerts = (legacyAlerts || database.alerts || []).map(a => {
        if (Array.isArray(a.triggers)) {
            a.triggers = a.triggers.map(t => String(t || '').replace(/^DTR\s+Absences$/i, 'Absences'));
        }
        return a;
    });
    appState.logs = legacyLogs || database.logs || [];
    appState.messages = legacyMessages || database.messages || initialMessages;
    databaseReady = true;
    if (migrationPending || rolesNormalized) persistDatabase();
}

function toggleAuth(type) {
    document.getElementById('tab-login').classList.remove('active');
    document.getElementById('tab-register').classList.remove('active');
    document.getElementById('form-login').classList.add('hidden');
    document.getElementById('form-register').classList.add('hidden');
    document.getElementById(`tab-${type}`).classList.add('active');
    document.getElementById(`form-${type}`).classList.remove('hidden');
}

window.onload = async () => {
    applyTheme(localStorage.getItem('internms_theme') || 'dark');
    try {
        await initializeDatabase();
    } catch (error) {
        console.error('InternMS database server is unavailable:', error);
        alert('The JSON database server is not running. Start InternMS with F5 in VS Code.');
        return;
    }
    const sess = JSON.parse(localStorage.getItem('internms_session') || 'null');
    if (sess && ['student', 'admin', 'coordinator', 'supervisor'].includes(sess.role) && sess.name) {
        appState.currentUser = usersDB.find(u => u.name === sess.name && u.role === sess.role) || sess;
        loginUser(sess.role, sess.name, sess.college || sess.company || 'CITE');
    } else if (sess) {
        localStorage.removeItem('internms_session');
    }
};

function processLogin() {
    const id = document.getElementById('login-id').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
    const user = usersDB.find(u => u.id === id && u.pass === pass);
    if (user) {
        appState.currentUser = user;
        loginUser(user.role, user.name, user.college || user.company);
    } else {
        alert('Invalid credentials! Check your ID and password.');
    }
}

/* ================= PUBLIC REGISTRATION (STRICTLY FOR END-USER STUDENTS) ================= */
function executeRegistration() {
    // Role is strictly locked to student for public registration
    const role = 'student';
    const id = document.getElementById('reg-id').value.trim();
    const pass = document.getElementById('reg-pass').value.trim();
    const name = document.getElementById('reg-name').value || 'New Student';
    const college = document.getElementById('reg-college').value;
    const program = document.getElementById('reg-program').value;
    
    if (!id || !pass || !college || !program) {
        return alert('Student ID, password, college department, and program are required.');
    }
    if (usersDB.find(u => u.id === id)) {
        return alert("An account with this ID already exists.");
    }

    const recs = getStudentPlacementRecommendations({ program, college });
    const topRec = (recs && recs.length) ? recs[0] : null;
    const defaultCompany = topRec ? topRec.company.split('·')[0].trim() : 'Unassigned';
    const defaultRole = topRec ? topRec.title : 'Intern Trainee';

    usersDB.push({
        id,
        pass,
        role,
        name,
        college,
        program,
        company: defaultCompany,
        assignedRole: defaultRole
    });
    persistUsers();
    alert("Student Account registered successfully! You may now sign in.");
    toggleAuth('login');
}

/* ================= CONFIDENTIAL STAFF ACCOUNT PROVISIONING (ADMIN-ONLY) ================= */
function toggleStaffFields() {
    const role = document.getElementById('staff-role').value;
    const deptLabel = document.getElementById('staff-dept-label');
    const companyGroup = document.getElementById('staff-company-group');
    if (role === 'supervisor') {
        deptLabel.innerText = "Assigned College / Department";
        companyGroup.style.display = 'block';
    } else {
        deptLabel.innerText = "University College / Department";
        companyGroup.style.display = 'none';
    }
}

function createConfidentialStaff() {
    if (!appState.currentUser || appState.currentUser.role !== 'admin') {
        return alert('Unauthorized: Only the System Owner can provision staff accounts.');
    }
    const role = document.getElementById('staff-role').value;
    if (!['coordinator', 'supervisor'].includes(role)) {
        return alert('Only Coordinator and Supervisor accounts may be provisioned here.');
    }
    const id = document.getElementById('staff-id').value.trim();
    const name = document.getElementById('staff-name').value.trim();
    const pass = document.getElementById('staff-pass').value.trim();
    const dept = document.getElementById('staff-dept').value.trim();
    const company = document.getElementById('staff-company').value.trim();

    if (!id || !name || !pass || !dept) {
        return alert('Account ID, full name, department, and password are required.');
    }
    if (pass.length < 6) {
        return alert('Temporary password must be at least 6 characters.');
    }
    if (usersDB.find(u => u.id === id)) {
        return alert('An account with this ID already exists.');
    }

    const newStaff = {
        id,
        pass,
        role,
        name,
        college: dept || 'CITE',
        company: role === 'supervisor' ? (company || 'Partner Enterprise') : undefined,
        title: role === 'coordinator' ? `${getDepartmentName(dept)} OJT Coordinator` : 'HTE Industry Supervisor'
    };

    usersDB.push(newStaff);
    persistUsers();
    renderStaffDirectory();
    alert(`${role === 'coordinator' ? 'Coordinator' : 'Supervisor'} account created successfully. ID: ${id}`);

    // Clear inputs
    document.getElementById('staff-id').value = '';
    document.getElementById('staff-name').value = '';
    document.getElementById('staff-pass').value = '';
    document.getElementById('staff-dept').value = '';
    document.getElementById('staff-company').value = '';
}

function renderStaffDirectory() {
    const tbody = document.getElementById('staff-directory-tbody');
    if (!tbody) return;

    const staffUsers = usersDB.filter(u => ['admin', 'coordinator', 'supervisor'].includes(u.role));
    tbody.innerHTML = staffUsers.map(s => {
        const badgeClass = s.role === 'supervisor' ? 'badge-supervisor' : (s.role === 'admin' ? 'badge-warning' : 'badge-coordinator');
        const roleText = s.role === 'admin' ? 'System Owner' : (s.role === 'coordinator' ? 'Coordinator' : 'Supervisor');
        const affiliation = s.role === 'supervisor' ? esc(s.company || 'Enterprise') : esc(s.college || 'NEMSU');
        const isSelf = appState.currentUser && appState.currentUser.id === s.id;

        return `
            <tr>
                <td>
                    <strong>${esc(s.name)}</strong>
                    <br><span class="badge ${badgeClass}">${roleText}</span>
                </td>
                <td><code>${esc(s.id)}</code></td>
                <td>${affiliation}</td>
                <td>
                    ${isSelf ? '<small style="color:var(--muted)">Current User</small>' : `
                        <button class="btn btn-outline btn-sm" onclick="chatWithUser('${esc(s.id)}')"><svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Message</button>
                    `}
                </td>
            </tr>
        `;
    }).join('') || '<tr><td colspan="4">No staff accounts provisioned yet.</td></tr>';
}

/* ================= LOGIN & ROLE ROUTING ================= */
function loginUser(role, name, college) {
    localStorage.setItem('internms_session', JSON.stringify({ role, name, college }));
    document.getElementById('auth-gateway').style.display = 'none';
    document.getElementById('app-layout').style.display = 'flex';
    renderAccountProfile();
    document.querySelectorAll('.dynamic-name').forEach(el => el.innerText = name.split(' ')[0]);

    // Hide all menus
    document.getElementById('nav-student').style.display = 'none';
    document.getElementById('nav-admin').style.display = 'none';
    document.getElementById('nav-supervisor').style.display = 'none';
    document.getElementById('nav-manage-staff').style.display = role === 'admin' ? 'flex' : 'none';

    if (role === 'student') {
        document.getElementById('nav-student').style.display = 'block';
        renderStudentDashboard();
        switchTab('stu-dashboard', document.querySelector('#nav-student .nav-item.active'));
    } else if (role === 'supervisor') {
        document.getElementById('nav-supervisor').style.display = 'block';
        renderSupervisorDashboard();
        switchTab('sup-dashboard', document.querySelector('#nav-supervisor .nav-item.active'));
    } else if (role === 'admin' || role === 'coordinator') {
        document.getElementById('nav-admin').style.display = 'block';
        document.getElementById('adm-dashboard-title').innerText = role === 'admin' ? 'System Owner Dashboard' : 'Coordinator Dashboard';
        renderAdminDashboard();
        if (role === 'admin') {
            renderStaffDirectory();
            toggleStaffFields();
        }
        switchTab('adm-dashboard', document.querySelector('#nav-admin .nav-item.active'));
    } else {
        return alert('This account role is not recognized.');
    }

    initChat();
}

function logout() {
    stopCamera();
    if (typeof stopTaskCamera === 'function') stopTaskCamera(true);
    localStorage.removeItem('internms_session');
    location.reload();
}

function toggleSidebar(forceState) {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!sidebar) return;
    
    const shouldOpen = typeof forceState === 'boolean'
        ? forceState
        : !sidebar.classList.contains('open');

    if (shouldOpen) {
        sidebar.classList.add('open');
        if (backdrop) backdrop.classList.add('active');
        document.body.classList.add('sidebar-open');
    } else {
        sidebar.classList.remove('open');
        if (backdrop) backdrop.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }
}

function switchTab(tabId, navEl) {
    if (tabId === 'adm-staff' && (!appState.currentUser || appState.currentUser.role !== 'admin')) {
        return alert('Only the System Owner can manage staff accounts.');
    }
    if (tabId === 'sup-evaluation' && (!appState.currentUser || appState.currentUser.role !== 'supervisor')) {
        return alert('Only the HTE Industry Supervisor is authorized to evaluate student interns.');
    }
    if (tabId !== 'stu-attendance') stopCamera();
    if (tabId !== 'stu-dtr' && typeof stopTaskCamera === 'function') stopTaskCamera(false);
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    const targetSection = document.getElementById(tabId);
    if (targetSection) targetSection.classList.add('active');
    if (navEl) navEl.classList.add('active');

    // Automatically close off-canvas sidebar on mobile viewports
    if (window.innerWidth <= 900) {
        toggleSidebar(false);
    }

    if (tabId === 'sec-chat') {
        renderChatContacts();
        renderActiveChat();
    } else if (tabId === 'adm-dashboard') {
        renderAdminDashboard();
    } else if (tabId === 'adm-interns') {
        renderAdminDashboard();
    } else if (tabId === 'adm-alerts') {
        renderAdminAlerts();
    } else if (tabId === 'adm-placement') {
        renderCoordinatorPlacementView();
    } else if (tabId === 'adm-staff') {
        renderStaffDirectory();
    } else if (tabId === 'stu-placement') {
        renderStudentPlacements();
    } else if (tabId === 'stu-profile') {
        renderStudentProfilePage();
    } else if (tabId === 'stu-attendance') {
        renderPunchStatusBoard();
    } else if (tabId === 'stu-dtr') {
        renderWeeklyLogList();
    } else if (tabId === 'sup-dashboard') {
        renderSupervisorDashboard();
    } else if (tabId === 'sup-interns') {
        renderSupervisorInterns();
    } else if (tabId === 'sup-tasks') {
        renderSupervisorTaskApprovals();
    } else if (tabId === 'sup-evaluation') {
        renderHteEvaluationForm();
    }
}

/* ================= STUDENT INTERN PROFILE, ACHIEVEMENTS, EXPERIENCE & RESUME ================= */
function getStudentPortfolioStorageKey(studentId) {
    return `internms_stu_portfolio_${studentId || 'student'}`;
}

function getDefaultStudentPortfolio(student) {
    const name = student?.name || 'Student Intern';
    const college = (student?.college || 'CITE').toUpperCase();
    const program = student?.program || 'Bachelor Science in Computer Science';
    const cleanEmail = name.toLowerCase().replace(/[^a-z0-9]+/g, '.') + '@nemsu.edu.ph';

    const recs = typeof getStudentPlacementRecommendations === 'function'
        ? getStudentPlacementRecommendations(student)
        : [];
    const defaultSkills = (recs[0] && Array.isArray(recs[0].matchingSkills))
        ? [...recs[0].matchingSkills, 'Team Collaboration', 'Technical Documentation']
        : ['Full-Stack Web Development', 'Database Design (SQL)', 'REST API Integration', 'System Analysis', 'Git Version Control'];

    return {
        email: cleanEmail,
        phone: '+63 917 555 0143',
        portfolioUrl: `github.com/${name.toLowerCase().replace(/[^a-z0-9]+/g, '')}`,
        bio: `Dedicated 4th-year ${program} student under the ${getDepartmentName(college)} (${college}) at North Eastern Mindanao State University (NEMSU), seeking to apply academic competencies, software engineering practices, and analytical problem-solving in a collaborative Host Training Enterprise.`,
        skills: defaultSkills,
        achievements: [
            {
                id: 'ach-1',
                title: "Dean's Lister — Academic Distinction",
                issuer: `NEMSU ${college} Department`,
                date: 'A.Y. 2024–2025',
                desc: 'Recognized for maintaining a high general weighted average across core major courses.'
            },
            {
                id: 'ach-2',
                title: 'Best Capstone Research Prototype Nominee',
                issuer: `${college} Annual Research & Innovation Colloquium`,
                date: '2025',
                desc: 'Co-authored and presented an applied digital solution evaluated by industry panelists.'
            }
        ],
        experiences: [
            {
                id: 'exp-1',
                role: 'Lead Project Developer & Researcher',
                org: `NEMSU ${college} Capstone Project Team`,
                period: 'Aug 2025 – Present',
                desc: 'Designed system architecture, database schemas, and interactive UI workflows for academic deployment.'
            },
            {
                id: 'exp-2',
                role: 'Technical Committee Officer',
                org: `${college} Student Society — NEMSU Main Campus`,
                period: '2024 – 2025',
                desc: 'Facilitated departmental workshops, peer coding clinics, and campus technical events.'
            }
        ],
        resume: null
    };
}

function getStudentPortfolioData(student) {
    const target = student || appState.currentUser;
    if (!target) return getDefaultStudentPortfolio({});
    const defaults = getDefaultStudentPortfolio(target);

    if (target.portfolioData && typeof target.portfolioData === 'object') {
        return {
            ...defaults,
            ...target.portfolioData,
            skills: Array.isArray(target.portfolioData.skills) ? target.portfolioData.skills : defaults.skills,
            achievements: Array.isArray(target.portfolioData.achievements) ? target.portfolioData.achievements : defaults.achievements,
            experiences: Array.isArray(target.portfolioData.experiences) ? target.portfolioData.experiences : defaults.experiences
        };
    }

    try {
        const raw = localStorage.getItem(getStudentPortfolioStorageKey(target.id));
        if (raw) {
            const parsed = JSON.parse(raw);
            return {
                ...defaults,
                ...parsed,
                skills: Array.isArray(parsed.skills) ? parsed.skills : defaults.skills,
                achievements: Array.isArray(parsed.achievements) ? parsed.achievements : defaults.achievements,
                experiences: Array.isArray(parsed.experiences) ? parsed.experiences : defaults.experiences
            };
        }
    } catch {}

    return defaults;
}

function saveStudentPortfolioData(portfolio) {
    const user = appState.currentUser;
    if (!user) return;
    user.portfolioData = portfolio;
    const dbUser = usersDB.find(u => u.id === user.id);
    if (dbUser) {
        dbUser.portfolioData = portfolio;
    }
    try {
        localStorage.setItem(getStudentPortfolioStorageKey(user.id), JSON.stringify(portfolio));
    } catch {}
    persistUsers();
}

function renderStudentProfilePage() {
    const user = appState.currentUser;
    if (!user) return;
    const portfolio = getStudentPortfolioData(user);

    if (document.getElementById('stu-prof-avatar-image') && document.getElementById('stu-prof-avatar-initials')) {
        setAvatar('stu-prof-avatar-image', 'stu-prof-avatar-initials', user.name, user.photo);
    }

    const setElText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    };
    setElText('stu-prof-display-name', user.name || 'Student Intern');
    setElText('stu-prof-display-id', `ID: ${user.id || '2023-0001'}`);
    setElText('stu-prof-display-college', user.college || 'CITE');
    setElText('stu-prof-display-hte', user.company && user.company !== 'Unassigned' ? user.company : 'TechNova Solutions');
    setElText('stu-prof-display-program', user.program || 'BS Computer Science');
    setElText('stu-prof-display-role', user.assignedRole || 'Intern Trainee');

    const setInputVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
    };
    setInputVal('stu-prof-name', user.name || '');
    setInputVal('stu-prof-email', portfolio.email || '');
    setInputVal('stu-prof-phone', portfolio.phone || '');
    setInputVal('stu-prof-portfolio', portfolio.portfolioUrl || '');
    setInputVal('stu-prof-bio', portfolio.bio || '');

    // Render Skills Chips
    const skillsBox = document.getElementById('stu-prof-skills-chips');
    if (skillsBox) {
        skillsBox.innerHTML = portfolio.skills.length
            ? portfolio.skills.map((skill, idx) => `
                <span class="stu-skill-chip">
                    ${esc(skill)}
                    <button type="button" onclick="removeStudentProfileSkill(${idx})" title="Remove skill" aria-label="Remove ${esc(skill)}">&times;</button>
                </span>
            `).join('')
            : '<small style="color:var(--muted);">No skills added yet. Add your technical and soft skills below.</small>';
    }

    // Render Achievements List
    const achBox = document.getElementById('stu-prof-achievements-list');
    if (achBox) {
        achBox.innerHTML = portfolio.achievements.length
            ? portfolio.achievements.map((a, idx) => `
                <div class="stu-prof-timeline-item">
                    <div>
                        <h4>${esc(a.title)}</h4>
                        <div class="stu-prof-timeline-meta">${esc(a.issuer || 'Academic Recognition')}${a.date ? ' • ' + esc(a.date) : ''}</div>
                        ${a.desc ? `<p class="stu-prof-timeline-desc">${esc(a.desc)}</p>` : ''}
                    </div>
                    <button type="button" class="btn btn-outline btn-sm" style="color:#ef4444; border-color:rgba(239,68,68,0.3); flex-shrink:0;" onclick="removeStudentAchievement(${idx})">Remove</button>
                </div>
            `).join('')
            : '<div style="color:var(--muted); font-size:0.84rem; padding:8px 0;">No achievements or certifications listed yet.</div>';
    }

    // Render Experience List
    const expBox = document.getElementById('stu-prof-experience-list');
    if (expBox) {
        expBox.innerHTML = portfolio.experiences.length
            ? portfolio.experiences.map((ex, idx) => `
                <div class="stu-prof-timeline-item">
                    <div>
                        <h4>${esc(ex.role)}</h4>
                        <div class="stu-prof-timeline-meta">${esc(ex.org || 'Project / Organization')}${ex.period ? ' • ' + esc(ex.period) : ''}</div>
                        ${ex.desc ? `<p class="stu-prof-timeline-desc">${esc(ex.desc)}</p>` : ''}
                    </div>
                    <button type="button" class="btn btn-outline btn-sm" style="color:#ef4444; border-color:rgba(239,68,68,0.3); flex-shrink:0;" onclick="removeStudentExperience(${idx})">Remove</button>
                </div>
            `).join('')
            : '<div style="color:var(--muted); font-size:0.84rem; padding:8px 0;">No project or work experiences listed yet.</div>';
    }

    // Render Resume Status
    const resumeBadge = document.getElementById('stu-resume-badge');
    const resumeBox = document.getElementById('stu-resume-file-box');
    const resumeNameEl = document.getElementById('stu-resume-filename');
    const resumeMetaEl = document.getElementById('stu-resume-meta');
    if (portfolio.resume && portfolio.resume.fileName) {
        if (resumeBadge) {
            resumeBadge.className = 'badge badge-success';
            resumeBadge.innerText = 'Resume Uploaded ✓';
        }
        if (resumeBox) resumeBox.classList.remove('hidden');
        if (resumeNameEl) resumeNameEl.innerText = portfolio.resume.fileName;
        if (resumeMetaEl) resumeMetaEl.innerText = `${portfolio.resume.fileSize || ''} • Uploaded ${portfolio.resume.uploadedAt || 'recently'}`;
    } else {
        if (resumeBadge) {
            resumeBadge.className = 'badge badge-warning';
            resumeBadge.innerText = 'No File Yet';
        }
        if (resumeBox) resumeBox.classList.add('hidden');
    }
}

function saveStudentProfilePage() {
    const user = appState.currentUser;
    if (!user) return;
    const portfolio = getStudentPortfolioData(user);

    const newName = (document.getElementById('stu-prof-name')?.value || '').trim();
    if (newName && newName !== user.name) {
        const oldName = user.name;
        user.name = newName;
        const dbUser = usersDB.find(u => u.id === user.id);
        if (dbUser) dbUser.name = newName;
        appState.logs.forEach(l => {
            if (l.student === oldName) l.student = newName;
        });
        document.querySelectorAll('.dynamic-name').forEach(el => el.innerText = newName.split(' ')[0]);
    }

    portfolio.email = (document.getElementById('stu-prof-email')?.value || '').trim();
    portfolio.phone = (document.getElementById('stu-prof-phone')?.value || '').trim();
    portfolio.portfolioUrl = (document.getElementById('stu-prof-portfolio')?.value || '').trim();
    portfolio.bio = (document.getElementById('stu-prof-bio')?.value || '').trim();

    saveStudentPortfolioData(portfolio);
    renderAccountProfile();
    renderStudentProfilePage();
    alert('Your Intern Profile, Achievements, Experience, and Resume details have been saved!');
}

function addStudentProfileSkill() {
    const input = document.getElementById('stu-prof-new-skill');
    const val = (input?.value || '').trim();
    if (!val) return;
    const portfolio = getStudentPortfolioData(appState.currentUser);
    if (!portfolio.skills.includes(val)) {
        portfolio.skills.push(val);
        saveStudentPortfolioData(portfolio);
    }
    if (input) input.value = '';
    renderStudentProfilePage();
}

function removeStudentProfileSkill(idx) {
    const portfolio = getStudentPortfolioData(appState.currentUser);
    portfolio.skills.splice(idx, 1);
    saveStudentPortfolioData(portfolio);
    renderStudentProfilePage();
}

function addStudentAchievement() {
    const titleEl = document.getElementById('stu-ach-title');
    const issuerEl = document.getElementById('stu-ach-issuer');
    const dateEl = document.getElementById('stu-ach-date');
    const descEl = document.getElementById('stu-ach-desc');

    const title = (titleEl?.value || '').trim();
    const issuer = (issuerEl?.value || '').trim();
    const date = (dateEl?.value || '').trim();
    const desc = (descEl?.value || '').trim();

    if (!title) return alert('Please enter the Achievement or Certification title.');

    const portfolio = getStudentPortfolioData(appState.currentUser);
    portfolio.achievements.unshift({
        id: 'ach-' + Date.now(),
        title,
        issuer: issuer || 'Academic / Professional Recognition',
        date: date || new Date().getFullYear().toString(),
        desc
    });
    saveStudentPortfolioData(portfolio);

    if (titleEl) titleEl.value = '';
    if (issuerEl) issuerEl.value = '';
    if (dateEl) dateEl.value = '';
    if (descEl) descEl.value = '';
    renderStudentProfilePage();
}

function removeStudentAchievement(idx) {
    const portfolio = getStudentPortfolioData(appState.currentUser);
    portfolio.achievements.splice(idx, 1);
    saveStudentPortfolioData(portfolio);
    renderStudentProfilePage();
}

function addStudentExperience() {
    const roleEl = document.getElementById('stu-exp-role');
    const orgEl = document.getElementById('stu-exp-org');
    const periodEl = document.getElementById('stu-exp-period');
    const descEl = document.getElementById('stu-exp-desc');

    const role = (roleEl?.value || '').trim();
    const org = (orgEl?.value || '').trim();
    const period = (periodEl?.value || '').trim();
    const desc = (descEl?.value || '').trim();

    if (!role) return alert('Please enter your Role or Position title.');

    const portfolio = getStudentPortfolioData(appState.currentUser);
    portfolio.experiences.unshift({
        id: 'exp-' + Date.now(),
        role,
        org: org || 'Academic / Industry Project',
        period: period || '2025',
        desc
    });
    saveStudentPortfolioData(portfolio);

    if (roleEl) roleEl.value = '';
    if (orgEl) orgEl.value = '';
    if (periodEl) periodEl.value = '';
    if (descEl) descEl.value = '';
    renderStudentProfilePage();
}

function removeStudentExperience(idx) {
    const portfolio = getStudentPortfolioData(appState.currentUser);
    portfolio.experiences.splice(idx, 1);
    saveStudentPortfolioData(portfolio);
    renderStudentProfilePage();
}

function handleStudentResumeUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file || !appState.currentUser) return;

    if (file.size > 5 * 1024 * 1024) {
        alert('Resume file is too large. Please upload a PDF, DOC, or DOCX file under 5 MB.');
        event.target.value = '';
        return;
    }

    const kb = Math.max(1, Math.round(file.size / 1024));
    const sizeLabel = kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
    const uploadedAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const reader = new FileReader();
    reader.onload = () => {
        const portfolio = getStudentPortfolioData(appState.currentUser);
        portfolio.resume = {
            fileName: file.name,
            fileType: file.type || 'application/octet-stream',
            fileSize: sizeLabel,
            uploadedAt,
            dataUrl: typeof reader.result === 'string' ? reader.result : ''
        };
        saveStudentPortfolioData(portfolio);
        renderStudentProfilePage();
        event.target.value = '';
        alert(`Resume "${file.name}" uploaded and attached to your Intern Profile!`);
    };
    reader.onerror = () => {
        alert('Could not read the selected file. Please try again.');
        event.target.value = '';
    };
    reader.readAsDataURL(file);
}

function downloadOrPreviewStudentResume() {
    const portfolio = getStudentPortfolioData(appState.currentUser);
    if (!portfolio.resume || !portfolio.resume.dataUrl) {
        return alert('No resume file uploaded yet.');
    }
    const link = document.createElement('a');
    link.href = portfolio.resume.dataUrl;
    link.download = portfolio.resume.fileName || 'Student_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function removeStudentResume() {
    const portfolio = getStudentPortfolioData(appState.currentUser);
    if (!portfolio.resume) return;
    portfolio.resume = null;
    saveStudentPortfolioData(portfolio);
    renderStudentProfilePage();
}

/* ================= STUDENT LOGIC & CSC DTR EXPORT ================= */
function renderStudentDashboard() {
    const studentName = appState.currentUser.name;
    const myLogs = appState.logs.filter(l => l.student === studentName);
    const approvedLogs = myLogs.filter(l => l.status === 'Approved');
    const totalHours = approvedLogs.reduce((sum, log) => sum + (log.hours || 0), 0);
    const myAlerts = appState.alerts.filter(a => a.student === studentName && a.warningStage !== 'complied' && a.status !== 'Resolved');
    
    document.getElementById('dash-hours').innerText = `${totalHours} / 500`;
    document.getElementById('dash-hours-bar').style.width = `${Math.min(100, (totalHours / 500) * 100)}%`;
    if (document.getElementById('dash-company')) {
        document.getElementById('dash-company').innerText = appState.currentUser.company || 'TechNova Solutions';
    }
    if (document.getElementById('dash-risk')) {
        if (myAlerts.length > 0 && typeof getWarningStageConfig === 'function') {
            const topAlert = myAlerts[0];
            const cfg = getWarningStageConfig(topAlert);
            document.getElementById('dash-risk').innerHTML = `<span style="font-size:1.05rem;">${esc(cfg.shortBadge)}</span>`;
        } else {
            document.getElementById('dash-risk').innerText = myAlerts.length ? `${myAlerts.length} Active` : '0 (Good Standing)';
        }
    }
    
    document.getElementById('stu-activity-log').innerHTML = myLogs.map(log => `
        <tr>
            <td>${esc(log.date)}</td>
            <td>${renderPhotoThumbnail(log)}</td>
            <td>${esc(log.title)}</td>
            <td>${log.hours} hrs</td>
            <td><span class="badge badge-${log.status==='Approved'?'success':(log.status==='Rejected'?'danger':'warning')}">${esc(log.status)}</span></td>
        </tr>
    `).join('') || `<tr><td colspan="5">No tasks logged yet.</td></tr>`;

    renderWeeklyLogList();
    renderStudentPlacements();
    renderPunchStatusBoard();
    renderLiveOjtDtrPreview();
}

function getDynamicOjtDtrWeeks(logsByDate = {}) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const firstDow = firstOfMonth.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

    // First Monday of the current month
    const firstMondayDate = firstDow === 1 ? 1 : (firstDow === 0 ? 2 : 9 - firstDow);
    let startMonday = new Date(year, month, firstMondayDate);

    // If the student has logs earlier in the current month (e.g. days 1–4 before the first Monday), anchor Week 1 to that week's Monday
    const currentMonthPrefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
    const earlyMonthLog = Object.keys(logsByDate)
        .filter(iso => iso.startsWith(currentMonthPrefix))
        .sort()[0];
    if (earlyMonthLog) {
        const [ey, em, ed] = earlyMonthLog.split('-').map(Number);
        const earlyDt = new Date(ey, em - 1, ed);
        if (earlyDt < startMonday) {
            const edow = earlyDt.getDay();
            const diffToMon = edow === 0 ? -6 : 1 - edow;
            startMonday = new Date(ey, em - 1, ed + diffToMon);
        }
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const pad2 = n => String(n).padStart(2, '0');

    const weeks = [];
    for (let w = 0; w < 9; w++) {
        const weekMon = new Date(startMonday.getFullYear(), startMonday.getMonth(), startMonday.getDate() + (w * 7));
        const weekFri = new Date(weekMon.getFullYear(), weekMon.getMonth(), weekMon.getDate() + 4);

        const monMonth = monthNames[weekMon.getMonth()];
        const friMonth = monthNames[weekFri.getMonth()];
        const rangeLabel = weekMon.getMonth() === weekFri.getMonth()
            ? `${monMonth} ${pad2(weekMon.getDate())}-${pad2(weekFri.getDate())}, ${weekFri.getFullYear()}`
            : `${monMonth} ${pad2(weekMon.getDate())}-${friMonth} ${pad2(weekFri.getDate())}, ${weekFri.getFullYear()}`;

        const days = [];
        for (let d = 0; d < 7; d++) {
            const cur = new Date(weekMon.getFullYear(), weekMon.getMonth(), weekMon.getDate() + d);
            const iso = `${cur.getFullYear()}-${pad2(cur.getMonth() + 1)}-${pad2(cur.getDate())}`;
            // Standard OJT workweek is Monday–Friday (d < 5); also include Saturday/Sunday if the student has a recorded log on that date
            if (d < 5 || logsByDate[iso]) {
                days.push({
                    date: `${pad2(cur.getMonth() + 1)}/${pad2(cur.getDate())}/${cur.getFullYear()}`,
                    iso,
                    day: dayNames[cur.getDay()]
                });
            }
        }

        weeks.push({
            label: `Week ${w + 1} (${rangeLabel})`,
            days
        });
    }

    return weeks;
}

function formatTimeForCSC(timeStr) {
    if (!timeStr) return '';
    const match = timeStr.match(/(\d+):(\d+)(?::\d+)?\s*(AM|PM)?/i);
    if (!match) return timeStr;
    const hours = String(match[1]).padStart(2, '0');
    const minutes = String(match[2]).padStart(2, '0');
    const meridian = match[3] ? ` ${match[3].toUpperCase()}` : '';
    return `${hours}:${minutes}${meridian}`;
}

function summarizeDayDtrLogs(dayLogs) {
    let amIn = '', amOut = '', pmIn = '', pmOut = '';
    const attLogs = dayLogs.filter(l => l.kind === 'attendance');
    const taskLogs = dayLogs.filter(l => l.kind !== 'attendance');

    if (attLogs.length > 0) {
        attLogs.forEach(l => {
            const pType = getLogPunchType(l);
            const t = formatTimeForCSC(l.checkInTime || l.time);
            if (pType === 'AM_IN') amIn = t;
            else if (pType === 'AM_OUT') amOut = t;
            else if (pType === 'PM_IN') pmIn = t;
            else if (pType === 'PM_OUT') pmOut = t;
        });
    }

    const attHours = attLogs.reduce((sum, l) => sum + (Number(l.hours) || 0), 0);
    const taskHours = taskLogs.reduce((sum, l) => sum + (Number(l.hours) || 0), 0);
    let actualHours = Math.max(attHours, taskHours);

    if (!amIn && !amOut && !pmIn && !pmOut && actualHours > 0) {
        if (actualHours >= 8) {
            amIn = '08:00 AM'; amOut = '12:00 PM'; pmIn = '01:00 PM'; pmOut = '05:00 PM';
        } else if (actualHours === 4) {
            amIn = '08:00 AM'; amOut = '12:00 PM';
        } else {
            amIn = '08:00 AM'; amOut = '12:00 PM'; pmIn = '01:00 PM'; pmOut = `0${Math.min(5, Math.max(1, actualHours - 4))}:00 PM`;
        }
    } else if ((amIn || pmIn) && actualHours === 0) {
        actualHours = (amIn ? 4 : 0) + (pmIn ? 4 : 0);
    }

    return {
        amIn,
        amOut,
        pmIn,
        pmOut,
        actualHours: actualHours > 0 ? `${actualHours} hrs` : '',
        numericHours: actualHours
    };
}

function buildOfficialOjtDtrHTML(targetStudent) {
    const student = targetStudent
        || (appState.currentUser && appState.currentUser.role === 'student' ? appState.currentUser : null)
        || usersDB.find(u => u.role === 'student')
        || {};
    const studentName = student.name || 'Student Intern';
    const studentNo = student.id || '2026-0001';
    const collegeCode = (student.college || 'CITE').trim().toUpperCase();
    const program = `${student.program || 'BS Computer Science'} (${collegeCode})`;
    const yearSection = '4th Year - Section A';
    const company = (student.company && student.company !== 'Unassigned') ? student.company : 'TechNova Solutions';
    const deptUnit = student.assignedRole ? `${student.assignedRole} Unit` : `${collegeCode} Technical Operations Unit`;
    const companyAddress = 'Tandag City, Surigao del Sur / Partner HTE Office';

    const sup = usersDB.find(u => u.role === 'supervisor') || { name: 'Engr. Elena Rostova', company };
    const coord = usersDB.find(u => u.role === 'coordinator' && (u.college || '').toUpperCase() === collegeCode)
        || usersDB.find(u => u.role === 'coordinator')
        || { name: 'Prof. Alan Turing, MIT' };

    // Group student's logs by exact ISO date (YYYY-MM-DD)
    const myLogs = appState.logs.filter(l => l.student === studentName && l.status !== 'Rejected');
    const logsByDate = {};
    myLogs.forEach(log => {
        if (!log.date) return;
        if (!logsByDate[log.date]) logsByDate[log.date] = [];
        logsByDate[log.date].push(log);
    });

    const dynamicWeeks = getDynamicOjtDtrWeeks(logsByDate);
    const todayIso = getTodayIsoDate();

    let workingDaysCount = 0;
    let totalRenderedHours = 0;

    const weeksRowsHtml = dynamicWeeks.map(week => {
        const dayRows = week.days.map(d => {
            const dayLogs = logsByDate[d.iso] || null;
            const summary = dayLogs ? summarizeDayDtrLogs(dayLogs) : { amIn: '', amOut: '', pmIn: '', pmOut: '', actualHours: '', numericHours: 0 };
            if (summary.numericHours > 0 || summary.amIn || summary.pmIn) {
                workingDaysCount++;
                totalRenderedHours += summary.numericHours;
            }
            const isToday = d.iso === todayIso;
            const rowStyle = isToday ? 'background:#fefce8;' : '';
            return `
                <tr style="${rowStyle}">
                    <td style="border:1px solid #000; padding:3px 6px; text-align:center; ${isToday ? 'font-weight:bold;' : ''}">${d.date}</td>
                    <td style="border:1px solid #000; padding:3px 6px; text-align:center; ${isToday ? 'font-weight:bold;' : ''}">${d.day}</td>
                    <td style="border:1px solid #000; padding:3px 6px; text-align:center;">${esc(summary.amIn)}</td>
                    <td style="border:1px solid #000; padding:3px 6px; text-align:center;">${esc(summary.amOut)}</td>
                    <td style="border:1px solid #000; padding:3px 6px; text-align:center;">${esc(summary.pmIn)}</td>
                    <td style="border:1px solid #000; padding:3px 6px; text-align:center;">${esc(summary.pmOut)}</td>
                    <td style="border:1px solid #000; padding:3px 6px; text-align:center; font-weight:bold;">${esc(summary.actualHours)}</td>
                </tr>
            `;
        }).join('');

        return `
            <tr style="background:#f1f5f9;">
                <td colspan="7" style="border:1px solid #000; padding:4px 8px; font-weight:bold; text-align:left;">${esc(week.label)}</td>
            </tr>
            ${dayRows}
        `;
    }).join('');

    totalRenderedHours = Math.round(totalRenderedHours * 10) / 10;

    return `
        <div style="font-family:'Times New Roman', Times, serif; color:#000; line-height:1.3; font-size:9.5pt;">
            <div style="text-align:center; font-size:13pt; font-weight:bold; text-transform:uppercase; margin-bottom:10px;">
                ON-THE-JOB TRAINING DAILY TIME RECORD (DTR)
            </div>

            <!-- Trainee & HTE Metadata Table -->
            <table style="width:100%; border-collapse:collapse; font-size:9.5pt; margin-bottom:10px;">
                <tbody>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold; width:22%;">Name of Student Trainee:</td>
                        <td style="border:1px solid #000; padding:4px 6px; width:28%; font-weight:bold;">${esc(studentName)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold; width:22%;">Student No.:</td>
                        <td style="border:1px solid #000; padding:4px 6px; width:28%;">${esc(studentNo)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Course/Program:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(program)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Year Level/Section:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(yearSection)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Host Company/Agency:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(company)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Department/Unit Assigned:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(deptUnit)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Company/Agency Address:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(companyAddress)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Immediate Supervisor:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(sup.name)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Supervisor Position:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">Immediate HTE Supervisor / Division Lead</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Contact No./Email:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">supervisor@partner-hte.ph / +63 917 555 0192</td>
                    </tr>
                </tbody>
            </table>

            <!-- Main Weekly DTR Table (Weeks 1 to 9) -->
            <table style="width:100%; border-collapse:collapse; font-size:9pt; margin-bottom:10px;">
                <thead>
                    <tr style="background:#f1f5f9;">
                        <th rowspan="2" style="border:1px solid #000; padding:4px 6px; width:14%; text-align:center;">Date</th>
                        <th rowspan="2" style="border:1px solid #000; padding:4px 6px; width:14%; text-align:center;">Day</th>
                        <th colspan="2" style="border:1px solid #000; padding:4px 6px; width:26%; text-align:center;">Morning</th>
                        <th colspan="2" style="border:1px solid #000; padding:4px 6px; width:26%; text-align:center;">Afternoon</th>
                        <th rowspan="2" style="border:1px solid #000; padding:4px 6px; width:20%; text-align:center;">Actual Hours Worked</th>
                    </tr>
                    <tr style="background:#f1f5f9;">
                        <th style="border:1px solid #000; padding:3px 6px; text-align:center;">In</th>
                        <th style="border:1px solid #000; padding:3px 6px; text-align:center;">Out</th>
                        <th style="border:1px solid #000; padding:3px 6px; text-align:center;">In</th>
                        <th style="border:1px solid #000; padding:3px 6px; text-align:center;">Out</th>
                    </tr>
                </thead>
                <tbody>
                    ${weeksRowsHtml}
                </tbody>
            </table>

            <!-- Totals Footer Table -->
            <table style="width:100%; border-collapse:collapse; font-size:9.5pt; margin-bottom:14px;">
                <tbody>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold; width:25%;">Total Working Days</td>
                        <td style="border:1px solid #000; padding:4px 6px; width:25%; font-weight:bold;">${workingDaysCount} Days</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold; width:25%;">Total Hours Required</td>
                        <td style="border:1px solid #000; padding:4px 6px; width:25%; font-weight:bold;">500 Hours</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Overtime/WFH</td>
                        <td style="border:1px solid #000; padding:4px 6px;">0 Hours</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Total Hours Rendered</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">${totalRenderedHours} Hours</td>
                    </tr>
                </tbody>
            </table>

            <!-- CERTIFICATION -->
            <div style="font-weight:bold; font-size:10.5pt; text-transform:uppercase; margin-bottom:4px;">CERTIFICATION</div>
            <p style="font-size:9.5pt; margin:0 0 18px; text-align:justify;">
                This is to certify that the daily time record of the student trainee is true and correct and the information indicated in this form was reviewed and validated by the parties concerned.
            </p>

            <table style="width:100%; border-collapse:collapse; font-size:9.5pt; text-align:center;">
                <tbody>
                    <tr>
                        <td style="border:1px solid #000; padding:18px 8px 8px; width:33.33%; vertical-align:bottom;">
                            <div style="border-bottom:1px solid #000; width:85%; margin:0 auto 4px; font-weight:bold; text-transform:uppercase;">${esc(studentName)}</div>
                            <div style="font-weight:bold;">Student Trainee</div>
                            <div style="margin-top:6px;">Date: __________________</div>
                        </td>
                        <td style="border:1px solid #000; padding:18px 8px 8px; width:33.33%; vertical-align:bottom;">
                            <div style="border-bottom:1px solid #000; width:85%; margin:0 auto 4px; font-weight:bold; text-transform:uppercase;">${esc(sup.name)}</div>
                            <div style="font-weight:bold;">Immediate Supervisor</div>
                            <div style="margin-top:6px;">Date: __________________</div>
                        </td>
                        <td style="border:1px solid #000; padding:18px 8px 8px; width:33.33%; vertical-align:bottom;">
                            <div style="border-bottom:1px solid #000; width:85%; margin:0 auto 4px; font-weight:bold; text-transform:uppercase;">${esc(coord.name)}</div>
                            <div style="font-weight:bold;">OJT Coordinator/Monitor</div>
                            <div style="margin-top:6px;">Date: __________________</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderLiveOjtDtrPreview() {
    const previewEl = document.getElementById('stu-live-dtr-sheet-preview');
    if (previewEl) {
        previewEl.innerHTML = buildOfficialOjtDtrHTML();
    }
}

function generateDTR() {
    document.body.classList.remove('print-mode-narrative', 'print-mode-evaluation');
    const printContainer = document.getElementById('print-dtr-container');
    if (!printContainer) return;
    printContainer.innerHTML = buildOfficialOjtDtrHTML();
    window.print();
}

function exportDTRWordDoc(studentId) {
    const currentRole = appState.currentUser ? appState.currentUser.role : '';
    if (currentRole !== 'coordinator' && currentRole !== 'admin') {
        alert('Downloading editable .DOC DTR files is restricted strictly to OJT Coordinators. Student interns may use Print DTR Form.');
        return;
    }

    const student = (studentId ? usersDB.find(u => u.id === studentId && u.role === 'student') : null)
        || usersDB.find(u => u.role === 'student' && (!appState.currentUser?.college || u.college === appState.currentUser.college))
        || usersDB.find(u => u.role === 'student')
        || {};
    const dtrHtml = buildOfficialOjtDtrHTML(student);
    const cleanName = (student.name || 'Student_Trainee').replace(/[^a-zA-Z0-9]+/g, '_');

    const docContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="utf-8">
            <title>ON-THE-JOB TRAINING DAILY TIME RECORD (DTR) - ${esc(student.name || 'Intern')}</title>
            <style>
                body { font-family: 'Times New Roman', Times, serif; color: #000; line-height: 1.3; font-size: 9.5pt; padding: 12px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 3px 6px; }
            </style>
        </head>
        <body>
            ${dtrHtml}
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OJT_Daily_Time_Record_${cleanName}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

let taskVideoStream = null;

function startTaskCamera() {
    stopTaskCameraStream();
    const video = document.getElementById('task-webcam');
    const canvas = document.getElementById('task-snapshot');
    const placeholder = document.getElementById('task-cam-placeholder');
    const overlay = document.getElementById('task-camera-overlay');
    const btnStart = document.getElementById('btn-start-task-cam');
    const btnCapture = document.getElementById('btn-capture-task');
    const btnRetake = document.getElementById('btn-retake-task');
    const badge = document.getElementById('task-cam-badge');

    if (canvas) canvas.style.display = 'none';
    if (placeholder) placeholder.style.display = 'none';
    if (video) video.style.display = 'block';
    if (overlay) {
        overlay.style.display = 'block';
        overlay.innerHTML = `<svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Live Camera Active • Task Evidence Mode`;
    }
    if (badge) {
        badge.className = 'badge badge-warning';
        badge.innerText = 'Camera Active';
    }
    if (btnStart) btnStart.classList.add('hidden');
    if (btnRetake) btnRetake.classList.add('hidden');
    if (btnCapture) btnCapture.classList.remove('hidden');

    navigator.mediaDevices?.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            taskVideoStream = stream;
            if (video) video.srcObject = stream;
        })
        .catch(() => {
            navigator.mediaDevices?.getUserMedia({ video: true })
                .then(stream => {
                    taskVideoStream = stream;
                    if (video) video.srcObject = stream;
                })
                .catch(() => {
                    if (placeholder) {
                        placeholder.innerText = "Live camera simulated for testing environment. Click 'Capture Task Photo' to take snapshot.";
                        placeholder.style.display = 'block';
                    }
                    if (video) video.style.display = 'none';
                });
        });
}

function takeTaskSnapshot() {
    const video = document.getElementById('task-webcam');
    const canvas = document.getElementById('task-snapshot');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 360;
    canvas.height = 270;

    const taskTitleInput = document.getElementById('task-title')?.value.trim() || 'Daily OJT Task Accomplishment';
    const internName = appState.currentUser ? appState.currentUser.name : 'Student Intern';

    const hasActiveStream = taskVideoStream && video && video.videoWidth && video.readyState >= 2;
    if (hasActiveStream) {
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();
    } else {
        // Fallback live simulation graphic if hardware webcam is unavailable
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 360, 270);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(24, 24, 312, 160);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(24, 24, 312, 160);
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('LIVE CAMERA TASK EVIDENCE', 44, 65);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '11px sans-serif';
        ctx.fillText(taskTitleInput.slice(0, 38), 44, 92);
        ctx.fillStyle = '#34c08a';
        ctx.font = '10px sans-serif';
        ctx.fillText(`${internName} • Real-Time Capture`, 44, 118);
    }

    // Stamp real-time live camera verification watermark onto canvas
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
    ctx.fillRect(0, canvas.height - 28, canvas.width, 28);
    ctx.fillStyle = '#34c08a';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`Live Camera Task Evidence • ${dateStr} ${timeStr}`, 8, canvas.height - 15);
    ctx.fillStyle = '#ffffff';
    ctx.font = '9px sans-serif';
    ctx.fillText(`${internName} • Real-Time Verification`, 8, canvas.height - 5);

    currentTaskPhotoData = canvas.toDataURL('image/jpeg', 0.8);

    stopTaskCameraStream();
    if (video) video.style.display = 'none';
    const placeholder = document.getElementById('task-cam-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    canvas.style.display = 'block';

    const btnCapture = document.getElementById('btn-capture-task');
    const btnRetake = document.getElementById('btn-retake-task');
    const badge = document.getElementById('task-cam-badge');
    if (btnCapture) btnCapture.classList.add('hidden');
    if (btnRetake) btnRetake.classList.remove('hidden');
    if (badge) {
        badge.className = 'badge badge-success';
        badge.innerHTML = `<svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Live Photo Ready`;
    }
}

function stopTaskCameraStream() {
    if (taskVideoStream) {
        taskVideoStream.getTracks().forEach(t => t.stop());
        taskVideoStream = null;
    }
}

function stopTaskCamera(resetPhoto = false) {
    stopTaskCameraStream();
    const video = document.getElementById('task-webcam');
    const canvas = document.getElementById('task-snapshot');
    const placeholder = document.getElementById('task-cam-placeholder');
    const overlay = document.getElementById('task-camera-overlay');
    const btnStart = document.getElementById('btn-start-task-cam');
    const btnCapture = document.getElementById('btn-capture-task');
    const btnRetake = document.getElementById('btn-retake-task');
    const badge = document.getElementById('task-cam-badge');

    if (resetPhoto) {
        currentTaskPhotoData = null;
    }

    if (video) video.style.display = 'none';
    if (btnCapture) btnCapture.classList.add('hidden');

    if (currentTaskPhotoData && canvas) {
        canvas.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
        if (btnStart) btnStart.classList.add('hidden');
        if (btnRetake) btnRetake.classList.remove('hidden');
    } else {
        if (canvas) canvas.style.display = 'none';
        if (placeholder) {
            placeholder.style.display = 'block';
            placeholder.innerText = 'Camera off. Click "Open Live Camera" to capture task photo.';
        }
        if (overlay) overlay.style.display = 'none';
        if (btnStart) btnStart.classList.remove('hidden');
        if (btnRetake) btnRetake.classList.add('hidden');
        if (badge) {
            badge.className = 'badge badge-warning';
            badge.innerText = 'Camera Ready';
        }
    }
}

function getTodayIsoDate() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function calculateDtrHoursForDate(studentName, dateStr) {
    const targetDate = dateStr || getTodayIsoDate();
    const studentLogs = appState.logs.filter(l => l.student === studentName && l.date === targetDate);
    const attLogs = studentLogs.filter(l => l.kind === 'attendance');

    if (attLogs.length > 0) {
        const amIn = attLogs.find(l => getLogPunchType(l) === 'AM_IN');
        const amOut = attLogs.find(l => getLogPunchType(l) === 'AM_OUT');
        const pmIn = attLogs.find(l => getLogPunchType(l) === 'PM_IN');
        const pmOut = attLogs.find(l => getLogPunchType(l) === 'PM_OUT');

        let amHours = 0;
        let pmHours = 0;
        const slots = [];

        if (amOut) {
            amHours = Number(amOut.hours) > 0 ? Number(amOut.hours) : 4;
            slots.push(`AM: ${amIn ? amIn.checkInTime + '–' : ''}${amOut.checkInTime || '12:00 PM'} (${amHours}h)`);
        } else if (amIn) {
            amHours = 4;
            slots.push(`AM In: ${amIn.checkInTime || '08:00 AM'} (4h session)`);
        }

        if (pmOut) {
            pmHours = Number(pmOut.hours) > 0 ? Number(pmOut.hours) : 4;
            slots.push(`PM: ${pmIn ? pmIn.checkInTime + '–' : ''}${pmOut.checkInTime || '05:00 PM'} (${pmHours}h)`);
        } else if (pmIn) {
            pmHours = 4;
            slots.push(`PM In: ${pmIn.checkInTime || '01:00 PM'} (4h session)`);
        }

        const summedAttHours = attLogs.reduce((sum, l) => sum + (Number(l.hours) || 0), 0);
        const total = Math.max(amHours + pmHours, summedAttHours) || 4;
        const rounded = Math.round(total * 10) / 10;

        return {
            hours: rounded,
            badgeText: `DTR Verified • ${rounded} hrs`,
            badgeClass: 'badge badge-success',
            detailText: `Auto-calculated from Live Camera DTR on ${targetDate}: ${slots.join(' + ') || (rounded + ' hrs recorded')}.`
        };
    }

    // Check if there are already approved/recorded task logs on that date with DTR hours
    const existingTaskHours = studentLogs.reduce((sum, l) => sum + (Number(l.hours) || 0), 0);
    if (existingTaskHours > 0) {
        return {
            hours: existingTaskHours,
            badgeText: `DTR Log Synced • ${existingTaskHours} hrs`,
            badgeClass: 'badge badge-success',
            detailText: `Synced from recorded DTR schedule on ${targetDate} (${existingTaskHours} hrs rendered).`
        };
    }

    // Default to standard Official OJT DTR full-day schedule (AM 4 hrs + PM 4 hrs = 8 hrs)
    return {
        hours: 8,
        badgeText: 'OJT DTR • 8 hrs',
        badgeClass: 'badge badge-success',
        detailText: `Auto-calculated from standard Official OJT DTR shift (AM: 08:00–12:00 [4 hrs] + PM: 01:00–05:00 [4 hrs]).`
    };
}

function syncTaskHoursFromDTR() {
    const dateInput = document.getElementById('task-date');
    const hoursInput = document.getElementById('task-hours');
    const badgeEl = document.getElementById('task-dtr-calc-badge');
    const detailEl = document.getElementById('task-dtr-calc-detail');
    if (!dateInput || !hoursInput) return;

    if (!dateInput.value) {
        dateInput.value = getTodayIsoDate();
    }

    const studentName = appState.currentUser ? appState.currentUser.name : 'Student';
    const calc = calculateDtrHoursForDate(studentName, dateInput.value);

    hoursInput.value = calc.hours;
    if (badgeEl) {
        badgeEl.className = calc.badgeClass;
        badgeEl.innerText = calc.badgeText;
    }
    if (detailEl) {
        detailEl.innerText = calc.detailText;
    }
}

function submitDailyTask() {
    syncTaskHoursFromDTR();
    const date = document.getElementById('task-date').value;
    const hours = parseFloat(document.getElementById('task-hours').value) || 8;
    const title = document.getElementById('task-title').value.trim();
    const desc = document.getElementById('task-description').value.trim();
    if (!date || !title || !desc) return alert('Please fill in the date, task title, and daily accomplishment description.');
    if (!currentTaskPhotoData) {
        return alert('Please capture a live camera photo as evidence for your daily task before submitting.');
    }
    
    appState.logs.unshift({
        id: Date.now(),
        student: appState.currentUser.name,
        date,
        title,
        hours,
        description: desc,
        status: 'Pending Review',
        photo: currentTaskPhotoData
    });
    persistLogs();
    renderStudentDashboard();
    renderWeeklyLogList();
    renderNotifications();
    
    stopTaskCamera(true);

    alert(`Daily task submitted (${hours} hrs auto-calculated from DTR) with live camera evidence for Industry Supervisor endorsement and Coordinator review.`);
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    syncTaskHoursFromDTR();
}

function renderWeeklyLogList() {
    syncTaskHoursFromDTR();
    const list = document.getElementById('weekly-log-list');
    if (!list) return;

    const studentName = appState.currentUser ? appState.currentUser.name : 'Student';
    const logs = appState.logs.filter(log => log.student === studentName);
    const taskLogs = getStudentTaskLogsForNarrative();
    const countEl = document.getElementById('narrative-task-count');
    if (countEl) countEl.innerText = taskLogs.length;

    list.innerHTML = logs.length ? logs.map(log => `
        <div class="submission-item" style="display:flex; align-items:center; gap:12px;">
            ${log.photo ? `<div class="photo-thumbnail-wrap" onclick="viewEvidencePhoto(${log.id})" title="View photo" style="flex-shrink:0;"><img src="${log.photo}" class="photo-thumbnail" alt="Evidence"></div>` : ''}
            <div class="submission-meta" style="flex-grow:1;">
                <strong>${esc(log.title)}</strong>
                <span style="color: var(--text-muted); font-size: 0.85rem;">${esc(log.date)} • ${esc(log.hours)} hrs (DTR Calculated)</span>
                <span style="color: var(--text-muted); font-size: 0.8rem;">${esc(log.description)}</span>
            </div>
            <span class="badge badge-${log.status==='Approved'?'success':(log.status==='Rejected'?'danger':'warning')}">${esc(log.status)}</span>
        </div>
    `).join('') : '<div class="submission-item"><div class="submission-meta"><strong>No daily tasks submitted yet.</strong></div></div>';
}

/* ================= IN-SYSTEM OJT NARRATIVE REPORT & DAILY TASK LOG GENERATOR ================= */
function getStudentTaskLogsForNarrative(targetStudent) {
    const student = targetStudent || appState.currentUser;
    if (!student) return [];
    const allLogs = appState.logs.filter(l => l.student === student.name);
    const taskOnly = allLogs.filter(l => l.kind !== 'attendance');
    const source = taskOnly.length > 0 ? taskOnly : allLogs;
    return [...source].sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')));
}

function getDefaultNarrativeSections(student, taskLogs) {
    const name = student?.name || 'Student Intern';
    const program = student?.program || 'Bachelor Science in Computer Science';
    const collegeCode = student?.college || 'CITE';
    const collegeFull = getDepartmentName(collegeCode) || collegeCode;
    const company = student?.company && student.company !== 'Unassigned' ? student.company : 'TechNova Solutions';
    const role = student?.assignedRole || 'Intern Trainee';
    const totalHours = taskLogs.reduce((sum, l) => sum + (Number(l.hours) || 0), 0);
    const taskTitles = taskLogs.slice(0, 4).map(l => l.title).join('; ');

    const intro = `As part of the academic requirements for the degree of ${program} under the ${collegeFull} (${collegeCode}) at North Eastern Mindanao State University (NEMSU), I, ${name}, underwent my On-the-Job Training (OJT) as an ${role} at ${company}. This in-system Narrative Report compiles my daily task accomplishments, technical outputs, and real-time live camera verification records without requiring external word-processing formatting.`;

    const reflection = `Throughout my internship deployment at ${company} (${totalHours} total task hours logged across ${taskLogs.length} documented entries${taskTitles ? ', including ' + taskTitles : ''}), I strengthened my technical competencies, workplace professionalism, and collaborative problem-solving skills. Logging daily task accomplishments with real-time live camera evidence ensured transparency, accountability, and direct alignment between my ${program} coursework and industry standards.`;

    return { intro, reflection };
}

function getNarrativeStorageKey(targetStudent) {
    const student = targetStudent || appState.currentUser;
    const id = student ? student.id : 'guest';
    return `internms_narrative_${id}`;
}

function getSavedNarrativeSections(targetStudent) {
    const student = targetStudent || appState.currentUser || {};
    const taskLogs = getStudentTaskLogsForNarrative(student);
    const defaults = getDefaultNarrativeSections(student, taskLogs);
    try {
        const saved = JSON.parse(localStorage.getItem(getNarrativeStorageKey(student)) || 'null');
        if (saved && (saved.intro || saved.reflection)) {
            return {
                intro: saved.intro || defaults.intro,
                reflection: saved.reflection || defaults.reflection
            };
        }
    } catch {}
    return defaults;
}

function buildNarrativeReportHTML(targetStudent) {
    const student = targetStudent
        || (appState.currentUser && appState.currentUser.role === 'student' ? appState.currentUser : null)
        || usersDB.find(u => u.role === 'student')
        || {};
    const taskLogs = getStudentTaskLogsForNarrative(student);
    const sections = getSavedNarrativeSections(student);

    const collegeCode = (student.college || 'CITE').trim().toUpperCase();
    const collegeFull = getDepartmentName(collegeCode) || collegeCode;
    const program = student.program || 'Bachelor Science in Computer Science';
    const company = student.company && student.company !== 'Unassigned' ? student.company : 'TechNova Solutions';
    const assignedRole = student.assignedRole || 'Intern Trainee';
    const totalHours = taskLogs.reduce((sum, l) => sum + (Number(l.hours) || 0), 0);
    const approvedCount = taskLogs.filter(l => l.status === 'Approved').length;
    const generatedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const supUser = usersDB.find(u => u.role === 'supervisor');
    const supName = supUser ? supUser.name : 'Engr. Elena Rostova';

    const coordUser = usersDB.find(u => u.role === 'coordinator' && (u.college || '').trim().toUpperCase() === collegeCode)
        || usersDB.find(u => u.role === 'coordinator')
        || usersDB.find(u => u.role === 'admin');
    const coordName = coordUser ? coordUser.name : 'OJT Coordinator';

    const logsRowsHtml = taskLogs.length ? taskLogs.map((log, idx) => `
        <tr>
            <td style="text-align:center; width:14%; white-space:nowrap;"><strong>Day ${idx + 1}</strong><br>${esc(log.date)}</td>
            <td style="width:46%;">
                <strong>${esc(log.title)}</strong>
                <div style="margin-top:3px; color:#1f2937;">${esc(log.description)}</div>
            </td>
            <td style="text-align:center; width:12%; font-weight:bold;">${esc(log.hours)} hrs</td>
            <td style="text-align:center; width:14%;">${esc(log.status)}</td>
            <td style="text-align:center; width:14%;">
                ${log.photo ? `<img src="${log.photo}" alt="Task Proof" style="width:68px; height:50px; object-fit:cover; border:1px solid #475569; border-radius:3px;">` : '<span style="font-size:10px; color:#64748b;">Verified</span>'}
            </td>
        </tr>
    `).join('') : `
        <tr>
            <td colspan="5" style="text-align:center; padding:14px;">No daily task logs recorded yet. Submit a daily task in the portal to populate this table automatically.</td>
        </tr>
    `;

    const photosWithEvidence = taskLogs.filter(l => l.photo);
    const photoAppendixHtml = photosWithEvidence.length ? `
        <div class="narrative-sec-heading">IV. Photographic Documentation Appendix (Live Camera Task Evidence)</div>
        <div class="narrative-photo-grid">
            ${photosWithEvidence.map((log, idx) => `
                <div class="narrative-photo-item">
                    <img src="${log.photo}" alt="Figure ${idx + 1}">
                    <div class="narrative-photo-caption">
                        <strong>Figure ${idx + 1}: ${esc(log.title)}</strong><br>
                        <span>Captured via Live Camera (${esc(log.date)} • ${esc(log.hours)} hrs)</span>
                    </div>
                </div>
            `).join('')}
        </div>
    ` : '';

    return `
        <div class="narrative-doc-header">
            <div class="rep-country">Republic of the Philippines</div>
            <div class="rep-univ">North Eastern Mindanao State University</div>
            <div class="rep-campus">Tandag City, Surigao del Sur · Main Campus</div>
            <div class="rep-college">${esc(collegeFull)} (${esc(collegeCode)})</div>
            <div style="font-size:11.5px; margin-top:2px;">${esc(program)}</div>
            <div class="rep-title">On-the-Job Training (OJT) Daily Task Accomplishment &amp; Narrative Report</div>
        </div>

        <table class="narrative-meta-table">
            <tr>
                <td style="width:22%;"><strong>Student Intern:</strong></td>
                <td style="width:28%;">${esc(student.name || 'Student Intern')}</td>
                <td style="width:22%;"><strong>Student ID:</strong></td>
                <td style="width:28%;">${esc(student.id || '2023-0001')}</td>
            </tr>
            <tr>
                <td><strong>College &amp; Program:</strong></td>
                <td>${esc(collegeCode)} — ${esc(program)}</td>
                <td><strong>Host Training Enterprise:</strong></td>
                <td>${esc(company)}</td>
            </tr>
            <tr>
                <td><strong>Designated Role:</strong></td>
                <td>${esc(assignedRole)}</td>
                <td><strong>Total Task Hours:</strong></td>
                <td><strong>${totalHours} hrs</strong> (${taskLogs.length} entries, ${approvedCount} endorsed)</td>
            </tr>
            <tr>
                <td><strong>Academic Term:</strong></td>
                <td>A.Y. 2025–2026</td>
                <td><strong>Date Generated:</strong></td>
                <td>${esc(generatedDate)}</td>
            </tr>
        </table>

        <div class="narrative-sec-heading">I. Introduction &amp; Host Training Enterprise (HTE) Overview</div>
        <p class="narrative-paragraph">${esc(sections.intro)}</p>

        <div class="narrative-sec-heading">II. Chronological Daily Task Accomplishment &amp; Narrative Log</div>
        <table class="narrative-task-table">
            <thead>
                <tr>
                    <th>Date / Day</th>
                    <th>Daily Task Accomplishment &amp; Narrative Description</th>
                    <th>Hours</th>
                    <th>Status</th>
                    <th>Live Camera Proof</th>
                </tr>
            </thead>
            <tbody>
                ${logsRowsHtml}
            </tbody>
        </table>

        <div class="narrative-sec-heading">III. Key Learnings, Challenges &amp; Professional Reflections</div>
        <p class="narrative-paragraph">${esc(sections.reflection)}</p>

        ${photoAppendixHtml}

        <div class="narrative-signatories">
            <div class="narrative-sig-box">
                <div>Prepared &amp; Submitted by:</div>
                <div class="narrative-sig-line">${esc(student.name || 'Student Intern')}</div>
                <div>Student Intern (${esc(collegeCode)})</div>
            </div>
            <div class="narrative-sig-box">
                <div>Verified &amp; Endorsed by:</div>
                <div class="narrative-sig-line">${esc(supName)}</div>
                <div>HTE Industry Supervisor</div>
            </div>
            <div class="narrative-sig-box">
                <div>Noted &amp; Approved by:</div>
                <div class="narrative-sig-line">${esc(coordName)}</div>
                <div>OJT Coordinator (${esc(collegeCode)})</div>
            </div>
        </div>
    `;
}

function openNarrativeReportModal(studentId) {
    const modal = document.getElementById('narrative-report-modal');
    if (!modal) return;

    const student = (studentId ? usersDB.find(u => u.id === studentId && u.role === 'student') : null)
        || (appState.currentUser && appState.currentUser.role === 'student' ? appState.currentUser : null)
        || usersDB.find(u => u.role === 'student')
        || {};
    modal.dataset.studentId = student.id || '';

    const docBtn = document.getElementById('narrative-modal-doc-btn');
    if (docBtn) {
        const isCoord = appState.currentUser && (appState.currentUser.role === 'coordinator' || appState.currentUser.role === 'admin');
        docBtn.classList.toggle('hidden', !isCoord);
        docBtn.setAttribute('onclick', `exportNarrativeWordDoc('${esc(student.id || '')}')`);
    }

    const sections = getSavedNarrativeSections(student);
    const introEl = document.getElementById('narrative-intro-input');
    const refEl = document.getElementById('narrative-reflection-input');
    if (introEl) introEl.value = sections.intro;
    if (refEl) refEl.value = sections.reflection;

    const previewEl = document.getElementById('narrative-live-preview');
    if (previewEl) previewEl.innerHTML = buildNarrativeReportHTML(student);

    modal.classList.add('show');
}

function closeNarrativeReportModal() {
    const modal = document.getElementById('narrative-report-modal');
    if (modal) modal.classList.remove('show');
}

function saveCustomNarrativeAndRefresh() {
    const introEl = document.getElementById('narrative-intro-input');
    const refEl = document.getElementById('narrative-reflection-input');
    const payload = {
        intro: introEl ? introEl.value : '',
        reflection: refEl ? refEl.value : ''
    };
    localStorage.setItem(getNarrativeStorageKey(), JSON.stringify(payload));

    const previewEl = document.getElementById('narrative-live-preview');
    if (previewEl) previewEl.innerHTML = buildNarrativeReportHTML();
}

function resetNarrativeToAuto() {
    localStorage.removeItem(getNarrativeStorageKey());
    const sections = getSavedNarrativeSections();
    const introEl = document.getElementById('narrative-intro-input');
    const refEl = document.getElementById('narrative-reflection-input');
    if (introEl) introEl.value = sections.intro;
    if (refEl) refEl.value = sections.reflection;

    const previewEl = document.getElementById('narrative-live-preview');
    if (previewEl) previewEl.innerHTML = buildNarrativeReportHTML();
}

function printNarrativeReport() {
    const printContainer = document.getElementById('print-narrative-container');
    if (!printContainer) return;
    printContainer.innerHTML = buildNarrativeReportHTML();
    document.body.classList.remove('print-mode-evaluation');
    document.body.classList.add('print-mode-narrative');
    window.print();
}

function exportNarrativeWordDoc(studentId) {
    const currentRole = appState.currentUser ? appState.currentUser.role : '';
    if (currentRole !== 'coordinator' && currentRole !== 'admin') {
        alert('Downloading editable .DOC Narrative Report files is restricted strictly to OJT Coordinators. Student interns may use Print Narrative Report.');
        return;
    }

    const modalStudentId = document.getElementById('narrative-report-modal')?.dataset?.studentId || '';
    const resolvedId = studentId || modalStudentId;
    const student = (resolvedId ? usersDB.find(u => u.id === resolvedId && u.role === 'student') : null)
        || usersDB.find(u => u.role === 'student' && (!appState.currentUser?.college || u.college === appState.currentUser.college))
        || usersDB.find(u => u.role === 'student')
        || {};
    const reportHtml = buildNarrativeReportHTML(student);
    const cleanName = (student.name || 'Student_Intern').replace(/[^a-zA-Z0-9]+/g, '_');
    const docContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="utf-8">
            <title>OJT Narrative Report - ${esc(student.name || 'Intern')}</title>
            <style>
                body { font-family: 'Times New Roman', Times, serif; color: #000; line-height: 1.45; font-size: 12pt; padding: 20px; }
                .narrative-doc-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 16px; }
                .rep-country { font-size: 10pt; text-transform: uppercase; }
                .rep-univ { font-size: 14pt; font-weight: bold; text-transform: uppercase; }
                .rep-campus { font-size: 10.5pt; font-style: italic; }
                .rep-college { font-size: 11.5pt; font-weight: bold; margin-top: 4px; }
                .rep-title { font-size: 13pt; font-weight: bold; text-decoration: underline; margin-top: 10px; text-transform: uppercase; }
                .narrative-meta-table, .narrative-task-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10.5pt; }
                .narrative-meta-table td, .narrative-task-table th, .narrative-task-table td { border: 1px solid #000; padding: 6px 8px; vertical-align: top; }
                .narrative-task-table th { background: #f1f5f9; font-weight: bold; text-align: center; }
                .narrative-sec-heading { font-size: 11.5pt; font-weight: bold; text-transform: uppercase; margin: 14px 0 6px; border-bottom: 1px solid #000; }
                .narrative-paragraph { text-align: justify; text-indent: 24px; margin: 0 0 10px; font-size: 11pt; }
                .narrative-photo-grid { width: 100%; margin-top: 10px; }
                .narrative-photo-item { border: 1px solid #666; padding: 8px; margin-bottom: 10px; text-align: center; }
                .narrative-signatories { width: 100%; margin-top: 30px; text-align: center; }
                .narrative-sig-box { margin-bottom: 20px; }
                .narrative-sig-line { border-bottom: 1px solid #000; width: 220px; margin: 24px auto 4px; font-weight: bold; text-transform: uppercase; }
            </style>
        </head>
        <body>
            ${reportHtml}
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OJT_Narrative_Report_${cleanName}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function confirmPlacementMatch(title, company) {
    if (!appState.currentUser) return;
    const cleanCompany = company.split('·')[0].trim();
    appState.currentUser.company = cleanCompany;
    appState.currentUser.assignedRole = title;

    const userInDb = usersDB.find(u => u.id === appState.currentUser.id);
    if (userInDb) {
        userInDb.company = cleanCompany;
        userInDb.assignedRole = title;
    }

    persistUsers();
    if (document.getElementById('dash-company')) {
        document.getElementById('dash-company').innerText = cleanCompany;
    }
    alert(`Official HTE Placement Selected!\n\nInternship Role: ${title}\nHost Training Enterprise: ${cleanCompany}\n\nYour profile has been synchronized with this Host Training Enterprise.`);
    renderStudentPlacements();
    renderStudentDashboard();
}

function getRecIcon(type) {
    const s = 'width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    switch (type) {
        case 'code':
            return `<svg ${s}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
        case 'data':
            return `<svg ${s}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`;
        case 'system':
            return `<svg ${s}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
        case 'hotel':
            return `<svg ${s}><path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M9 3h6v4H9z"></path></svg>`;
        case 'business':
            return `<svg ${s}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;
        case 'finance':
            return `<svg ${s}><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"></path></svg>`;
        case 'civil':
            return `<svg ${s}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`;
        case 'electric':
            return `<svg ${s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
        case 'mechanical':
            return `<svg ${s}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
        case 'education':
            return `<svg ${s}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`;
        case 'bio':
            return `<svg ${s}><path d="M10 2v7.31L4.69 19.1A2 2 0 0 0 6.42 22h11.16a2 2 0 0 0 1.73-2.9L14 9.31V2"></path><line x1="8.5" y1="2" x2="15.5" y2="2"></line><line x1="7" y1="16" x2="17" y2="16"></line></svg>`;
        case 'english':
            return `<svg ${s}><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`;
        case 'polsci':
            return `<svg ${s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
        case 'math':
            return `<svg ${s}><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8M12 8v8"></path></svg>`;
        case 'econ':
            return `<svg ${s}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`;
        case 'midwife':
            return `<svg ${s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><path d="M12 9v6M9 12h6"></path></svg>`;
        case 'enviro':
            return `<svg ${s}><path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7z"></path><path d="M11 20V10"></path></svg>`;
        case 'sports':
            return `<svg ${s}><circle cx="12" cy="12" r="10"></circle><path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24"></path></svg>`;
        case 'child':
            return `<svg ${s}><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`;
        case 'marketing':
            return `<svg ${s}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
        case 'hr':
            return `<svg ${s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
        case 'admin':
            return `<svg ${s}><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"></path></svg>`;
        case 'filipino':
            return `<svg ${s}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><path d="M9 7h6M9 11h4"></path></svg>`;
        case 'science':
            return `<svg ${s}><circle cx="12" cy="12" r="2"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM4.93 4.93C7.5 7.5 9 10 12 12c3 2 4.5 4.5 7.07 7.07"></path></svg>`;
        case 'social':
            return `<svg ${s}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
        default:
            return `<svg ${s}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>`;
    }
}

function getStudentPlacementRecommendations(student) {
    const rawProg = (student?.program || '').trim();
    const rawCollege = (student?.college || '').trim().toUpperCase();
    const p = rawProg.toLowerCase();

    // =========================================================================
    // 1. COLLEGE OF TEACHER EDUCATION (CTE) - 8 PROGRAMS
    // =========================================================================
    if (p.includes('early childhood') || p.includes('childhood') || p.includes('beced')) {
        return [
            {
                rank: 1,
                title: "Early Childhood Teacher Trainee",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('child'),
                company: "Provincial Reading & Early Childhood Center · Partner Agency",
                why: "Specialized training in early cognitive development, play-based learning pedagogies, fine motor activity facilitation, and positive child guidance.",
                matchingSkills: ["Play-Based Pedagogy", "Child Development Assessment", "Sensory Activity Design", "Positive Guidance"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Kindergarten Curriculum & Learning Materials Specialist",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('education'),
                company: "DepEd Surigao Division Elementary Training Schools · Partner Schools",
                why: "Excellent competencies in developing manipulative learning aids, phonics games, and creative storytelling for early childhood learners.",
                matchingSkills: ["Manipulative Learning Aids", "Storytelling Pedagogy", "Kindergarten Syllabus"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Child Behavior & Early Intervention Assistant",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('child'),
                company: "NEMSU Laboratory High School · Child Learning Wing",
                why: "Solid understanding of early childhood psychology, developmental milestones, and social-emotional behavior reinforcement.",
                matchingSkills: ["Observation Anecdotal Records", "Behavioral Reinforcement", "Parent-Teacher Communication"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Inclusive Early Learning Facilitator",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('child'),
                company: "Surigao Center for Language & Cultural Pedagogy · Early Learning Desk",
                why: "Competence in early literacy scaffolds and multicultural mother-tongue games for diverse pre-school communities.",
                matchingSkills: ["Inclusive Learning", "Early Literacy", "Puppetry & Storytelling"],
                skillsGap: "formal developmental delay diagnostic screening"
            },
            {
                rank: 5,
                title: "Child Development Media & Storytelling Associate",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('education'),
                company: "NEMSU Learning Resource & EdTech Center · Media Wing",
                why: "Strong creative visualization and children's storybook authoring; profile would benefit from more digital audio-visual animation hours.",
                matchingSkills: ["Visual Learning Aids", "Children's Literature"],
                skillsGap: "digital 2D animation tools for children's learning"
            }
        ];
    } else if (p.includes('elementary') || p.includes('beed')) {
        return [
            {
                rank: 1,
                title: "Elementary Grade Teacher Trainee",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('education'),
                company: "DepEd Surigao Division Elementary Training Schools · Partner Schools",
                why: "Specialized training in elementary pedagogy across foundational subjects, mother tongue-based multilingual education (MTB-MLE), and classroom management.",
                matchingSkills: ["Elementary Lesson Planning", "MTB-MLE Pedagogy", "Formative Assessment", "Classroom Discipline"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Primary Reading Literacy & Numeracy Specialist",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('education'),
                company: "Provincial Reading & Early Childhood Center · Partner Agency",
                why: "Outstanding competencies in remedial reading techniques, experiential math games, and visual instructional charts.",
                matchingSkills: ["Remedial Reading", "Experiential Numeracy", "Differentiated Instruction"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Multi-Grade Instructional Materials Developer",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('education'),
                company: "NEMSU Laboratory High School · Learning Resource Wing",
                why: "Strong instructional materials creation, graphic chart formulation, and assessment table of specifications (TOS).",
                matchingSkills: ["Instructional Media", "Worksheet Authoring", "TOS Design"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "MTB-MLE Mother Tongue Pedagogy Associate",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('filipino'),
                company: "Surigao Center for Language & Cultural Pedagogy · Elementary Language Wing",
                why: "Demonstrated skills in regional Surigaonon and Sinugbuanong Binisaya contextualized lesson adaptations.",
                matchingSkills: ["Contextualized Pedagogy", "Mother Tongue Translation", "Oral Fluency Scaffolding"],
                skillsGap: "remote multi-grade classroom scheduling"
            },
            {
                rank: 5,
                title: "Experiential STEM & Elementary Math Activity Facilitator",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('math'),
                company: "Caraga Regional STEM Teacher Training Center · Elementary Division",
                why: "Enthusiastic hands-on math manipulatives instructor; profile has less direct experience configuring digital interactive math games.",
                matchingSkills: ["Math Manipulatives", "Experiential Exercises"],
                skillsGap: "digital gamified learning software"
            }
        ];
    } else if (p.includes('physical education') || p.includes('bped') || p.includes('sports')) {
        return [
            {
                rank: 1,
                title: "Physical Education Teacher & Sports Coach Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('sports'),
                company: "NEMSU Laboratory High School · Basic Education Department",
                why: "Comprehensive training in motor learning, biomechanics, physical fitness conditioning, team sports officiating, and health education pedagogy.",
                matchingSkills: ["PE Curriculum Delivery", "Fitness Assessment (PFT)", "Sports Officiating & Coaching", "First Aid & CPR"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Athletics Program Coordinator & Intramural Organizer",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('sports'),
                company: "DepEd Surigao Division Elementary Training Schools · Sports Division",
                why: "Proven ability to organize sports tournament brackets, school intramural events, cheer dance choreography, and athlete nutrition guidance.",
                matchingSkills: ["Tournament Bracket Scheduling", "Intramural Organizing", "Conditioning Drills"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Tournament Officiating & Sports Clinic Facilitator",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('sports'),
                company: "Provincial Sports Academy & Recreation Complex · Athletics Wing",
                why: "Advanced mastery in referee signaling, sports physiology, athletic injury management, and tactical drills.",
                matchingSkills: ["Referee Officiating", "Sports Conditioning", "Injury Management"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Community Wellness & Youth Fitness Facilitator",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('sports'),
                company: "Provincial Tourism & Hospitality Center · Recreation Wing",
                why: "Strong leadership in group aerobic conditioning, recreational sports tournaments, and community health lifestyle seminars.",
                matchingSkills: ["Aerobic Group Leadership", "Recreational Tournament Hosting"],
                skillsGap: "Adaptive Physical Education (APE) for special needs"
            },
            {
                rank: 5,
                title: "Motor Skills Assessment & Adaptive PE Specialist",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('sports'),
                company: "Provincial Reading & Early Childhood Center · Motor Development Desk",
                why: "Sound foundation in child motor coordination; requires practical observation hours in specialized para-athletic training.",
                matchingSkills: ["Motor Coordination Tests", "Playground Safety"],
                skillsGap: "para-athletic sports officiating rules"
            }
        ];
    } else if (p.includes('secondary') && (p.includes('social studies') || p.includes('social'))) {
        return [
            {
                rank: 1,
                title: "Secondary Araling Panlipunan Teacher Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('social'),
                company: "NEMSU Laboratory High School · Basic Education Department",
                why: "Rigorous preparation in Philippine History, Asian Studies, World History, Economics, and contemporary socio-political issue debate facilitation.",
                matchingSkills: ["Araling Panlipunan Lesson Planning", "Historical Analysis Pedagogy", "Socratic Method Debates", "Contemporary Issues Curation"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Civic Education & Youth Governance Facilitator",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('social'),
                company: "DepEd Surigao Division Elementary Training Schools · High School Unit",
                why: "Specialized competence in Supreme Secondary Learner Government (SSLG) leadership training, civic literacy, and community history archiving.",
                matchingSkills: ["Civic Leadership Coaching", "Local Oral History Research", "Mock Sessions (Model UN/Congress)"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Historical Archive & Museum Education Assistant",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('admin'),
                company: "NEMSU Cultural & Language Heritage Center · History Wing",
                why: "Deep passion for cultural heritage preservation, historical primary source indexing, and student museum tour facilitation.",
                matchingSkills: ["Historical Document Indexing", "Museum Tour Scripting", "Primary Source Analysis"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Model UN & Mock Legislative Assembly Coach",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('social'),
                company: "Surigao Center for Language & Cultural Pedagogy · Social Studies Wing",
                why: "Excellent parliamentary procedure coaching and global affairs position paper drafting for high school students.",
                matchingSkills: ["Parliamentary Procedure", "Debate Adjudication", "Global Affairs Mapping"],
                skillsGap: "historical artifact chemical conservation methods"
            },
            {
                rank: 5,
                title: "Local Oral History & Cultural Pedagogy Researcher",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('social'),
                company: "Provincial Department of Public Administration & Legal Affairs · Heritage Desk",
                why: "Solid understanding of regional governance history; profile has limited direct exposure to municipal cultural mapping registry software.",
                matchingSkills: ["Oral History Interviewing", "Barangay Heritage Profiling"],
                skillsGap: "Philippine Registry of Cultural Property (PRECUP) data entry"
            }
        ];
    } else if (p.includes('secondary') && p.includes('english')) {
        return [
            {
                rank: 1,
                title: "Secondary English Subject Teacher Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('english'),
                company: "NEMSU Laboratory High School · Basic Education Department",
                why: "Rigorous preparation in secondary literature pedagogy, grammar instruction, communicative language teaching (CLT), and DepEd curriculum alignment.",
                matchingSkills: ["English Lesson Planning", "Grammar Pedagogy", "Literary Analysis Teaching", "Table of Specifications (TOS)"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Secondary Reading Remediation & Debate Coach Trainee",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('education'),
                company: "DepEd Surigao Division Elementary Training Schools · High School Unit",
                why: "Demonstrated skills in speech training, academic writing coaching, and high school journalism advisory.",
                matchingSkills: ["Speech & Debate Coaching", "School Journalism Advisory", "Rubrics Formulation"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Instructional Media & EdTech English Specialist",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('english'),
                company: "NEMSU Learning Resource & EdTech Center · English Pedagogy Wing",
                why: "Strong content authoring in digital interactive reading comprehension modules and language assessment rubrics.",
                matchingSkills: ["E-Learning Modules", "Reading Worksheets", "Grammar Diagnostic Tests"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Secondary Campus Journalism & Creative Writing Mentor",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('english'),
                company: "Surigao Center for Language & Cultural Pedagogy · Journalism Division",
                why: "Outstanding editorial writing and feature story mentoring for student publications; profile needs additional layout design software practice.",
                matchingSkills: ["Journalism Mentoring", "Copy Editing", "Feature Writing"],
                skillsGap: "Adobe InDesign / desktop publishing software"
            },
            {
                rank: 5,
                title: "Digital E-Learning Content Author for English Pedagogy",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('english'),
                company: "Agusan Digital Media Hub · Education Systems Wing",
                why: "Good grammar instructional scripts; profile has less hands-on experience setting up SCORM packages for Moodle/Canvas LMS.",
                matchingSkills: ["Instructional Scriptwriting", "Educational Media"],
                skillsGap: "Moodle/Canvas SCORM package integration"
            }
        ];
    } else if (p.includes('secondary') && p.includes('filipino')) {
        return [
            {
                rank: 1,
                title: "Guro sa Filipino (Sekondarya) Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('filipino'),
                company: "NEMSU Laboratory High School · Basic Education Department",
                why: "Masusing pagsasanay sa pagtuturo ng panitikan (Ibong Adarna, Florante at Laura, Noli Me Tangere, El Filibusterismo), gramatika, at pagbuo ng banghay-aralin.",
                matchingSkills: ["Banghay-Aralin sa Filipino", "Pagtuturo ng Panitikan", "Pagsusulit at TOS", "Pamamahala sa Silid-Aralan"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Tagapagsanay sa Pamamahayag at Malikhaing Pagsulat",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('filipino'),
                company: "DepEd Surigao Division Elementary Training Schools · High School Unit",
                why: "Kakayahan sa pagsasanay sa pampaaralang pamamahayag sa Filipino, patimpalak sa pagbigkas, at balagtasan.",
                matchingSkills: ["Pampaaralang Pamamahayag", "Malikhaing Pagbigkas", "Pagsulat ng Sanaysay"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Katuwang sa Pagpapaunlad ng Kagamitang Pampagtuturo",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('education'),
                company: "NEMSU Learning Resource & EdTech Center · Filipino Pedagogy Wing",
                why: "Mahusay sa pagsusuri ng tekstong pampanitikan, paggawa ng modyul, at paghahanda ng rubrik sa pagtatasa.",
                matchingSkills: ["Modyul sa Filipino", "Pagsusuri ng Akda", "Paggawa ng Rubriks"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Tagasanay sa Pampaaralang Balagtasan at Dulaang Panradyo",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('filipino'),
                company: "Surigao Center for Language & Cultural Pedagogy · Cultural Performing Wing",
                why: "Kahusayan sa pagdidirehe ng sabayang pagbigkas, dulaang pampaaralan, at talumpati; kailangan pa ng kasanayan sa digital audio workstation (DAW).",
                matchingSkills: ["Direksyon sa Dula", "Sabayang Pagbigkas", "Pagtatalumpati"],
                skillsGap: "digital audio editing para sa radio broadcasting"
            },
            {
                rank: 5,
                title: "Mananaliksik sa Pagtuturo ng Panitikang Rehiyonal",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('filipino'),
                company: "NEMSU Cultural & Language Heritage Center · Education Desk",
                why: "Masusing pag-aaral sa lokal na panitikan sa Surigao at Mindanao; profile ay nangangailangan ng dagdag na karanasan sa pag-akda ng e-book.",
                matchingSkills: ["Panitikang Rehiyonal", "Pagsasalin"],
                skillsGap: "e-pub at digital interactive publishing tools"
            }
        ];
    } else if (p.includes('secondary') && (p.includes('math') || p.includes('mathematics'))) {
        return [
            {
                rank: 1,
                title: "Secondary Mathematics Teacher Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('math'),
                company: "NEMSU Laboratory High School · Basic Education Department",
                why: "Specialized training in secondary algebra, geometry, trigonometry, and calculus pedagogy with focus on problem-solving strategies and conceptual scaffolding.",
                matchingSkills: ["Math Lesson Planning", "Geometric Proof Scaffolding", "Algebraic Problem Solving", "Diagnostic Math Assessments"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Math Olympiad Coach & Remedial Numeracy Specialist",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('education'),
                company: "DepEd Surigao Division Elementary Training Schools · High School Unit",
                why: "Demonstrated competence in coaching competitive math contests, math club activities, and student numeracy interventions.",
                matchingSkills: ["Math Contest Coaching", "Remedial Numeracy", "Interactive Math Tools (GeoGebra)"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Secondary Mathematics GeoGebra & EdTech Modeler",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('math'),
                company: "Caraga Regional STEM Teacher Training Center · Math Pedagogy Wing",
                why: "Strong competence in interactive dynamic geometry software, 3D graphing simulations, and digital math lesson applets.",
                matchingSkills: ["GeoGebra Modeling", "Dynamic Graphing", "Interactive Math Applets"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Educational Measurement & Test Item Psychometrician Trainee",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('data'),
                company: "Regional Data & Actuarial Analytics Bureau · Education Metrics Unit",
                why: "Strong statistical skills applied to high school test validation, reliability indices, and item difficulty discrimination metrics.",
                matchingSkills: ["Test Item Analysis", "Spreadsheet Calculations", "Reliability Scoring"],
                skillsGap: "psychometric item response theory software"
            },
            {
                rank: 5,
                title: "High School Mathematics Learning Module Author",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('math'),
                company: "NEMSU Learning Resource & EdTech Center · STEM Wing",
                why: "Competence in self-learning module (SLM) creation; profile would benefit from LaTeX typesetting proficiency for math equations.",
                matchingSkills: ["Self-Learning Modules", "Problem Set Authoring"],
                skillsGap: "advanced LaTeX mathematical document compilation"
            }
        ];
    } else if (p.includes('secondary') && p.includes('science')) {
        return [
            {
                rank: 1,
                title: "Secondary General Science & Laboratory Teacher Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('science'),
                company: "NEMSU Laboratory High School · Basic Education Department",
                why: "Thorough grounding in inquiry-based science teaching across biology, chemistry, physics, and earth science, including laboratory safety and experiments.",
                matchingSkills: ["Inquiry-Based Science Teaching", "Science Lab Demonstrations", "Laboratory Safety Protocols", "Investigatory Project Mentoring"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Science Investigatory Project (SIP) Mentor Trainee",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('science'),
                company: "DepEd Surigao Division Elementary Training Schools · High School Unit",
                why: "Exceptional capabilities in guiding high school students in STEM science fair exhibits, research hypothesis testing, and scientific writeups.",
                matchingSkills: ["SIP Research Mentoring", "Experimental Design", "Science Exhibit Curation"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Hands-On STEM Experiment & Lab Safety Facilitator",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('science'),
                company: "Caraga Regional STEM Teacher Training Center · Science Pedagogy Wing",
                why: "Deep understanding of high school chemistry and physics bench experiments, Bunsen burner safety, and stoichiometry demonstrations.",
                matchingSkills: ["Chemistry Demonstrations", "Physics Lab Apparatus", "Lab Safety Enforcement"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Science Laboratory Equipment & Specimen Technician",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('bio'),
                company: "Caraga Regional Science & Environmental Research Lab · Education Wing",
                why: "Good understanding of standard laboratory chemicals and microscopes; profile requires further practice managing hazardous chemical waste containment storage.",
                matchingSkills: ["Microscope Maintenance", "Chemical Inventory", "Specimen Slide Preparation"],
                skillsGap: "hazardous chemical waste containment & disposal protocols"
            },
            {
                rank: 5,
                title: "Interactive Science Simulation & Digital Lab Developer",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('science'),
                company: "NEMSU Learning Resource & EdTech Center · Digital Science Wing",
                why: "Enthusiastic developer of virtual PhET-style lab exercises; profile needs further experience writing customized JavaScript interactive simulations.",
                matchingSkills: ["PhET Science Simulations", "Virtual Lab Worksheets"],
                skillsGap: "custom HTML5/Canvas interactive physics simulation scripting"
            }
        ];
    }

    // =========================================================================
    // 2. COLLEGE OF ARTS AND SCIENCE (CAS) - 8 PROGRAMS
    // =========================================================================
    else if (p.includes('economic') || p.includes('econ')) {
        return [
            {
                rank: 1,
                title: "Economic Policy & Market Analyst Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('econ'),
                company: "Regional Data & Actuarial Analytics Bureau · Partner Bureau",
                why: "Coursework in micro/macroeconomics, econometric modeling, market forecasting, and fiscal trends matches regional economic intelligence operations.",
                matchingSkills: ["Econometrics", "Quantitative Data Analysis", "Market Research", "Policy Briefing"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Financial Market & Investment Trainee",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('finance'),
                company: "Surigao Metro Business Hub & Audit Co. · Partner Firm",
                why: "Solid understanding of monetary policy, capital flows, and pricing elasticity applicable to corporate revenue forecasting.",
                matchingSkills: ["Cost-Benefit Modeling", "Financial Analysis", "Forecasting"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Socio-Economic Development Assistant",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('admin'),
                company: "Provincial Department of Public Administration & Legal Affairs · Planning Desk",
                why: "Grasp of regional demographic and welfare metrics, poverty threshold indicators, and municipal development index calculations.",
                matchingSkills: ["Demographic Analysis", "Development Indices", "Survey Sampling"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Agricultural & Environmental Economic Research Trainee",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('enviro'),
                company: "Provincial Environment & Natural Resources Office · Resource Economics Unit",
                why: "Sound grasp of agricultural value-chains, resource pricing, and commodity market fluctuations across the Caraga region.",
                matchingSkills: ["Value-Chain Analysis", "Resource Pricing", "Commodity Metrics"],
                skillsGap: "CLUP GIS spatial economic mapping"
            },
            {
                rank: 5,
                title: "Enterprise Feasibility & Cost-Benefit Modeling Intern",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('finance'),
                company: "NEMSU Center for Accounting & Business Development · Research Wing",
                why: "Competence in capital expenditure NPV/IRR evaluations; profile has less direct exposure to industrial tariff regulatory filings.",
                matchingSkills: ["NPV / IRR Financial Modeling", "Cost-Benefit Matrices"],
                skillsGap: "statutory tariff & trade filing procedures"
            }
        ];
    } else if (p.includes('sining') || (p.includes('filipino') && !p.includes('secondary'))) {
        return [
            {
                rank: 1,
                title: "Cultural Research & Translation Specialist Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('filipino'),
                company: "NEMSU Cultural & Language Heritage Center · Institutional Partner",
                why: "Malalimang kasanayan sa linggwistika, pagsasaling-wika (English-Filipino), pananaliksik pangkultura, at pagpapaunlad ng wikang pambansa sa mga opisyal na dokumento.",
                matchingSkills: ["Pagsasaling-wika", "Pananaliksik Pangkultura", "Gramatika at Sintaks", "Editing at Proofreading"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Filipino Content Development & Media Associate",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('english'),
                company: "Agusan Digital Media Hub · Partner Enterprise",
                why: "Kahusayan sa paglikha ng lokal na nilalaman, malikhaing pagsulat, iskrip, at pagpapalaganap ng impormasyon sa pamayanan.",
                matchingSkills: ["Malikhaing Pagsulat", "Lokal na Kampanya", "Pampublikong Impormasyon"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Tagapamahala ng Pampublikong Komunikasyon at Leksikograpiya",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('admin'),
                company: "Provincial Department of Public Administration & Legal Affairs · Cultural Desk",
                why: "Kahusayan sa opisyal na korespondensya alinsunod sa KWF at pagtitipon ng mga katutubong salita at leksikon sa Caraga.",
                matchingSkills: ["Opisyal na Korespondensya", "Etnolohiya", "Leksikograpiya"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Dokumentasyon ng Katutubong Kultura at Panitikang Bayan",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('filipino'),
                company: "Provincial Tourism & Hospitality Center · Heritage Unit",
                why: "Kasanayan sa pakikipanayam sa mga katutubong pamayanan at pagrerekord ng mga kuwentong-bayan at epiko.",
                matchingSkills: ["Etnikong Dokumentasyon", "Pakikipanayam sa Pamayanan"],
                skillsGap: "pagsasalin ng mga teknikal na legal na batas at ordenansa"
            },
            {
                rank: 5,
                title: "Mananaliksik sa Araling Filipino at Sosyolinggwistika",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('filipino'),
                company: "Caraga Regional Science & Environmental Research Lab · Social Science Desk",
                why: "Mahusay sa pagsusuri ng gamit ng wika sa agham at teknolohiya; kailangan pa ng kasanayan sa computer-assisted translation (CAT) software.",
                matchingSkills: ["Sosyolinggwistika", "Teknikal na Filipino"],
                skillsGap: "Computer-Assisted Translation (CAT) software tools"
            }
        ];
    } else if (p.includes('english language') || (p.includes('english') && !p.includes('secondary'))) {
        return [
            {
                rank: 1,
                title: "Corporate Communications & Editorial Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('english'),
                company: "Agusan Digital Media Hub · Partner Enterprise",
                why: "Expertise in advanced English syntax, stylistic editing, rhetorical analysis, and institutional publishing standards.",
                matchingSkills: ["Copywriting & Editing", "Content Strategy", "Press Releases", "Corporate Communications"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Technical Writing & Software Documentation Specialist",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('english'),
                company: "TechNova Solutions · Partner Enterprise",
                why: "Exceptional ability to translate complex software engineering workflows and developer APIs into clean user documentation.",
                matchingSkills: ["Technical Writing", "API Documentation", "Style Guide Adherence"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Public Relations & Media Liaison Intern",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('admin'),
                company: "Provincial Department of Public Administration & Legal Affairs · Media Desk",
                why: "Articulate interpersonal communication, official press statement authoring, and government agency communications.",
                matchingSkills: ["Speechwriting", "Media Monitoring", "Press Statements"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "English Language Content & Translation Associate",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('english'),
                company: "NEMSU Cultural & Language Heritage Center · Language Wing",
                why: "Proficient in cross-linguistic textual adaptation, academic proofreading, and corpus linguistic indexing.",
                matchingSkills: ["Academic Editing", "Corpus Linguistics", "Substantive Proofreading"],
                skillsGap: "live crisis broadcast press conference moderation"
            },
            {
                rank: 5,
                title: "Corporate Speechwriting & Institutional Publication Assistant",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('english'),
                company: "Surigao Metro Business Hub & Audit Co. · Editorial Desk",
                why: "Strong persuasive writing for corporate reports; profile has limited direct exposure to SEC annual corporate disclosure filings.",
                matchingSkills: ["Corporate Ghostwriting", "Executive Summaries"],
                skillsGap: "SEC corporate disclosure formatting guidelines"
            }
        ];
    } else if (p.includes('political') || p.includes('polsci')) {
        return [
            {
                rank: 1,
                title: "Public Policy & Legislative Research Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('polsci'),
                company: "Provincial Department of Public Administration & Legal Affairs · Partner Agency",
                why: "Academic training in Philippine constitutional law, legislative drafting, jurisprudence analysis, and public governance.",
                matchingSkills: ["Legal Case Analysis", "Policy Brief Drafting", "Administrative Law", "Stakeholder Consultation"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Community Governance & LGU Liaison Officer",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('polsci'),
                company: "Provincial Environment & Natural Resources Office · Community Desk",
                why: "Strong analytical background in Local Government Code implementation, barangay empowerment initiatives, and civic engagement.",
                matchingSkills: ["Governance Analysis", "Community Profiling", "Civic Consultation"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Diplomatic Affairs & Inter-Agency Protocol Intern",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('admin'),
                company: "Regional Data & Actuarial Analytics Bureau · Liaison Unit",
                why: "Good understanding of international treaties, inter-agency protocols, and public sector governance analytics.",
                matchingSkills: ["Inter-Agency Protocols", "Comparative Politics", "Policy Evaluation"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Legal Research & Court Administration Assistant",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('polsci'),
                company: "Surigao Metro Business Hub & Audit Co. · Legal Services Desk",
                why: "Solid understanding of statutory interpretation and compliance audits for corporate and non-profit entities.",
                matchingSkills: ["Statutory Interpretation", "Compliance Auditing", "Legal Briefs"],
                skillsGap: "multilateral donor grant proposal writing"
            },
            {
                rank: 5,
                title: "Civic Engagement & Voter Education Facilitator",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('polsci'),
                company: "NEMSU Cultural & Language Heritage Center · Civic Studies Unit",
                why: "Passionate civic education organizer; profile requires further practical hours facilitating televised municipal town halls.",
                matchingSkills: ["Civic Literacy", "Public Policy Forums"],
                skillsGap: "public broadcast town hall facilitation"
            }
        ];
    } else if (p.includes('environmental') || p.includes('enviro')) {
        return [
            {
                rank: 1,
                title: "Environmental Impact Assessment & Ecology Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('enviro'),
                company: "Provincial Environment & Natural Resources Office · Partner Agency",
                why: "Comprehensive training in environmental compliance (ECC/EIS), air/water quality monitoring, watershed conservation, and GIS terrain mapping.",
                matchingSkills: ["Environmental Impact Assessment", "Water Quality Testing", "GIS Mapping", "Pollution Control"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Environmental Chemistry & Pollution Testing Trainee",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('bio'),
                company: "Caraga Regional Science & Environmental Research Lab · Partner Lab",
                why: "Competence in heavy metal chemical assays, soil contamination testing, and biological oxygen demand (BOD) incubation analysis.",
                matchingSkills: ["BOD/COD Testing", "Soil Chemistry", "Laboratory Safety"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Disaster Risk Reduction & Climate Resilience Intern",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('admin'),
                company: "Provincial Engineering & Infrastructure Office · Resilience Desk",
                why: "Strong understanding of climate change models, flood susceptibility modeling, and community vulnerability assessments.",
                matchingSkills: ["Hazard Mapping", "Climate Vulnerability Analysis", "Hydrologic Modeling"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Coastal & Watershed Conservation Officer Trainee",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('enviro'),
                company: "Provincial Ecological Conservation & Marine Sanctuary · Watershed Unit",
                why: "Field competence in mangrove reforestation monitoring, riparian buffer assessments, and community forest management.",
                matchingSkills: ["Mangrove Ecology", "Riparian Sampling", "Community Forestry"],
                skillsGap: "drone LiDAR survey data post-processing"
            },
            {
                rank: 5,
                title: "Environmental Data GIS Mapping & Remote Sensing Specialist",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('data'),
                company: "Regional Data & Actuarial Analytics Bureau · Geospatial Wing",
                why: "Good understanding of QGIS satellite imagery overlays; profile has limited direct exposure to hyperspectral sensor calibration.",
                matchingSkills: ["QGIS", "Satellite Imagery Interpretation"],
                skillsGap: "hyperspectral radiometric calibration"
            }
        ];
    } else if (p.includes('midwife') || p.includes('midwifery')) {
        return [
            {
                rank: 1,
                title: "Maternal & Neonatal Healthcare Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('midwife'),
                company: "Provincial Maternal & Community Health Center · Partner Agency",
                why: "Comprehensive clinical training in prenatal care, normal spontaneous delivery, postpartum monitoring, and neonatal resuscitation protocols.",
                matchingSkills: ["Prenatal Examination", "Labor & Delivery Management", "Newborn Care", "Vital Signs Monitoring"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Community Reproductive Health & Immunization Intern",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('midwife'),
                company: "Provincial Department of Public Administration & Legal Affairs · Health Outreach",
                why: "Demonstrated skills in community barangay health station rounds, EPI vaccine cold-chain maintenance, and family planning counseling.",
                matchingSkills: ["EPI Immunization Protocols", "Family Planning Counseling", "Community Health Profiling"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Clinical Obstetrics Records & Patient Triage Assistant",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('bio'),
                company: "Caraga Regional Science & Environmental Research Lab · Health Services Wing",
                why: "Solid patient triage, maternal health history taking, partograph documentation, and clinical sterilization procedures.",
                matchingSkills: ["Partograph Recording", "Sterilization Protocols", "Clinical Records"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Barangay Maternal Health Station Facilitator",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('midwife'),
                company: "Provincial Environment & Natural Resources Office · Community Health Desk",
                why: "Excellent bedside manner and rural outreach experience; profile has limited direct exposure to diagnostic ultrasound sonography calibration.",
                matchingSkills: ["Rural Health Outreach", "Nutrition Counseling"],
                skillsGap: "diagnostic ultrasound sonography machine calibration"
            },
            {
                rank: 5,
                title: "Occupational Health, First Aid & Maternal Care Specialist",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('midwife'),
                company: "Grand Horizon Hotel & Resort · Wellness & Clinical Wing",
                why: "Strong knowledge of first aid, emergency maternal stabilization, and workplace ergonomics for female employees.",
                matchingSkills: ["Emergency First Aid", "Workplace Health Protocols"],
                skillsGap: "high-volume corporate clinical inventory management"
            }
        ];
    } else if (p.includes('biology') || (p.includes('bio') && !p.includes('secondary'))) {
        return [
            {
                rank: 1,
                title: "Biological Research & Lab Analyst Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('bio'),
                company: "Caraga Regional Science & Environmental Research Lab · Partner Lab",
                why: "Rigorous laboratory preparation in microbiological assaying, specimen cataloging, spectrophotometry, and aseptic protocols.",
                matchingSkills: ["Microbiology Protocols", "Aseptic Technique", "Spectrophotometry", "Biostatistics"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Ecological Monitoring & Biodiversity Intern",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('enviro'),
                company: "Provincial Environment & Natural Resources Office · Partner Agency",
                why: "Fieldwork competencies in water quality indices, biodiversity quadrat sampling, and ecological data logging.",
                matchingSkills: ["Water Sampling", "Biodiversity Census", "Field Microscopy"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Clinical Diagnostics & Laboratory Trainee",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('bio'),
                company: "Provincial Maternal & Community Health Center · Diagnostic Wing",
                why: "Solid understanding of histology, hematology smear preparation, cell biology, and clinical diagnostic lab safety.",
                matchingSkills: ["Histology Smears", "Reagent Preparation", "Specimen Cataloging"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Marine Biology & Coastal Conservation Trainee",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('bio'),
                company: "Provincial Ecological Conservation & Marine Sanctuary · Marine Biology Wing",
                why: "Knowledgeable in coral reef health monitoring, marine invertebrate identification, and mangrove fish nursery census.",
                matchingSkills: ["Coral Reef Surveying", "Marine Invertebrate Taxonomy"],
                skillsGap: "automated clinical immuno-analyzer operation"
            },
            {
                rank: 5,
                title: "Microbiological Quality Assurance Intern",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('bio'),
                company: "Grand Horizon Hotel & Resort · Food Safety & Sanitation Wing",
                why: "Good grasp of foodborne bacterial pathogens (E. coli / Salmonella testing) and HACCP sanitation validation.",
                matchingSkills: ["HACCP Validation", "Bacterial Culture Swabbing"],
                skillsGap: "industrial food autoclave validation certification"
            }
        ];
    } else if (p.includes('mathematics') || (p.includes('math') && !p.includes('secondary'))) {
        return [
            {
                rank: 1,
                title: "Actuarial & Statistical Data Analyst Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('math'),
                company: "Regional Data & Actuarial Analytics Bureau · Partner Bureau",
                why: "Advanced competence in multivariable calculus, linear algebra, stochastic models, regression analysis, and statistical computing.",
                matchingSkills: ["Statistical Modeling", "R / Python", "Probability Theory", "Regression Analysis"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Financial Quantitative Modeler Intern",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('finance'),
                company: "Surigao Metro Business Hub & Audit Co. · Partner Firm",
                why: "Strong mathematical rigor applied to risk assessment, portfolio variance analysis, and algorithmic capital forecasting.",
                matchingSkills: ["Quantitative Analysis", "Optimization Algorithms", "Monte Carlo Simulations"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Operations Research & Logistics Optimization Intern",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('data'),
                company: "Provincial Engineering & Infrastructure Office · Logistics Wing",
                why: "Deep knowledge of linear programming, simplex methods, and queuing algorithms for supply chain routing.",
                matchingSkills: ["Linear Programming", "Graph Theory", "Queuing Models"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Data Science & Algorithmic Modeling Trainee",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('code'),
                company: "TechNova Solutions · Data Analytics Lab",
                why: "Solid mathematical grounding in numerical methods and machine learning loss function optimization.",
                matchingSkills: ["Numerical Methods", "Python Pandas / NumPy", "Loss Optimization"],
                skillsGap: "commercial supply chain telemetry software"
            },
            {
                rank: 5,
                title: "Public Sector Demographic & Actuarial Projections Assistant",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('math'),
                company: "Provincial Department of Public Administration & Legal Affairs · Statistics Division",
                why: "Sound understanding of life tables, mortality curves, and provincial demographic population projections.",
                matchingSkills: ["Demographic Cohort Analysis", "Life Table Mathematics"],
                skillsGap: "specialized actuarial valuation software (Prophet / GGY AXIS)"
            }
        ];
    }

    // =========================================================================
    // 3. COLLEGE OF BUSINESS AND MANAGEMENT (CBM) - 5 PROGRAMS
    // =========================================================================
    else if (p.includes('financial')) {
        return [
            {
                rank: 1,
                title: "Corporate Financial Analyst Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('finance'),
                company: "Surigao Metro Business Hub & Audit Co. · Partner Firm",
                why: "In-depth coursework in financial statement analysis, capital budgeting, working capital management, and corporate valuation metrics.",
                matchingSkills: ["Financial Statement Analysis", "Capital Budgeting", "Cash Flow Forecasting", "Advanced Excel / Financial Models"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Treasury & Portfolio Management Trainee",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('finance'),
                company: "NEMSU Center for Accounting & Business Development · Institutional Partner",
                why: "Solid foundation in liquidity management, bank reconciliations, investment evaluation, and internal financial controls.",
                matchingSkills: ["Treasury Operations", "Disbursement Auditing", "Risk Management"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Credit Risk & Microfinance Portfolio Analyst",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('finance'),
                company: "Caraga Microfinance & Enterprise Lending Corp. · Partner Firm",
                why: "Competence in SME loan vetting, default risk probability calculations, and debt collection compliance.",
                matchingSkills: ["Credit Risk Assessment", "Loan Portfolio Analysis", "Cash Flow Auditing"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Public Fiscal Administration & Revenue Analyst Intern",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('admin'),
                company: "Provincial Department of Public Administration & Legal Affairs · Budget Division",
                why: "Strong grasp of cost allocation, variance analysis, and municipal budget preparation.",
                matchingSkills: ["Budget Allocation", "Variance Analysis", "Public Expenditure Auditing"],
                skillsGap: "electronic New Government Accounting System (e-NGAS)"
            },
            {
                rank: 5,
                title: "Corporate Investment & Working Capital Trainee",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('finance'),
                company: "Apex Commercial Marketing & Brand Bureau · Financial Desk",
                why: "Demonstrated skills in inventory turnover models and vendor accounts payable aging schedules.",
                matchingSkills: ["Working Capital Optimization", "Aging Schedules"],
                skillsGap: "enterprise ERP Bloomberg/SAP terminal navigation"
            }
        ];
    } else if (p.includes('marketing')) {
        return [
            {
                rank: 1,
                title: "Digital Marketing & Brand Strategy Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('marketing'),
                company: "Agusan Digital Media Hub · Partner Enterprise",
                why: "Academic training in consumer behavior, digital analytics, multi-channel promotional campaigns, and brand equity development.",
                matchingSkills: ["Digital Ad Campaigns", "Market Research", "Content Marketing", "Social Media Analytics"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Market Research & Consumer Insights Intern",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('marketing'),
                company: "Apex Commercial Marketing & Brand Bureau · Partner Agency",
                why: "Strong quantitative survey design, focus group discussion facilitation, and competitive market positioning analysis.",
                matchingSkills: ["Consumer Surveys", "Competitive Benchmarking", "Data Visualization"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Commercial B2B Sales & Account Executive Trainee",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('business'),
                company: "TechNova Solutions · Commercial Division",
                why: "Demonstrated competence in client lead nurturing, sales pipeline CRM tracking, and software product value propositions.",
                matchingSkills: ["CRM Management", "B2B Sales Support", "Lead Qualification"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Hospitality Promotions & Convention Marketing Intern",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('hotel'),
                company: "Grand Horizon Hotel & Resort · Marketing Division",
                why: "Strong creative promotional campaign design and event sales collateral production for corporate banquets.",
                matchingSkills: ["Event Promotions", "Customer Engagement", "Brochure Collateral"],
                skillsGap: "corporate convention expo booth logistics"
            },
            {
                rank: 5,
                title: "Public Sector Information & Civic Campaigns Trainee",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('admin'),
                company: "Provincial Department of Public Administration & Legal Affairs · Media Desk",
                why: "Good understanding of social marketing for government programs; profile has less direct experience measuring multi-channel reach.",
                matchingSkills: ["Public Campaign Design", "Press Bulletins"],
                skillsGap: "cross-platform paid ad budget algorithmic bidding"
            }
        ];
    } else if (p.includes('human resource') || p.includes('hr')) {
        return [
            {
                rank: 1,
                title: "Talent Acquisition & People Operations Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('hr'),
                company: "Surigao Metro Business Hub & Audit Co. · Partner Firm",
                why: "Rigorous coursework in talent recruitment, onboarding workflows, employee performance appraisal systems, and DOLE labor standards.",
                matchingSkills: ["Talent Screening", "Onboarding Logistics", "Labor Code Standards", "HRIS Database Management"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Corporate Training & Employee Development Specialist",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('business'),
                company: "TechNova Solutions · HR Wing",
                why: "Competence in training needs analysis (TNA), team-building facilitation, and employee wellness program coordination.",
                matchingSkills: ["Training Needs Analysis", "Employee Relations", "Policy Dissemination"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Civil Service Personnel Records & Compliance Intern",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('admin'),
                company: "Provincial Department of Public Administration & Legal Affairs · HRMO",
                why: "Solid understanding of statutory benefits, 201 personnel file auditing, and civil service leave administration.",
                matchingSkills: ["Statutory Benefits Processing", "201 Personnel Files", "Civil Service Rules"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Hospitality Staffing & Labor Relations Trainee",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('hotel'),
                company: "Grand Horizon Hotel & Resort · People & Culture Department",
                why: "Strong interpersonal dispute mediation, shift roster planning, and employee hospitality grooming audits.",
                matchingSkills: ["Shift Scheduling", "Disciplinary Hearing Minutes", "Grooming Compliance"],
                skillsGap: "CSC PDS verification & plantilla item management"
            },
            {
                rank: 5,
                title: "Compensation, Benefits & Payroll Systems Intern",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('finance'),
                company: "NEMSU Center for Accounting & Business Development · Personnel Unit",
                why: "Sound grasp of payroll tax brackets (TRAIN Law), PhilHealth, SSS, and Pag-IBIG remittances.",
                matchingSkills: ["Payroll Deductions", "Statutory Remittances"],
                skillsGap: "enterprise HRIS biometric automated time-sheet integration"
            }
        ];
    } else if (p.includes('hospitality') || p.includes('hotel')) {
        return [
            {
                rank: 1,
                title: "Hotel & Guest Operations Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('hotel'),
                company: "Grand Horizon Hotel & Resort · Premier Partner Enterprise",
                why: "Academic training in front-office management, guest relations etiquette, and hotel property software directly aligns with premier hospitality reception.",
                matchingSkills: ["Front Office Systems", "Guest Relations", "Hospitality Etiquette", "Event Coordination"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Food & Beverage Operations Trainee",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('business'),
                company: "Grand Horizon Hotel & Resort · Banquet Division",
                why: "Comprehensive preparation in culinary sanitation, banquet table service, and inventory control for high-volume corporate functions.",
                matchingSkills: ["F&B Standards", "Banquet Logistics", "Sanitation HACCP"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Tourism Concierge & Travel Liaison",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('hotel'),
                company: "Provincial Tourism & Hospitality Center · Partner Agency",
                why: "Excellent interpersonal communication, regional heritage knowledge, and destination tour planning for VIP delegations.",
                matchingSkills: ["Customer Service", "Regional Itineraries", "VIP Protocol"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Convention & Corporate Event Logistics Coordinator",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('business'),
                company: "Surigao Metro Business Hub & Audit Co. · Events Wing",
                why: "Competence in conference hall audio-visual staging, attendee registration logistics, and executive catering coordination.",
                matchingSkills: ["Event Logistics", "Audio-Visual Staging", "Vendor Relations"],
                skillsGap: "Amadeus / Sabre Global Distribution Systems"
            },
            {
                rank: 5,
                title: "Eco-Tourism Facility Operations Trainee",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('enviro'),
                company: "Provincial Environment & Natural Resources Office · Ecotourism Desk",
                why: "Good understanding of environmental guest protocols, trail guiding rules, and coastal resort eco-certification standards.",
                matchingSkills: ["Eco-Tourism Etiquette", "Trail Guide Safety"],
                skillsGap: "international cruise passenger manifest clearance protocols"
            }
        ];
    } else if (p.includes('public administration') || p.includes('bpa')) {
        return [
            {
                rank: 1,
                title: "Public Governance & Administrative Operations Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('admin'),
                company: "Provincial Department of Public Administration & Legal Affairs · Partner Agency",
                why: "Rigorous training in Philippine administrative systems, LGU governance, public ethics (RA 6713), civil service rules, and public policy execution.",
                matchingSkills: ["Public Policy Implementation", "LGU Governance", "Administrative Procedures", "Citizen's Charter Monitoring"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Government Procurement & PhilGEPS Compliance Trainee",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('finance'),
                company: "NEMSU Center for Accounting & Business Development · Bids & Awards Wing",
                why: "Sound understanding of Republic Act 9184 (Government Procurement Reform Act), bidding documents, and public expenditure monitoring.",
                matchingSkills: ["RA 9184 Procurement Rules", "PhilGEPS Document Prep", "Bids & Awards Assistance"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Community Development & Barangay Governance Intern",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('polsci'),
                company: "Provincial Environment & Natural Resources Office · Community Affairs",
                why: "Strong grasp of local government planning, barangay executive orders, and community consultation assemblies.",
                matchingSkills: ["Barangay Development Planning", "Public Records", "Citizen Consultation"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Public Policy Research & Program Monitoring Specialist",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('admin'),
                company: "Regional Data & Actuarial Analytics Bureau · Public Governance Desk",
                why: "Competence in measuring Key Performance Indicators (KPIs) of provincial anti-poverty and infrastructure programs.",
                matchingSkills: ["Program Monitoring", "KPI Tracking", "Executive Reports"],
                skillsGap: "participatory community budgeting assembly facilitation"
            },
            {
                rank: 5,
                title: "Citizen Service & Regulatory Compliance Liaison",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('business'),
                company: "Surigao Metro Business Hub & Audit Co. · Public Affairs Desk",
                why: "Good understanding of Anti-Red Tape Authority (ARTA) service delivery standards and business permit processing.",
                matchingSkills: ["ARTA Compliance", "Permits Processing"],
                skillsGap: "electronic local government billing and licensing software"
            }
        ];
    }

    // =========================================================================
    // 4. COLLEGE OF ENGINEERING AND TECHNOLOGY (CET) - 1 PROGRAM
    // =========================================================================
    else if (p.includes('civil') || p.includes('engineering') || rawCollege === 'CET') {
        return [
            {
                rank: 1,
                title: "Structural Design & Site Supervision Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('civil'),
                company: "Provincial Engineering & Infrastructure Office · Public Works Partner",
                why: "Advanced coursework in reinforced concrete design, structural analysis, topographical surveying, and municipal infrastructure inspection.",
                matchingSkills: ["AutoCAD / Civil 3D", "Structural Analysis", "Site Inspection", "Quantity Surveying"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Construction Project Estimator & BOQ Intern",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('civil'),
                company: "Metro Surigao Builders Corp. · Partner Enterprise",
                why: "Strong mathematical foundation in Bill of Quantities (BOQ) preparation, materials safety, and project bar chart Gantt scheduling.",
                matchingSkills: ["BOQ Cost Estimation", "Materials Testing", "Construction Scheduling"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Geotechnical & Materials Testing Trainee",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('civil'),
                company: "Caraga Regional Science & Environmental Research Lab · Partner Lab",
                why: "Sound grasp of soil mechanics, compressive strength testing of concrete cylinders, and aggregate sieve analysis.",
                matchingSkills: ["Soil Sampling", "Laboratory Sieving", "Concrete Compressive Testing"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Highway & Foundation Engineering Intern",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('civil'),
                company: "Surigao Civil Works & Heavy Construction Inc. · Partner Enterprise",
                why: "Proficient in road alignment surveying, pavement thickness evaluation, and slope stabilization drainage design.",
                matchingSkills: ["Highway Alignment", "Pavement Design", "Drainage Surveying"],
                skillsGap: "dynamic cone penetrometer field calibration"
            },
            {
                rank: 5,
                title: "Water Resources & Hydraulic Modeling Intern",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('civil'),
                company: "Provincial Water Resources & Irrigation Office · Partner Agency",
                why: "Solid understanding of fluid mechanics and open-channel flow; profile would benefit from HEC-RAS river simulation practice.",
                matchingSkills: ["Hydraulics", "Culvert Sizing", "Total Station Surveying"],
                skillsGap: "HEC-RAS flood simulation modeling"
            }
        ];
    }

    // =========================================================================
    // 5. COLLEGE OF INFORMATION TECHNOLOGY EDUCATION (CITE) - 1 PROGRAM
    // =========================================================================
    else if (p.includes('computer sci') || p.includes('information') || rawCollege === 'CITE') {
        return [
            {
                rank: 1,
                title: "Software Engineering & Full-Stack Intern",
                isTop: true,
                fitScore: "98% Match",
                icon: getRecIcon('code'),
                company: "TechNova Solutions · Partner Enterprise",
                why: "Rigorous foundation in algorithm design, object-oriented systems, data structures, and enterprise web application microservices.",
                matchingSkills: ["Data Structures & Algorithms", "Python / JavaScript", "Git & GitHub", "REST APIs & Databases"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "AI & Machine Learning Pipeline Intern",
                isTop: false,
                fitScore: "95% Match",
                icon: getRecIcon('data'),
                company: "Agusan Digital Media Hub · Partner Enterprise",
                why: "Proficiency in mathematical logic, machine learning foundations, and data pipelines for automated media workflows.",
                matchingSkills: ["Machine Learning Basics", "Python", "SQL Data Pipelines", "Feature Engineering"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Cloud Architecture & DevOps Intern",
                isTop: false,
                fitScore: "92% Match",
                icon: getRecIcon('system'),
                company: "Provincial ICT Operations Center · Partner Enterprise",
                why: "Strong server architecture awareness, Linux system administration, Docker containerization, and network routing fundamentals.",
                matchingSkills: ["Linux CLI", "Docker Containers", "Network Protocols", "Server Admin"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Systems Software & Mobile Application Intern",
                isTop: false,
                fitScore: "88% Match",
                icon: getRecIcon('code'),
                company: "Caraga Software Labs & Innovation Hub · Partner Enterprise",
                why: "Competence in React Native/Flutter cross-platform development, SQLite offline caching, and responsive user experience design.",
                matchingSkills: ["Mobile Frameworks", "Offline Caching", "UI/UX Components"],
                skillsGap: "automated CI/CD pipeline orchestration (Kubernetes)"
            },
            {
                rank: 5,
                title: "Information Security & QA Testing Intern",
                isTop: false,
                fitScore: "85% Match",
                icon: getRecIcon('system'),
                company: "CyberShield Surigao Solutions · Partner Enterprise",
                why: "Solid understanding of OWASP Top 10 vulnerabilities and unit test coverage; profile requires hands-on penetration testing lab hours.",
                matchingSkills: ["OWASP Security", "Automated Unit Tests", "Code Auditing"],
                skillsGap: "Kali Linux penetration testing & ethical exploit payloads"
            }
        ];
    }

    // =========================================================================
    // 6. COLLEGE-LEVEL FALLBACKS (If Program String is Generic)
    // =========================================================================
    else if (rawCollege === 'CAS') {
        return [
            {
                rank: 1,
                title: "Scientific Research & Academic Policy Intern",
                isTop: true,
                fitScore: "96% Match",
                icon: getRecIcon('bio'),
                company: "Caraga Regional Science & Environmental Research Lab · Partner Lab",
                why: "Foundational training in scientific methodology, quantitative data analysis, and technical report drafting.",
                matchingSkills: ["Research Methodology", "Data Interpretation", "Academic Reporting"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Institutional Communications Associate",
                isTop: false,
                fitScore: "93% Match",
                icon: getRecIcon('english'),
                company: "Agusan Digital Media Hub · Partner Enterprise",
                why: "Strong verbal and written discourse preparation applicable across public education and media campaigns.",
                matchingSkills: ["Technical Writing", "Public Information"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Public Administration & Governance Intern",
                isTop: false,
                fitScore: "90% Match",
                icon: getRecIcon('admin'),
                company: "Provincial Department of Public Administration & Legal Affairs · Partner Agency",
                why: "Good understanding of institutional structures and civic governance policies.",
                matchingSkills: ["Civic Research", "Documentation"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Data Analytics & Quantitative Assistant",
                isTop: false,
                fitScore: "86% Match",
                icon: getRecIcon('math'),
                company: "Regional Data & Actuarial Analytics Bureau · Partner Bureau",
                why: "Strong numerical literacy and statistical spreadsheet calculations.",
                matchingSkills: ["Spreadsheets", "Descriptive Statistics"],
                skillsGap: "specialized statistical software"
            },
            {
                rank: 5,
                title: "Community Health & Field Research Trainee",
                isTop: false,
                fitScore: "82% Match",
                icon: getRecIcon('midwife'),
                company: "Provincial Maternal & Community Health Center · Partner Agency",
                why: "Willingness to learn community survey protocols and patient data filing.",
                matchingSkills: ["Survey Records", "Patient Assistance"],
                skillsGap: "clinical laboratory procedures"
            }
        ];
    } else if (rawCollege === 'CBM') {
        return [
            {
                rank: 1,
                title: "Corporate Operations & Business Trainee",
                isTop: true,
                fitScore: "96% Match",
                icon: getRecIcon('business'),
                company: "Surigao Metro Business Hub & Audit Co. · Partner Firm",
                why: "Academic training in business administration, organizational operations, and financial records.",
                matchingSkills: ["Business Communications", "Spreadsheets", "Operational Records"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Commercial Relations & Marketing Assistant",
                isTop: false,
                fitScore: "93% Match",
                icon: getRecIcon('marketing'),
                company: "Agusan Digital Media Hub · Partner Enterprise",
                why: "Competence in customer relations, market research, and promotional campaigns.",
                matchingSkills: ["Market Research", "Customer Relations"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Hospitality & Service Operations Intern",
                isTop: false,
                fitScore: "90% Match",
                icon: getRecIcon('hotel'),
                company: "Grand Horizon Hotel & Resort · Premier Partner Enterprise",
                why: "Solid customer service training and event coordination logistics.",
                matchingSkills: ["Guest Service", "Event Coordination"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Accounting & Financial Records Specialist",
                isTop: false,
                fitScore: "86% Match",
                icon: getRecIcon('finance'),
                company: "NEMSU Center for Accounting & Business Development · Institutional Partner",
                why: "Basic competence in bookkeeping and voucher audit trails.",
                matchingSkills: ["Voucher Auditing", "Receipt Cataloging"],
                skillsGap: "advanced financial modeling"
            },
            {
                rank: 5,
                title: "Public Sector Administrative Assistant",
                isTop: false,
                fitScore: "82% Match",
                icon: getRecIcon('admin'),
                company: "Provincial Department of Public Administration & Legal Affairs · Partner Agency",
                why: "General office procedures and document tracking knowledge.",
                matchingSkills: ["Office Filing", "Customer Inquiries"],
                skillsGap: "civil service procurement rules"
            }
        ];
    } else if (rawCollege === 'CTE') {
        return [
            {
                rank: 1,
                title: "Basic Education Teaching Intern",
                isTop: true,
                fitScore: "96% Match",
                icon: getRecIcon('education'),
                company: "NEMSU Laboratory High School · Basic Education Department",
                why: "Comprehensive preparation in pedagogical delivery, syllabus preparation, and classroom leadership.",
                matchingSkills: ["Lesson Planning", "Classroom Management", "Learner Assessment"],
                skillsGap: null
            },
            {
                rank: 2,
                title: "Elementary Training School Facilitator",
                isTop: false,
                fitScore: "93% Match",
                icon: getRecIcon('education'),
                company: "DepEd Surigao Division Elementary Training Schools · Partner Schools",
                why: "Specialized training in student literacy, learning worksheets, and educational psychology.",
                matchingSkills: ["Remedial Instruction", "Learning Aids"],
                skillsGap: null
            },
            {
                rank: 3,
                title: "Early Childhood & Reading Assistant",
                isTop: false,
                fitScore: "90% Match",
                icon: getRecIcon('child'),
                company: "Provincial Reading & Early Childhood Center · Partner Agency",
                why: "Strong enthusiasm for learner mentorship, storytelling, and phonics development.",
                matchingSkills: ["Storytelling", "Classroom Activities"],
                skillsGap: null
            },
            {
                rank: 4,
                title: "Instructional Media Development Associate",
                isTop: false,
                fitScore: "86% Match",
                icon: getRecIcon('education'),
                company: "NEMSU Learning Resource & EdTech Center · Media Wing",
                why: "Creative slide design and visual flashcard authoring for students.",
                matchingSkills: ["Visual Media", "Worksheet Layout"],
                skillsGap: "specialized educational LMS management"
            },
            {
                rank: 5,
                title: "Physical Wellness & School Activities Assistant",
                isTop: false,
                fitScore: "82% Match",
                icon: getRecIcon('sports'),
                company: "Provincial Sports Academy & Recreation Complex · Athletics Wing",
                why: "Enthusiastic playground games facilitator and intramurals assistant.",
                matchingSkills: ["Sports Activities", "Student Motivation"],
                skillsGap: "formal sports referee credentials"
            }
        ];
    }

    // =========================================================================
    // 7. GENERAL SYSTEM FALLBACK
    // =========================================================================
    return [
        {
            rank: 1,
            title: "General Support & Operations Intern",
            isTop: true,
            fitScore: "92% Match",
            icon: getRecIcon('system'),
            company: "NEMSU IT Services · Institutional Partner",
            why: "Broad academic foundation in digital tools, technical documentation, operational records, and administrative assistance.",
            matchingSkills: ["Documentation", "Communication", "Data Entry"],
            skillsGap: null
        },
        {
            rank: 2,
            title: "Operational Logistics Assistant",
            isTop: false,
            fitScore: "89% Match",
            icon: getRecIcon('business'),
            company: "Agusan Digital Media Hub · Partner Enterprise",
            why: "Competence in organizational spreadsheets, event logistics, and cross-departmental coordination.",
            matchingSkills: ["Spreadsheets", "Logistics"],
            skillsGap: null
        },
        {
            rank: 3,
            title: "Public Sector Administrative Services Trainee",
            isTop: false,
            fitScore: "86% Match",
            icon: getRecIcon('admin'),
            company: "Provincial Department of Public Administration & Legal Affairs · Partner Agency",
            why: "Willingness to learn institutional protocols, document filing, and citizen assistance.",
            matchingSkills: ["General Administration", "Document Filing"],
            skillsGap: null
        },
        {
            rank: 4,
            title: "Data Verification & Registry Trainee",
            isTop: false,
            fitScore: "83% Match",
            icon: getRecIcon('data'),
            company: "Provincial ICT Operations Center · Partner Agency",
            why: "Careful attention to detail in digital record keeping and form verification.",
            matchingSkills: ["Record Verification", "Digital Spreadsheets"],
            skillsGap: "specialized database query tools"
        },
        {
            rank: 5,
            title: "Community Outreach & Logistics Intern",
            isTop: false,
            fitScore: "80% Match",
            icon: getRecIcon('hotel'),
            company: "Grand Horizon Hotel & Resort · Community Relations Desk",
            why: "Friendly communication and assistance in venue preparation and visitor guidance.",
            matchingSkills: ["Visitor Guidance", "Event Assistance"],
            skillsGap: "specialized enterprise PMS toolchains"
        }
    ];
}

function renderStudentPlacements() {
    const student = appState.currentUser || {};
    const currentComp = (student.company || '').toLowerCase();
    const recommendations = getStudentPlacementRecommendations(student);

    const container = document.getElementById('ai-matches-container');
    if (!container) return;

    container.innerHTML = `
        <div class="recommendation-card">
            <div class="recommendation-notice">
                <span class="notice-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7Z"/></svg></span>
                <div>
                    <strong>Explainable AI Placement Matchmaker · ${esc(student.program || 'Degree Program')} (${esc(student.college || 'NEMSU')})</strong>
                    <p>Curated internship placements calibrated specifically for your <strong>${esc(student.program || 'academic program')}</strong> coursework and skills profile.</p>
                </div>
            </div>
            <div class="recommendation-list">
                ${recommendations.map(r => {
                    const cleanRecComp = r.company.split('·')[0].trim().toLowerCase();
                    const isSelected = currentComp && (
                        currentComp.includes(cleanRecComp) ||
                        cleanRecComp.includes(currentComp)
                    );
                    return `
                        <div class="recommendation-item">
                            <div class="rec-icon-box" aria-hidden="true">${r.icon}</div>
                            <div class="rec-content">
                                <div class="rec-header">
                                    <h3 class="rec-title">${r.rank}. ${esc(r.title)}</h3>
                                    ${r.isTop ? `<span class="badge-top-rec"><svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Top recommendation (${esc(r.fitScore)})</span>` : `<span class="badge badge-student" style="font-size:0.75rem;">${esc(r.fitScore)}</span>`}
                                    ${isSelected ? '<span class="badge badge-success" style="font-size:0.75rem; padding:3px 8px;"><svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Current HTE Placement</span>' : ''}
                                </div>
                                <div class="rec-company">${esc(r.company)}</div>
                                
                                <div class="rec-why-block">
                                    <h4 class="rec-why-heading">Why it matches</h4>
                                    <p class="rec-explanation">${esc(r.why)}</p>
                                </div>
                                
                                <div class="rec-meta-footer">
                                    ${r.matchingSkills && r.matchingSkills.length ? `
                                        <div class="rec-skills-tag">
                                            <span class="rec-meta-label">Matching skills:</span>
                                            ${r.matchingSkills.map(s => `<span class="rec-skill-pill">${esc(s)}</span>`).join('')}
                                        </div>
                                    ` : ''}
                                    ${r.skillsGap ? `
                                        <div class="rec-gap-tag">
                                            <span class="rec-gap-label">Possible skills gap:</span>
                                            <span class="rec-gap-pill">${esc(r.skillsGap)}</span>
                                        </div>
                                    ` : ''}
                                </div>

                                <div class="rec-actions">
                                    <button class="btn ${isSelected ? 'btn-outline' : 'btn-primary'} btn-sm btn-inline" onclick="confirmPlacementMatch('${esc(r.title)}', '${esc(r.company)}')">
                                        ${isSelected ? '<svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Assigned Placement' : '<svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Select Placement'}
                                    </button>
                                    <button class="btn btn-outline btn-sm btn-inline" onclick="chatWithRole('coordinator')">
                                        <svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Clarify with Coordinator
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

/* ================= DEPARTMENT SCOPING HELPERS ================= */
function getCoordinatorCollege() {
    if (!appState.currentUser || appState.currentUser.role === 'admin') return null;
    return appState.currentUser.college || null;
}

function getScopedStudents() {
    const all = usersDB.filter(u => u.role === 'student');
    const college = getCoordinatorCollege();
    if (!college) return all;
    return all.filter(s => (s.college || '').trim().toUpperCase() === college.trim().toUpperCase());
}

function getScopedStudentNames() {
    return new Set(getScopedStudents().map(s => s.name));
}

function getScopedLogs() {
    const college = getCoordinatorCollege();
    if (!college) return appState.logs;
    const names = getScopedStudentNames();
    return appState.logs.filter(l => names.has(l.student));
}

function getScopedAlerts() {
    const college = getCoordinatorCollege();
    if (!college) return appState.alerts;
    const names = getScopedStudentNames();
    return appState.alerts.filter(a => names.has(a.student));
}

/* ================= COORDINATOR VIEWS ================= */
function renderAdminTaskApprovals() {
    const scopedLogs = getScopedLogs();
    const pending = scopedLogs.filter(l => l.status === 'Pending Review');
    const kpiPending = document.getElementById('adm-kpi-pending-logs');
    if (kpiPending) kpiPending.innerText = pending.length;

    const tbody = document.getElementById('adm-approvals-body');
    if (tbody) {
        tbody.innerHTML = pending.map(log => `
            <tr>
                <td><strong>${esc(log.student)}</strong></td>
                <td>${esc(log.date)}</td>
                <td>${renderPhotoThumbnail(log)}</td>
                <td><strong>${esc(log.title)}</strong><br><span style="font-size:0.85em; color:var(--muted);">${esc(log.description)}</span><br><span class="badge badge-student" style="font-size:0.75rem; margin-top:4px;">${log.hours} hrs</span></td>
                <td>
                    <div style="display:flex; gap:6px;">
                        <button class="btn btn-success btn-sm" onclick="processApproval(${log.id}, 'Approved')">Approve</button>
                        <button class="btn btn-outline btn-sm" onclick="processApproval(${log.id}, 'Rejected')">Reject</button>
                    </div>
                </td>
            </tr>
        `).join('') || `<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--muted);">No pending task logs awaiting review.</td></tr>`;
    }
}

function processApproval(id, status) {
    const log = appState.logs.find(l => l.id === id);
    if(log) {
        log.status = status;
        persistLogs();
        renderAdminTaskApprovals();
        if (appState.currentUser && appState.currentUser.role === 'supervisor') {
            renderSupervisorDashboard();
            renderSupervisorTaskApprovals();
        }
        if (appState.currentUser && appState.currentUser.role === 'student') {
            renderStudentDashboard();
            renderWeeklyLogList();
        }
        renderNotifications();
    }
}

function renderAdminDashboard() {
    const college = getCoordinatorCollege();
    const interns = getScopedStudents();
    const alerts = getScopedAlerts();
    const openAlerts = alerts.filter(a => a.warningStage !== 'complied' && a.status !== 'Resolved');

    // Dynamic Title & Subtitles
    const titleEl = document.getElementById('adm-dashboard-title');
    if (titleEl) {
        if (appState.currentUser && appState.currentUser.role === 'admin') {
            titleEl.innerText = 'System Owner Dashboard';
        } else if (college) {
            titleEl.innerText = `${getDepartmentName(college)} Coordinator Dashboard`;
        } else {
            titleEl.innerText = 'Coordinator Dashboard';
        }
    }

    const subEl = document.getElementById('adm-dashboard-subtitle');
    if (subEl) {
        if (appState.currentUser && appState.currentUser.role === 'admin') {
            subEl.innerText = 'Institutional oversight of student interns and partner industry links across all university departments.';
        } else if (college) {
            subEl.innerText = `Department: ${getDepartmentName(college)} (${college}). Direct oversight of ${getDepartmentName(college)} student interns.`;
        } else {
            subEl.innerText = 'Institutional oversight of student interns and partner industry links.';
        }
    }

    const dirSubEl = document.getElementById('adm-directory-subtitle');
    if (dirSubEl) {
        if (college) {
            dirSubEl.innerText = `Official roster of enrolled ${getDepartmentName(college)} (${college}) student interns.`;
        } else {
            dirSubEl.innerText = 'Official roster of enrolled student interns across all colleges.';
        }
    }

    // KPIs
    const kpiInterns = document.getElementById('kpi-active-interns');
    if (kpiInterns) kpiInterns.innerText = interns.length;

    const kpiAlerts = document.getElementById('kpi-pending-alerts');
    if (kpiAlerts) kpiAlerts.innerText = openAlerts.length;

    // Student Directory table
    const dirTbody = document.getElementById('directory-tbody');
    if (dirTbody) {
        if (!interns.length) {
            dirTbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:24px; color:var(--muted);">No student interns found in ${college || 'the system'}.</td></tr>`;
        } else {
            dirTbody.innerHTML = interns.map(s => {
                const hteName = (s.company && s.company !== 'Unassigned') ? s.company : 'TechNova Solutions';
                return `
                <tr>
                    <td>
                        <strong>${esc(s.name)}</strong>
                        <br><small style="color:var(--muted)">ID: ${esc(s.id)} • HTE: ${esc(hteName)}</small>
                    </td>
                    <td><span class="badge badge-student" style="margin-right:6px;">${esc(s.college || 'CITE')}</span> ${esc(s.program || 'Program not selected')}</td>
                    <td>${buildStudentOjtHoursProgressHtml(s)}</td>
                    <td>
                        <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
                            <button class="btn btn-outline btn-sm" onclick="exportDTRWordDoc('${esc(s.id)}')" title="Download Official OJT DTR (.DOC)">
                                <svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                DTR (.DOC)
                            </button>
                            <button class="btn btn-outline btn-sm" onclick="exportNarrativeWordDoc('${esc(s.id)}')" title="Download OJT Narrative Report (.DOC)">
                                <svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>
                                Narrative (.DOC)
                            </button>
                            <button class="btn btn-outline btn-sm" onclick="chatWithUser('${esc(s.id)}')">
                                <svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                Message
                            </button>
                        </div>
                    </td>
                </tr>
                `;
            }).join('');
        }
    }

    renderAdminTaskApprovals();
    renderCoordinatorPlacementView();
    renderAdminAlerts();
}

function getStudentAiRecommendation(student) {
    const recs = getStudentPlacementRecommendations(student);
    const top = recs.find(r => r.isTop) || recs[0];
    return {
        role: top.title,
        company: top.company.split('·')[0].trim(),
        why: top.why,
        skills: top.matchingSkills || [],
        fitScore: top.fitScore || "96% Match"
    };
}

function renderCoordinatorPlacementView() {
    const college = getCoordinatorCollege();
    const students = getScopedStudents();
    const placedStudents = students.filter(s => s.company && s.company !== 'Unassigned' && s.company.trim() !== '');
    const unplacedStudents = students.length - placedStudents.length;

    const subEl = document.getElementById('adm-placement-subtitle');
    if (subEl) {
        if (college) {
            subEl.innerText = `${getDepartmentName(college)} (${college}) student cohort explainable AI placement and enterprise assignment.`;
        } else {
            subEl.innerText = 'Institutional oversight of explainable AI matching recommendations and official student HTE company assignment.';
        }
    }

    if (document.getElementById('coord-kpi-placed')) {
        document.getElementById('coord-kpi-placed').innerText = `${placedStudents.length} / ${students.length}`;
    }
    if (document.getElementById('coord-kpi-unplaced')) {
        document.getElementById('coord-kpi-unplaced').innerText = unplacedStudents;
    }

    const tbody = document.getElementById('coord-placement-tbody');
    if (!tbody) return;

    if (!students.length) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--muted);">No student interns registered in ${getDepartmentName(college) || 'the system'} yet.</td></tr>`;
        return;
    }

    tbody.innerHTML = students.map(student => {
        const rec = getStudentAiRecommendation(student);
        const hasCompany = student.company && student.company !== 'Unassigned' && student.company.trim() !== '';
        const companyBadge = hasCompany
            ? `<span class="badge badge-success">${esc(student.company)}</span>`
            : `<span class="badge badge-warning">Unassigned / Pending</span>`;

        return `
            <tr>
                <td>
                    <strong>${esc(student.name)}</strong>
                    <br><small style="color:var(--muted)">ID: ${esc(student.id)}</small>
                </td>
                <td>
                    <span class="badge badge-student" style="margin-bottom:3px;">${esc(student.college || 'CITE')}</span>
                    <br><span style="font-size:0.85em; color:var(--muted);">${esc(student.program || 'BS Information Technology')}</span>
                </td>
                <td>
                    <span class="badge badge-student" style="font-weight:700;">${esc(rec.role)}</span>
                    <br><small style="color:var(--leaf); font-weight:600;"><svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${rec.fitScore}</small>
                </td>
                <td style="max-width: 320px;">
                    <div style="font-size:0.86rem; line-height:1.4; margin-bottom:4px;">${esc(rec.why)}</div>
                    <div style="display:flex; gap:4px; flex-wrap:wrap;">
                        ${rec.skills.map(sk => `<span class="badge" style="background:var(--surface-2); border:1px solid var(--line); font-size:0.7rem; color:var(--text);">${esc(sk)}</span>`).join('')}
                    </div>
                </td>
                <td>
                    ${companyBadge}
                </td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="openAssignModal('${esc(student.id)}')">
                        ${hasCompany ? '<svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg> Reassign HTE' : '<svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Assign HTE'}
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

const WARNING_STAGE_CONFIG = {
    warning_1: {
        key: 'warning_1',
        level: 1,
        shortBadge: '1st Warning • Advisory Notice',
        subText: 'Option 1 (Strike 1/3): Attendance & DTR Reminder Issued',
        badgeClass: 'badge-warning',
        defaultNote: '1st Warning (Advisory): Please comply with your daily OJT schedule and log your Live Camera DTR attendance on time.'
    },
    warning_2: {
        key: 'warning_2',
        level: 2,
        shortBadge: '2nd Warning • Conference Required',
        subText: 'Option 2 (Strike 2/3): Report to Coordinator & Written Explanation',
        badgeClass: 'badge-danger',
        defaultNote: '2nd Warning (Mandatory Conference): Due to repeated absences, report to your OJT Coordinator and submit a written explanation.'
    },
    warning_3: {
        key: 'warning_3',
        level: 3,
        shortBadge: '3rd Warning • Re-Enroll Next Sem',
        subText: 'Option 3 (Strike 3/3): Pulled Out — Re-Enroll OJT Next Semester',
        badgeClass: 'badge-danger',
        defaultNote: '3rd & Final Warning (Re-Enroll Next Semester): Due to excessive unexcused absences and non-compliance after prior warnings, you are pulled out from your HTE and advised to re-enroll in OJT next semester.'
    },
    complied: {
        key: 'complied',
        level: 0,
        shortBadge: 'Complied • Good Standing',
        subText: 'Cleared: Student complied with OJT attendance & DTR requirements',
        badgeClass: 'badge-success',
        defaultNote: 'Cleared / Complied: Student intern has complied with OJT attendance requirements and returned to good standing.'
    }
};

function getAlertWarningStageKey(alert) {
    if (!alert) return 'warning_1';
    if (alert.warningStage && WARNING_STAGE_CONFIG[alert.warningStage]) {
        return alert.warningStage;
    }
    if (alert.status === 'Resolved' || alert.status === 'Complied') return 'complied';
    if (String(alert.status || '').includes('3rd') || String(alert.status || '').includes('Re-Enroll')) return 'warning_3';
    if (String(alert.status || '').includes('2nd')) return 'warning_2';
    return 'warning_1';
}

function getWarningStageConfig(alert) {
    const key = typeof alert === 'string' ? alert : getAlertWarningStageKey(alert);
    return WARNING_STAGE_CONFIG[key] || WARNING_STAGE_CONFIG.warning_1;
}

function renderAdminAlerts() {
    const college = getCoordinatorCollege();
    const alerts = getScopedAlerts();
    
    const subEl = document.getElementById('adm-alerts-subtitle');
    if (subEl) {
        if (college) {
            subEl.innerText = `AI risk detection & 3-Strike progressive warning intervention for ${getDepartmentName(college)} (${college}) interns.`;
        } else {
            subEl.innerText = 'AI risk detection & 3-Strike progressive warning intervention for interns across all colleges.';
        }
    }

    const tbody = document.getElementById('alerts-table-body');
    if (!tbody) return;

    if (!alerts.length) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:24px; color:var(--muted);">No active early-warning intervention alerts for ${getDepartmentName(college) || 'enrolled'} interns.</td></tr>`;
        return;
    }

    tbody.innerHTML = alerts.map(alert => {
        const student = usersDB.find(u => u.name === alert.student && u.role === 'student');
        const triggersHtml = (alert.triggers || []).map(t => {
            const cleanTrigger = String(t || '').replace(/^DTR\s+Absences$/i, 'Absences');
            return `<span class="badge badge-warning" style="margin-right:4px; font-size:0.75rem;"><svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> ${esc(cleanTrigger)}</span>`;
        }).join('');
        const stageKey = getAlertWarningStageKey(alert);
        const stageCfg = getWarningStageConfig(stageKey);
        const scoreClass = stageKey === 'complied' ? 'success' : (alert.score >= 80 || stageKey === 'warning_3' ? 'danger' : (alert.score >= 60 ? 'warning' : 'success'));

        const strikeDotsHtml = [1, 2, 3].map(num => {
            const activeColor = stageCfg.level >= num
                ? (stageCfg.level === 3 ? '#ef4444' : (stageCfg.level === 2 ? '#f97316' : '#f59e0b'))
                : 'rgba(148, 163, 184, 0.35)';
            return `<span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${activeColor};"></span>`;
        }).join('');

        return `
            <tr>
                <td>
                    <strong>${esc(alert.student)}</strong>
                    ${student ? `<br><small style="color:var(--muted);">${esc(student.college || '')} - ${esc(student.program || '')}</small>` : ''}
                </td>
                <td>
                    <span class="badge badge-${scoreClass}" style="font-weight:700;">${alert.score}% Risk</span>
                </td>
                <td style="max-width:260px;">
                    ${triggersHtml || '<span style="color:var(--muted);">No triggers</span>'}
                    <div style="font-size:0.75rem; color:var(--muted); margin-top:4px; line-height:1.35;">
                        ${esc(alert.note || stageCfg.defaultNote)}
                    </div>
                </td>
                <td>
                    <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-start;">
                        <span class="badge ${stageCfg.badgeClass}" style="font-weight:700;">${esc(stageCfg.shortBadge)}</span>
                        <div style="display:flex; align-items:center; gap:5px; font-size:0.72rem; color:var(--muted);">
                            <span style="display:inline-flex; gap:3px;">${strikeDotsHtml}</span>
                            <span>${esc(stageCfg.subText)}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <div style="display:flex; flex-direction:column; gap:6px; min-width:230px;">
                        <select class="form-control form-control-sm" aria-label="Select Warning Option" onchange="applyWarningIntervention(${alert.id}, this.value)" style="font-size:0.78rem; font-weight:600; padding:5px 8px;">
                            <option value="warning_1" ${stageKey === 'warning_1' ? 'selected' : ''}>Option 1: 1st Warning (Advisory Notice)</option>
                            <option value="warning_2" ${stageKey === 'warning_2' ? 'selected' : ''}>Option 2: 2nd Warning (Coordinator Conference)</option>
                            <option value="warning_3" ${stageKey === 'warning_3' ? 'selected' : ''}>Option 3: 3rd Warning (Re-Enroll Next Sem)</option>
                            <option value="complied" ${stageKey === 'complied' ? 'selected' : ''}>Cleared: Complied / Good Standing</option>
                        </select>
                        <div style="display:flex; gap:6px; flex-wrap:wrap;">
                            <button class="btn btn-primary btn-sm" type="button" onclick="openWarningInterventionModal(${alert.id})">
                                <svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                Warning Details
                            </button>
                            <button class="btn btn-outline btn-sm" type="button" onclick="chatWithStudentName('${esc(alert.student)}')">
                                <svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                Message Intern
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function applyWarningIntervention(alertId, stageKey, customNote, silentAlert) {
    const alertItem = appState.alerts.find(a => a.id === Number(alertId));
    if (!alertItem) return;

    const cfg = getWarningStageConfig(stageKey);
    alertItem.warningStage = cfg.key;
    alertItem.status = cfg.shortBadge;
    alertItem.note = (customNote && customNote.trim()) ? customNote.trim() : cfg.defaultNote;

    if (cfg.key === 'warning_3') {
        alertItem.score = Math.max(alertItem.score || 85, 95);
    } else if (cfg.key === 'warning_2') {
        alertItem.score = Math.max(alertItem.score || 75, 85);
    } else if (cfg.key === 'complied') {
        alertItem.score = Math.min(alertItem.score || 30, 25);
    }

    // Automatically send an official Coordinator intervention notice to the student intern in Chat
    const student = usersDB.find(u => u.name === alertItem.student && u.role === 'student');
    if (student && appState.currentUser) {
        const msgText = `[${cfg.shortBadge}] ${alertItem.note}`;
        appState.messages.push({
            id: Date.now(),
            senderId: appState.currentUser.id,
            senderName: appState.currentUser.name,
            senderRole: appState.currentUser.role,
            recipientId: student.id,
            text: msgText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    }

    persistDatabase();
    renderAdminAlerts();
    renderNotifications();

    const openCount = getScopedAlerts().filter(a => a.warningStage !== 'complied' && a.status !== 'Resolved').length;
    const kpiAlerts = document.getElementById('kpi-pending-alerts');
    if (kpiAlerts) kpiAlerts.innerText = openCount;

    if (!silentAlert) {
        alert(`Intervention Updated for ${alertItem.student}:\n\nStage: ${cfg.shortBadge}\nDirective: ${alertItem.note}\n\nAn official notification has been sent to the student intern.`);
    }
}

function openWarningInterventionModal(alertId) {
    const alertItem = appState.alerts.find(a => a.id === Number(alertId));
    if (!alertItem) return;

    const stageKey = getAlertWarningStageKey(alertItem);
    const cfg = getWarningStageConfig(stageKey);

    const idEl = document.getElementById('modal-alert-id');
    const stuEl = document.getElementById('modal-student');
    const detEl = document.getElementById('modal-details');
    const selEl = document.getElementById('modal-warning-stage');
    const noteEl = document.getElementById('resolution-note');

    if (idEl) idEl.value = String(alertItem.id);
    if (stuEl) stuEl.innerText = `Student Intern: ${alertItem.student} (${alertItem.score}% Risk Score)`;
    const normalizedTriggers = (alertItem.triggers || ['Absences']).map(t => String(t || '').replace(/^DTR\s+Absences$/i, 'Absences'));
    if (detEl) detEl.innerText = `Detected Triggers: ${normalizedTriggers.join(', ')}`;
    if (selEl) selEl.value = stageKey;
    if (noteEl) noteEl.value = alertItem.note || cfg.defaultNote;

    document.getElementById('alert-modal')?.classList.add('show');
}

function updateWarningModalPresetNote() {
    const selEl = document.getElementById('modal-warning-stage');
    const noteEl = document.getElementById('resolution-note');
    if (!selEl || !noteEl) return;
    const cfg = getWarningStageConfig(selEl.value);
    noteEl.value = cfg.defaultNote;
}

function saveWarningModalAction() {
    const alertId = document.getElementById('modal-alert-id')?.value;
    const stageKey = document.getElementById('modal-warning-stage')?.value || 'warning_1';
    const note = document.getElementById('resolution-note')?.value || '';
    if (!alertId) return;
    closeAlertModal();
    applyWarningIntervention(Number(alertId), stageKey, note, false);
}

function closeAlertModal() {
    document.getElementById('alert-modal')?.classList.remove('show');
}

function resolveAlert() {
    saveWarningModalAction();
}

function resolveEarlyWarningAlert(alertId) {
    openWarningInterventionModal(alertId);
}

function chatWithStudentName(studentName) {
    const student = usersDB.find(u => u.name === studentName && u.role === 'student');
    if (student) {
        chatWithUser(student.id);
    } else {
        alert(`Student profile for "${studentName}" not found.`);
    }
}

function openAssignModal(studentId) {
    const student = usersDB.find(u => u.id === studentId);
    if (!student) return alert('Student record not found.');

    const college = (student.college || getCoordinatorCollege() || 'CITE').trim().toUpperCase();
    const collegeName = getDepartmentName(college);
    const rec = getStudentAiRecommendation(student);

    document.getElementById('assign-modal-student-id').value = student.id;
    document.getElementById('assign-modal-student-name').innerText = student.name;
    document.getElementById('assign-modal-student-program').innerText = `${collegeName} (${college}) - ${student.program || 'Program not selected'}`;
    document.getElementById('assign-modal-ai-hint').innerText = `Top Recommended: ${rec.company} (${rec.role}) — ${rec.why}`;
    
    const companySelect = document.getElementById('assign-company-select');
    companySelect.innerHTML = '';

    // Strictly focus on the specific department partner enterprises
    const deptCompanies = nemsuDepartmentCompanies[college] || [];
    const optGroup = document.createElement('optgroup');
    optGroup.label = `${collegeName} (${college}) Official Host Enterprises`;

    deptCompanies.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = `${c.name} — ${c.desc}`;
        optGroup.appendChild(opt);
    });
    companySelect.appendChild(optGroup);

    const targetCompany = (student.company && student.company !== 'Unassigned' && student.company.trim() !== '')
        ? student.company
        : rec.company;

    if (targetCompany && !Array.from(companySelect.options).some(o => o.value === targetCompany)) {
        const opt = document.createElement('option');
        opt.value = targetCompany;
        opt.textContent = `${targetCompany} (Selected Partner Enterprise)`;
        companySelect.appendChild(opt);
    }
    companySelect.value = targetCompany;

    const roleInput = document.getElementById('assign-role-title');
    if (roleInput) roleInput.value = student.assignedRole || rec.role;

    document.getElementById('assign-hte-modal').classList.add('show');
}

function closeAssignModal() {
    const modal = document.getElementById('assign-hte-modal');
    if (modal) modal.classList.remove('show');
}

function submitHteAssignment() {
    const studentId = document.getElementById('assign-modal-student-id').value;
    const company = document.getElementById('assign-company-select').value;
    const roleTitle = document.getElementById('assign-role-title').value.trim();

    const student = usersDB.find(u => u.id === studentId);
    if (!student) return alert('Student not found.');

    student.company = company;
    if (roleTitle) student.assignedRole = roleTitle;

    // If currently logged in as this student or student is active session
    if (appState.currentUser && appState.currentUser.id === student.id) {
        appState.currentUser.company = company;
        if (document.getElementById('dash-company')) {
            document.getElementById('dash-company').innerText = company;
        }
    }

    persistUsers();
    closeAssignModal();

    alert(`Official HTE Assignment Confirmed!\n\nIntern: ${student.name}\nHost Training Enterprise: ${company}\nDesignation: ${roleTitle || 'Intern Trainee'}\n\nThe student profile and supervisor rosters have been synchronized.`);

    renderCoordinatorPlacementView();
    renderAdminDashboard();
    renderSupervisorDashboard();
    renderSupervisorInterns();
}

/* ================= SUPERVISOR VIEWS & LOGIC ================= */
function renderSupervisorDashboard() {
    const interns = usersDB.filter(u => u.role === 'student');
    const pendingLogs = appState.logs.filter(l => l.status === 'Pending Review');
    
    if (document.getElementById('sup-kpi-trainees')) {
        document.getElementById('sup-kpi-trainees').innerText = interns.length;
    }
    if (document.getElementById('sup-kpi-pending-tasks')) {
        document.getElementById('sup-kpi-pending-tasks').innerText = pendingLogs.length;
    }
    if (document.getElementById('sup-company-badge') && appState.currentUser) {
        document.getElementById('sup-company-badge').innerText = appState.currentUser.company || 'Host Training Enterprise';
    }

    const tbody = document.getElementById('sup-endorsements-tbody');
    if (tbody) {
        tbody.innerHTML = pendingLogs.map(log => `
            <tr>
                <td><strong>${esc(log.student)}</strong></td>
                <td>${esc(log.date)}</td>
                <td>${renderPhotoThumbnail(log)}</td>
                <td><strong>${esc(log.title)}</strong> (${log.hours} hrs)<br><small style="color:var(--muted)">${esc(log.description)}</small></td>
                <td>
                    <div style="display:flex; gap:6px;">
                        <button class="btn btn-success btn-sm" onclick="processApproval(${log.id}, 'Approved')">Endorse <svg class="btn-svg btn-svg-after" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></button>
                        <button class="btn btn-outline btn-sm" onclick="processApproval(${log.id}, 'Rejected')">Reject</button>
                    </div>
                </td>
            </tr>
        `).join('') || `<tr><td colspan="5">All intern daily reports are up to date and endorsed.</td></tr>`;
    }
}

function buildStudentOjtHoursProgressHtml(student) {
    const studentName = student?.name || '';
    const allMyLogs = appState.logs.filter(l => l.student === studentName);
    const approvedLogs = allMyLogs.filter(l => l.status === 'Approved');
    const pendingLogs = allMyLogs.filter(l => l.status === 'Pending Review');
    const totalHours = Math.round(approvedLogs.reduce((sum, l) => sum + (Number(l.hours) || 0), 0) * 10) / 10;
    const pendingHours = Math.round(pendingLogs.reduce((sum, l) => sum + (Number(l.hours) || 0), 0) * 10) / 10;
    const requiredHours = 500;
    const pct = Math.min(100, Math.round((totalHours / requiredHours) * 100));
    const remainingHours = Math.max(0, Math.round((requiredHours - totalHours) * 10) / 10);

    const statusBadge = totalHours >= requiredHours
        ? `<span class="badge badge-success" style="font-size:0.7rem;">Completed ✓</span>`
        : `<span class="badge badge-student" style="font-size:0.7rem;">${pct}% Complete</span>`;

    return `
        <div style="min-width:190px; max-width:250px;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:4px;">
                <strong>${totalHours} / ${requiredHours} hrs</strong>
                ${statusBadge}
            </div>
            <div class="progress" style="height:6px; margin:0 0 4px;">
                <i style="width:${pct}%;"></i>
            </div>
            <small style="color:var(--muted); font-size:0.74rem; display:block;">
                ${remainingHours > 0 ? `${remainingHours} hrs remaining` : '500-hr target reached'}${pendingHours > 0 ? ` • ${pendingHours} hrs pending` : ''}
            </small>
        </div>
    `;
}

function renderSupervisorInterns() {
    const tbody = document.getElementById('sup-interns-tbody');
    if (!tbody) return;

    const myComp = (appState.currentUser?.company || '').toLowerCase();
    const allInterns = usersDB.filter(u => u.role === 'student');
    const interns = myComp 
        ? allInterns.filter(u => !u.company || u.company.toLowerCase().includes(myComp) || myComp.includes((u.company || '').toLowerCase()))
        : allInterns;

    tbody.innerHTML = (interns.length ? interns : allInterns).map(s => {
        return `
            <tr>
                <td><strong>${esc(s.name)}</strong><br><small style="color:var(--muted)">ID: ${esc(s.id)} • HTE: ${esc(s.company || 'TechNova Solutions')}</small></td>
                <td><span class="badge badge-student" style="margin-right:6px;">${esc(s.college || 'CITE')}</span> ${esc(s.program || 'OJT')}</td>
                <td>${buildStudentOjtHoursProgressHtml(s)}</td>
                <td>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                        <button class="btn btn-outline btn-sm" onclick="openEvaluationForStudent('${esc(s.id)}')"><svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg> Evaluate Intern</button>
                        <button class="btn btn-primary btn-sm" onclick="chatWithUser('${esc(s.id)}')"><svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Chat Intern</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('') || `<tr><td colspan="4">No interns currently assigned.</td></tr>`;
}

function renderSupervisorTaskApprovals() {
    const tbody = document.getElementById('sup-all-tasks-tbody');
    if (!tbody) return;

    tbody.innerHTML = appState.logs.map(log => `
        <tr>
            <td><strong>${esc(log.student)}</strong></td>
            <td>${esc(log.date)}</td>
            <td>${renderPhotoThumbnail(log)}</td>
            <td><strong>${esc(log.title)}</strong><br><small style="color:var(--muted)">${esc(log.description)}</small></td>
            <td>${log.hours} hrs</td>
            <td>
                ${log.status === 'Pending Review' ? `
                    <div style="display:flex; gap:6px;">
                        <button class="btn btn-success btn-sm" onclick="processApproval(${log.id}, 'Approved')">Endorse</button>
                        <button class="btn btn-outline btn-sm" onclick="processApproval(${log.id}, 'Rejected')">Reject</button>
                    </div>
                ` : `<span class="badge badge-${log.status==='Approved'?'success':'danger'}">${esc(log.status)}</span>`}
            </td>
        </tr>
    `).join('') || `<tr><td colspan="6">No task logs found.</td></tr>`;
}

/* ================= OFFICIAL HTE ON-THE-JOB TRAINING EVALUATION FORM ================= */
const HTE_EVAL_SECTIONS = [
    {
        id: 'sec1',
        title: 'I. Technical/Job Performance',
        items: [
            { id: 't1', no: 1, text: 'Performs assigned tasks accurately and efficiently.' },
            { id: 't2', no: 2, text: 'Applies knowledge and skills relevant to the assigned work.' },
            { id: 't3', no: 3, text: 'Completes tasks within the required time frame.' },
            { id: 't4', no: 4, text: 'Follows instructions and workplace procedures properly.' },
            { id: 't5', no: 5, text: 'Shows initiative in learning new tasks and responsibilities.' },
            { id: 't6', no: 6, text: 'Produces outputs that meet acceptable workplace standards.' }
        ]
    },
    {
        id: 'sec2',
        title: 'II. Work Habits and Professionalism',
        items: [
            { id: 'w1', no: 1, text: 'Reports to duty regularly and observes assigned schedule.' },
            { id: 'w2', no: 2, text: 'Demonstrates punctuality and proper time management.' },
            { id: 'w3', no: 3, text: 'Follows company/agency policies, rules, and safety procedures.' },
            { id: 'w4', no: 4, text: 'Maintains proper grooming, decorum, and professional behavior.' },
            { id: 'w5', no: 5, text: 'Shows responsibility, honesty, and respect in the workplace.' },
            { id: 'w6', no: 6, text: 'Accepts feedback and uses it to improve performance.' }
        ]
    },
    {
        id: 'sec3',
        title: 'III. Communication and Interpersonal Skills',
        items: [
            { id: 'c1', no: 1, text: 'Communicates clearly and appropriately with supervisors and co-workers.' },
            { id: 'c2', no: 2, text: 'Works well with others and contributes to a positive work environment.' },
            { id: 'c3', no: 3, text: 'Demonstrates courtesy, respect, and confidentiality.' },
            { id: 'c4', no: 4, text: 'Responds appropriately to workplace concerns and instructions.' }
        ]
    },
    {
        id: 'sec4',
        title: 'IV. Overall Assessment',
        items: [
            { id: 'o1', no: 1, text: 'Demonstrates readiness for workplace responsibilities.' },
            { id: 'o2', no: 2, text: 'Shows growth in competence, confidence, and professional maturity.' },
            { id: 'o3', no: 3, text: 'Overall performance of the student trainee.' }
        ]
    }
];

function getHteEvaluationsDB() {
    try {
        return JSON.parse(localStorage.getItem('internms_hte_evaluations') || '{}');
    } catch {
        return {};
    }
}

function saveHteEvaluationsDB(db) {
    localStorage.setItem('internms_hte_evaluations', JSON.stringify(db));
}

function getAllEvalCriterionIds() {
    const ids = [];
    HTE_EVAL_SECTIONS.forEach(sec => sec.items.forEach(item => ids.push(item.id)));
    return ids;
}

function renderHteEvaluationCriteriaTables() {
    const container = document.getElementById('hte-eval-criteria-container');
    if (!container) return;

    container.innerHTML = HTE_EVAL_SECTIONS.map(sec => `
        <div class="hte-eval-sec-title">${esc(sec.title)}</div>
        <div class="table-container" style="margin-bottom: 18px;">
            <table class="hte-eval-criteria-table">
                <thead>
                    <tr>
                        <th style="width:44px; text-align:center;">No.</th>
                        <th>Criteria</th>
                        <th class="hte-eval-radio-cell">5</th>
                        <th class="hte-eval-radio-cell">4</th>
                        <th class="hte-eval-radio-cell">3</th>
                        <th class="hte-eval-radio-cell">2</th>
                        <th class="hte-eval-radio-cell">1</th>
                        <th style="width:210px;">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    ${sec.items.map(item => `
                        <tr>
                            <td style="text-align:center; font-weight:700;">${item.no}</td>
                            <td>${esc(item.text)}</td>
                            ${[5, 4, 3, 2, 1].map(score => `
                                <td class="hte-eval-radio-cell">
                                    <label class="hte-eval-radio-label" title="Rate ${score}">
                                        <input type="radio" name="eval_rate_${item.id}" value="${score}" ${score === 5 ? 'checked' : ''} onchange="recalculateHteEvaluationSummary()">
                                    </label>
                                </td>
                            `).join('')}
                            <td>
                                <input type="text" id="eval_rem_${item.id}" class="form-control form-control-sm" placeholder="Optional remark">
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `).join('');
}

function getEligibleEvalTrainees() {
    const user = appState.currentUser;
    const allStudents = usersDB.filter(u => u.role === 'student');
    if (!user) return allStudents;

    if (user.role === 'student') {
        const self = allStudents.find(s => s.id === user.id || s.name === user.name);
        return self ? [self] : allStudents;
    }

    if (user.role === 'coordinator') {
        const college = getCoordinatorCollege();
        if (college) {
            const deptStudents = allStudents.filter(s => (s.college || '').trim().toUpperCase() === college);
            if (deptStudents.length) return deptStudents;
        }
    }

    return allStudents;
}

function renderHteEvaluationForm(preselectedStudentId) {
    renderHteEvaluationCriteriaTables();

    const selectEl = document.getElementById('hte-eval-student-select');
    if (!selectEl) return;

    const trainees = getEligibleEvalTrainees();
    const db = getHteEvaluationsDB();

    selectEl.innerHTML = trainees.map(s => {
        const isEvaluated = Boolean(db[s.id]);
        const companyLabel = s.company && s.company !== 'Unassigned' ? s.company : 'TechNova Solutions';
        return `<option value="${esc(s.id)}">${esc(s.name)} — ${esc(s.college || 'CITE')} (${esc(companyLabel)})${isEvaluated ? ' ✓ Evaluated' : ''}</option>`;
    }).join('');

    const targetId = preselectedStudentId && trainees.some(t => t.id === preselectedStudentId)
        ? preselectedStudentId
        : (trainees[0] ? trainees[0].id : '');

    if (targetId) {
        selectEl.value = targetId;
        selectEvalTrainee(targetId);
    }
}

function openEvaluationForStudent(studentId) {
    const navMenu = document.querySelector('#app-sidebar .nav-menu:not([style*="display: none"]):not([style*="display:none"])');
    const evalNavItem = navMenu ? navMenu.querySelector('.nav-item[onclick*="sup-evaluation"]') : null;
    switchTab('sup-evaluation', evalNavItem);
    renderHteEvaluationForm(studentId);
}

function selectEvalTrainee(studentId) {
    const student = usersDB.find(u => u.id === studentId && u.role === 'student') || usersDB.find(u => u.role === 'student');
    if (!student) return;

    const db = getHteEvaluationsDB();
    const saved = db[student.id] || null;
    const badgeEl = document.getElementById('hte-eval-status-badge');

    // Compute default hours & dates from student's logs
    const studentLogs = appState.logs.filter(l => l.student === student.name);
    const approvedHours = studentLogs
        .filter(l => l.status === 'Approved' || l.kind === 'attendance')
        .reduce((sum, l) => sum + (Number(l.hours) || 0), 0);
    const sortedDates = studentLogs.map(l => l.date).filter(Boolean).sort();
    const todayStr = new Date().toISOString().split('T')[0];
    const defaultFrom = sortedDates[0] || '2026-08-01';
    const defaultTo = sortedDates[sortedDates.length - 1] || todayStr;

    const supUser = (appState.currentUser && appState.currentUser.role === 'supervisor')
        ? appState.currentUser
        : (usersDB.find(u => u.role === 'supervisor') || { name: 'Engr. Marco Villanueva', company: 'TechNova Solutions' });

    const coordUser = usersDB.find(u => u.role === 'coordinator' && (u.college || '').toUpperCase() === (student.college || 'CITE').toUpperCase())
        || usersDB.find(u => u.role === 'coordinator')
        || { name: 'Prof. Elena Gomez, MIT' };

    const companyName = (student.company && student.company !== 'Unassigned') ? student.company : (supUser.company || 'TechNova Solutions');
    const deptUnit = student.assignedRole ? `${student.assignedRole} Unit` : `${student.college || 'CITE'} Technical Operations Unit`;
    const renderedStr = `${approvedHours || 500} Hours`;

    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val ?? '';
    };

    setVal('eval-student-name', saved?.studentName || student.name);
    setVal('eval-company', saved?.company || companyName);
    setVal('eval-program', saved?.program || `${student.program || 'BS Computer Science'} (${student.college || 'CITE'})`);
    setVal('eval-department', saved?.department || deptUnit);
    setVal('eval-year-section', saved?.yearSection || '4th Year - Section A');
    setVal('eval-supervisor-name', saved?.supervisorName || supUser.name);
    setVal('eval-required-hours', saved?.requiredHours || '500 Hours');
    setVal('eval-supervisor-pos', saved?.supervisorPos || 'Immediate HTE Supervisor / Division Lead');
    setVal('eval-period-from', saved?.periodFrom || defaultFrom);
    setVal('eval-period-to', saved?.periodTo || defaultTo);
    setVal('eval-hours-rendered', saved?.hoursRendered || renderedStr);
    setVal('eval-summary-hours', saved?.summaryHours || renderedStr);
    setVal('eval-date-evaluated', saved?.dateEvaluated || todayStr);
    setVal('eval-final-remarks', saved?.finalRemarks || 'Completed required internship competencies with commendable performance.');

    setVal('eval-strengths', saved?.strengths || 'Demonstrates strong technical proficiency, quick adaptability to workplace tools, and consistent initiative during daily operations.');
    setVal('eval-improvements', saved?.improvements || 'Continue expanding advanced enterprise documentation and cross-team presentation skills.');
    setVal('eval-additional-comments', saved?.additionalComments || 'Highly recommended for future industry placement and professional career roles.');

    setVal('eval-cert-sup-name', saved?.certSupName || supUser.name);
    setVal('eval-cert-sup-date', saved?.certSupDate || todayStr);
    setVal('eval-cert-sup-contact', saved?.certSupContact || 'supervisor@partner-hte.ph / +63 917 555 0192');
    setVal('eval-cert-coord-name', saved?.certCoordName || coordUser.name);
    setVal('eval-cert-coord-date', saved?.certCoordDate || todayStr);
    setVal('eval-cert-seal', saved?.certSeal || `${companyName} — Official Verified Stamp`);

    // Populate criteria ratings and remarks
    getAllEvalCriterionIds().forEach(cid => {
        const score = saved?.ratings?.[cid] || 5;
        const radio = document.querySelector(`input[name="eval_rate_${cid}"][value="${score}"]`);
        if (radio) radio.checked = true;
        setVal(`eval_rem_${cid}`, saved?.remarks?.[cid] || '');
    });

    recalculateHteEvaluationSummary(saved?.descriptiveRating, saved?.recommendation);

    if (badgeEl) {
        if (saved) {
            badgeEl.className = 'badge badge-success';
            badgeEl.innerText = `Evaluated • Avg ${saved.averageRating || '5.00'} (${saved.descriptiveRating || 'Excellent'})`;
        } else {
            badgeEl.className = 'badge badge-warning';
            badgeEl.innerText = 'Draft / Ready for Evaluation';
        }
    }
}

function recalculateHteEvaluationSummary(overrideDescriptive, overrideRecommendation) {
    const ids = getAllEvalCriterionIds();
    let totalScore = 0;
    let count = 0;

    ids.forEach(cid => {
        const checked = document.querySelector(`input[name="eval_rate_${cid}"]:checked`);
        const val = checked ? parseInt(checked.value, 10) : 5;
        totalScore += val;
        count++;
    });

    const maxScore = count * 5;
    const avg = count > 0 ? (totalScore / count) : 5;
    const avgStr = avg.toFixed(2);

    let autoDesc = 'Excellent';
    if (avg >= 4.5) autoDesc = 'Excellent';
    else if (avg >= 3.5) autoDesc = 'Very Good';
    else if (avg >= 2.5) autoDesc = 'Good';
    else if (avg >= 1.5) autoDesc = 'Fair';
    else autoDesc = 'Needs Improvement';

    const finalDesc = overrideDescriptive || autoDesc;
    const finalRec = overrideRecommendation || (avg >= 2.5 ? 'Passed' : 'For Improvement');

    const totalEl = document.getElementById('eval-total-score');
    const avgEl = document.getElementById('eval-average-rating');
    if (totalEl) totalEl.value = `${totalScore} / ${maxScore}`;
    if (avgEl) avgEl.value = `${avgStr} (${finalDesc})`;

    const descRadio = document.querySelector(`input[name="eval_descriptive_rating"][value="${finalDesc}"]`);
    if (descRadio) descRadio.checked = true;

    const recRadio = document.querySelector(`input[name="eval_recommendation"][value="${finalRec}"]`);
    if (recRadio) recRadio.checked = true;
}

function collectCurrentHteEvaluationData() {
    const selectEl = document.getElementById('hte-eval-student-select');
    const studentId = selectEl ? selectEl.value : (appState.currentUser?.id || '');
    const getVal = id => (document.getElementById(id)?.value || '').trim();

    const ratings = {};
    const remarks = {};
    let totalScore = 0;
    const ids = getAllEvalCriterionIds();

    ids.forEach(cid => {
        const checked = document.querySelector(`input[name="eval_rate_${cid}"]:checked`);
        const score = checked ? parseInt(checked.value, 10) : 5;
        ratings[cid] = score;
        totalScore += score;
        remarks[cid] = getVal(`eval_rem_${cid}`);
    });

    const avg = ids.length ? (totalScore / ids.length).toFixed(2) : '5.00';
    const descChecked = document.querySelector('input[name="eval_descriptive_rating"]:checked');
    const recChecked = document.querySelector('input[name="eval_recommendation"]:checked');

    return {
        studentId,
        studentName: getVal('eval-student-name'),
        company: getVal('eval-company'),
        program: getVal('eval-program'),
        department: getVal('eval-department'),
        yearSection: getVal('eval-year-section'),
        supervisorName: getVal('eval-supervisor-name'),
        requiredHours: getVal('eval-required-hours'),
        supervisorPos: getVal('eval-supervisor-pos'),
        periodFrom: getVal('eval-period-from'),
        periodTo: getVal('eval-period-to'),
        hoursRendered: getVal('eval-hours-rendered'),
        totalScore: `${totalScore} / ${ids.length * 5}`,
        averageRating: avg,
        summaryHours: getVal('eval-summary-hours'),
        dateEvaluated: getVal('eval-date-evaluated'),
        descriptiveRating: descChecked ? descChecked.value : 'Excellent',
        finalRemarks: getVal('eval-final-remarks'),
        recommendation: recChecked ? recChecked.value : 'Passed',
        strengths: getVal('eval-strengths'),
        improvements: getVal('eval-improvements'),
        additionalComments: getVal('eval-additional-comments'),
        certSupName: getVal('eval-cert-sup-name'),
        certSupDate: getVal('eval-cert-sup-date'),
        certSupContact: getVal('eval-cert-sup-contact'),
        certCoordName: getVal('eval-cert-coord-name'),
        certCoordDate: getVal('eval-cert-coord-date'),
        certSeal: getVal('eval-cert-seal'),
        ratings,
        remarks,
        updatedAt: new Date().toISOString()
    };
}

function saveHteEvaluation() {
    const data = collectCurrentHteEvaluationData();
    if (!data.studentId) return alert('Please select a student trainee to evaluate.');

    const db = getHteEvaluationsDB();
    db[data.studentId] = data;
    saveHteEvaluationsDB(db);

    const badgeEl = document.getElementById('hte-eval-status-badge');
    if (badgeEl) {
        badgeEl.className = 'badge badge-success';
        badgeEl.innerText = `Evaluated • Avg ${data.averageRating} (${data.descriptiveRating})`;
    }

    // Refresh dropdown label checkmark while preserving selection
    renderHteEvaluationForm(data.studentId);

    alert(`Official HTE OJT Evaluation Saved!\n\nStudent Trainee: ${data.studentName}\nTotal Score: ${data.totalScore}\nAverage Rating: ${data.averageRating} (${data.descriptiveRating})\nRecommendation: ${data.recommendation}`);
}

function buildHteEvaluationPrintHTML() {
    const data = collectCurrentHteEvaluationData();
    const descOptions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Needs Improvement'];
    const recOptions = ['Passed', 'For Improvement'];

    const sectionsHtml = HTE_EVAL_SECTIONS.map(sec => `
        <div style="font-weight:bold; font-size:10.5pt; margin:10px 0 4px; text-transform:uppercase;">${esc(sec.title)}</div>
        <table style="width:100%; border-collapse:collapse; font-size:9.5pt; margin-bottom:8px;">
            <thead>
                <tr style="background:#f1f5f9;">
                    <th style="border:1px solid #000; padding:4px 6px; width:34px; text-align:center;">No.</th>
                    <th style="border:1px solid #000; padding:4px 6px; text-align:left;">Criteria</th>
                    <th style="border:1px solid #000; padding:4px 6px; width:28px; text-align:center;">5</th>
                    <th style="border:1px solid #000; padding:4px 6px; width:28px; text-align:center;">4</th>
                    <th style="border:1px solid #000; padding:4px 6px; width:28px; text-align:center;">3</th>
                    <th style="border:1px solid #000; padding:4px 6px; width:28px; text-align:center;">2</th>
                    <th style="border:1px solid #000; padding:4px 6px; width:28px; text-align:center;">1</th>
                    <th style="border:1px solid #000; padding:4px 6px; width:130px; text-align:left;">Remarks</th>
                </tr>
            </thead>
            <tbody>
                ${sec.items.map(item => {
                    const chosen = data.ratings[item.id] || 5;
                    const rem = data.remarks[item.id] || '';
                    return `
                        <tr>
                            <td style="border:1px solid #000; padding:4px 6px; text-align:center;">${item.no}</td>
                            <td style="border:1px solid #000; padding:4px 6px;">${esc(item.text)}</td>
                            ${[5, 4, 3, 2, 1].map(sc => `
                                <td style="border:1px solid #000; padding:4px 6px; text-align:center; font-weight:bold;">${chosen === sc ? '✓' : ''}</td>
                            `).join('')}
                            <td style="border:1px solid #000; padding:4px 6px;">${esc(rem)}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `).join('');

    return `
        <div style="font-family:'Times New Roman', Times, serif; color:#000; line-height:1.35; font-size:10pt;">
            <div style="text-align:center; margin-bottom:10px;">
                <div style="font-size:13pt; font-weight:bold; text-transform:uppercase;">ON-THE-JOB TRAINING EVALUATION FORM</div>
                <div style="font-size:9.5pt; font-style:italic;">(To be accomplished by the immediate supervisor/company representative)</div>
            </div>

            <table style="width:100%; border-collapse:collapse; font-size:9.5pt; margin-bottom:10px;">
                <tbody>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold; width:22%;">Student Trainee:</td>
                        <td style="border:1px solid #000; padding:4px 6px; width:28%;">${esc(data.studentName)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold; width:22%;">Company/Agency:</td>
                        <td style="border:1px solid #000; padding:4px 6px; width:28%;">${esc(data.company)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Course/Program:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(data.program)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Department/Unit Assigned:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(data.department)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Year Level/Section:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(data.yearSection)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Immediate Supervisor:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(data.supervisorName)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Required OJT Hours:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(data.requiredHours)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Position/Designation:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(data.supervisorPos)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Evaluation Period:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">From: ${esc(data.periodFrom)} &nbsp; To: ${esc(data.periodTo)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Total Hours Rendered:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(data.hoursRendered)}</td>
                    </tr>
                </tbody>
            </table>

            <div style="font-size:9.5pt; margin-bottom:8px;">
                <strong>Directions:</strong> Please evaluate the student trainee fairly and objectively based on actual performance during the internship period. Check (✓) the appropriate rating for each item using the scale below.
            </div>

            <div style="font-weight:bold; font-size:10.5pt; margin-bottom:4px; text-transform:uppercase;">Rating Scale</div>
            <table style="width:100%; border-collapse:collapse; font-size:9pt; margin-bottom:10px;">
                <thead>
                    <tr style="background:#f1f5f9;">
                        <th style="border:1px solid #000; padding:3px 6px; width:60px; text-align:center;">Rating</th>
                        <th style="border:1px solid #000; padding:3px 6px; width:150px; text-align:left;">Descriptive Equivalent</th>
                        <th style="border:1px solid #000; padding:3px 6px; text-align:left;">Interpretation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="border:1px solid #000; padding:3px 6px; text-align:center; font-weight:bold;">5</td><td style="border:1px solid #000; padding:3px 6px; font-weight:bold;">Excellent</td><td style="border:1px solid #000; padding:3px 6px;">Consistently exceeds expectations; demonstrates outstanding competence and initiative</td></tr>
                    <tr><td style="border:1px solid #000; padding:3px 6px; text-align:center; font-weight:bold;">4</td><td style="border:1px solid #000; padding:3px 6px; font-weight:bold;">Very Good</td><td style="border:1px solid #000; padding:3px 6px;">Often exceeds expectations; performs tasks with high competence and minimal supervision</td></tr>
                    <tr><td style="border:1px solid #000; padding:3px 6px; text-align:center; font-weight:bold;">3</td><td style="border:1px solid #000; padding:3px 6px; font-weight:bold;">Good</td><td style="border:1px solid #000; padding:3px 6px;">Meets expectations; performs duties satisfactorily and reliably</td></tr>
                    <tr><td style="border:1px solid #000; padding:3px 6px; text-align:center; font-weight:bold;">2</td><td style="border:1px solid #000; padding:3px 6px; font-weight:bold;">Fair</td><td style="border:1px solid #000; padding:3px 6px;">Partially meets expectations; needs regular guidance and improvement</td></tr>
                    <tr><td style="border:1px solid #000; padding:3px 6px; text-align:center; font-weight:bold;">1</td><td style="border:1px solid #000; padding:3px 6px; font-weight:bold;">Needs Improvement</td><td style="border:1px solid #000; padding:3px 6px;">Does not meet expectations; requires close supervision and significant improvement</td></tr>
                </tbody>
            </table>

            ${sectionsHtml}

            <div style="font-weight:bold; font-size:10.5pt; margin:10px 0 4px; text-transform:uppercase;">V. Summary of Evaluation</div>
            <table style="width:100%; border-collapse:collapse; font-size:9.5pt; margin-bottom:10px;">
                <tbody>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold; width:22%;">Total Score:</td>
                        <td style="border:1px solid #000; padding:4px 6px; width:28%; font-weight:bold;">${esc(data.totalScore)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold; width:22%;">Number of Hours Rendered:</td>
                        <td style="border:1px solid #000; padding:4px 6px; width:28%;">${esc(data.summaryHours)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Average Rating:</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">${esc(data.averageRating)}</td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Date Evaluated:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(data.dateEvaluated)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Descriptive Rating:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">
                            ${descOptions.map(opt => `${data.descriptiveRating === opt ? '[✓]' : '[ ]'} ${esc(opt)}`).join(' &nbsp; ')}
                        </td>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Final Remarks:</td>
                        <td style="border:1px solid #000; padding:4px 6px;">${esc(data.finalRemarks)}</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #000; padding:4px 6px; font-weight:bold;">Recommendation:</td>
                        <td style="border:1px solid #000; padding:4px 6px;" colspan="3">
                            ${recOptions.map(opt => `${data.recommendation === opt ? '[✓]' : '[ ]'} ${esc(opt)}`).join(' &nbsp;&nbsp;&nbsp; ')}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="font-weight:bold; font-size:10.5pt; margin:10px 0 4px; text-transform:uppercase;">VI. Supervisor Comments and Recommendations</div>
            <div style="border:1px solid #000; padding:6px 8px; margin-bottom:6px; font-size:9.5pt;">
                <strong>Strengths of the Student Trainee:</strong><br>${esc(data.strengths)}
            </div>
            <div style="border:1px solid #000; padding:6px 8px; margin-bottom:6px; font-size:9.5pt;">
                <strong>Areas for Improvement:</strong><br>${esc(data.improvements)}
            </div>
            <div style="border:1px solid #000; padding:6px 8px; margin-bottom:10px; font-size:9.5pt;">
                <strong>Additional Comments/Recommendations:</strong><br>${esc(data.additionalComments)}
            </div>

            <div style="font-weight:bold; font-size:10.5pt; margin:10px 0 4px; text-transform:uppercase;">VII. Certification</div>
            <div style="font-size:9.5pt; font-style:italic; margin-bottom:6px;">
                I certify that the evaluation above reflects the actual performance of the student trainee during the OJT period.
            </div>
            <table style="width:100%; border-collapse:collapse; font-size:9.5pt;">
                <tbody>
                    <tr>
                        <td style="border:1px solid #000; padding:8px; width:50%; vertical-align:top;">
                            <strong>Immediate Supervisor / Evaluator</strong><br><br>
                            Signature over Printed Name: <u><strong>${esc(data.certSupName)}</strong></u><br>
                            Date: ${esc(data.certSupDate)}<br>
                            Contact Number / Email: ${esc(data.certSupContact)}
                        </td>
                        <td style="border:1px solid #000; padding:8px; width:50%; vertical-align:top;">
                            <strong>OJT Coordinator / Faculty Monitor</strong><br><br>
                            Signature over Printed Name: <u><strong>${esc(data.certCoordName)}</strong></u><br>
                            Date: ${esc(data.certCoordDate)}<br>
                            Company/Agency Seal: ${esc(data.certSeal)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function printHteEvaluationForm() {
    const printContainer = document.getElementById('print-evaluation-container');
    if (!printContainer) return;
    printContainer.innerHTML = buildHteEvaluationPrintHTML();
    document.body.classList.remove('print-mode-narrative');
    document.body.classList.add('print-mode-evaluation');
    window.print();
}

function exportHteEvaluationWordDoc() {
    const data = collectCurrentHteEvaluationData();
    const evalHtml = buildHteEvaluationPrintHTML();
    const cleanName = (data.studentName || 'Student_Trainee').replace(/[^a-zA-Z0-9]+/g, '_');

    const docContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="utf-8">
            <title>ON-THE-JOB TRAINING EVALUATION FORM - ${esc(data.studentName || 'Intern')}</title>
            <style>
                body { font-family: 'Times New Roman', Times, serif; color: #000; line-height: 1.35; font-size: 10pt; padding: 12px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 4px 6px; }
            </style>
        </head>
        <body>
            ${evalHtml}
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OJT_Evaluation_Form_${cleanName}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ================= INTER-ROLE REAL-TIME CHAT SYSTEM ================= */
function isSameAcademicProgram(progA, progB) {
    const clean = (s) => String(s || '')
        .toLowerCase()
        .replace(/bachelor\s+of\s+science\s+in\s+/g, 'bs ')
        .replace(/bachelor\s+science\s+in\s+/g, 'bs ')
        .replace(/bachelor\s+of\s+arts\s+in\s+/g, 'ba ')
        .replace(/bachelor\s+of\s+/g, 'b ')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
    const a = clean(progA);
    const b = clean(progB);
    if (!a || !b) return a === b;
    return a === b;
}

function initChat() {
    const contacts = getAvailableChatContacts();
    if (!contacts.some(c => c.id === appState.activeChatContactId)) {
        appState.activeChatContactId = contacts.length ? contacts[0].id : null;
    }
    renderChatContacts();
    renderActiveChat();
}

function getAvailableChatContacts() {
    if (!appState.currentUser) return [];
    const myId = appState.currentUser.id;
    const myRole = appState.currentUser.role;
    const myCollege = (appState.currentUser.college || '').trim().toUpperCase();
    const myProgram = (appState.currentUser.program || '').trim();
    const myCompany = (appState.currentUser.company || '').trim().toLowerCase();
    let list = usersDB.filter(u => u.id !== myId);

    // Program & Department Scoping for Students and Coordinators
    if (myRole === 'student') {
        list = list.filter(u => {
            const uCollege = (u.college || '').trim().toUpperCase();
            const uProgram = (u.program || '').trim();
            const uCompany = (u.company || '').trim().toLowerCase();

            if (u.role === 'student') {
                // Student interns can ONLY see fellow student interns in the exact same Program (and College)
                const sameCollege = !myCollege || !uCollege || uCollege === myCollege;
                const sameProgram = myProgram ? isSameAcademicProgram(uProgram, myProgram) : sameCollege;
                return sameCollege && sameProgram;
            }
            if (u.role === 'coordinator') {
                // Only see the OJT Coordinator of the student's own College/Department
                return !myCollege || uCollege === myCollege;
            }
            if (u.role === 'supervisor') {
                // Only see HTE Supervisor matched to the student's department or assigned HTE company
                if (myCompany && myCompany !== 'unassigned' && uCompany && uCompany === myCompany) return true;
                return !myCollege || !uCollege || uCollege === myCollege;
            }
            if (u.role === 'admin') {
                return false;
            }
            return true;
        });
    } else if (myRole === 'coordinator' && myCollege) {
        // Coordinator only sees students, coordinators, and supervisors within their own college department
        list = list.filter(u => {
            const uCollege = (u.college || '').trim().toUpperCase();
            if (u.role === 'student' || u.role === 'coordinator') {
                return uCollege === myCollege;
            }
            if (u.role === 'supervisor') {
                return !uCollege || uCollege === myCollege;
            }
            return true;
        });
    }

    // Apply role tab filters
    if (appState.chatFilter === 'coordinators') {
        list = list.filter(u => u.role === 'coordinator');
    } else if (appState.chatFilter === 'supervisors') {
        list = list.filter(u => u.role === 'supervisor');
    } else if (appState.chatFilter === 'students') {
        list = list.filter(u => u.role === 'student');
    }

    // Apply search filter if query exists
    const searchVal = (document.getElementById('chat-search')?.value || '').toLowerCase().trim();
    if (searchVal) {
        list = list.filter(u =>
            u.name.toLowerCase().includes(searchVal)
            || (u.program && u.program.toLowerCase().includes(searchVal))
            || (u.company && u.company.toLowerCase().includes(searchVal))
            || (u.college && u.college.toLowerCase().includes(searchVal))
        );
    }

    return list;
}

function setChatFilter(filter, btn) {
    appState.chatFilter = filter;
    document.querySelectorAll('.chat-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderChatContacts();
}

function filterChatContacts() {
    renderChatContacts();
}

function renderChatContacts() {
    const listContainer = document.getElementById('chat-contacts-list');
    if (!listContainer) return;

    const contacts = getAvailableChatContacts();
    if (!contacts.length) {
        listContainer.innerHTML = '<div style="padding:20px; text-align:center; color:var(--muted); font-size:0.85rem;">No contacts found in your program/department</div>';
        return;
    }

    const myId = appState.currentUser.id;

    listContainer.innerHTML = contacts.map(c => {
        const isActive = c.id === appState.activeChatContactId;
        const thread = appState.messages.filter(m => (m.senderId === myId && m.recipientId === c.id) || (m.senderId === c.id && m.recipientId === myId));
        const lastMsg = thread.length ? thread[thread.length - 1] : null;
        const lastSnippet = lastMsg ? esc(lastMsg.text.slice(0, 38) + (lastMsg.text.length > 38 ? '...' : '')) : 'Start a conversation';
        const roleLabel = getRoleLabel(c.role);
        const roleBadgeClass = c.role === 'admin' ? 'badge-warning' : (c.role === 'coordinator' ? 'badge-coordinator' : (c.role === 'supervisor' ? 'badge-supervisor' : 'badge-student'));
        const subMeta = c.role === 'student'
            ? `${c.college || 'CITE'} • ${c.program || 'Student Intern'}`
            : (c.role === 'coordinator' ? `${c.college || 'NEMSU'} Department` : (c.company || 'Partner HTE'));

        return `
            <div class="chat-contact-item ${isActive ? 'active' : ''}" onclick="selectChatContact('${esc(c.id)}')">
                <div class="avatar" style="flex-shrink:0;">${esc(c.name.charAt(0).toUpperCase())}</div>
                <div class="chat-contact-info">
                    <div class="chat-contact-title">
                        <strong>${esc(c.name)}</strong>
                        <span class="badge ${roleBadgeClass}" style="font-size:0.68rem; padding:2px 8px;">${roleLabel}</span>
                    </div>
                    <div style="font-size:0.71rem; color:var(--nemsu-royal); font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:1px;">${esc(subMeta)}</div>
                    <div class="chat-contact-preview">${lastSnippet}</div>
                </div>
            </div>
        `;
    }).join('');
}

function selectChatContact(contactId) {
    appState.activeChatContactId = contactId;
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) chatContainer.classList.add('in-conversation');
    renderChatContacts();
    renderActiveChat();
}

function closeMobileChat() {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) chatContainer.classList.remove('in-conversation');
}

function renderActiveChat() {
    const contact = usersDB.find(u => u.id === appState.activeChatContactId);
    const headerName = document.getElementById('chat-active-name');
    const headerRole = document.getElementById('chat-active-role');
    const headerAvatar = document.getElementById('chat-active-avatar');
    const msgContainer = document.getElementById('chat-messages');

    if (!contact) {
        if (headerName) headerName.innerText = "Select a contact";
        if (headerRole) headerRole.innerText = "Coordinator, Supervisor, or Intern";
        if (msgContainer) msgContainer.innerHTML = '<div style="text-align:center; padding:40px; color:var(--muted)">Choose a contact to begin messaging.</div>';
        return;
    }

    const roleLabel = getRoleLabel(contact.role);
    const affiliation = contact.role === 'student'
        ? `${contact.college || ''}${contact.program ? ' • ' + contact.program : ''}`
        : (contact.company || contact.college || '');
    if (headerName) headerName.innerText = contact.name;
    if (headerRole) headerRole.innerText = `${roleLabel}${affiliation ? ' • ' + affiliation : ''}`;
    if (headerAvatar) headerAvatar.innerText = contact.name.charAt(0).toUpperCase();

    const myId = appState.currentUser.id;
    const thread = appState.messages.filter(m => (m.senderId === myId && m.recipientId === contact.id) || (m.senderId === contact.id && m.recipientId === myId));

    if (!thread.length) {
        msgContainer.innerHTML = `
            <div class="chat-empty-state">
                <h4>No messages yet</h4>
                <p>Send a secure message to ${esc(contact.name)} (${roleLabel}).</p>
            </div>
        `;
        return;
    }

    msgContainer.innerHTML = thread.map(m => {
        const isSentByMe = m.senderId === myId;
        const senderBadge = isSentByMe ? 'You' : esc(m.senderName);
        return `
            <div class="chat-bubble ${isSentByMe ? 'sent' : 'received'}">
                <div class="chat-bubble-sender">${senderBadge}</div>
                <div class="chat-bubble-text">${esc(m.text)}</div>
                <div class="chat-bubble-time">${esc(m.time || 'Just now')}</div>
            </div>
        `;
    }).join('');

    msgContainer.scrollTop = msgContainer.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chat-input-text');
    const text = input.value.trim();
    if (!text || !appState.activeChatContactId || !appState.currentUser) return;

    const targetContact = usersDB.find(u => u.id === appState.activeChatContactId);
    if (!targetContact) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
        id: Date.now(),
        senderId: appState.currentUser.id,
        senderName: appState.currentUser.name,
        senderRole: appState.currentUser.role,
        recipientId: targetContact.id,
        text,
        time: timeStr
    };

    appState.messages.push(newMsg);
    persistMessages();
    input.value = '';
    renderActiveChat();
    renderChatContacts();

    // Auto-reply simulation for seamless single-user testing across roles
    triggerSimulatedReply(targetContact, text);
}

function sendQuickMessage(text) {
    const input = document.getElementById('chat-input-text');
    input.value = text;
    sendChatMessage();
}

function chatWithUser(userId) {
    const target = usersDB.find(u => u.id === userId);
    if (!target) return;
    appState.activeChatContactId = userId;
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) chatContainer.classList.add('in-conversation');
    
    // Switch to chat tab
    const navItem = document.querySelector('#sec-chat') ? document.querySelectorAll('.nav-item') : null;
    let chatNavBtn = null;
    document.querySelectorAll('.nav-item').forEach(el => {
        if (el.innerText.includes('Messages & Chat')) chatNavBtn = el;
    });
    switchTab('sec-chat', chatNavBtn);
}

function chatWithRole(role) {
    let contact;
    if (role === 'coordinator' && appState.currentUser && appState.currentUser.role === 'student') {
        const myCollege = (appState.currentUser.college || '').trim().toUpperCase();
        contact = usersDB.find(u => u.role === 'coordinator' && (u.college || '').trim().toUpperCase() === myCollege) || usersDB.find(u => u.role === 'coordinator');
    } else {
        contact = usersDB.find(user => user.role === role);
    }
    if (!contact) return alert(`No ${getRoleLabel(role)} account has been created yet.`);
    chatWithUser(contact.id);
}

function triggerSimulatedReply(recipient, originalText) {
    // If you're testing alone and message someone else, provide an immediate contextual confirmation
    setTimeout(() => {
        let reply = '';
        if (recipient.role === 'admin') {
            reply = `Acknowledged. The System Owner has received your update regarding: "${originalText.slice(0, 30)}..."`;
        } else if (recipient.role === 'coordinator') {
            reply = `Acknowledged. The OJT Coordinator has received your update regarding: "${originalText.slice(0, 30)}..."`;
        } else if (recipient.role === 'supervisor') {
            reply = `Received. Engr. Elena has noted your HTE progress and verified your schedule.`;
        } else {
            reply = `Hello! Thank you for the update. I will take note of this accordingly.`;
        }

        const replyMsg = {
            id: Date.now() + 1,
            senderId: recipient.id,
            senderName: recipient.name,
            senderRole: recipient.role,
            recipientId: appState.currentUser.id,
            text: reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        appState.messages.push(replyMsg);
        persistMessages();
        renderActiveChat();
        renderChatContacts();
        renderNotifications();
    }, 1200);
}

/* ================= GPS, BIOMETRICS & CSC FORM 48 4-PUNCH ATTENDANCE ================= */
const HTE_LAT = 9.0821; 
const HTE_LON = 126.1969;
let videoStream = null;
let attendanceLocation = null;
let lastCapturedAttendancePhoto = null;
let currentTaskPhotoData = null;
let currentViewingLogId = null;

const PUNCH_CONFIG = {
    'AM_IN': {
        key: 'AM_IN',
        label: 'AM Arrival (Morning In)',
        shortLabel: 'AM Arrival',
        btnText: 'Clock In Now (AM Arrival)',
        submitText: 'Save AM Arrival Record',
        title: 'DTR Attendance - AM Arrival (Time-In)',
        icon: '',
        isOut: false,
        period: 'AM'
    },
    'AM_OUT': {
        key: 'AM_OUT',
        label: 'AM Departure (Lunch Break)',
        shortLabel: 'AM Departure',
        btnText: 'Clock Out Now (AM Departure)',
        submitText: 'Save AM Departure Record',
        title: 'DTR Attendance - AM Departure (Time-Out)',
        icon: '',
        isOut: true,
        period: 'AM'
    },
    'PM_IN': {
        key: 'PM_IN',
        label: 'PM Arrival (Afternoon In)',
        shortLabel: 'PM Arrival',
        btnText: 'Clock In Now (PM Arrival)',
        submitText: 'Save PM Arrival Record',
        title: 'DTR Attendance - PM Arrival (Time-In)',
        icon: '',
        isOut: false,
        period: 'PM'
    },
    'PM_OUT': {
        key: 'PM_OUT',
        label: 'PM Departure (Day-End Out)',
        shortLabel: 'PM Departure',
        btnText: 'Clock Out Now (PM Departure)',
        submitText: 'Save PM Departure Record',
        title: 'DTR Attendance - PM Departure (Time-Out)',
        icon: '',
        isOut: true,
        period: 'PM'
    }
};

let selectedPunchType = 'AM_IN';

function getPunchConfig(type) {
    return PUNCH_CONFIG[type] || PUNCH_CONFIG['AM_IN'];
}

function getLogPunchType(log) {
    if (!log) return 'AM_IN';
    if (log.punchType) return log.punchType;
    const title = (log.title || '').toLowerCase();
    const checkIn = (log.checkInTime || '').toUpperCase();
    const isOut = title.includes('out') || title.includes('departure');
    const isPm = log.period === 'PM' || checkIn.includes('PM');

    if (isOut) {
        return isPm ? 'PM_OUT' : 'AM_OUT';
    } else {
        return isPm ? 'PM_IN' : 'AM_IN';
    }
}

function getTodayAttendanceRecords(studentName, date) {
    return appState.logs.filter(l => 
        l.kind === 'attendance' && 
        l.student === studentName && 
        l.date === date
    );
}

function parseTimeString(timeStr, dateStr) {
    if (!timeStr) return null;
    const match = timeStr.match(/(\d+):(\d+)(?::\d+)?\s*(AM|PM)?/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const meridian = match[3] ? match[3].toUpperCase() : null;
    if (meridian === 'PM' && hours < 12) hours += 12;
    if (meridian === 'AM' && hours === 12) hours = 0;
    
    const d = dateStr ? new Date(dateStr) : new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
}

function calculatePunchHours(punchType, nowTime, inLog) {
    if (punchType === 'AM_IN' || punchType === 'PM_IN') return 0;
    if (inLog && inLog.checkInTime) {
        const inDate = parseTimeString(inLog.checkInTime, inLog.date);
        if (inDate) {
            const diffMs = nowTime.getTime() - inDate.getTime();
            const diffHours = Math.max(0.1, Math.round((diffMs / (1000 * 60 * 60)) * 10) / 10);
            return diffHours >= 0.5 ? Math.min(6.0, diffHours) : 4.0;
        }
    }
    return 4.0;
}

let dtrClockInterval = null;

function getPunchTimeGate(punchType, now, todayLogs) {
    const cfg = getPunchConfig(punchType);
    const existingLog = todayLogs.find(l => getLogPunchType(l) === punchType);
    if (existingLog) {
        return {
            allowed: false,
            isRecorded: true,
            isLocked: false,
            badgeText: existingLog.checkInTime,
            statusBadge: 'Recorded ✓',
            statusClass: 'badge badge-success',
            reason: `${cfg.label} was already recorded today at ${existingLog.checkInTime}.`
        };
    }

    const hour = now.getHours();
    const amInLog = todayLogs.find(l => getLogPunchType(l) === 'AM_IN');
    const pmInLog = todayLogs.find(l => getLogPunchType(l) === 'PM_IN');
    const currentTimeFormatted = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (punchType === 'AM_IN') {
        if (hour >= 12) {
            return {
                allowed: false,
                isRecorded: false,
                isLocked: true,
                badgeText: 'Closed (AM)',
                statusBadge: 'AM Window Closed',
                statusClass: 'badge badge-warning',
                unlockLabel: '8:00 AM Tomorrow',
                reason: `Current time is ${currentTimeFormatted}. Morning In (8:00 AM Shift) is only open before 12:00 PM.`
            };
        }
        return {
            allowed: true,
            isRecorded: false,
            isLocked: false,
            badgeText: 'Open (8:00 AM)',
            statusBadge: 'Open for Morning In',
            statusClass: 'badge badge-success',
            reason: `Current time is ${currentTimeFormatted}. Live Camera is ready for Morning In (AM Arrival) only — Morning Out remains locked until 12:00 PM.`
        };
    }

    if (punchType === 'AM_OUT') {
        if (hour < 12) {
            return {
                allowed: false,
                isRecorded: false,
                isLocked: true,
                badgeText: 'Locked • 12:00 PM',
                statusBadge: 'Locked Until 12:00 PM',
                statusClass: 'badge badge-warning',
                unlockLabel: '12:00 PM',
                reason: `Current time is ${currentTimeFormatted} (not yet 12:00 PM). Live Camera cannot be used for Morning Out until 12:00 PM.`
            };
        }
        if (!amInLog) {
            return {
                allowed: false,
                isRecorded: false,
                isLocked: true,
                badgeText: 'Needs AM In',
                statusBadge: 'Requires Morning In',
                statusClass: 'badge badge-warning',
                unlockLabel: 'Requires AM In',
                reason: `Morning In (AM Arrival) was not recorded today. You cannot clock Morning Out without a Morning In record.`
            };
        }
        return {
            allowed: true,
            isRecorded: false,
            isLocked: false,
            badgeText: 'Open (12:00 PM)',
            statusBadge: 'Open for Morning Out',
            statusClass: 'badge badge-success',
            reason: `12:00 PM window reached (${currentTimeFormatted}). Live Camera is now unlocked for Morning Out (Lunch Break).`
        };
    }

    if (punchType === 'PM_IN') {
        if (hour < 12) {
            return {
                allowed: false,
                isRecorded: false,
                isLocked: true,
                badgeText: 'Locked • 1:00 PM',
                statusBadge: 'Locked Until Afternoon',
                statusClass: 'badge badge-warning',
                unlockLabel: '12:00 PM / 1:00 PM',
                reason: `Current time is ${currentTimeFormatted}. Afternoon In (1:00 PM Shift) is locked during the morning session.`
            };
        }
        return {
            allowed: true,
            isRecorded: false,
            isLocked: false,
            badgeText: 'Open (1:00 PM)',
            statusBadge: 'Open for Afternoon In',
            statusClass: 'badge badge-success',
            reason: `Current time is ${currentTimeFormatted}. Live Camera is ready for Afternoon In (PM Arrival) — Afternoon Out remains locked until 5:00 PM.`
        };
    }

    if (punchType === 'PM_OUT') {
        if (hour < 17) {
            return {
                allowed: false,
                isRecorded: false,
                isLocked: true,
                badgeText: 'Locked • 5:00 PM',
                statusBadge: 'Locked Until 5:00 PM',
                statusClass: 'badge badge-warning',
                unlockLabel: '5:00 PM',
                reason: `Current time is ${currentTimeFormatted} (not yet 5:00 PM). Live Camera cannot be used for Afternoon Out until 5:00 PM.`
            };
        }
        if (!pmInLog) {
            return {
                allowed: false,
                isRecorded: false,
                isLocked: true,
                badgeText: 'Needs PM In',
                statusBadge: 'Requires Afternoon In',
                statusClass: 'badge badge-warning',
                unlockLabel: 'Requires PM In',
                reason: `Afternoon In (PM Arrival) must be recorded first before you can use Live Camera for Afternoon Out.`
            };
        }
        // Prevent immediate OUT within the same minute/hour if PM_IN was clocked after 5:00 PM
        const pmInDate = parseTimeString(pmInLog.checkInTime, pmInLog.date);
        if (pmInDate && (now.getTime() - pmInDate.getTime()) < 30 * 60 * 1000) {
            return {
                allowed: false,
                isRecorded: false,
                isLocked: true,
                badgeText: 'In Progress',
                statusBadge: 'Shift In Progress',
                statusClass: 'badge badge-warning',
                unlockLabel: 'After Shift Completion',
                reason: `You just recorded Afternoon In at ${pmInLog.checkInTime}. You cannot use Live Camera for Afternoon Out immediately after clocking in.`
            };
        }
        return {
            allowed: true,
            isRecorded: false,
            isLocked: false,
            badgeText: 'Open (5:00 PM)',
            statusBadge: 'Open for Afternoon Out',
            statusClass: 'badge badge-success',
            reason: `5:00 PM window reached (${currentTimeFormatted}). Live Camera is now unlocked for Afternoon Out (Day-End).`
        };
    }

    return { allowed: true, isRecorded: false, isLocked: false, badgeText: '--:--', statusBadge: 'Open', statusClass: 'badge badge-success', reason: '' };
}

function selectPunchType(type) {
    if (selectedPunchType !== type) {
        stopCamera();
    }
    selectedPunchType = type;
    updatePunchUI();
}

function updatePunchUI() {
    const student = appState.currentUser;
    if (!student) return;
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const todayLogs = getTodayAttendanceRecords(student.name, date);

    const clockEl = document.getElementById('dtr-live-clock-text');
    if (clockEl) {
        clockEl.innerText = `System Time: ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    }

    ['AM_IN', 'AM_OUT', 'PM_IN', 'PM_OUT'].forEach(key => {
        const btn = document.getElementById(`punch-btn-${key}`);
        const badge = document.getElementById(`badge-${key}`);
        if (!btn || !badge) return;

        const gate = getPunchTimeGate(key, now, todayLogs);
        if (gate.isRecorded) {
            btn.classList.add('recorded');
            btn.classList.remove('locked-slot');
            badge.innerHTML = `${gate.badgeText} <svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
            badge.title = gate.reason;
        } else if (gate.isLocked) {
            btn.classList.remove('recorded');
            btn.classList.add('locked-slot');
            badge.innerText = gate.badgeText;
            badge.title = gate.reason;
        } else {
            btn.classList.remove('recorded', 'locked-slot');
            badge.innerText = gate.badgeText;
            badge.title = gate.reason;
        }

        if (key === selectedPunchType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const cfg = getPunchConfig(selectedPunchType);
    const activeGate = getPunchTimeGate(selectedPunchType, now, todayLogs);

    const hintLabel = document.getElementById('punch-active-label');
    if (hintLabel) {
        hintLabel.innerText = cfg.label;
    }

    const gateBadgeEl = document.getElementById('punch-gate-status-badge');
    if (gateBadgeEl) {
        gateBadgeEl.className = activeGate.statusClass;
        gateBadgeEl.innerText = activeGate.statusBadge;
    }

    const gateReasonEl = document.getElementById('punch-gate-reason-text');
    if (gateReasonEl) {
        gateReasonEl.innerText = activeGate.reason;
    }

    const startCamBtn = document.getElementById('btn-start-cam');
    const placeholderEl = document.getElementById('cam-placeholder');
    if (startCamBtn) {
        if (!activeGate.allowed) {
            startCamBtn.disabled = true;
            startCamBtn.classList.add('btn-locked');
            startCamBtn.innerHTML = `<svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> ${activeGate.isRecorded ? 'Slot Already Recorded' : 'Live Camera Locked (' + (activeGate.unlockLabel || 'Time Restricted') + ')'}`;
            if (placeholderEl && !videoStream) {
                placeholderEl.innerText = activeGate.reason;
            }
        } else {
            startCamBtn.disabled = false;
            startCamBtn.classList.remove('btn-locked');
            startCamBtn.innerHTML = `<svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Open Live Camera (${cfg.shortLabel})`;
            if (placeholderEl && !videoStream) {
                placeholderEl.innerText = `Camera off. Click "Open Live Camera (${cfg.shortLabel})" to start.`;
            }
        }
    }

    const captureBtn = document.getElementById('btn-capture');
    if (captureBtn) {
        captureBtn.innerHTML = `<svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${cfg.btnText}`;
    }

    const submitBtn = document.getElementById('btn-submit-att');
    if (submitBtn) {
        submitBtn.innerHTML = `<svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ${cfg.submitText}`;
    }
}

function renderPunchStatusBoard() {
    const student = appState.currentUser;
    if (!student || student.role !== 'student') return;

    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const dateEl = document.getElementById('punch-today-date');
    if (dateEl) {
        dateEl.innerText = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }

    const todayLogs = getTodayAttendanceRecords(student.name, date);
    const recordedPunches = new Set(todayLogs.map(l => getLogPunchType(l)));

    // Smart auto-selection respecting Morning (before 12 PM) vs Afternoon (12 PM+)
    const currentHour = now.getHours();
    let nextSlot = 'AM_IN';

    if (currentHour < 12) {
        // Morning: if AM_IN not recorded, select AM_IN; if AM_IN is recorded, select AM_OUT (which shows Locked until 12:00 PM!)
        nextSlot = !recordedPunches.has('AM_IN') ? 'AM_IN' : 'AM_OUT';
    } else if (currentHour === 12) {
        // 12:00 PM Lunch hour: if AM_IN was recorded and AM_OUT not yet recorded, select AM_OUT; otherwise PM_IN
        nextSlot = (recordedPunches.has('AM_IN') && !recordedPunches.has('AM_OUT')) ? 'AM_OUT' : 'PM_IN';
    } else {
        // Afternoon (1:00 PM+): if PM_IN not recorded, select PM_IN; otherwise PM_OUT (which is Locked until 5:00 PM)
        nextSlot = !recordedPunches.has('PM_IN') ? 'PM_IN' : 'PM_OUT';
    }

    selectedPunchType = nextSlot;
    updatePunchUI();
    renderLiveOjtDtrPreview();

    if (!dtrClockInterval) {
        dtrClockInterval = setInterval(() => {
            if (appState.currentUser && appState.currentUser.role === 'student') {
                updatePunchUI();
            }
        }, 15000);
    }
}

function renderPhotoThumbnail(log) {
    if (log && log.photo) {
        return `
            <div class="photo-thumbnail-wrap" onclick="viewEvidencePhoto(${log.id})" title="Click to view real-time verification photo">
                <img src="${log.photo}" alt="Verification Photo" class="photo-thumbnail">
            </div>
        `;
    }
    return `<span class="photo-placeholder-badge">No Photo</span>`;
}

function viewEvidencePhoto(logId) {
    const log = appState.logs.find(l => l.id === logId);
    if (!log) return;
    currentViewingLogId = logId;

    const modal = document.getElementById('evidence-modal');
    const titleEl = document.getElementById('evidence-modal-title');
    const imgEl = document.getElementById('evidence-modal-img');
    const studentEl = document.getElementById('evidence-modal-student');
    const statusEl = document.getElementById('evidence-modal-status');
    const detailsEl = document.getElementById('evidence-modal-details');
    const geotagEl = document.getElementById('evidence-modal-geotag');
    const reviewBtns = document.getElementById('evidence-modal-review-btns');

    if (titleEl) {
        if (log.kind === 'attendance') {
            const pType = getLogPunchType(log);
            const cfg = getPunchConfig(pType);
            titleEl.innerText = `Live Camera DTR: ${cfg.shortLabel}`;
        } else {
            titleEl.innerText = 'Live Camera Task Evidence Verification';
        }
    }
    if (imgEl) {
        if (log.photo) {
            imgEl.src = log.photo;
            imgEl.style.display = 'inline-block';
        } else {
            imgEl.src = '';
            imgEl.style.display = 'none';
        }
    }
    if (studentEl) {
        studentEl.innerText = `${log.student} — ${log.date}`;
    }
    if (statusEl) {
        statusEl.innerText = log.status;
        statusEl.className = `badge badge-${log.status === 'Approved' ? 'success' : (log.status === 'Rejected' ? 'danger' : 'warning')}`;
    }
    if (detailsEl) {
        detailsEl.innerHTML = `<strong>${esc(log.title)}</strong> (${log.hours} hrs rendered)<br><span style="color:var(--text);">${esc(log.description)}</span>`;
    }
    if (geotagEl) {
        geotagEl.style.display = 'inline-flex';
        geotagEl.innerHTML = `<svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Live Camera Capture Verified • ${esc(log.date)}${log.checkInTime ? ' (' + esc(log.checkInTime) + ')' : ''}`;
    }

    const userRole = appState.currentUser ? appState.currentUser.role : '';
    const canReview = (userRole === 'admin' || userRole === 'coordinator' || userRole === 'supervisor') && log.status === 'Pending Review';
    if (reviewBtns) {
        reviewBtns.style.display = canReview ? 'inline-flex' : 'none';
    }

    if (modal) modal.classList.add('show');
}

function closeEvidenceModal() {
    const modal = document.getElementById('evidence-modal');
    if (modal) modal.classList.remove('show');
    currentViewingLogId = null;
}

function approveFromEvidenceModal() {
    if (!currentViewingLogId) return;
    processApproval(currentViewingLogId, 'Approved');
    const statusEl = document.getElementById('evidence-modal-status');
    if (statusEl) {
        statusEl.innerText = 'Approved';
        statusEl.className = 'badge badge-success';
    }
    const reviewBtns = document.getElementById('evidence-modal-review-btns');
    if (reviewBtns) reviewBtns.style.display = 'none';
    setTimeout(closeEvidenceModal, 450);
}

function rejectFromEvidenceModal() {
    if (!currentViewingLogId) return;
    processApproval(currentViewingLogId, 'Rejected');
    const statusEl = document.getElementById('evidence-modal-status');
    if (statusEl) {
        statusEl.innerText = 'Rejected';
        statusEl.className = 'badge badge-danger';
    }
    const reviewBtns = document.getElementById('evidence-modal-review-btns');
    if (reviewBtns) reviewBtns.style.display = 'none';
    setTimeout(closeEvidenceModal, 450);
}

function startCamera() {
    const student = appState.currentUser;
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const todayLogs = student ? getTodayAttendanceRecords(student.name, todayStr) : [];
    const gate = getPunchTimeGate(selectedPunchType, now, todayLogs);
    if (!gate.allowed) {
        updatePunchUI();
        return alert(gate.reason);
    }

    const overlay = document.getElementById('camera-overlay');
    if (overlay) {
        overlay.innerHTML = `<svg class="badge-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Live Camera Active • Real-Time DTR Capture`;
    }
    activateVideo();
}

function activateVideo() {
    const video = document.getElementById('webcam');
    document.getElementById('cam-placeholder').style.display = 'none';
    video.style.display = 'block';
    document.getElementById('camera-overlay').style.display = 'block';
    
    document.getElementById('btn-start-cam').classList.add('hidden');
    document.getElementById('btn-capture').classList.remove('hidden');

    navigator.mediaDevices?.getUserMedia({ video: { facingMode: "user" } })
        .then(stream => { videoStream = stream; video.srcObject = stream; })
        .catch(() => { 
            document.getElementById('cam-placeholder').innerText = "Live camera simulated for testing environment."; 
            document.getElementById('cam-placeholder').style.display = 'block';
            video.style.display = 'none';
        });
}

function takeSnapshot() {
    const student = appState.currentUser;
    const nowCheck = new Date();
    const todayStr = `${nowCheck.getFullYear()}-${String(nowCheck.getMonth() + 1).padStart(2, '0')}-${String(nowCheck.getDate()).padStart(2, '0')}`;
    const todayLogs = student ? getTodayAttendanceRecords(student.name, todayStr) : [];
    const gate = getPunchTimeGate(selectedPunchType, nowCheck, todayLogs);
    if (!gate.allowed) {
        resetCameraUI();
        return alert(gate.reason);
    }

    const video = document.getElementById('webcam');
    const canvas = document.getElementById('snapshot');
    const ctx = canvas.getContext('2d');
    canvas.width = 360; 
    canvas.height = 270;

    const cfg = getPunchConfig(selectedPunchType);
    const internName = appState.currentUser ? appState.currentUser.name : 'Intern Trainee';

    const hasActiveStream = videoStream && video && video.videoWidth && video.readyState >= 2;
    if (hasActiveStream) {
        ctx.save();
        ctx.translate(canvas.width, 0); 
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();
    } else {
        // Fallback simulation graphic if camera permissions are unavailable or running in local dev
        ctx.fillStyle = '#102426';
        ctx.fillRect(0, 0, 360, 270);
        ctx.fillStyle = '#e8a317';
        ctx.beginPath();
        ctx.arc(180, 100, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1f8a63';
        ctx.beginPath();
        ctx.arc(180, 240, 85, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(20, 195, 320, 55);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(cfg.title.toUpperCase(), 32, 218);
        ctx.fillStyle = '#34c08a';
        ctx.font = '10px sans-serif';
        ctx.fillText(`${internName} • Live Camera DTR`, 32, 235);
    }

    // Add real-time timestamp watermark banner directly onto canvas photo
    const now = new Date();
    const timeStamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStamp = now.toLocaleDateString();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
    ctx.fillRect(0, canvas.height - 28, canvas.width, 28);
    ctx.fillStyle = '#34c08a';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`${dateStamp} ${timeStamp} • ${cfg.label}`, 8, canvas.height - 15);
    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${internName} • Live Camera Verified (Official OJT DTR)`, 8, canvas.height - 5);

    lastCapturedAttendancePhoto = canvas.toDataURL('image/jpeg', 0.8);
    
    video.style.display = 'none';
    canvas.style.display = 'block';
    stopCameraStream(); 
    document.getElementById('btn-capture').classList.add('hidden');
    document.getElementById('btn-submit-att').classList.remove('hidden');
}

function submitAttendance() {
    const student = appState.currentUser;
    if (!student || student.role !== 'student') return alert('Only student interns can record attendance.');

    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const todayLogs = getTodayAttendanceRecords(student.name, date);
    const existingPunch = todayLogs.find(l => getLogPunchType(l) === selectedPunchType);
    const cfg = getPunchConfig(selectedPunchType);

    if (existingPunch) {
        return alert(`You have already recorded ${cfg.label} for today at ${existingPunch.checkInTime}.`);
    }

    const gate = getPunchTimeGate(selectedPunchType, now, todayLogs);
    if (!gate.allowed) {
        resetCameraUI();
        return alert(gate.reason);
    }

    const checkInTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Calculate rendered hours for departure/clock-out punches
    let renderedHours = 0;
    if (cfg.isOut) {
        const correspondingIn = selectedPunchType === 'AM_OUT' ? 'AM_IN' : 'PM_IN';
        const inLog = todayLogs.find(l => getLogPunchType(l) === correspondingIn);
        renderedHours = calculatePunchHours(selectedPunchType, now, inLog);
    }

    const hoursNote = renderedHours > 0 ? ` Rendered: ${renderedHours} hrs.` : '';
    const description = `${cfg.label} recorded at ${checkInTime}.${hoursNote} Verified via real-time live camera capture.`;

    appState.logs.unshift({
        id: Date.now(),
        student: student.name,
        date,
        title: cfg.title,
        hours: renderedHours,
        description,
        status: 'Pending Review',
        kind: 'attendance',
        punchType: selectedPunchType,
        checkInTime,
        period: cfg.period,
        photo: lastCapturedAttendancePhoto
    });
    persistLogs();
    renderStudentDashboard();
    renderWeeklyLogList();
    renderAdminTaskApprovals();
    renderSupervisorDashboard();
    renderSupervisorTaskApprovals();
    renderPunchStatusBoard();
    renderNotifications();
    
    lastCapturedAttendancePhoto = null;
    attendanceLocation = null;
    document.getElementById('btn-submit-att').classList.add('hidden');
    document.getElementById('btn-start-cam').classList.remove('hidden');
    document.getElementById('snapshot').style.display = 'none';
    document.getElementById('cam-placeholder').style.display = 'block';
    document.getElementById('cam-placeholder').innerText = 'Camera off. Click "Open Live Camera" to start.';
    document.getElementById('camera-overlay').style.display = 'none';

    alert(`${cfg.label} saved successfully! (${checkInTime}${renderedHours > 0 ? ' • ' + renderedHours + ' hrs rendered' : ''})\n\nLive camera photo and timestamp sent for Coordinator and Supervisor review.`);
    switchTab('stu-dashboard', document.querySelectorAll('#nav-student .nav-item')[0]);
}

function stopCameraStream() { 
    if (videoStream) {
        videoStream.getTracks().forEach(t => t.stop());
        videoStream = null;
    }
}

function stopCamera() { 
    stopCameraStream(); 
    const webcam = document.getElementById('webcam');
    const snapshot = document.getElementById('snapshot');
    const placeholder = document.getElementById('cam-placeholder');
    const overlay = document.getElementById('camera-overlay');
    const btnCapture = document.getElementById('btn-capture');
    const btnSubmit = document.getElementById('btn-submit-att');
    const btnStart = document.getElementById('btn-start-cam');

    if (webcam) webcam.style.display = 'none';
    if (snapshot) snapshot.style.display = 'none';
    if (placeholder) {
        placeholder.style.display = 'block';
        placeholder.innerText = 'Camera off. Click "Open Live Camera" to start.';
    }
    if (overlay) overlay.style.display = 'none';
    if (btnCapture) btnCapture.classList.add('hidden');
    if (btnSubmit) btnSubmit.classList.add('hidden');
    if (btnStart) btnStart.classList.remove('hidden');
}

document.addEventListener('click', event => {
    const accountArea = document.querySelector('.account-area');
    if (accountArea && !accountArea.contains(event.target)) closeProfileMenu();
    const sidebarCard = document.getElementById('sidebar-user-card');
    if (sidebarCard && !sidebarCard.contains(event.target)) closeSidebarProfileMenu();
    const notifArea = document.getElementById('notif-area');
    if (notifArea && !notifArea.contains(event.target)) closeNotifMenu();
});

document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeProfileMenu();
    closeSidebarProfileMenu();
    closeNotifMenu();
    toggleSidebar(false);
    ['profile-modal', 'settings-modal'].forEach(modalId => {
        if (document.getElementById(modalId)?.classList.contains('show')) closeAccountModal(modalId);
    });
    if (document.getElementById('alert-modal')?.classList.contains('show')) closeAlertModal();
    if (document.getElementById('assign-hte-modal')?.classList.contains('show')) closeAssignModal();
    if (document.getElementById('evidence-modal')?.classList.contains('show')) closeEvidenceModal();
    if (document.getElementById('narrative-report-modal')?.classList.contains('show')) closeNarrativeReportModal();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        toggleSidebar(false);
    }
});

// Keep Live Camera DTR clock badge and shift schedule gates updated in real time
let lastPunchGateMinute = -1;
setInterval(() => {
    const attPage = document.getElementById('stu-attendance');
    if (!attPage || attPage.classList.contains('hidden')) return;
    const now = new Date();
    const liveClockEl = document.getElementById('dtr-live-clock-text');
    if (liveClockEl) {
        liveClockEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    const currentMin = now.getHours() * 60 + now.getMinutes();
    if (currentMin !== lastPunchGateMinute && !videoStream) {
        lastPunchGateMinute = currentMin;
        renderPunchStatusBoard();
    }
}, 1000);