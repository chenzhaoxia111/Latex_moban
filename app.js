// ===== 工具函数 =====
function $(selector) {
    return document.querySelector(selector);
}

function $val(id, defaultValue = '') {
    const el = document.getElementById(id);
    return el ? el.value : defaultValue;
}

function $text(selector, defaultValue = '') {
    const el = document.querySelector(selector);
    return el ? el.textContent : defaultValue;
}

// ===== 全局状态 =====
let currentLevel = ''; // beginner, intermediate, expert
let currentIndustry = '';
let pageHistory = [];
let currentTemplate = 'internet-cv';

// 简历状态
let resumeState = {
    name: '',
    position: '',
    phone: '',
    email: '',
    city: '',
    website: '',
    summary: '',
    skills: '',
    languages: '',
    certificates: '',
    education: [],
    work: [],
    project: []
};

// 样式状态
let styleState = {
    layout: 'default', // default, avatar_left, two_column
    font: 'default', // default, song
    margin: 'default', // default, large
    compact: false
};

// ===== 页面导航 =====
function goHome() {
    showPage('page-welcome');
    pageHistory = [];
}

function goBack() {
    if (pageHistory.length > 0) {
        const prevPage = pageHistory.pop();
        showPage(prevPage, false);
    } else {
        showPage('page-welcome', false);
    }
}

function showPage(pageId, addHistory = true) {
    const currentPage = document.querySelector('.page.active');
    if (currentPage && addHistory) {
        pageHistory.push(currentPage.id);
    }
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // 特殊处理
    if (pageId === 'page-beginner') {
        setTimeout(updatePreview, 100);
    }
    if (pageId === 'page-intermediate') {
        setTimeout(() => showCodeTemplate(currentTemplate), 100);
    }
}

// ===== 分类切换 =====
function switchCategory(category, btn) {
    // 更新tab激活状态
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // 显示对应分类的卡片
    document.querySelectorAll('.industry-card').forEach(card => {
        card.style.display = 'none';
    });
    document.querySelectorAll('.category-' + category).forEach(card => {
        card.style.display = 'block';
    });
}

// ===== 用户分层选择 =====
function selectLevel(level) {
    currentLevel = level;
    
    if (level === 'beginner') {
        showPage('page-industry');
    } else if (level === 'intermediate') {
        showPage('page-intermediate');
    } else if (level === 'expert') {
        showPage('page-expert');
    }
}

// ===== 行业选择 =====
function selectIndustry(industry) {
    currentIndustry = industry;
    
    // 简历类模板走新手模式，其他模板走进阶模式（代码查看）
    const resumeTypes = ['internet', 'soe', 'foreign', 'finance', 'creative', 'academic'];
    
    if (resumeTypes.includes(industry)) {
        showPage('page-beginner');
        updateFormPlaceholders(industry);
    } else {
        // 非简历类模板，跳转到进阶模式并显示对应代码
        const tplMap = {
            'thesis': 'thesis',
            'paper': 'paper',
            'report': 'report-academic',
            'proposal': 'proposal',
            'business-report': 'business-report',
            'proposal-tech': 'proposal',
            'cover-letter-doc': 'cover-letter',
            'beamer': 'paper',
            'poster': 'paper'
        };
        const tplId = tplMap[industry] || 'thesis';
        currentTemplate = tplId;
        showPage('page-intermediate');
        setTimeout(() => {
            showCodeTemplate(tplId);
            showToast('该模板提供完整LaTeX代码，可直接复制使用');
        }, 200);
    }
}

function updateFormPlaceholders(industry) {
    // 可以根据不同行业调整提示内容
    const tips = {
        internet: {
            position: '如：前端开发工程师、产品经理',
            projTech: '如：React, Node.js, MongoDB, Redis'
        },
        soe: {
            position: '如：行政管理岗、技术岗',
            projTech: '如：Java, Oracle, Spring Boot'
        },
        foreign: {
            position: '如：Senior Product Manager',
            projTech: '如：Python, AWS, PostgreSQL'
        },
        finance: {
            position: '如：金融分析师、风控专员',
            projTech: '如：Python, SQL, SAS'
        },
        creative: {
            position: '如：UI设计师、创意总监',
            projTech: '如：Figma, Sketch, Adobe CC'
        },
        academic: {
            position: '如：助理研究员、博士后',
            projTech: '如：Python, TensorFlow, LaTeX'
        }
    };
    
    const config = tips[industry] || tips.internet;
}

// ===== 表单折叠 =====
function toggleSection(el) {
    el.classList.toggle('collapsed');
}

// ===== 动态添加/删除经历 =====
function addExperience(type) {
    const list = document.getElementById(type + '-list');
    const firstItem = list.querySelector('.experience-item');
    const newItem = firstItem.cloneNode(true);
    
    // 清空输入值
    newItem.querySelectorAll('input, textarea, select').forEach(input => {
        input.value = '';
        input.oninput = updatePreview;
        input.onchange = updatePreview;
    });
    
    list.appendChild(newItem);
    updatePreview();
}

function removeExperience(btn, type) {
    const list = document.getElementById(type + '-list');
    const items = list.querySelectorAll('.experience-item');
    
    if (items.length <= 1) {
        showToast('至少保留一项', 'error');
        return;
    }
    
    btn.closest('.experience-item').remove();
    updatePreview();
}

// ===== 收集表单数据 =====
function collectFormData() {
    // 如果表单页面不可见，返回默认数据
    if (!document.getElementById('name')) {
        return {
            name: '张三',
            position: '高级前端开发工程师',
            phone: '138-0000-0000',
            email: 'zhangsan@email.com',
            city: '北京',
            website: '',
            summary: '',
            skills: '',
            languages: '',
            certificates: '',
            education: [],
            work: [],
            project: []
        };
    }
    
    const data = {
        name: $val('name', '张三'),
        position: $val('position', '高级前端开发工程师'),
        phone: $val('phone', '138-0000-0000'),
        email: $val('email', 'zhangsan@email.com'),
        city: $val('city', '北京'),
        website: $val('website'),
        summary: $val('summary'),
        skills: $val('skills'),
        languages: $val('languages'),
        certificates: $val('certificates'),
        education: [],
        work: [],
        project: []
    };
    
    // 安全获取input值
    function getInputVal(item, className) {
        const el = item.querySelector('.' + className);
        return el ? el.value : '';
    }
    
    // 教育经历
    document.querySelectorAll('#education-list .experience-item').forEach(item => {
        const school = getInputVal(item, 'edu-school');
        if (school) {
            data.education.push({
                school: school,
                degree: getInputVal(item, 'edu-degree'),
                major: getInputVal(item, 'edu-major'),
                time: getInputVal(item, 'edu-time'),
                honors: getInputVal(item, 'edu-honors')
            });
        }
    });
    
    // 工作经历
    document.querySelectorAll('#work-list .experience-item').forEach(item => {
        const company = getInputVal(item, 'work-company');
        if (company) {
            data.work.push({
                company: company,
                position: getInputVal(item, 'work-position'),
                time: getInputVal(item, 'work-time'),
                location: getInputVal(item, 'work-location'),
                desc: getInputVal(item, 'work-desc')
            });
        }
    });
    
    // 项目经历
    document.querySelectorAll('#project-list .experience-item').forEach(item => {
        const name = getInputVal(item, 'proj-name');
        if (name) {
            data.project.push({
                name: name,
                role: getInputVal(item, 'proj-role'),
                time: getInputVal(item, 'proj-time'),
                tech: getInputVal(item, 'proj-tech'),
                desc: getInputVal(item, 'proj-desc')
            });
        }
    });
    
    return data;
}

// ===== 实时预览 =====
function updatePreview() {
    const preview = document.getElementById('resume-preview');
    if (!preview) return;
    
    const data = collectFormData();
    resumeState = data;
    
    // 应用样式类
    preview.className = 'resume-preview';
    if (styleState.layout === 'avatar_left') preview.classList.add('avatar-left');
    if (styleState.layout === 'two_column') preview.classList.add('two-column');
    if (styleState.font === 'song') preview.classList.add('song-font');
    if (styleState.margin === 'large') preview.classList.add('large-margin');
    if (styleState.compact) preview.classList.add('compact');
    
    let html = '';
    
    // 头部
    if (styleState.layout === 'avatar_left') {
        html += `
            <div class="resume-header">
                <div class="avatar-placeholder">👤</div>
                <div class="header-info">
                    <div class="resume-name">${escapeHtml(data.name)}</div>
                    <div class="resume-position">${escapeHtml(data.position)}</div>
                    <div class="resume-contact">
                        ${data.phone ? `<span>📱 ${escapeHtml(data.phone)}</span>` : ''}
                        ${data.email ? `<span>📧 ${escapeHtml(data.email)}</span>` : ''}
                        ${data.city ? `<span>📍 ${escapeHtml(data.city)}</span>` : ''}
                        ${data.website ? `<span>🌐 ${escapeHtml(data.website)}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    } else {
        html += `
            <div class="resume-header">
                <div class="resume-name">${escapeHtml(data.name)}</div>
                <div class="resume-position">${escapeHtml(data.position)}</div>
                <div class="resume-contact">
                    ${data.phone ? `<span>📱 ${escapeHtml(data.phone)}</span>` : ''}
                    ${data.email ? `<span>📧 ${escapeHtml(data.email)}</span>` : ''}
                    ${data.city ? `<span>📍 ${escapeHtml(data.city)}</span>` : ''}
                    ${data.website ? `<span>🌐 ${escapeHtml(data.website)}</span>` : ''}
                </div>
            </div>
        `;
    }
    
    // 两列布局判断
    if (styleState.layout === 'two_column') {
        // 左栏：主要内容
        let mainContent = '';
        // 右栏：侧边栏内容
        let sideContent = '';
        
        // 个人简介放主栏
        if (data.summary) {
            mainContent += `
                <div class="resume-section">
                    <div class="resume-section-title">个人简介</div>
                    <div class="resume-summary">${escapeHtml(data.summary).replace(/\\n/g, '<br>')}</div>
                </div>
            `;
        }
        
        // 工作经历放主栏
        if (data.work.length > 0) {
            mainContent += `<div class="resume-section"><div class="resume-section-title">工作经历</div>`;
            data.work.forEach(item => {
                mainContent += renderWorkItem(item);
            });
            mainContent += `</div>`;
        }
        
        // 项目经历放主栏
        if (data.project.length > 0) {
            mainContent += `<div class="resume-section"><div class="resume-section-title">项目经历</div>`;
            data.project.forEach(item => {
                mainContent += renderProjectItem(item);
            });
            mainContent += `</div>`;
        }
        
        // 教育经历放侧栏
        if (data.education.length > 0) {
            sideContent += `<div class="resume-section"><div class="resume-section-title">教育经历</div>`;
            data.education.forEach(item => {
                sideContent += `
                    <div class="resume-item">
                        <div class="resume-item-title">${escapeHtml(item.school)}</div>
                        <div class="resume-item-subtitle">${escapeHtml(item.degree)} · ${escapeHtml(item.major)}</div>
                        <div class="resume-item-date">${escapeHtml(item.time)}</div>
                        ${item.honors ? `<div style="font-size:12px;color:#666;margin-top:4px;">${escapeHtml(item.honors)}</div>` : ''}
                    </div>
                `;
            });
            sideContent += `</div>`;
        }
        
        // 技能放侧栏
        if (data.skills || data.languages || data.certificates) {
            sideContent += `<div class="resume-section"><div class="resume-section-title">技能特长</div>`;
            if (data.skills) {
                sideContent += `<div class="resume-skills">${escapeHtml(data.skills).replace(/\\n/g, '<br>')}</div>`;
            }
            if (data.languages) {
                sideContent += `<div style="margin-top:8px;"><strong>语言能力：</strong>${escapeHtml(data.languages)}</div>`;
            }
            if (data.certificates) {
                sideContent += `<div style="margin-top:8px;"><strong>证书奖项：</strong>${escapeHtml(data.certificates).replace(/\\n/g, '<br>')}</div>`;
            }
            sideContent += `</div>`;
        }
        
        html += `
            <div class="resume-body">
                <div class="resume-main">${mainContent}</div>
                <div class="resume-sidebar">${sideContent}</div>
            </div>
        `;
    } else {
        // 单列布局
        // 个人简介
        if (data.summary) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title">个人简介</div>
                    <div class="resume-summary">${escapeHtml(data.summary).replace(/\\n/g, '<br>')}</div>
                </div>
            `;
        }
        
        // 教育经历
        if (data.education.length > 0) {
            html += `<div class="resume-section"><div class="resume-section-title">教育经历</div>`;
            data.education.forEach(item => {
                html += renderEducationItem(item);
            });
            html += `</div>`;
        }
        
        // 工作经历
        if (data.work.length > 0) {
            html += `<div class="resume-section"><div class="resume-section-title">工作经历</div>`;
            data.work.forEach(item => {
                html += renderWorkItem(item);
            });
            html += `</div>`;
        }
        
        // 项目经历
        if (data.project.length > 0) {
            html += `<div class="resume-section"><div class="resume-section-title">项目经历</div>`;
            data.project.forEach(item => {
                html += renderProjectItem(item);
            });
            html += `</div>`;
        }
        
        // 技能特长
        if (data.skills || data.languages || data.certificates) {
            html += `<div class="resume-section"><div class="resume-section-title">技能特长</div>`;
            if (data.skills) {
                html += `<div class="resume-skills">${escapeHtml(data.skills).replace(/\\n/g, '<br>')}</div>`;
            }
            if (data.languages) {
                html += `<div style="margin-top:8px;"><strong>语言能力：</strong>${escapeHtml(data.languages)}</div>`;
            }
            if (data.certificates) {
                html += `<div style="margin-top:8px;"><strong>证书奖项：</strong>${escapeHtml(data.certificates).replace(/\\n/g, '<br>')}</div>`;
            }
            html += `</div>`;
        }
    }
    
    preview.innerHTML = html;
}

function renderEducationItem(item) {
    return `
        <div class="resume-item">
            <div class="resume-item-header">
                <div>
                    <span class="resume-item-title">${escapeHtml(item.school)}</span>
                    ${item.major ? `<span class="resume-item-subtitle"> · ${escapeHtml(item.degree)} · ${escapeHtml(item.major)}</span>` : ''}
                </div>
                <span class="resume-item-date">${escapeHtml(item.time)}</span>
            </div>
            ${item.honors ? `<div class="resume-item-desc" style="color:#666;font-size:12px;">${escapeHtml(item.honors)}</div>` : ''}
        </div>
    `;
}

function renderWorkItem(item) {
    const descLines = item.desc ? item.desc.split('\\n').filter(l => l.trim()) : [];
    return `
        <div class="resume-item">
            <div class="resume-item-header">
                <div>
                    <span class="resume-item-title">${escapeHtml(item.company)}</span>
                    ${item.position ? `<span class="resume-item-subtitle"> · ${escapeHtml(item.position)}</span>` : ''}
                </div>
                <span class="resume-item-date">${escapeHtml(item.time)}</span>
            </div>
            ${item.location ? `<div class="resume-item-subtitle" style="margin-bottom:4px;">${escapeHtml(item.location)}</div>` : ''}
            ${descLines.length > 0 ? `
                <div class="resume-item-desc">
                    <ul>
                        ${descLines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
}

function renderProjectItem(item) {
    const descLines = item.desc ? item.desc.split('\\n').filter(l => l.trim()) : [];
    return `
        <div class="resume-item">
            <div class="resume-item-header">
                <div>
                    <span class="resume-item-title">${escapeHtml(item.name)}</span>
                    ${item.role ? `<span class="resume-item-subtitle"> · ${escapeHtml(item.role)}</span>` : ''}
                </div>
                <span class="resume-item-date">${escapeHtml(item.time)}</span>
            </div>
            ${item.tech ? `<div class="resume-item-subtitle" style="margin-bottom:4px;">技术栈：${escapeHtml(item.tech)}</div>` : ''}
            ${descLines.length > 0 ? `
                <div class="resume-item-desc">
                    <ul>
                        ${descLines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== AI 自然语言指令 =====
function processAICommand() {
    const aiInput = document.getElementById('ai-command');
    if (!aiInput) return;
    
    const cmd = aiInput.value.trim();
    if (!cmd) {
        showToast('请输入指令', 'error');
        return;
    }
    
    const result = parseCommand(cmd);
    if (result) {
        applyStyleChange(result);
        showToast('已应用：' + result.description);
        aiInput.value = '';
    } else {
        showToast('未能理解指令，请尝试其他说法', 'error');
    }
}

function parseCommand(cmd) {
    const cmdLower = cmd.toLowerCase();
    
    // 边距相关
    if (/(边距|margin|padding).*(大|宽|增加|增大|调大)/.test(cmdLower) ||
        /(大|宽|增加|增大|调大).*(边距|margin|padding)/.test(cmdLower)) {
        return { type: 'margin', value: 'large', description: '增大页边距' };
    }
    if (/(边距|margin|padding).*(小|窄|减少|减小|调小)/.test(cmdLower) ||
        /(小|窄|减少|减小|调小).*(边距|margin|padding)/.test(cmdLower)) {
        return { type: 'margin', value: 'default', description: '恢复默认边距' };
    }
    
    // 字体相关
    if (/(字体|字).*(宋体|song|衬线)/.test(cmdLower) ||
        /宋体|song/.test(cmdLower)) {
        return { type: 'font', value: 'song', description: '切换为宋体' };
    }
    if (/(字体|字).*(黑体|黑|无衬线|默认)/.test(cmdLower) ||
        /默认字体/.test(cmdLower)) {
        return { type: 'font', value: 'default', description: '恢复默认字体' };
    }
    
    // 头像位置
    if (/(头像|照片|图片).*(左|左边|左侧)/.test(cmdLower) ||
        /(左|左边|左侧).*(头像|照片)/.test(cmdLower)) {
        return { type: 'layout', value: 'avatar_left', description: '头像移至左侧' };
    }
    if (/(头像|照片).*(居中|中间|上面|顶部)/.test(cmdLower) ||
        /默认布局/.test(cmdLower)) {
        return { type: 'layout', value: 'default', description: '恢复默认布局' };
    }
    
    // 两列布局
    if (/(两列|双栏|两栏|双列|左右|分栏)/.test(cmdLower) ||
        /(分成|分为|变成).*(两列|两栏|双列|双栏)/.test(cmdLower)) {
        return { type: 'layout', value: 'two_column', description: '切换为两列布局' };
    }
    if (/(单列|单栏|一列|一栏|默认).*(布局|显示)/.test(cmdLower) ||
        /布局.*(默认|单列|单栏)/.test(cmdLower)) {
        return { type: 'layout', value: 'default', description: '恢复单列布局' };
    }
    
    // 紧凑模式
    if (/(紧凑|密一点|挤一点|内容多一点|省空间)/.test(cmdLower) ||
        /(调小|缩小).*(间距|行距)/.test(cmdLower)) {
        return { type: 'compact', value: true, description: '切换为紧凑模式' };
    }
    if (/(宽松|松一点|舒一点|间距大一点)/.test(cmdLower) ||
        /(调大|增大).*(间距|行距)/.test(cmdLower)) {
        return { type: 'compact', value: false, description: '恢复宽松模式' };
    }
    
    // 重置
    if (/重置|还原|恢复默认|恢复原状/.test(cmdLower)) {
        return { type: 'reset', value: true, description: '重置所有样式' };
    }
    
    return null;
}

function applyStyleChange(result) {
    switch (result.type) {
        case 'margin':
            styleState.margin = result.value;
            break;
        case 'font':
            styleState.font = result.value;
            break;
        case 'layout':
            styleState.layout = result.value;
            break;
        case 'compact':
            styleState.compact = result.value;
            break;
        case 'reset':
            styleState = {
                layout: 'default',
                font: 'default',
                margin: 'default',
                compact: false
            };
            break;
    }
    updatePreview();
}

// 快捷指令
function applyQuickCmd(cmd) {
    const cmdMap = {
        'margin': '把页边距调大一点',
        'font': '把字体换成宋体',
        'avatar_left': '让头像在左边',
        'two_column': '把经历分成两列显示',
        'compact': '切换为紧凑模式',
        'reset': '重置'
    };
    
    const aiInput = document.getElementById('ai-command');
    if (aiInput) {
        aiInput.value = cmdMap[cmd];
        processAICommand();
    }
}

// 回车触发AI指令
document.addEventListener('DOMContentLoaded', function() {
    const aiInput = document.getElementById('ai-command');
    if (aiInput) {
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                processAICommand();
            }
        });
    }
    
    // 初始化预览
    setTimeout(updatePreview, 200);
});

// ===== PDF 导出 =====
function downloadPDF() {
    const element = document.getElementById('resume-preview');
    if (!element) {
        showToast('预览区域不存在', 'error');
        return;
    }
    
    const name = resumeState.name || '文档';
    
    showToast('正在生成PDF...');
    
    // 创建克隆元素，移除transform影响，确保正确渲染
    const clone = element.cloneNode(true);
    clone.style.transform = 'none';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '210mm';
    clone.style.minHeight = '297mm';
    clone.style.padding = element.style.padding || '2cm';
    clone.style.background = 'white';
    clone.style.boxShadow = 'none';
    clone.style.margin = '0';
    document.body.appendChild(clone);
    
    const opt = {
        margin: 0,
        filename: name + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
        }
    };
    
    // 检查html2pdf是否可用
    if (typeof html2pdf === 'undefined') {
        document.body.removeChild(clone);
        showToast('PDF导出组件加载失败，请刷新页面重试', 'error');
        return;
    }
    
    html2pdf().set(opt).from(clone).save().then(() => {
        document.body.removeChild(clone);
        showToast('PDF已导出', 'success');
    }).catch((err) => {
        document.body.removeChild(clone);
        console.error('PDF导出错误:', err);
        showToast('导出失败：' + (err.message || '请重试'), 'error');
    });
}

// ===== LaTeX 特殊字符转义 =====
function escapeLatex(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/~/g, '\\textasciitilde{}')
        .replace(/\^/g, '\\textasciicircum{}')
        .replace(/%/g, '\\%')
        .replace(/#/g, '\\#')
        .replace(/\$/g, '\\$')
        .replace(/&/g, '\\&')
        .replace(/_/g, '\\_')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/</g, '\\textless{}')
        .replace(/>/g, '\\textgreater{}');
}

// ===== LaTeX 导出 =====
function downloadLaTeX() {
    const data = resumeState;
    
    // 生成LaTeX代码
    let latex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[UTF8]{ctex}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{fontawesome5}
\\usepackage{hyperref}

% 页面设置
\\geometry{top=2cm, bottom=2cm, left=2cm, right=2cm}
\\setlist[itemize]{leftmargin=1.5em, itemsep=2pt, topsep=4pt}

% 颜色定义
\\definecolor{primary}{RGB}{26, 115, 232}
\\definecolor{text}{RGB}{32, 33, 36}
\\definecolor{subtext}{RGB}{95, 99, 104}

% 自定义命令
\\newcommand{\\sectiontitle}[1]{
    \\vspace{12pt}
    {\\large\\bfseries\\color{primary} #1}
    \\vspace{-6pt}
    \\hrule height 0.5pt
    \\vspace{8pt}
}

\\newcommand{\\itemheader}[4]{
    \\noindent\\textbf{#1} \\hfill \\textcolor{subtext}{#2} \\\\
    \\textit{#3} \\hfill \\textcolor{subtext}{#4}
    \\vspace{4pt}
}

\\begin{document}
\\pagestyle{empty}

% 头部信息
\\begin{center}
    {\\Huge\\bfseries ${escapeLatex(data.name)}} \\\\[6pt]
    {\\large\\color{primary} ${escapeLatex(data.position)}} \\\\[8pt]
    \\textcolor{subtext}{
        ${data.phone ? '\\faPhone\\ ' + escapeLatex(data.phone) + ' \\quad' : ''}
        ${data.email ? '\\faEnvelope\\ ' + escapeLatex(data.email) + ' \\quad' : ''}
        ${data.city ? '\\faMapMarkerAlt\\ ' + escapeLatex(data.city) : ''}
    }
    ${data.website ? '\\\\\n    \\textcolor{subtext}{\\faGlobe\\ \\href{' + escapeLatex(data.website) + '}{' + escapeLatex(data.website) + '}}' : ''}
\\end{center}
`;

    // 个人简介
    if (data.summary) {
        latex += `
% 个人简介
\\sectiontitle{个人简介}
${escapeLatex(data.summary).replace(/\n/g, ' ')}

`;
    }

    // 教育经历
    if (data.education.length > 0) {
        latex += `% 教育经历
\\sectiontitle{教育经历}

`;
        data.education.forEach(edu => {
            const subInfo = [edu.degree, edu.major].filter(Boolean).join(' - ');
            latex += `\\itemheader{${escapeLatex(edu.school)}}{${escapeLatex(edu.time)}}{${escapeLatex(subInfo)}}{}
`;
            if (edu.honors) {
                latex += `\\begin{itemize}
    \\item ${escapeLatex(edu.honors).replace(/\n/g, ' ')}
\\end{itemize}

`;
            } else {
                latex += `\\vspace{6pt}

`;
            }
        });
    }

    // 工作经历
    if (data.work.length > 0) {
        latex += `% 工作经历
\\sectiontitle{工作经历}

`;
        data.work.forEach(work => {
            latex += `\\itemheader{${escapeLatex(work.company)}}{${escapeLatex(work.time)}}{${escapeLatex(work.position)}}{${escapeLatex(work.location || '')}}
`;
            if (work.desc) {
                const lines = work.desc.split('\n').filter(l => l.trim());
                latex += `\\begin{itemize}
`;
                lines.forEach(line => {
                    latex += `    \\item ${escapeLatex(line.trim())}
`;
                });
                latex += `\\end{itemize}

`;
            }
        });
    }

    // 项目经历
    if (data.project.length > 0) {
        latex += `% 项目经历
\\sectiontitle{项目经历}

`;
        data.project.forEach(proj => {
            latex += `\\itemheader{${escapeLatex(proj.name)}}{${escapeLatex(proj.time)}}{${escapeLatex(proj.role)}}{${escapeLatex(proj.tech || '')}}
`;
            if (proj.desc) {
                const lines = proj.desc.split('\n').filter(l => l.trim());
                latex += `\\begin{itemize}
`;
                lines.forEach(line => {
                    latex += `    \\item ${escapeLatex(line.trim())}
`;
                });
                latex += `\\end{itemize}

`;
            }
        });
    }

    // 技能特长
    if (data.skills || data.languages || data.certificates) {
        latex += `% 技能特长
\\sectiontitle{技能特长}
\\begin{itemize}
`;
        if (data.skills) {
            const skillLines = data.skills.split('\n').filter(l => l.trim());
            skillLines.forEach(line => {
                latex += `    \\item ${escapeLatex(line.trim())}
`;
            });
        }
        if (data.languages) {
            latex += `    \\item \\textbf{语言能力：} ${escapeLatex(data.languages)}
`;
        }
        if (data.certificates) {
            latex += `    \\item \\textbf{证书奖项：} ${escapeLatex(data.certificates).replace(/\n/g, '，')}
`;
        }
        latex += `\\end{itemize}

`;
    }

    latex += `\\end{document}`;

    // 下载文件
    const blob = new Blob([latex], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (data.name || 'resume') + '.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('LaTeX文件已下载', 'success');
}

// ===== 进阶模式：代码展示 =====
function showCodeTemplate(tplId) {
    currentTemplate = tplId;
    const template = latexTemplates[tplId];
    if (!template) return;
    
    // 更新标题
    const codeTitle = document.getElementById('code-title');
    if (codeTitle) codeTitle.textContent = template.title;
    
    // 高亮显示选中项
    document.querySelectorAll('.template-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick')?.includes(tplId)) {
            item.classList.add('active');
        }
    });
    
    // 显示代码
    const codeEl = document.querySelector('#latex-code code');
    if (codeEl) codeEl.textContent = template.code;
    
    // 简单预览
    renderCodePreview(tplId);
}

function renderCodePreview(tplId) {
    const preview = document.getElementById('code-preview');
    if (!preview) return;
    
    const template = latexTemplates[tplId];
    if (!template) return;
    
    // 完整预览
    let html = `<div style="font-size:12px;line-height:1.6;">`;
    
    if (tplId === 'internet-cv') {
        html += `
            <div style="text-align:center;border-bottom:2px solid #1a73e8;padding-bottom:12px;margin-bottom:16px;">
                <div style="font-size:22px;font-weight:bold;">张三</div>
                <div style="color:#1a73e8;margin:6px 0;font-size:14px;">高级前端开发工程师</div>
                <div style="color:#666;font-size:11px;">📱 138-0000-0000 &nbsp;|&nbsp; 📧 zhangsan@email.com &nbsp;|&nbsp; 📍 北京 &nbsp;|&nbsp; 🔗 github.com/zhangsan</div>
            </div>
            <div style="margin-bottom:14px;">
                <div style="font-weight:bold;color:#1a73e8;border-bottom:1px solid #e0e0e0;padding-bottom:4px;margin-bottom:8px;font-size:13px;">个人简介</div>
                <div style="font-size:11px;color:#444;line-height:1.7;">5年以上前端开发经验，精通React/Vue生态，主导过3个百万级用户产品的前端架构设计。具备良好的工程化思维和团队协作能力，善于推动技术落地和业务增长。</div>
            </div>
            <div style="margin-bottom:14px;">
                <div style="font-weight:bold;color:#1a73e8;border-bottom:1px solid #e0e0e0;padding-bottom:4px;margin-bottom:8px;font-size:13px;">专业技能</div>
                <div style="font-size:11px;color:#444;">
                    <strong>前端框架：</strong>React、Vue2/3、Next.js、Nuxt.js<br>
                    <strong>工程化：</strong>Webpack、Vite、Rollup、CI/CD<br>
                    <strong>其他：</strong>TypeScript、Node.js、Electron、微信小程序
                </div>
            </div>
            <div style="margin-bottom:14px;">
                <div style="font-weight:bold;color:#1a73e8;border-bottom:1px solid #e0e0e0;padding-bottom:4px;margin-bottom:8px;font-size:13px;">工作经历</div>
                <div style="font-size:11px;margin-bottom:10px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;"><strong>字节跳动</strong><span style="color:#666;">2021.07 - 至今</span></div>
                    <div style="color:#1a73e8;margin:2px 0;">高级前端工程师</div>
                    <ul style="margin:4px 0 0 18px;padding:0;color:#444;">
                        <li style="margin-bottom:3px;">主导抖音创作者平台前端架构升级，性能提升40%</li>
                        <li style="margin-bottom:3px;">搭建组件库和工程化体系，提升团队开发效率30%</li>
                        <li>带领5人小组完成多个核心业务模块开发</li>
                    </ul>
                </div>
                <div style="font-size:11px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;"><strong>阿里巴巴</strong><span style="color:#666;">2019.07 - 2021.06</span></div>
                    <div style="color:#1a73e8;margin:2px 0;">前端开发工程师</div>
                    <ul style="margin:4px 0 0 18px;padding:0;color:#444;">
                        <li style="margin-bottom:3px;">参与淘宝商家后台系统开发，服务千万级商家</li>
                        <li>优化页面首屏加载时间，从3.2s降至1.5s</li>
                    </ul>
                </div>
            </div>
            <div style="margin-bottom:14px;">
                <div style="font-weight:bold;color:#1a73e8;border-bottom:1px solid #e0e0e0;padding-bottom:4px;margin-bottom:8px;font-size:13px;">项目经历</div>
                <div style="font-size:11px;margin-bottom:10px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;"><strong>智能创作平台</strong><span style="color:#666;">2022.03 - 2023.06</span></div>
                    <div style="color:#888;margin:2px 0;">技术栈：React + TypeScript + Monaco Editor</div>
                    <ul style="margin:4px 0 0 18px;padding:0;color:#444;">
                        <li style="margin-bottom:3px;">从零搭建AI辅助创作编辑器，支持Markdown实时预览</li>
                        <li>集成大模型API，实现智能续写、润色等功能，DAU达50万+</li>
                    </ul>
                </div>
            </div>
            <div>
                <div style="font-weight:bold;color:#1a73e8;border-bottom:1px solid #e0e0e0;padding-bottom:4px;margin-bottom:8px;font-size:13px;">教育背景</div>
                <div style="font-size:11px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;"><strong>北京邮电大学</strong><span style="color:#666;">2015.09 - 2019.06</span></div>
                    <div style="color:#444;">计算机科学与技术 · 本科 · 学士</div>
                </div>
            </div>
        `;
    } else if (tplId === 'soe-cv') {
        html += `
            <div style="text-align:center;font-size:18px;font-weight:bold;margin-bottom:18px;letter-spacing:8px;">个 人 简 历</div>
            <table style="width:100%;border-collapse:collapse;font-size:11px;">
                <tr>
                    <td style="border:1px solid #666;padding:6px;width:18%;text-align:center;font-weight:bold;background:#f0f0f0;">姓名</td>
                    <td style="border:1px solid #666;padding:6px;width:18%;">李四</td>
                    <td style="border:1px solid #666;padding:6px;width:14%;text-align:center;font-weight:bold;background:#f0f0f0;">性别</td>
                    <td style="border:1px solid #666;padding:6px;width:14%;">男</td>
                    <td style="border:1px solid #666;padding:6px;width:14%;text-align:center;font-weight:bold;background:#f0f0f0;">出生年月</td>
                    <td style="border:1px solid #666;padding:6px;width:22%;">1998年5月</td>
                </tr>
                <tr>
                    <td style="border:1px solid #666;padding:6px;text-align:center;font-weight:bold;background:#f0f0f0;">民族</td>
                    <td style="border:1px solid #666;padding:6px;">汉族</td>
                    <td style="border:1px solid #666;padding:6px;text-align:center;font-weight:bold;background:#f0f0f0;">政治面貌</td>
                    <td style="border:1px solid #666;padding:6px;">中共党员</td>
                    <td style="border:1px solid #666;padding:6px;text-align:center;font-weight:bold;background:#f0f0f0;">健康状况</td>
                    <td style="border:1px solid #666;padding:6px;">良好</td>
                </tr>
                <tr>
                    <td style="border:1px solid #666;padding:6px;text-align:center;font-weight:bold;background:#f0f0f0;">学历</td>
                    <td style="border:1px solid #666;padding:6px;">硕士研究生</td>
                    <td style="border:1px solid #666;padding:6px;text-align:center;font-weight:bold;background:#f0f0f0;">学位</td>
                    <td style="border:1px solid #666;padding:6px;">工学硕士</td>
                    <td style="border:1px solid #666;padding:6px;text-align:center;font-weight:bold;background:#f0f0f0;">专业</td>
                    <td style="border:1px solid #666;padding:6px;">软件工程</td>
                </tr>
                <tr>
                    <td style="border:1px solid #666;padding:6px;text-align:center;font-weight:bold;background:#f0f0f0;">毕业院校</td>
                    <td style="border:1px solid #666;padding:6px;" colspan="5">清华大学</td>
                </tr>
                <tr>
                    <td style="border:1px solid #666;padding:6px;text-align:center;font-weight:bold;background:#f0f0f0;">联系电话</td>
                    <td style="border:1px solid #666;padding:6px;" colspan="2">138-0000-0000</td>
                    <td style="border:1px solid #666;padding:6px;text-align:center;font-weight:bold;background:#f0f0f0;">电子邮箱</td>
                    <td style="border:1px solid #666;padding:6px;" colspan="2">lisi@email.com</td>
                </tr>
            </table>
            <div style="margin-top:14px;">
                <div style="font-weight:bold;font-size:13px;border-bottom:1px solid #666;padding-bottom:3px;margin-bottom:8px;">教育经历</div>
                <table style="width:100%;border-collapse:collapse;font-size:11px;">
                    <tr>
                        <th style="border:1px solid #666;padding:5px;background:#f0f0f0;width:25%;">时间</th>
                        <th style="border:1px solid #666;padding:5px;background:#f0f0f0;width:35%;">学校</th>
                        <th style="border:1px solid #666;padding:5px;background:#f0f0f0;width:25%;">专业</th>
                        <th style="border:1px solid #666;padding:5px;background:#f0f0f0;width:15%;">学历</th>
                    </tr>
                    <tr>
                        <td style="border:1px solid #666;padding:5px;text-align:center;">2020.09-2023.06</td>
                        <td style="border:1px solid #666;padding:5px;">清华大学</td>
                        <td style="border:1px solid #666;padding:5px;">软件工程</td>
                        <td style="border:1px solid #666;padding:5px;text-align:center;">硕士</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #666;padding:5px;text-align:center;">2016.09-2020.06</td>
                        <td style="border:1px solid #666;padding:5px;">北京航空航天大学</td>
                        <td style="border:1px solid #666;padding:5px;">计算机科学与技术</td>
                        <td style="border:1px solid #666;padding:5px;text-align:center;">本科</td>
                    </tr>
                </table>
            </div>
            <div style="margin-top:14px;">
                <div style="font-weight:bold;font-size:13px;border-bottom:1px solid #666;padding-bottom:3px;margin-bottom:8px;">实习经历</div>
                <div style="font-size:11px;line-height:1.7;">
                    <p><strong>国家电网信息通信分公司</strong>　　运维工程师实习生　　2022.07-2022.09</p>
                    <ul style="margin:4px 0 8px 20px;padding:0;">
                        <li>参与电力系统信息平台的日常运维工作，保障系统稳定运行</li>
                        <li>协助完成网络安全检查和漏洞修复工作</li>
                    </ul>
                </div>
            </div>
            <div style="margin-top:14px;">
                <div style="font-weight:bold;font-size:13px;border-bottom:1px solid #666;padding-bottom:3px;margin-bottom:8px;">获奖情况</div>
                <div style="font-size:11px;line-height:1.8;">
                    • 2022年 国家奖学金<br>
                    • 2021年 北京市优秀学生干部<br>
                    • 2020年 全国大学生数学建模竞赛一等奖<br>
                    • 2019年 校级三好学生
                </div>
            </div>
        `;
    } else if (tplId === 'foreign-cv') {
        html += `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #0066cc;padding-bottom:12px;margin-bottom:16px;">
                <div>
                    <div style="font-size:20px;font-weight:bold;">Wang Ming</div>
                    <div style="color:#0066cc;font-size:13px;margin-top:2px;">Senior Product Manager</div>
                </div>
                <div style="font-size:10px;color:#555;text-align:right;line-height:1.6;">
                    +86 138 0000 0000<br>
                    wangming@email.com<br>
                    linkedin.com/in/wangming<br>
                    Shanghai, China
                </div>
            </div>
            <div style="margin-bottom:14px;">
                <div style="font-weight:bold;color:#0066cc;font-size:12px;border-bottom:1px solid #0066cc;padding-bottom:3px;margin-bottom:7px;">PROFESSIONAL SUMMARY</div>
                <div style="font-size:10.5px;color:#333;line-height:1.6;">Results-driven Product Manager with 8+ years of experience in consumer internet products. Proven track record of leading cross-functional teams to deliver user-centric solutions that drive growth and engagement. Strong expertise in product strategy, user research, and data-driven decision making.</div>
            </div>
            <div style="margin-bottom:14px;">
                <div style="font-weight:bold;color:#0066cc;font-size:12px;border-bottom:1px solid #0066cc;padding-bottom:3px;margin-bottom:7px;">CORE COMPETENCIES</div>
                <div style="font-size:10.5px;columns:2;column-gap:20px;color:#333;">
                    • Product Strategy & Roadmap<br>
                    • User Experience Design<br>
                    • Data Analytics & A/B Testing<br>
                    • Agile/Scrum Methodology<br>
                    • Market Research & Analysis<br>
                    • Stakeholder Management
                </div>
            </div>
            <div style="margin-bottom:14px;">
                <div style="font-weight:bold;color:#0066cc;font-size:12px;border-bottom:1px solid #0066cc;padding-bottom:3px;margin-bottom:7px;">PROFESSIONAL EXPERIENCE</div>
                <div style="font-size:10.5px;margin-bottom:12px;">
                    <div style="display:flex;justify-content:space-between;align-items:baseline;">
                        <strong>Bytedance</strong><span style="color:#666;font-style:italic;">2020 - Present</span>
                    </div>
                    <div style="color:#0066cc;margin:2px 0 5px 0;">Senior Product Manager, TikTok Creator Tools</div>
                    <ul style="margin:0 0 0 18px;padding:0;color:#333;line-height:1.5;">
                        <li style="margin-bottom:4px;">Led product team of 6 to launch creator monetization features, driving 45% increase in creator revenue</li>
                        <li style="margin-bottom:4px;">Conducted user research with 200+ creators, identified key pain points and prioritized roadmap</li>
                        <li style="margin-bottom:4px;">Partnered with engineering and design teams to ship 15+ major features on schedule</li>
                        <li>Analyzed product metrics daily, identified growth opportunities through A/B testing</li>
                    </ul>
                </div>
                <div style="font-size:10.5px;">
                    <div style="display:flex;justify-content:space-between;align-items:baseline;">
                        <strong>Tencent</strong><span style="color:#666;font-style:italic;">2017 - 2020</span>
                    </div>
                    <div style="color:#0066cc;margin:2px 0 5px 0;">Product Manager, WeChat Mini Programs</div>
                    <ul style="margin:0 0 0 18px;padding:0;color:#333;line-height:1.5;">
                        <li style="margin-bottom:4px;">Managed mini-program ecosystem products, serving 100M+ daily active users</li>
                        <li>Launched developer tools that improved developer efficiency by 30%</li>
                    </ul>
                </div>
            </div>
            <div style="margin-bottom:14px;">
                <div style="font-weight:bold;color:#0066cc;font-size:12px;border-bottom:1px solid #0066cc;padding-bottom:3px;margin-bottom:7px;">EDUCATION</div>
                <div style="font-size:10.5px;">
                    <div style="display:flex;justify-content:space-between;align-items:baseline;">
                        <strong>Fudan University</strong><span style="color:#666;">2013 - 2017</span>
                    </div>
                    <div style="color:#333;">Bachelor of Economics, Minor in Computer Science</div>
                    <div style="color:#666;font-size:10px;">GPA: 3.8/4.0 · Dean's List · Outstanding Graduate</div>
                </div>
            </div>
        `;
    } else if (tplId === 'academic-cv') {
        html += `
            <div style="text-align:center;margin-bottom:16px;">
                <div style="font-size:18px;font-weight:bold;">Dr. Chen Wei</div>
                <div style="font-size:11px;margin-top:4px;">Research Associate, Stanford University</div>
                <div style="font-size:10px;color:#666;margin-top:2px;">chenwei@stanford.edu · chenwei.github.io</div>
            </div>
            <div style="margin-bottom:12px;">
                <div style="font-weight:bold;border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:7px;font-size:12px;">Research Interests</div>
                <div style="font-size:10.5px;color:#333;">Machine Learning, Natural Language Processing, Large Language Models, Multimodal Learning, Knowledge Graph</div>
            </div>
            <div style="margin-bottom:12px;">
                <div style="font-weight:bold;border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:7px;font-size:12px;">Education</div>
                <div style="font-size:10.5px;margin-bottom:8px;">
                    <div style="display:flex;justify-content:space-between;align-items:baseline;">
                        <strong>Stanford University</strong><span style="color:#666;">2018 - 2023</span>
                    </div>
                    <div style="font-style:italic;">Ph.D. in Computer Science</div>
                    <div style="color:#555;">Advisor: Prof. Christopher Manning</div>
                    <div style="color:#555;">Dissertation: "Efficient Pre-training Methods for Large Language Models"</div>
                </div>
                <div style="font-size:10.5px;">
                    <div style="display:flex;justify-content:space-between;align-items:baseline;">
                        <strong>Tsinghua University</strong><span style="color:#666;">2014 - 2018</span>
                    </div>
                    <div style="font-style:italic;">B.Eng. in Computer Science, GPA: 3.9/4.0</div>
                </div>
            </div>
            <div style="margin-bottom:12px;">
                <div style="font-weight:bold;border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:7px;font-size:12px;">Publications</div>
                <div style="font-size:10px;line-height:1.6;">
                    <p style="margin-bottom:6px;">[1] <strong>Chen W.</strong>, Manning C., Liang P. "Efficient Continual Pre-training for Domain Adaptation of LLMs." <em>NeurIPS 2023</em>. (Spotlight)</p>
                    <p style="margin-bottom:6px;">[2] <strong>Chen W.</strong>, Zhang X., Liu Y. "Cross-lingual Transfer Learning with Multilingual Prompt Tuning." <em>ACL 2023</em>. (Oral)</p>
                    <p style="margin-bottom:6px;">[3] Zhang X., <strong>Chen W.</strong>, et al. "A Survey on Multimodal Large Language Models." <em>IEEE TPAMI 2023</em>.</p>
                    <p>[4] <strong>Chen W.</strong>, et al. "Knowledge-enhanced Pre-training for Document Understanding." <em>EMNLP 2022</em>.</p>
                </div>
            </div>
            <div style="margin-bottom:12px;">
                <div style="font-weight:bold;border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:7px;font-size:12px;">Research Experience</div>
                <div style="font-size:10px;margin-bottom:8px;">
                    <div style="display:flex;justify-content:space-between;align-items:baseline;">
                        <strong>Stanford NLP Group</strong><span style="color:#666;">2019 - 2023</span>
                    </div>
                    <div style="font-style:italic;color:#555;">Research Assistant</div>
                    <ul style="margin:3px 0 0 18px;padding:0;line-height:1.5;">
                        <li>Designed novel continual pre-training framework, reducing training cost by 60%</li>
                        <li>Published 4 first-author papers in top-tier venues (NeurIPS, ACL, etc.)</li>
                    </ul>
                </div>
            </div>
            <div style="margin-bottom:12px;">
                <div style="font-weight:bold;border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:7px;font-size:12px;">Awards & Honors</div>
                <div style="font-size:10px;line-height:1.7;">
                    • Stanford Graduate Fellowship (2018-2023)<br>
                    • NeurIPS 2023 Spotlight Paper<br>
                    • ACL 2023 Outstanding Paper Nominee<br>
                    • National Scholarship, China (Top 1%, 2016)
                </div>
            </div>
        `;
    } else if (tplId === 'cover-letter') {
        html += `
            <div style="text-align:right;font-size:11px;margin-bottom:25px;line-height:1.8;">
                张三<br>
                北京市海淀区中关村大街1号<br>
                电话：138-0000-0000<br>
                邮箱：zhangsan@email.com<br>
                2024年3月15日
            </div>
            <div style="font-size:11px;margin-bottom:25px;line-height:1.8;">
                字节跳动 人力资源部<br>
                北京市海淀区知春路甲48号盈都大厦<br>
                邮编：100098
            </div>
            <div style="font-size:12px;font-weight:bold;margin-bottom:15px;">尊敬的招聘负责人：</div>
            <div style="font-size:11px;text-indent:2em;line-height:2;">
                您好！我是张三，近日通过贵公司官网了解到高级前端开发工程师的招聘信息，对该职位非常感兴趣，特此致函申请。
            </div>
            <div style="font-size:11px;text-indent:2em;line-height:2;margin-top:8px;">
                我毕业于北京邮电大学计算机科学与技术专业，拥有5年前端开发经验。目前在阿里巴巴担任前端开发工程师，主导过多个千万级用户产品的前端架构设计与开发工作。我精通React、Vue等主流前端框架，具备良好的工程化思维和团队协作能力。
            </div>
            <div style="font-size:11px;text-indent:2em;line-height:2;margin-top:8px;">
                我长期关注字节跳动的产品和技术发展，对贵公司"始终创业"的企业文化深感认同。特别是抖音创作者平台的技术创新，让我深受启发。我相信我的技术积累和项目经验能够为团队带来价值，也期待能在字节跳动这样优秀的平台上成长。
            </div>
            <div style="font-size:11px;text-indent:2em;line-height:2;margin-top:8px;">
                我的简历已附在后面，供您查阅。期待有机会与您进一步交流。感谢您在百忙之中阅读我的求职信，祝工作顺利！
            </div>
            <div style="text-align:right;font-size:11px;margin-top:30px;line-height:1.8;">
                此致<br>
                敬礼！<br><br>
                <strong>张三</strong><br>
                2024年3月15日
            </div>
        `;
    } else if (tplId === 'thesis') {
        html += `
            <div style="text-align:center;margin-bottom:25px;">
                <div style="font-size:18px;font-weight:bold;margin-bottom:8px;">基于深度学习的图像识别方法研究</div>
                <div style="font-size:13px;color:#666;">Research on Image Recognition Methods Based on Deep Learning</div>
                <div style="font-size:12px;margin-top:20px;">本科毕业论文</div>
            </div>
            <div style="text-align:center;font-size:11px;margin-bottom:20px;line-height:1.8;">
                <strong>学生姓名：</strong>李四 &nbsp;&nbsp;&nbsp;&nbsp; <strong>学号：</strong>2017001001<br>
                <strong>学院：</strong>计算机学院 &nbsp;&nbsp;&nbsp;&nbsp; <strong>专业：</strong>计算机科学与技术<br>
                <strong>指导教师：</strong>王教授 &nbsp;&nbsp;&nbsp;&nbsp; <strong>职称：</strong>教授
            </div>
            <div style="font-size:11px;margin-bottom:15px;">
                <div style="font-weight:bold;text-align:center;margin-bottom:6px;">摘&nbsp;&nbsp;&nbsp;&nbsp;要</div>
                <div style="text-indent:2em;line-height:1.8;color:#333;">随着深度学习技术的快速发展，图像识别在各个领域得到了广泛应用。本文针对传统图像识别方法在复杂场景下准确率不足的问题，提出了一种基于改进卷积神经网络的图像识别方法。该方法通过引入注意力机制和多尺度特征融合，有效提升了模型对细粒度特征的提取能力。在ImageNet数据集上的实验结果表明，本文方法的Top-1准确率达到了85.2%，相比基线模型提升了3.5个百分点，同时保持了较高的推理效率。</div>
                <div style="margin-top:6px;"><strong>关键词：</strong>深度学习；图像识别；卷积神经网络；注意力机制；特征融合</div>
            </div>
            <div style="font-size:11px;margin-bottom:15px;">
                <div style="font-weight:bold;text-align:center;margin-bottom:6px;">Abstract</div>
                <div style="text-indent:2em;line-height:1.8;color:#333;font-style:italic;">With the rapid development of deep learning technology, image recognition has been widely applied in various fields... This paper proposes an improved CNN-based image recognition method... Experimental results on ImageNet show that the proposed method achieves 85.2% Top-1 accuracy...</div>
                <div style="margin-top:6px;"><strong>Keywords:</strong> Deep Learning; Image Recognition; CNN; Attention Mechanism; Feature Fusion</div>
            </div>
            <div style="font-size:12px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:8px;">第1章 绪论</div>
            <div style="font-size:10.5px;line-height:1.7;">
                <p style="margin-bottom:8px;"><strong>1.1 研究背景与意义</strong></p>
                <p style="text-indent:2em;margin-bottom:8px;">随着信息技术的飞速发展，图像数据呈现爆炸式增长。如何从海量图像数据中快速准确地识别出有用信息，成为了计算机视觉领域的核心研究问题。图像识别作为计算机视觉的基础任务，在自动驾驶、医疗影像、安防监控等领域具有广泛的应用前景。</p>
                <p style="margin-bottom:8px;"><strong>1.2 国内外研究现状</strong></p>
                <p style="text-indent:2em;margin-bottom:8px;">传统的图像识别方法主要依赖手工设计的特征提取算子，如SIFT、HOG等，这些方法在简单场景下取得了一定效果，但在复杂场景下泛化能力有限。2012年，Krizhevsky等人提出的AlexNet在ImageNet竞赛中取得了突破性成绩，开启了深度学习在图像识别领域的应用热潮。</p>
                <p style="margin-bottom:8px;"><strong>1.3 本文主要工作</strong></p>
                <p style="text-indent:2em;">本文主要研究基于深度学习的图像识别方法，具体工作包括：（1）提出一种融合通道注意力和空间注意力的混合注意力模块；（2）设计多尺度特征融合策略，提升模型对不同尺度目标的识别能力；（3）在公开数据集上进行大量实验，验证方法的有效性。</p>
            </div>
            <div style="font-size:12px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:8px;">第2章 相关理论基础</div>
            <div style="font-size:10.5px;line-height:1.7;">
                <p style="margin-bottom:6px;"><strong>2.1 卷积神经网络</strong></p>
                <p style="text-indent:2em;margin-bottom:6px;">卷积神经网络是一种专门用于处理具有网格结构数据的深度学习模型，其核心思想是通过局部感受野和权值共享来减少网络参数量...</p>
                <p style="margin-bottom:6px;"><strong>2.2 注意力机制</strong></p>
                <p style="text-indent:2em;">注意力机制的灵感来源于人类视觉系统，其核心思想是让模型学会自动关注重要信息，忽略无关信息...</p>
            </div>
            <div style="font-size:12px;font-weight:bold;border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:8px;">第3章 本文方法</div>
            <div style="font-size:10.5px;line-height:1.7;">
                <p style="text-indent:2em;">本章详细介绍本文提出的图像识别方法，包括整体网络架构、混合注意力模块设计以及多尺度特征融合策略...</p>
            </div>
            <div style="margin-top:15px;font-size:10px;color:#666;text-align:center;">— 后续还有第4章实验结果与分析、第5章总结与展望等章节 —</div>
        `;
    } else if (tplId === 'paper') {
        html += `
            <div style="columns:2;column-gap:20px;font-size:9.5px;line-height:1.55;text-align:justify;">
                <div style="text-align:center;column-span:all;margin-bottom:12px;">
                    <div style="font-size:14px;font-weight:bold;">An Efficient Deep Learning Approach for Image Recognition with Hybrid Attention Mechanism</div>
                    <div style="font-size:10px;margin-top:6px;">Zhang San, Li Si, Wang Wu, and Zhao Liu</div>
                    <div style="font-size:9px;color:#666;">Department of Computer Science, Tsinghua University<br>
                    {zhangsan, lisi, wangwu, zhaoliu}@tsinghua.edu.cn</div>
                </div>
                <div style="font-weight:bold;margin-bottom:4px;font-size:10.5px;">Abstract</div>
                <div style="margin-bottom:10px;color:#333;">
                    Image recognition is a fundamental task in computer vision. In this paper, we propose an efficient deep learning approach that combines channel and spatial attention mechanisms to improve recognition accuracy. Our method introduces a novel hybrid attention module that adaptively recalibrates feature maps. Extensive experiments on ImageNet and CIFAR-100 demonstrate that our approach achieves state-of-the-art performance with significantly fewer parameters. Specifically, our model achieves 85.2% Top-1 accuracy on ImageNet with only 5.2M parameters, outperforming comparable models by 3.5%.
                </div>
                <div style="font-weight:bold;margin-bottom:4px;font-size:10.5px;">Index Terms</div>
                <div style="margin-bottom:10px;color:#333;">Image Recognition, Deep Learning, Convolutional Neural Networks, Attention Mechanism, Efficient Architecture</div>
                
                <div style="font-weight:bold;margin-bottom:5px;font-size:10.5px;">I. INTRODUCTION</div>
                <div style="margin-bottom:10px;">
                    Image recognition has been a long-standing research problem in computer vision with numerous real-world applications, including autonomous driving, medical imaging, and face recognition. Traditional methods rely on hand-crafted features such as SIFT and HOG, which often fail to capture complex patterns in real-world images.
                    <br><br>
                    Since the groundbreaking work of Krizhevsky et al. [1], Convolutional Neural Networks (CNNs) have dominated the field of image recognition. Subsequent works such as VGGNet [2], GoogLeNet [3], and ResNet [4] have progressively improved accuracy by increasing network depth and width. However, these improvements often come at the cost of significantly increased computational complexity.
                    <br><br>
                    To address this challenge, attention mechanisms have been introduced to help models focus on informative regions. Channel attention [5] and spatial attention [6] have shown promising results, but most existing methods only consider one type of attention, limiting their effectiveness.
                    <br><br>
                    In this paper, we propose a hybrid attention mechanism that combines both channel and spatial attention in a unified framework. Our contributions are threefold: (1) We propose a lightweight hybrid attention module...
                </div>
                
                <div style="font-weight:bold;margin-bottom:5px;font-size:10.5px;">II. RELATED WORK</div>
                <div style="margin-bottom:10px;">
                    <strong>A. Convolutional Neural Networks</strong><br>
                    Since AlexNet [1] demonstrated the power of deep CNNs, numerous architectures have been proposed. VGGNet [2] showed that increasing network depth leads to better performance. GoogLeNet [3] introduced the Inception module for multi-scale feature extraction. ResNet [4] proposed residual connections to enable training of very deep networks.
                    <br><br>
                    <strong>B. Attention Mechanisms</strong><br>
                    Attention mechanisms have been widely applied in computer vision. SENet [5] introduced channel attention by modeling interdependencies between channels. CBAM [6] combined channel and spatial attention sequentially. However, these methods apply attention in a fixed manner...
                </div>
                
                <div style="font-weight:bold;margin-bottom:5px;font-size:10.5px;">III. METHODOLOGY</div>
                <div style="margin-bottom:10px;">
                    <strong>A. Overall Architecture</strong><br>
                    Our network follows a ResNet-style backbone with our proposed hybrid attention modules inserted after each residual block. The overall architecture is shown in Fig. 1.
                    <br><br>
                    <strong>B. Hybrid Attention Module</strong><br>
                    Our hybrid attention module consists of two branches: a channel attention branch and a spatial attention branch. The channel branch models inter-channel relationships through global average pooling...
                    <br><br>
                    <div style="background:#f5f5f5;border:1px solid #ddd;padding:6px;margin:8px 0;font-size:9px;">
                        <em>Fig. 1.</em> Overview of the proposed network architecture with hybrid attention modules.
                    </div>
                    <strong>C. Multi-Scale Feature Fusion</strong><br>
                    To capture features at different scales, we design a multi-scale feature fusion module that combines features from different layers...
                </div>
                
                <div style="font-weight:bold;margin-bottom:5px;font-size:10.5px;">IV. EXPERIMENTS</div>
                <div style="margin-bottom:10px;">
                    <strong>A. Datasets</strong><br>
                    We evaluate our method on two benchmark datasets: ImageNet-1K with 1.28M training images across 1000 classes, and CIFAR-100 with 50K training images across 100 classes.
                    <br><br>
                    <strong>B. Results on ImageNet</strong><br>
                    Table I shows the comparison results on ImageNet. Our method achieves 85.2% Top-1 accuracy with only 5.2M parameters...
                    <br><br>
                    <table style="width:100%;border-collapse:collapse;font-size:8.5px;margin:6px 0;">
                        <tr style="background:#f0f0f0;">
                            <th style="border:1px solid #999;padding:3px;text-align:left;">Method</th>
                            <th style="border:1px solid #999;padding:3px;text-align:center;">Params</th>
                            <th style="border:1px solid #999;padding:3px;text-align:center;">Top-1</th>
                        </tr>
                        <tr>
                            <td style="border:1px solid #999;padding:3px;">ResNet-18 [4]</td>
                            <td style="border:1px solid #999;padding:3px;text-align:center;">11.7M</td>
                            <td style="border:1px solid #999;padding:3px;text-align:center;">69.8%</td>
                        </tr>
                        <tr>
                            <td style="border:1px solid #999;padding:3px;">MobileNetV2</td>
                            <td style="border:1px solid #999;padding:3px;text-align:center;">3.4M</td>
                            <td style="border:1px solid #999;padding:3px;text-align:center;">72.0%</td>
                        </tr>
                        <tr style="background:#e8f0fe;">
                            <td style="border:1px solid #999;padding:3px;"><strong>Ours</strong></td>
                            <td style="border:1px solid #999;padding:3px;text-align:center;"><strong>5.2M</strong></td>
                            <td style="border:1px solid #999;padding:3px;text-align:center;"><strong>85.2%</strong></td>
                        </tr>
                    </table>
                    <div style="font-size:8.5px;color:#666;"><em>TABLE I:</em> Comparison with state-of-the-art methods on ImageNet-1K.</div>
                </div>
                
                <div style="font-weight:bold;margin-bottom:5px;font-size:10.5px;">V. CONCLUSION</div>
                <div style="margin-bottom:10px;">
                    In this paper, we proposed an efficient deep learning approach for image recognition with a novel hybrid attention mechanism. Extensive experiments demonstrate the effectiveness of our method... Future work will explore applying the attention module to other vision tasks.
                </div>
                
                <div style="font-weight:bold;margin-bottom:5px;font-size:10.5px;">REFERENCES</div>
                <div style="font-size:8.5px;line-height:1.5;">
                    [1] A. Krizhevsky, I. Sutskever, and G. Hinton, "ImageNet classification with deep convolutional neural networks," in NeurIPS, 2012.<br>
                    [2] K. Simonyan and A. Zisserman, "Very deep convolutional networks for large-scale image recognition," in ICLR, 2015.<br>
                    [3] C. Szegedy et al., "Going deeper with convolutions," in CVPR, 2015.<br>
                    [4] K. He et al., "Deep residual learning for image recognition," in CVPR, 2016.<br>
                    [5] J. Hu et al., "Squeeze-and-excitation networks," in CVPR, 2018.
                </div>
            </div>
        `;
    } else if (tplId === 'proposal') {
        html += `
            <div style="text-align:center;margin-bottom:20px;">
                <div style="border-top:3px solid #00529b;border-bottom:3px solid #00529b;padding:15px 0;">
                    <div style="font-size:10px;color:#00529b;letter-spacing:4px;margin-bottom:6px;">PROJECT PROPOSAL</div>
                    <div style="font-size:18px;font-weight:bold;color:#00529b;">智能办公系统建设项目</div>
                    <div style="font-size:13px;font-weight:bold;color:#00529b;margin-top:6px;">解决方案</div>
                    <div style="font-size:10px;color:#666;margin-top:10px;">XX科技有限公司 &nbsp;|&nbsp; 2024年3月</div>
                </div>
            </div>
            <div style="font-size:10px;margin-bottom:15px;">
                <table style="width:100%;border-collapse:collapse;">
                    <tr style="background:#f0f5fa;">
                        <td style="border:1px solid #c5d5e5;padding:5px;width:20%;font-weight:bold;color:#00529b;">项目名称</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;" colspan="3">智能办公系统建设项目</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #c5d5e5;padding:5px;font-weight:bold;color:#00529b;">客户单位</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;width:35%;">XX集团有限公司</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;width:15%;font-weight:bold;color:#00529b;">文档版本</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;width:15%;">V1.0</td>
                    </tr>
                    <tr style="background:#f0f5fa;">
                        <td style="border:1px solid #c5d5e5;padding:5px;font-weight:bold;color:#00529b;">编制单位</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;">XX科技有限公司</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;font-weight:bold;color:#00529b;">编制日期</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;">2024.03.15</td>
                    </tr>
                </table>
            </div>
            <div style="font-size:12px;font-weight:bold;color:#00529b;border-left:4px solid #00529b;padding-left:8px;margin-bottom:8px;">1. 项目概述</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <p style="text-indent:2em;margin-bottom:6px;">随着企业数字化转型的深入推进，传统办公模式已无法满足现代企业高效协同的需求。XX集团作为行业领先企业，目前面临办公流程不规范、信息孤岛严重、协同效率低下等问题，亟需建设一套统一的智能办公系统。</p>
                <p style="text-indent:2em;">本项目旨在为XX集团建设一套集流程审批、文档管理、即时通讯、会议管理于一体的智能办公平台，实现办公流程数字化、协同移动化、决策数据化，全面提升企业运营效率。</p>
            </div>
            <div style="font-size:12px;font-weight:bold;color:#00529b;border-left:4px solid #00529b;padding-left:8px;margin-bottom:8px;">2. 需求分析</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <p style="font-weight:bold;margin-bottom:4px;">2.1 业务需求</p>
                <ul style="margin:0 0 8px 22px;padding:0;">
                    <li>流程审批：支持请假、报销、采购等20+类审批流程，支持移动端审批</li>
                    <li>文档管理：支持文档在线编辑、版本管理、权限控制</li>
                    <li>即时通讯：支持单聊、群聊、文件传输、消息已读回执</li>
                    <li>会议管理：支持会议室预约、在线会议、会议纪要</li>
                </ul>
                <p style="font-weight:bold;margin-bottom:4px;">2.2 非功能需求</p>
                <ul style="margin:0 0 0 22px;padding:0;">
                    <li>性能要求：系统支持5000人同时在线，页面响应时间&lt;2秒</li>
                    <li>安全要求：支持SSO单点登录、数据加密存储、操作审计日志</li>
                    <li>可用性：系统可用性≥99.9%，支持7×24小时运行</li>
                </ul>
            </div>
            <div style="font-size:12px;font-weight:bold;color:#00529b;border-left:4px solid #00529b;padding-left:8px;margin-bottom:8px;">3. 技术方案</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <p style="font-weight:bold;margin-bottom:4px;">3.1 总体架构</p>
                <p style="text-indent:2em;margin-bottom:6px;">系统采用微服务架构设计，分为接入层、应用层、服务层和数据层四层架构。前端采用Vue3 + TypeScript，后端采用Spring Cloud微服务体系，数据库采用MySQL + Redis，消息队列采用RabbitMQ。</p>
                <div style="background:#f5f8fc;border:1px dashed #00529b;padding:10px;margin:8px 0;text-align:center;font-size:10px;color:#00529b;">
                    【架构图示意：前端 → API网关 → 微服务集群 → 数据存储】
                </div>
                <p style="font-weight:bold;margin-bottom:4px;">3.2 技术选型</p>
                <table style="width:100%;border-collapse:collapse;font-size:10px;margin-top:4px;">
                    <tr style="background:#e6eef7;">
                        <th style="border:1px solid #c5d5e5;padding:4px;width:25%;">技术领域</th>
                        <th style="border:1px solid #c5d5e5;padding:4px;width:35%;">技术选型</th>
                        <th style="border:1px solid #c5d5e5;padding:4px;width:40%;">选型说明</th>
                    </tr>
                    <tr>
                        <td style="border:1px solid #c5d5e5;padding:4px;">前端框架</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;">Vue 3 + TypeScript</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;">生态成熟，开发效率高</td>
                    </tr>
                    <tr style="background:#f8fafd;">
                        <td style="border:1px solid #c5d5e5;padding:4px;">后端框架</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;">Spring Cloud Alibaba</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;">微服务治理能力完善</td>
                    </tr>
                </table>
            </div>
            <div style="font-size:12px;font-weight:bold;color:#00529b;border-left:4px solid #00529b;padding-left:8px;margin-bottom:8px;">4. 项目实施计划</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <table style="width:100%;border-collapse:collapse;">
                    <tr style="background:#e6eef7;">
                        <th style="border:1px solid #c5d5e5;padding:5px;width:25%;">阶段</th>
                        <th style="border:1px solid #c5d5e5;padding:5px;width:25%;">时间</th>
                        <th style="border:1px solid #c5d5e5;padding:5px;width:50%;">主要工作内容</th>
                    </tr>
                    <tr>
                        <td style="border:1px solid #c5d5e5;padding:5px;">需求调研</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;text-align:center;">第1-2周</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;">需求调研、需求分析、需求规格说明书</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #c5d5e5;padding:5px;">系统设计</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;text-align:center;">第3-4周</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;">架构设计、数据库设计、接口设计</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #c5d5e5;padding:5px;">开发实施</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;text-align:center;">第5-12周</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;">前后端开发、联调测试</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #c5d5e5;padding:5px;">测试上线</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;text-align:center;">第13-14周</td>
                        <td style="border:1px solid #c5d5e5;padding:5px;">系统测试、用户培训、上线部署</td>
                    </tr>
                </table>
            </div>
            <div style="font-size:12px;font-weight:bold;color:#00529b;border-left:4px solid #00529b;padding-left:8px;margin-bottom:8px;">5. 项目预算</div>
            <div style="font-size:10.5px;line-height:1.7;">
                <p style="text-indent:2em;">项目总预算约85万元，包括软件研发费用60万元、硬件采购费用15万元、实施运维费用10万元。具体明细见附件预算表。</p>
            </div>
        `;
    } else if (tplId === 'business-report') {
        html += `
            <div style="text-align:center;margin-bottom:18px;">
                <div style="font-size:18px;font-weight:bold;color:#00529b;">2024年度经营分析报告</div>
                <div style="font-size:11px;color:#666;margin-top:6px;">年度业绩回顾与未来展望</div>
                <div style="font-size:10px;color:#999;margin-top:8px;">XX集团战略发展部 &nbsp;|&nbsp; 2025年1月</div>
            </div>
            <div style="background:#f0f5fa;border-left:4px solid #00529b;padding:10px 14px;margin-bottom:15px;">
                <div style="font-weight:bold;color:#00529b;font-size:11px;margin-bottom:4px;">📊 核心数据一览</div>
                <div style="font-size:10px;color:#333;line-height:1.8;">
                    • 营业收入：<strong>12.5亿元</strong>，同比增长<strong style="color:#c0392b;">28.6%</strong><br>
                    • 净利润：<strong>2.3亿元</strong>，同比增长<strong style="color:#c0392b;">18.5%</strong><br>
                    • 客户数量：<strong>5,200家</strong>，同比增长<strong style="color:#c0392b;">35%</strong><br>
                    • 员工总数：<strong>1,280人</strong>，同比增长<strong style="color:#c0392b;">22%</strong>
                </div>
            </div>
            <div style="font-size:12px;font-weight:bold;color:#00529b;border-bottom:2px solid #00529b;padding-bottom:3px;margin-bottom:8px;">一、执行摘要</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <p style="text-indent:2em;margin-bottom:6px;">2024年，公司整体经营状况良好，全年实现营业收入12.5亿元，同比增长28.6%；净利润2.3亿元，同比增长18.5%。各项核心指标均超额完成年度预算目标。</p>
                <table style="width:100%;border-collapse:collapse;font-size:10px;margin:8px 0;">
                    <tr style="background:#00529b;color:white;">
                        <th style="border:1px solid #00529b;padding:5px;">指标名称</th>
                        <th style="border:1px solid #00529b;padding:5px;">2023年</th>
                        <th style="border:1px solid #00529b;padding:5px;">2024年</th>
                        <th style="border:1px solid #00529b;padding:5px;">同比增长</th>
                        <th style="border:1px solid #00529b;padding:5px;">年度目标</th>
                        <th style="border:1px solid #00529b;padding:5px;">完成率</th>
                    </tr>
                    <tr>
                        <td style="border:1px solid #c5d5e5;padding:4px;">营业收入（亿元）</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;">9.72</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;font-weight:bold;">12.50</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;color:#c0392b;">+28.6%</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;">11.00</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;color:#27ae60;">113.6%</td>
                    </tr>
                    <tr style="background:#f8fafd;">
                        <td style="border:1px solid #c5d5e5;padding:4px;">净利润（亿元）</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;">1.94</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;font-weight:bold;">2.30</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;color:#c0392b;">+18.5%</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;">2.00</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;color:#27ae60;">115.0%</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #c5d5e5;padding:4px;">客户数量（家）</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;">3,852</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;font-weight:bold;">5,200</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;color:#c0392b;">+35.0%</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;">4,500</td>
                        <td style="border:1px solid #c5d5e5;padding:4px;text-align:right;color:#27ae60;">115.6%</td>
                    </tr>
                </table>
            </div>
            <div style="font-size:12px;font-weight:bold;color:#00529b;border-bottom:2px solid #00529b;padding-bottom:3px;margin-bottom:8px;">二、业务分析</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <p style="font-weight:bold;margin-bottom:4px;">2.1 收入结构分析</p>
                <p style="text-indent:2em;margin-bottom:6px;">从收入结构来看，软件产品收入占比最高，达到52%，同比增长32%；技术服务收入占比35%，同比增长25%；运维服务收入占比13%，同比增长20%。</p>
                <div style="background:#f5f8fc;border:1px solid #c5d5e5;padding:10px;margin:6px 0;font-size:10px;">
                    <strong>收入构成：</strong>软件产品 52% | 技术服务 35% | 运维服务 13%
                </div>
                <p style="font-weight:bold;margin-bottom:4px;">2.2 客户结构分析</p>
                <ul style="margin:0 0 0 22px;padding:0;">
                    <li>大型企业客户：1,850家，占比35.6%，贡献收入7.2亿元（57.6%）</li>
                    <li>中型企业客户：2,100家，占比40.4%，贡献收入3.8亿元（30.4%）</li>
                    <li>小微企业客户：1,250家，占比24.0%，贡献收入1.5亿元（12.0%）</li>
                </ul>
            </div>
            <div style="font-size:12px;font-weight:bold;color:#00529b;border-bottom:2px solid #00529b;padding-bottom:3px;margin-bottom:8px;">三、财务状况</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <p style="text-indent:2em;margin-bottom:6px;">截至2024年末，公司总资产达到18.5亿元，净资产10.2亿元，资产负债率44.9%，财务结构稳健。经营活动现金流净额3.2亿元，现金流状况良好。</p>
                <p style="font-weight:bold;margin-bottom:4px;">关键财务指标：</p>
                <ul style="margin:0 0 0 22px;padding:0;">
                    <li>毛利率：42.5%（同比提升1.2个百分点）</li>
                    <li>净利率：18.4%（同比下降1.6个百分点，主要系研发投入增加）</li>
                    <li>ROE：24.8%（保持较高水平）</li>
                    <li>应收账款周转天数：45天（同比减少3天）</li>
                </ul>
            </div>
            <div style="font-size:12px;font-weight:bold;color:#00529b;border-bottom:2px solid #00529b;padding-bottom:3px;margin-bottom:8px;">四、未来展望</div>
            <div style="font-size:10.5px;line-height:1.7;">
                <p style="text-indent:2em;margin-bottom:6px;">展望2025年，公司将继续坚持"产品+服务"双轮驱动战略，重点发力AI赋能和行业解决方案。预计2025年营业收入目标为16亿元，同比增长28%；净利润目标为3亿元，同比增长30%。</p>
                <p style="font-weight:bold;margin-bottom:4px;">重点工作方向：</p>
                <ul style="margin:0 0 0 22px;padding:0;">
                    <li>加大AI产品研发投入，推出智能化解决方案</li>
                    <li>深化重点行业布局，提升行业解决方案竞争力</li>
                    <li>加强销售渠道建设，扩大市场覆盖范围</li>
                    <li>优化组织架构，提升运营效率</li>
                </ul>
            </div>
        `;
    } else if (tplId === 'report-academic') {
        html += `
            <div style="text-align:center;margin-bottom:18px;">
                <div style="font-size:15px;font-weight:bold;">数据结构课程实验报告</div>
                <div style="font-size:13px;margin-top:6px;font-weight:bold;color:#2c3e50;">实验五：快速排序算法性能分析</div>
                <div style="font-size:10px;color:#666;margin-top:10px;">
                    <strong>课程名称：</strong>数据结构与算法 &nbsp;&nbsp;
                    <strong>实验学时：</strong>4学时
                </div>
            </div>
            <div style="font-size:10.5px;background:#f8f9fa;border:1px solid #dee2e6;padding:10px;margin-bottom:15px;border-radius:4px;">
                <table style="width:100%;">
                    <tr>
                        <td style="padding:3px;"><strong>学生姓名：</strong>张三</td>
                        <td style="padding:3px;"><strong>学号：</strong>2021001001</td>
                        <td style="padding:3px;"><strong>班级：</strong>计算机2101班</td>
                    </tr>
                    <tr>
                        <td style="padding:3px;"><strong>实验日期：</strong>2022年11月15日</td>
                        <td style="padding:3px;"><strong>提交日期：</strong>2022年11月22日</td>
                        <td style="padding:3px;"><strong>成绩：</strong></td>
                    </tr>
                </table>
            </div>
            <div style="font-size:12px;font-weight:bold;background:#2c3e50;color:white;padding:5px 10px;margin-bottom:8px;">一、实验目的</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <ol style="margin:0 0 0 22px;padding:0;">
                    <li style="margin-bottom:3px;">深入理解快速排序算法的基本原理和实现方法</li>
                    <li style="margin-bottom:3px;">掌握快速排序算法的时间复杂度分析方法</li>
                    <li style="margin-bottom:3px;">通过实验对比不同情况下快速排序的性能差异</li>
                    <li>学习算法性能测试和数据分析的基本方法</li>
                </ol>
            </div>
            <div style="font-size:12px;font-weight:bold;background:#2c3e50;color:white;padding:5px 10px;margin-bottom:8px;">二、实验原理</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <p style="text-indent:2em;margin-bottom:6px;">快速排序（Quick Sort）是一种基于分治思想的排序算法，由C. A. R. Hoare于1962年提出。其基本思想是：通过一趟排序将待排序记录分割成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。</p>
                <p style="font-weight:bold;margin-bottom:4px;">算法步骤：</p>
                <ol style="margin:0 0 6px 22px;padding:0;">
                    <li>从数列中挑出一个元素，称为"基准"（pivot）</li>
                    <li>分区（partition）：把比基准值小的元素放在左边，比基准值大的放在右边</li>
                    <li>递归地对左右两个子序列进行快速排序</li>
                </ol>
                <p style="font-weight:bold;margin-bottom:4px;">时间复杂度分析：</p>
                <ul style="margin:0 0 0 22px;padding:0;">
                    <li>最好情况：O(n log n)，每次划分都均匀分成两部分</li>
                    <li>平均情况：O(n log n)，随机数据下的期望复杂度</li>
                    <li>最坏情况：O(n²)，数组已有序时退化为冒泡排序</li>
                </ul>
            </div>
            <div style="font-size:12px;font-weight:bold;background:#2c3e50;color:white;padding:5px 10px;margin-bottom:8px;">三、实验环境</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <ul style="margin:0 0 0 22px;padding:0;">
                    <li>操作系统：Windows 11</li>
                    <li>编程语言：C++</li>
                    <li>编译器：GCC 11.2.0</li>
                    <li>测试平台：Intel Core i7-12700H @ 3.5GHz，16GB RAM</li>
                </ul>
            </div>
            <div style="font-size:12px;font-weight:bold;background:#2c3e50;color:white;padding:5px 10px;margin-bottom:8px;">四、实验内容与步骤</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <p style="font-weight:bold;margin-bottom:4px;">4.1 算法实现</p>
                <p style="text-indent:2em;margin-bottom:6px;">实现标准的快速排序算法，包括递归版本和非递归版本，以及三种基准选择策略（首元素、尾元素、随机选取）。</p>
                <p style="font-weight:bold;margin-bottom:4px;">4.2 测试用例设计</p>
                <ul style="margin:0 0 6px 22px;padding:0;">
                    <li>随机数据：n = 1000, 10000, 100000, 1000000</li>
                    <li>有序数据：升序和降序各一组</li>
                    <li>重复数据：大量重复元素的情况</li>
                    <li>逆序数据：完全逆序排列</li>
                </ul>
                <p style="font-weight:bold;margin-bottom:4px;">4.3 性能对比</p>
                <p style="text-indent:2em;">将快速排序与冒泡排序、归并排序、堆排序进行对比，记录不同数据规模下的运行时间。</p>
            </div>
            <div style="font-size:12px;font-weight:bold;background:#2c3e50;color:white;padding:5px 10px;margin-bottom:8px;">五、实验结果与分析</div>
            <div style="font-size:10.5px;line-height:1.7;margin-bottom:12px;">
                <p style="font-weight:bold;margin-bottom:4px;">5.1 不同数据规模下的运行时间</p>
                <table style="width:100%;border-collapse:collapse;font-size:10px;margin-bottom:8px;">
                    <tr style="background:#34495e;color:white;">
                        <th style="border:1px solid #2c3e50;padding:4px;">数据规模</th>
                        <th style="border:1px solid #2c3e50;padding:4px;">冒泡排序</th>
                        <th style="border:1px solid #2c3e50;padding:4px;">快速排序</th>
                        <th style="border:1px solid #2c3e50;padding:4px;">归并排序</th>
                        <th style="border:1px solid #2c3e50;padding:4px;">堆排序</th>
                    </tr>
                    <tr>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:center;">1,000</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">0.012s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;font-weight:bold;">0.001s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">0.002s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">0.002s</td>
                    </tr>
                    <tr style="background:#f8f9fa;">
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:center;">10,000</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">1.234s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;font-weight:bold;">0.008s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">0.015s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">0.018s</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:center;">100,000</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">125.6s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;font-weight:bold;">0.095s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">0.182s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">0.210s</td>
                    </tr>
                    <tr style="background:#f8f9fa;">
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:center;">1,000,000</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;color:#e74c3c;">超时</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;font-weight:bold;">1.123s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">2.145s</td>
                        <td style="border:1px solid #bdc3c7;padding:4px;text-align:right;">2.567s</td>
                    </tr>
                </table>
                <p style="font-weight:bold;margin-bottom:4px;">5.2 结果分析</p>
                <ul style="margin:0 0 0 22px;padding:0;">
                    <li>快速排序在随机数据下表现最优，明显优于其他排序算法</li>
                    <li>当数据规模增大时，快速排序的O(n log n)优势更加明显</li>
                    <li>在有序数据情况下，快速排序性能下降，需要优化基准选择</li>
                </ul>
            </div>
            <div style="font-size:12px;font-weight:bold;background:#2c3e50;color:white;padding:5px 10px;margin-bottom:8px;">六、实验结论</div>
            <div style="font-size:10.5px;line-height:1.7;">
                <p style="text-indent:2em;">通过本次实验，我深入理解了快速排序算法的原理和实现，验证了其在平均情况下的O(n log n)时间复杂度。实验结果表明，快速排序是实际应用中最高效的排序算法之一，但需要注意最坏情况的优化。通过随机选取基准或三数取中法，可以有效避免最坏情况的发生。</p>
            </div>
        `;
    }
    
    html += `</div>`;
    preview.innerHTML = html;
}

function copyCode() {
    const codeEl = document.querySelector('#latex-code code');
    if (!codeEl) {
        showToast('代码区域不存在', 'error');
        return;
    }
    
    const code = codeEl.textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('代码已复制到剪贴板', 'success');
    }).catch(() => {
        showToast('复制失败，请手动复制', 'error');
    });
}

function downloadCode() {
    const codeEl = document.querySelector('#latex-code code');
    const titleEl = document.getElementById('code-title');
    if (!codeEl || !titleEl) {
        showToast('代码区域不存在', 'error');
        return;
    }
    
    const code = codeEl.textContent;
    const title = titleEl.textContent;
    
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = title + '.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('文件已下载', 'success');
}

// ===== 专业模式：简历评估 =====
function evaluateResume() {
    const codeEl = document.getElementById('evaluate-code');
    if (!codeEl) {
        showToast('评估区域不存在', 'error');
        return;
    }
    
    const code = codeEl.value.trim();
    if (!code) {
        showToast('请先输入LaTeX代码', 'error');
        return;
    }
    
    // 简单评估逻辑
    const scores = [];
    const suggestions = [];
    
    // 排版评估
    const hasGeometry = code.includes('geometry');
    scores.push({ label: '页面布局', score: hasGeometry ? 85 : 60 });
    if (!hasGeometry) suggestions.push('建议使用 geometry 包设置合理的页边距（推荐2-2.5cm）');
    
    // 字体层级
    const hasSection = code.includes('\\section') || code.includes('\\section*');
    scores.push({ label: '字体层级', score: hasSection ? 80 : 50 });
    if (!hasSection) suggestions.push('建议使用 section 命令建立清晰的章节层级');
    
    // 颜色使用
    const hasColor = code.includes('xcolor') || code.includes('color');
    scores.push({ label: '色彩搭配', score: hasColor ? 75 : 65 });
    
    // 图标使用
    const hasIcons = code.includes('fontawesome');
    scores.push({ label: '视觉效果', score: hasIcons ? 85 : 60 });
    if (!hasIcons) suggestions.push('可以考虑使用 fontawesome 包添加图标，提升视觉效果');
    
    // 代码规范
    const hasComments = (code.match(/%/g) || []).length > 5;
    scores.push({ label: '代码规范', score: hasComments ? 80 : 65 });
    if (!hasComments) suggestions.push('建议添加适当的注释，提高代码可维护性');
    
    // 计算总分
    const totalScore = Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);
    
    // 显示结果
    const resultCard = document.getElementById('eval-result');
    const scoresEl = document.getElementById('eval-scores');
    const suggestionsEl = document.getElementById('eval-suggestions');
    if (!resultCard || !scoresEl || !suggestionsEl) {
        showToast('评估结果区域不存在', 'error');
        return;
    }
    
    resultCard.style.display = 'block';
    
    let scoresHtml = `<div style="text-align:center;margin-bottom:16px;">
        <div style="font-size:36px;font-weight:bold;color:var(--primary);">${totalScore}</div>
        <div style="font-size:13px;color:var(--text-secondary);">综合美观度评分</div>
    </div>`;
    
    scores.forEach(s => {
        scoresHtml += `
            <div class="eval-score-item">
                <div class="eval-score-label">
                    <span>${s.label}</span>
                    <span>${s.score}分</span>
                </div>
                <div class="eval-score-bar">
                    <div class="eval-score-fill" style="width:${s.score}%"></div>
                </div>
            </div>
        `;
    });
    
    let suggestionsHtml = '';
    if (suggestions.length > 0) {
        suggestionsHtml = `<div style="margin-top:16px;"><h5 style="margin-bottom:8px;">优化建议</h5>`;
        suggestions.forEach(s => {
            suggestionsHtml += `<div class="eval-suggestion-item">💡 ${s}</div>`;
        });
        suggestionsHtml += `</div>`;
    } else {
        suggestionsHtml = `<div style="margin-top:16px;padding:12px;background:#e6f4ea;border-radius:4px;font-size:13px;color:#137333;">
            👍 做得不错！你的LaTeX代码结构规范，排版良好。
        </div>`;
    }
    
    scoresEl.innerHTML = scoresHtml;
    suggestionsEl.innerHTML = suggestionsHtml;
    
    showToast('评估完成', 'success');
}

// ===== 帮助弹窗 =====
function showHelp() {
    const modal = document.getElementById('help-modal');
    if (modal) modal.classList.add('active');
}

function closeHelp() {
    const modal = document.getElementById('help-modal');
    if (modal) modal.classList.remove('active');
}

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('help-modal');
    if (e.target === modal) {
        closeHelp();
    }
});

// ===== Toast 提示 =====
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        if (toast) toast.classList.remove('show');
    }, 2500);
}

// ===== 需求智能分析 =====
function analyzeRequirement(mode) {
    let reqText = '';
    
    if (mode === 'beginner') {
        reqText = $val('requirement-input');
    } else if (mode === 'intermediate') {
        reqText = $val('intermediate-requirement');
    } else if (mode === 'expert') {
        reqText = $val('expert-requirement');
    }
    
    if (!reqText.trim()) {
        showToast('请先描述你的需求', 'error');
        return;
    }
    
    showToast('正在分析需求...');
    
    // 关键词匹配分析
    const analysis = analyzeKeywords(reqText);
    
    if (mode === 'beginner') {
        applyBeginnerSuggestion(analysis);
    } else if (mode === 'intermediate') {
        applyIntermediateSuggestion(analysis);
    } else if (mode === 'expert') {
        showBeautySuggestions(analysis, reqText);
    }
}

// 关键词分析引擎
function analyzeKeywords(text) {
    const result = {
        category: 'job', // job, academic, business, other
        template: 'internet-cv',
        style: 'modern',
        keywords: [],
        suggestions: []
    };
    
    const lower = text.toLowerCase();
    
    // 文档类型判断
    if (/论文|期刊|sci|ei|ieee|投稿|学术论文/.test(lower)) {
        result.category = 'academic';
        result.template = 'paper';
        result.style = 'academic';
        result.keywords.push('学术论文');
    } else if (/毕业|学位|本科|硕士|博士|毕业论文/.test(lower)) {
        result.category = 'academic';
        result.template = 'thesis';
        result.style = 'formal';
        result.keywords.push('毕业论文');
    } else if (/实验|调研|课程报告|实验报告/.test(lower)) {
        result.category = 'academic';
        result.template = 'report-academic';
        result.style = 'standard';
        result.keywords.push('实验报告');
    } else if (/方案|策划|项目|投标|立项/.test(lower)) {
        result.category = 'business';
        result.template = 'proposal';
        result.style = 'professional';
        result.keywords.push('项目方案');
    } else if (/报告|商务|年度|分析|财报/.test(lower)) {
        result.category = 'business';
        result.template = 'business-report';
        result.style = 'business';
        result.keywords.push('商务报告');
    } else if (/简历|求职|面试|cv|resume/.test(lower)) {
        result.category = 'job';
        result.keywords.push('简历');
        
        // 细分简历类型
        if (/国企|央企|公务员|事业|体制|稳定/.test(lower)) {
            result.template = 'soe-cv';
            result.style = 'formal';
            result.keywords.push('国企风格');
        } else if (/外企|外资|国际|英文|英语/.test(lower)) {
            result.template = 'foreign-cv';
            result.style = 'international';
            result.keywords.push('外企风格');
        } else if (/学术|科研|博士|硕士|申请|留学/.test(lower)) {
            result.template = 'academic-cv';
            result.style = 'academic';
            result.keywords.push('学术简历');
        } else if (/互联网|前端|后端|算法|程序员|it|技术|产品|运营/.test(lower)) {
            result.template = 'internet-cv';
            result.style = 'modern';
            result.keywords.push('互联网风格');
        }
    } else if (/信函|信|cover|letter|申请信/.test(lower)) {
        result.category = 'job';
        result.template = 'cover-letter';
        result.style = 'formal';
        result.keywords.push('求职信');
    }
    
    // 风格偏好
    if (/简洁|简约|清爽|干净/.test(lower)) {
        result.suggestions.push('简洁风格：减少装饰元素，留白充足');
    }
    if (/正式|规范|严肃|严谨/.test(lower)) {
        result.suggestions.push('正式风格：使用宋体，结构严谨');
    }
    if (/现代|时尚|设计感|创意/.test(lower)) {
        result.suggestions.push('现代风格：使用无衬线字体，增加设计感');
    }
    if (/紧凑|信息密度|内容多/.test(lower)) {
        result.suggestions.push('紧凑排版：减小行距和间距，提高信息密度');
    }
    if (/学术|科研|论文/.test(lower)) {
        result.suggestions.push('学术风格：突出研究经历和发表论文');
    }
    
    // 重点内容
    if (/项目|经验|经历/.test(lower)) {
        result.suggestions.push('突出项目经历：放在显眼位置，详细描述');
    }
    if (/技能|技术|能力/.test(lower)) {
        result.suggestions.push('突出技能展示：分类整理，量化说明');
    }
    if (/教育|学校|学历|院校/.test(lower)) {
        result.suggestions.push('突出教育背景：放在靠前位置，标注亮点');
    }
    
    return result;
}

// 新手模式应用建议
function applyBeginnerSuggestion(analysis) {
    // 自动填入一些建议内容
    const tips = [];
    
    if (analysis.keywords.length > 0) {
        tips.push('识别到类型：' + analysis.keywords.join('、'));
    }
    
    if (analysis.template === 'soe-cv') {
        tips.push('💡 建议使用宋体，排版正式规范');
        tips.push('💡 突出政治面貌、获奖情况、实习经历');
    } else if (analysis.template === 'foreign-cv') {
        tips.push('💡 建议使用英文简历格式，突出个人能力');
        tips.push('💡 使用动作动词开头描述经历');
    } else if (analysis.template === 'academic-cv') {
        tips.push('💡 突出科研经历、发表论文、参与项目');
        tips.push('💡 按时间倒序排列，最新经历在前');
    } else if (analysis.template === 'internet-cv') {
        tips.push('💡 突出技术栈和项目经验');
        tips.push('💡 建议使用现代简洁风格');
    }
    
    if (analysis.suggestions.length > 0) {
        tips.push('✨ ' + analysis.suggestions[0]);
    }
    
    showToast('已为你推荐 ' + (analysis.template === 'internet-cv' ? '互联网风格' : 
                              analysis.template === 'soe-cv' ? '国企风格' :
                              analysis.template === 'foreign-cv' ? '外企风格' :
                              analysis.template === 'academic-cv' ? '学术风格' : '对应') + ' 模板', 'success');
    
    // 应用对应样式
    if (analysis.template === 'soe-cv') {
        styleState.font = 'song';
        styleState.margin = 'normal';
        styleState.compact = false;
    } else if (analysis.template === 'academic-cv') {
        styleState.font = 'default';
        styleState.margin = 'large';
        styleState.compact = false;
    }
    
    updatePreview();
    
    // 显示建议
    setTimeout(() => {
        alert('📋 智能建议：\n\n' + tips.join('\n'));
    }, 300);
}

// 进阶模式应用建议
function applyIntermediateSuggestion(analysis) {
    // 自动切换到推荐的模板
    showCodeTemplate(analysis.template);
    
    const templateName = latexTemplates[analysis.template]?.title || analysis.template;
    showToast('已为你推荐：' + templateName, 'success');
}

// 专业模式：显示美化建议
function showBeautySuggestions(analysis, reqText) {
    const box = document.getElementById('beauty-suggestions');
    const content = document.getElementById('bs-content');
    if (!box || !content) return;
    
    const templateName = latexTemplates[analysis.template]?.title || '对应模板';
    
    let html = '';
    
    // 总体评分
    html += `<div class="bs-score">
        <div class="bs-score-num">85</div>
        <div class="bs-score-text">
            <strong>匹配度评分</strong><br>
            基于你的需求，推荐「${templateName}」模板
        </div>
    </div>`;
    
    // 推荐模板标签
    html += `<div class="bs-section">
        <div class="bs-section-title"><span class="icon">🏷️</span> 推荐方案</div>
        <div style="margin-bottom:6px;">`;
    
    if (analysis.category === 'job') {
        html += `<span class="bs-tag">求职类</span>`;
    } else if (analysis.category === 'academic') {
        html += `<span class="bs-tag bs-tag-green">学术类</span>`;
    } else if (analysis.category === 'business') {
        html += `<span class="bs-tag bs-tag-orange">商务类</span>`;
    }
    
    analysis.keywords.forEach(k => {
        html += `<span class="bs-tag">${k}</span>`;
    });
    
    html += `</div>
        <div class="bs-item">
            <strong>推荐模板：</strong>${templateName}<br>
            <strong>风格定位：</strong>${getStyleName(analysis.style)}
        </div>
    </div>`;
    
    // 排版美化建议
    html += `<div class="bs-section">
        <div class="bs-section-title"><span class="icon">🎨</span> 排版美化建议</div>`;
    
    const layoutTips = getLayoutTips(analysis);
    layoutTips.forEach(tip => {
        html += `<div class="bs-item">${tip}</div>`;
    });
    
    html += `</div>`;
    
    // LaTeX 代码指令
    html += `<div class="bs-section">
        <div class="bs-section-title"><span class="icon">💻</span> LaTeX 美化指令</div>`;
    
    const codeTips = getCodeTips(analysis);
    codeTips.forEach(tip => {
        html += `<div class="bs-item">
            <strong>${tip.title}</strong>
            <div class="bs-code">${tip.code}</div>
        </div>`;
    });
    
    html += `</div>`;
    
    // 内容优化建议
    html += `<div class="bs-section">
        <div class="bs-section-title"><span class="icon">📝</span> 内容优化建议</div>`;
    
    const contentTips = getContentTips(analysis, reqText);
    contentTips.forEach(tip => {
        html += `<div class="bs-item">${tip}</div>`;
    });
    
    html += `</div>`;
    
    // 进阶技巧
    html += `<div class="bs-section">
        <div class="bs-section-title"><span class="icon">🚀</span> 进阶技巧</div>
        <div class="bs-item">
            <strong>微排版优化：</strong>使用 \\usepackage{microtype} 自动优化字距和断字
            <div class="bs-code">\\usepackage[protrusion=true,expansion=true]{microtype}</div>
        </div>
        <div class="bs-item">
            <strong>颜色点缀：</strong>适度使用主题色强调重点，避免花哨
            <div class="bs-code">\\usepackage{xcolor}
\\definecolor{primary}{HTML}{6366f1}
\\textcolor{primary}{重点内容}</div>
        </div>
        <div class="bs-item">
            <strong>图标增强：</strong>使用 fontawesome 图标增加视觉辨识度
            <div class="bs-code">\\usepackage{fontawesome5}
\\faEnvelope\\ email@example.com
\\faPhone\\ +86 138-0000-0000</div>
        </div>
    </div>`;
    
    content.innerHTML = html;
    box.style.display = 'block';
    
    // 滚动到建议区
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    showToast('建议已生成', 'success');
}

function getStyleName(style) {
    const names = {
        'modern': '现代简约',
        'formal': '正式规范',
        'academic': '学术严谨',
        'professional': '专业商务',
        'international': '国际化',
        'standard': '标准格式',
        'business': '商务风格'
    };
    return names[style] || style;
}

function getLayoutTips(analysis) {
    const tips = [];
    
    if (analysis.category === 'job') {
        tips.push('✅ <strong>一页原则：</strong>简历尽量控制在一页内，内容精炼');
        tips.push('✅ <strong>留白呼吸：</strong>适当的页边距（2cm左右）让阅读更舒适');
        tips.push('✅ <strong>视觉层级：</strong>通过字体大小和粗细建立清晰的信息层级');
        tips.push('✅ <strong>对齐统一：</strong>所有元素左对齐或两端对齐，保持视觉一致性');
    } else if (analysis.category === 'academic') {
        tips.push('✅ <strong>双栏布局：</strong>期刊论文推荐使用双栏，提高阅读效率');
        tips.push('✅ <strong>公式规范：</strong>使用 amsmath 包确保公式排版专业');
        tips.push('✅ <strong>图表编号：</strong>图表按章节编号，配清晰的标题说明');
        tips.push('✅ <strong>引用格式：</strong>使用 BibTeX 管理参考文献，格式统一规范');
    } else if (analysis.category === 'business') {
        tips.push('✅ <strong>封面设计：</strong>专业的封面页提升整体质感');
        tips.push('✅ <strong>目录导航：</strong>长文档必须包含目录，方便快速定位');
        tips.push('✅ <strong>数据可视化：</strong>用图表代替文字，数据更直观');
        tips.push('✅ <strong>页眉页脚：</strong>统一的页眉页脚体现专业性');
    }
    
    if (analysis.style === 'modern') {
        tips.push('💡 <strong>现代风格：</strong>使用无衬线字体，增加色彩点缀');
    } else if (analysis.style === 'formal') {
        tips.push('💡 <strong>正式风格：</strong>使用宋体/衬线字体，结构严谨规范');
    }
    
    return tips;
}

function getCodeTips(analysis) {
    const tips = [];
    
    if (analysis.category === 'job') {
        tips.push({
            title: '设置合适的页边距',
            code: '\\usepackage[top=2cm, bottom=2cm, left=2cm, right=2cm]{geometry}'
        });
        tips.push({
            title: '优化字体层级',
            code: '\\renewcommand{\\section}[1]{%\n  \\vspace{0.5em}\n  {\\Large\\bfseries #1}\n  \\vspace{0.3em}\n  \\hrule\n  \\vspace{0.3em}\n}'
        });
        tips.push({
            title: '自定义列表样式',
            code: '\\usepackage{enumitem}\n\\setlist[itemize]{leftmargin=1.5em, itemsep=0.2em, topsep=0.2em}'
        });
    } else if (analysis.category === 'academic') {
        tips.push({
            title: '双栏论文模板基础',
            code: '\\documentclass[twocolumn,10pt]{article}\n\\usepackage{amsmath,amssymb}\n\\usepackage{graphicx}\n\\usepackage{authblk}'
        });
        tips.push({
            title: '参考文献管理',
            code: '\\bibliographystyle{IEEEtran}\n\\bibliography{reference}\n% 在 reference.bib 中管理所有文献'
        });
        tips.push({
            title: '算法伪代码排版',
            code: '\\usepackage{algorithm}\n\\usepackage{algorithmic}\n\\begin{algorithm}\n  \\caption{算法名称}\n  \\begin{algorithmic}[1]\n    \\STATE 输入：数据集 $X$\n    \\STATE 输出：结果 $Y$\n    \\RETURN $Y$\n  \\end{algorithmic}\n\\end{algorithm}'
        });
    } else if (analysis.category === 'business') {
        tips.push({
            title: '封面页设计',
            code: '\\begin{titlepage}\n  \\centering\n  \\vspace*{3cm}\n  {\\Huge\\bfseries 项目方案书\\par}\n  \\vspace{1cm}\n  {\\Large 项目名称\\par}\n  \\vfill\n  {\\large 编制单位：XXX\\par}\n  {\\large 编制日期：\\today\\par}\n\\end{titlepage}'
        });
        tips.push({
            title: '目录生成',
            code: '\\tableofcontents\n\\newpage'
        });
        tips.push({
            title: '图表美化',
            code: '\\usepackage{booktabs}\n% 三线表：\\toprule \\midrule \\bottomrule\n\\usepackage{float}\n% 图片固定位置：\\begin{figure}[H]'
        });
    }
    
    return tips;
}

function getContentTips(analysis, reqText) {
    const tips = [];
    
    if (analysis.category === 'job') {
        tips.push('🎯 <strong>STAR法则：</strong>描述经历时使用 Situation（情境）- Task（任务）- Action（行动）- Result（结果）结构');
        tips.push('📊 <strong>数据量化：</strong>尽可能用数字说明成果，如"提升了30%效率"、"带领5人团队"');
        tips.push('🔑 <strong>关键词匹配：</strong>研究目标岗位JD，将关键词自然融入简历内容');
        tips.push('🚫 <strong>避免空话：</strong>不说"学习能力强"，要说"3个月自学掌握XX技术并独立完成项目"');
    } else if (analysis.category === 'academic') {
        tips.push('📚 <strong>文献综述：</strong>充分调研相关领域，引用经典和最新文献');
        tips.push('🔬 <strong>方法创新：</strong>清晰说明你的方法与现有工作的区别和优势');
        tips.push('📈 <strong>实验充分：</strong>多组对比实验，消融实验验证各模块有效性');
        tips.push('✍️ <strong>图表自解释：</strong>每个图表都应有清晰的标题和说明，读者不看正文也能理解');
    } else if (analysis.category === 'business') {
        tips.push('🎯 <strong>目标明确：</strong>开篇即说明方案目标和预期价值');
        tips.push('📋 <strong>结构清晰：</strong>使用层级标题，逻辑递进，便于快速浏览');
        tips.push('📊 <strong>数据支撑：</strong>所有结论都有数据和事实支撑');
        tips.push('⏰ <strong>时间规划：</strong>包含明确的里程碑和时间节点');
    }
    
    return tips;
}

// ===== 全局错误处理 =====
window.addEventListener('error', function(e) {
    console.warn('捕获到错误:', e.message);
    // 不影响用户体验，静默处理
    return true;
});

window.addEventListener('unhandledrejection', function(e) {
    console.warn('未处理的Promise拒绝:', e.reason);
    return true;
});

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    try {
        // 初始化第一个模板的代码展示（仅在进阶模式页面可见时）
        const activePage = document.querySelector('.page.active');
        if (activePage?.id === 'page-intermediate') {
            showCodeTemplate('internet-cv');
        }
    } catch (e) {
        console.warn('初始化失败:', e);
    }
    
    // 初始化预览
    try {
        setTimeout(updatePreview, 200);
    } catch (e) {
        console.warn('预览初始化失败:', e);
    }
});
