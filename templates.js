// LaTeX模板库
const latexTemplates = {
    'internet-cv': {
        title: '互联网简历模板',
        description: '现代简约风格，适合互联网/科技行业',
        code: `\\documentclass[11pt,a4paper]{article}
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
    {\\Huge\\bfseries 张三} \\\\[6pt]
    {\\large\\color{primary} 高级前端开发工程师} \\\\[8pt]
    \\textcolor{subtext}{
        \\faPhone\\ 138-0000-0000 \\quad
        \\faEnvelope\\ zhangsan@email.com \\quad
        \\faMapMarkerAlt\\ 北京
    } \\\\
    \\textcolor{subtext}{
        \\faGithub\\ \\href{https://github.com/zhangsan}{github.com/zhangsan} \\quad
        \\faGlobe\\ \\href{https://zhangsan.dev}{zhangsan.dev}
    }
\\end{center}

% 个人简介
\\sectiontitle{个人简介}
5年以上前端开发经验，精通React/Vue生态，具备良好的工程化思维和代码规范意识。
曾主导多个大型项目的前端架构设计，带领团队完成从0到1的建设。
对前端性能优化、用户体验有深入研究和实践经验。

% 工作经历
\\sectiontitle{工作经历}

\\itemheader{字节跳动}{2021.07 - 至今}{高级前端工程师}{北京}
\\begin{itemize}
    \\item 负责抖音电商核心交易链路前端架构设计与开发，日均PV超10亿
    \\item 主导前端性能优化专项，首屏加载时间从3.2s降至1.5s，提升53\%
    \\item 搭建组件库和脚手架工具，提升团队开发效率40\%
    \\item 带领5人小组完成营销活动平台建设，支持大促期间流量峰值
\\end{itemize}

\\itemheader{阿里巴巴}{2019.07 - 2021.06}{前端开发工程师}{杭州}
\\begin{itemize}
    \\item 参与淘宝商家后台系统开发，服务百万级商家用户
    \\item 负责数据可视化模块，基于ECharts封装通用图表组件
    \\item 推动单元测试覆盖率从30\%提升至80\%
\\end{itemize}

% 项目经历
\\sectiontitle{项目经历}

\\itemheader{智能营销平台}{2022.03 - 2023.01}{技术负责人}{React + TypeScript}
\\begin{itemize}
    \\item 从0到1搭建可视化营销活动搭建平台，支持拖拽式页面配置
    \\item 设计并实现低代码引擎，包含组件系统、数据源、事件流等核心模块
    \\item 平台上线后，营销活动开发周期从1周缩短至2天
\\end{itemize}

\\itemheader{电商性能监控系统}{2021.09 - 2022.02}{核心开发}{Vue3 + Node.js}
\\begin{itemize}
    \\item 设计前端性能数据采集SDK，覆盖首屏、接口、错误等核心指标
    \\item 搭建后端数据处理服务，日均处理数据量10TB+
    \\item 实现告警系统，支持多维度异常检测和实时通知
\\end{itemize}

% 技能特长
\\sectiontitle{技能特长}
\\begin{itemize}
    \\item \\textbf{前端框架：} 精通React/Vue，深入理解原理，有源码阅读和二次开发经验
    \\item \\textbf{工程化：} 熟悉Webpack/Vite等构建工具，有插件开发和性能调优经验
    \\item \\textbf{后端：} 熟悉Node.js，了解MySQL/MongoDB/Redis等数据库
    \\item \\textbf{其他：} 熟悉TypeScript，有良好的代码规范和文档习惯
\\end{itemize}

\\end{document}`,
        previewStyle: 'internet'
    },

    'soe-cv': {
        title: '国企简历模板',
        description: '规范正式风格，适合国企/事业单位',
        code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[UTF8]{ctex}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{array}
\\usepackage{multirow}

% 页面设置
\\geometry{top=2.5cm, bottom=2.5cm, left=2.5cm, right=2.5cm}
\\setlist[itemize]{leftmargin=2em, itemsep=3pt, topsep=5pt}

% 字体设置
\\setCJKmainfont{SimSun}
\\setCJKsansfont{SimHei}

\\begin{document}
\\pagestyle{empty}

% 标题
\\begin{center}
    {\\Huge\\heiti 个\\quad 人\\quad 简\\quad 历} \\\\[20pt]
\\end{center}

% 基本信息表格
\\begin{tabular}{|m{3cm}|m{5cm}|m{3cm}|m{5cm}|}
    \\hline
    \\centering\\textbf{姓名} & 李四 & \\centering\\textbf{性别} & 男 \\\\
    \\hline
    \\centering\\textbf{出生年月} & 1995年6月 & \\centering\\textbf{民族} & 汉族 \\\\
    \\hline
    \\centering\\textbf{政治面貌} & 中共党员 & \\centering\\textbf{籍贯} & 北京市 \\\\
    \\hline
    \\centering\\textbf{学历} & 硕士研究生 & \\centering\\textbf{学位} & 工学硕士 \\\\
    \\hline
    \\centering\\textbf{毕业院校} & 清华大学 & \\centering\\textbf{专业} & 计算机科学与技术 \\\\
    \\hline
    \\centering\\textbf{联系电话} & 139-0000-0000 & \\centering\\textbf{电子邮箱} & lisi@email.com \\\\
    \\hline
    \\centering\\textbf{身份证号} & 110101199506****** & \\centering\\textbf{现居地} & 北京市海淀区 \\\\
    \\hline
\\end{tabular}

\\vspace{15pt}

% 教育背景
\\section*{\\heiti 教育背景}
\\hrule height 1pt
\\vspace{8pt}

\\noindent\\textbf{清华大学} \\hfill 2017.09 -- 2020.06 \\\\
计算机科学与技术专业 \\quad 硕士研究生 \\hfill 北京 \\\\
\\begin{itemize}
    \\item 研究方向：分布式系统与云计算
    \\item GPA：3.9/4.0，专业排名：3/120
    \\item 获得荣誉：国家奖学金（2018、2019）、优秀毕业生
\\end{itemize}

\\noindent\\textbf{北京邮电大学} \\hfill 2013.09 -- 2017.06 \\\\
软件工程专业 \\quad 本科 \\hfill 北京 \\\\
\\begin{itemize}
    \\item GPA：3.8/4.0，专业排名：5/200
    \\item 获得荣誉：国家励志奖学金、三好学生、优秀学生干部
\\end{itemize}

\\vspace{10pt}

% 实习/工作经历
\\section*{\\heiti 工作经历}
\\hrule height 1pt
\\vspace{8pt}

\\noindent\\textbf{中国电子科技集团} \\hfill 2020.07 -- 至今 \\\\
某研究所 \\quad 工程师 \\hfill 北京 \\\\
\\begin{itemize}
    \\item 参与国家重点研发计划项目，负责核心模块设计与开发
    \\item 完成某大型信息系统的架构设计，系统已投入实际使用
    \\item 发表学术论文3篇，申请发明专利2项
    \\item 获得单位"优秀员工"称号（2021、2022年度）
\\end{itemize}

\\vspace{10pt}

% 科研成果
\\section*{\\heiti 科研成果}
\\hrule height 1pt
\\vspace{8pt}

\\textbf{发表论文：}
\\begin{enumerate}[leftmargin=2em]
    \\item Li S, Wang H. Research on Distributed Storage Technology[J]. IEEE Transactions on Computers, 2022. (SCI一区)
    \\item 李四, 王某某. 基于深度学习的网络流量预测方法[J]. 计算机学报, 2021. (EI)
\\end{enumerate}

\\textbf{专利申请：}
\\begin{enumerate}[leftmargin=2em]
    \\item 一种分布式数据同步方法及装置（申请号：CN202210123456.7）
    \\item 一种网络异常检测方法及系统（申请号：CN202110987654.3）
\\end{enumerate}

\\vspace{10pt}

% 技能证书
\\section*{\\heiti 技能与证书}
\\hrule height 1pt
\\vspace{8pt}

\\begin{itemize}
    \\item \\textbf{专业技能：} 熟练掌握C/C++、Java、Python等编程语言；熟悉Linux系统；了解数据库原理和网络协议
    \\item \\textbf{外语水平：} 英语六级（580分），具备良好的听说读写能力
    \\item \\textbf{计算机等级：} 全国计算机等级考试四级（网络工程师）
    \\item \\textbf{资格证书：} 系统集成项目管理工程师（中级）
\\end{itemize}

\\vspace{10pt}

% 自我评价
\\section*{\\heiti 自我评价}
\\hrule height 1pt
\\vspace{8pt}

思想觉悟高，政治立场坚定，拥护党的领导。学习能力强，专业基础扎实，具有较强的科研能力和创新精神。
工作认真负责，踏实肯干，具有良好的团队协作精神和沟通能力。身体健康，能够适应高强度工作。

\\end{document}`,
        previewStyle: 'soe'
    },

    'foreign-cv': {
        title: '外企简历模板',
        description: '国际商务风格，适合外企/跨国公司',
        code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[UTF8]{ctex}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{fontawesome5}
\\usepackage{hyperref}
\\usepackage{ragged2e}

% 页面设置
\\geometry{top=1.8cm, bottom=1.8cm, left=2cm, right=2cm}
\\setlist[itemize]{leftmargin=1.5em, itemsep=2pt, topsep=3pt}

% 颜色
\\definecolor{accent}{RGB}{0, 102, 204}
\\definecolor{dark}{RGB}{51, 51, 51}
\\definecolor{gray}{RGB}{102, 102, 102}

% 自定义命令
\\newcommand{\\sectiontitle}[1]{
    \\vspace{10pt}
    {\\large\\bfseries\\color{accent}\\MakeUppercase{#1}}
    \\vspace{-4pt}
    \\hrule height 1pt
    \\vspace{6pt}
}

\\newcommand{\\experience}[4]{
    \\noindent\\textbf{#1} \\hfill \\textcolor{gray}{#2} \\\\
    \\textit{#3} \\hfill \\textcolor{gray}{#4} \\\\
}

\\begin{document}
\\pagestyle{empty}
\\RaggedRight

% 头部
\\noindent
\\begin{minipage}[t]{0.7\\textwidth}
    {\\Huge\\bfseries Wang Ming} \\\\[4pt]
    {\\large\\color{accent} Senior Product Manager}
\\end{minipage}
\\begin{minipage}[t]{0.3\\textwidth}
    \\raggedleft
    \\small
    \\textcolor{gray}{
        \\faPhone\\ +86 138 0000 0000 \\\\
        \\faEnvelope\\ wangming@email.com \\\\
        \\faLinkedin\\ linkedin.com/in/wangming \\\\
        \\faMapMarkerAlt\\ Shanghai, China
    }
\\end{minipage}

\\vspace{12pt}

% Summary
\\sectiontitle{Professional Summary}
Results-driven Product Manager with 8+ years of experience in B2B SaaS and enterprise software.
Proven track record of launching products that drive revenue growth and improve customer satisfaction.
Skilled in agile methodologies, data-driven decision making, and cross-functional team leadership.
Fluent in Mandarin and English, with experience working in multicultural environments.

% Experience
\\sectiontitle{Professional Experience}

\\experience{Microsoft}{2021 -- Present}
{Senior Product Manager}{Shanghai, China}
\\begin{itemize}
    \\item Led product strategy for Azure China cloud services, driving 45\% YoY revenue growth
    \\item Managed a team of 6 PMs and coordinated with engineering, marketing, and sales teams
    \\item Launched 3 new product features that increased customer retention by 20\%
    \\item Conducted market research and competitive analysis to identify new business opportunities
\\end{itemize}

\\vspace{6pt}

\\experience{Amazon Web Services}{2018 -- 2021}
{Product Manager}{Beijing, China}
\\begin{itemize}
    \\item Owned product roadmap for AWS database services in the China region
    \\item Collaborated with global teams to localize products for Chinese market requirements
    \\item Grew customer base by 60\% through targeted feature development and partnerships
    \\item Presented product updates and strategy to executive stakeholders quarterly
\\end{itemize}

\\vspace{6pt}

\\experience{Oracle}{2016 -- 2018}
{Associate Product Manager}{Shenzhen, China}
\\begin{itemize}
    \\item Supported product launch of Oracle Cloud ERP in Greater China
    \\item Analyzed customer usage data to identify product improvement opportunities
    \\item Created product documentation and training materials for sales teams
\\end{itemize}

% Education
\\sectiontitle{Education}

\\experience{INSEAD}{2020}
{Executive MBA -- Strategy \& Innovation}{Singapore}
\\begin{itemize}
    \\item Dean's List, GPA: 3.8/4.0
    \\item Focus: Digital Transformation, Product Strategy
\\end{itemize}

\\vspace{6pt}

\\experience{Fudan University}{2012 -- 2016}
{B.S. in Management Information Systems}{Shanghai, China}
\\begin{itemize}
    \\item Magna Cum Laude, GPA: 3.7/4.0
    \\item President, Student Information Technology Association
\\end{itemize}

% Skills
\\sectiontitle{Core Competencies}
\\begin{tabular}{ll}
\\textbf{Product Strategy} & Roadmap Planning, Market Analysis, Pricing Strategy \\\\
\\textbf{Methodologies} & Agile/Scrum, Lean Startup, Design Thinking \\\\
\\textbf{Tools} & Jira, Confluence, Tableau, SQL, Figma \\\\
\\textbf{Languages} & Mandarin (Native), English (Fluent), Japanese (Basic) \\\\
\\end{tabular}

% Achievements
\\sectiontitle{Key Achievements}
\\begin{itemize}
    \\item Recipient of Microsoft Asia Pacific Employee of the Year (2022)
    \\item Speaker at AWS re:Invent China Summit (2020, 2021)
    \\item Patent: "Intelligent Cloud Resource Allocation System" (Pending)
\\end{itemize}

\\end{document}`,
        previewStyle: 'foreign'
    },

    'academic-cv': {
        title: '学术简历模板',
        description: '学术规范风格，适合科研/教职申请',
        code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[UTF8]{ctex}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{url}

% 页面设置
\\geometry{top=2cm, bottom=2cm, left=2cm, right=2cm}
\\setlist[itemize]{leftmargin=1.5em, itemsep=2pt}

\\begin{document}
\\pagestyle{plain}

\\begin{center}
    {\\LARGE\\bfseries Dr. Chen Wei} \\\\[6pt]
    {\\large Research Associate} \\\\[4pt]
    Department of Computer Science \\\\
    Stanford University \\\\
    \\url{chenwei@stanford.edu} \\quad | \\quad \\url{https://chenwei.stanford.edu}
\\end{center}

\\vspace{10pt}

\\section*{Research Interests}
\\hrule
\\vspace{5pt}
Machine Learning, Natural Language Processing, Large Language Models,
Knowledge Graphs, Information Retrieval, Deep Learning

\\section*{Education}
\\hrule
\\vspace{5pt}

\\noindent\\textbf{Stanford University} \\hfill 2018 -- 2022 \\\\
Ph.D. in Computer Science \\hfill Stanford, CA \\\\
Advisor: Prof. Christopher Manning \\\\
Dissertation: "Neural Approaches to Knowledge-Enhanced Language Understanding" \\\\
GPA: 3.98/4.0

\\vspace{6pt}
\\noindent\\textbf{Tsinghua University} \\hfill 2015 -- 2018 \\\\
M.S. in Computer Science \\hfill Beijing, China \\\\
Advisor: Prof. Liu Yang \\\\
Thesis: "Deep Learning Methods for Chinese Natural Language Processing" \\\\
GPA: 3.95/4.0 \\quad Rank: 1/85

\\vspace{6pt}
\\noindent\\textbf{Peking University} \\hfill 2011 -- 2015 \\\\
B.S. in Computer Science \\hfill Beijing, China \\\\
Minor: Mathematics \\\\
GPA: 3.85/4.0 \\quad Rank: 5/120

\\section*{Research Experience}
\\hrule
\\vspace{5pt}

\\noindent\\textbf{Research Associate} \\hfill 2022 -- Present \\\\
Stanford NLP Group \\hfill Stanford, CA
\\begin{itemize}
    \\item Leading research on knowledge-enhanced large language models
    \\item Published 5 papers at top-tier venues (NeurIPS, ACL, EMNLP)
    \\item Mentoring 3 PhD students and 2 master students
    \\item Collaborating with Google Research on LLM alignment project
\\end{itemize}

\\vspace{6pt}
\\noindent\\textbf{Research Intern} \\hfill Summer 2021 \\\\
Google Brain \\hfill Mountain View, CA
\\begin{itemize}
    \\item Worked on improving factual accuracy of large language models
    \\item Developed a novel retrieval-augmented generation framework
    \\item Results published at NeurIPS 2022
\\end{itemize}

\\section*{Publications}
\\hrule
\\vspace{5pt}

\\textbf{Selected Publications (* = equal contribution)}

\\begin{enumerate}
    \\item Chen Wei*, Zhang Li*, and Christopher Manning.
    \\textit{"Knowledge Graph Enhanced Language Models for Factual QA."}
    NeurIPS 2023. \\textbf{(Spotlight, top 3\%)}

    \\item Chen Wei, Wang Hao, and Liu Yang.
    \\textit{"Pre-training with Knowledge: A Survey."}
    ACL 2023. \\textbf{(Outstanding Paper Award)}

    \\item Chen Wei and Christopher Manning.
    \\textit{"Retrieval-Augmented Generation for Knowledge-Intensive NLP."}
    EMNLP 2022.

    \\item Zhang Li, Chen Wei, et al.
    \\textit{"Multimodal Knowledge Graphs: A Comprehensive Survey."}
    IEEE TPAMI 2022.

    \\item Chen Wei, Liu Yang, et al.
    \\textit{"Chinese NLP with Deep Learning: Methods and Applications."}
    ACL 2021. \\textbf{(Oral presentation)}
\\end{enumerate}

\\section*{Awards and Honors}
\\hrule
\\vspace{5pt}

\\begin{itemize}
    \\item ACL 2023 Outstanding Paper Award
    \\item Stanford Graduate Fellowship (2018-2022)
    \\item NeurIPS 2022 Spotlight Paper
    \\item National Scholarship, China (Top 1\%) (2016, 2017)
    \\item Outstanding Graduate, Tsinghua University (2018)
    \\item ACM-ICPC Asia Regional Gold Medal (2014)
\\end{itemize}

\\section*{Skills}
\\hrule
\\vspace{5pt}

\\begin{tabular}{ll}
\\textbf{Programming:} & Python, PyTorch, TensorFlow, C++, Java, SQL \\\\
\\textbf{NLP Tools:} & HuggingFace Transformers, spaCy, NLTK, AllenNLP \\\\
\\textbf{Big Data:} & Spark, Hadoop, MapReduce \\\\
\\textbf{Languages:} & Mandarin (Native), English (Fluent, TOEFL 115) \\\\
\\end{tabular}

\\section*{Professional Service}
\\hrule
\\vspace{5pt}

\\textbf{Program Committee / Reviewer:}
NeurIPS (2022, 2023), ACL (2021-2023), EMNLP (2021-2023),
ICLR (2023), NAACL (2022), COLING (2022)

\\textbf{Workshop Organization:}
Co-organizer, KnowledgeNLP Workshop @ ACL 2023

\\section*{References}
\\hrule
\\vspace{5pt}
Available upon request.

\\end{document}`,
        previewStyle: 'academic'
    },

    'cover-letter': {
        title: '求职信模板',
        description: '正式信函格式，适合岗位申请',
        code: `\\documentclass[11pt,a4paper]{letter}
\\usepackage[UTF8]{ctex}
\\usepackage{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}

% 页面设置
\\geometry{top=2.5cm, bottom=2.5cm, left=2.5cm, right=2.5cm}

% 签名
\\signature{
    张三 \\\\
    \\small 138-0000-0000 \\quad zhangsan@email.com
}

% 日期
\\date{\\today}

\\begin{document}

\\begin{letter}{
    字节跳动 人力资源部 \\\\
    北京市海淀区知春路甲48号 \\\\
    盈都大厦
}

\\opening{尊敬的招聘负责人：}

您好！我是张三，近日通过贵公司官网了解到高级前端开发工程师岗位的招聘信息，
对该职位非常感兴趣，特此致信申请。

我拥有5年以上的前端开发经验，目前就职于阿里巴巴，担任高级前端工程师一职。
在过去的工作中，我积累了丰富的大型项目开发经验，主要体现在以下几个方面：

\\begin{itemize}[leftmargin=2em]
    \\item \\textbf{技术能力扎实：} 精通React/Vue等主流前端框架，深入理解其原理和实现机制；
    熟悉前端工程化体系，有Webpack/Vite插件开发经验；具备良好的TypeScript使用经验。

    \\item \\textbf{项目经验丰富：} 曾主导多个百万级用户产品的前端开发工作，
    包括电商平台、数据可视化系统等，对复杂业务场景有深入理解和实践经验。

    \\item \\textbf{性能优化专长：} 对前端性能优化有深入研究，曾主导性能优化专项，
    将首屏加载时间从3.2s优化至1.5s，用户体验显著提升。

    \\item \\textbf{团队协作能力：} 有团队管理经验，曾带领5人前端小组完成多个重要项目，
    具备良好的沟通协调能力和技术分享精神。
\\end{itemize}

我一直对字节跳动的企业文化和技术氛围非常向往，特别是贵公司在短视频、
电商等领域的创新和突破令我印象深刻。我相信我的技术能力和项目经验
能够为团队创造价值，同时也期待能够在字节跳动这样优秀的平台上
获得更大的成长和发展。

随信附上我的个人简历，期待有机会与您进一步交流。感谢您在百忙之中
阅读我的求职信，期待您的回复！

祝工作顺利！

\\closing{此致\\\par 敬礼！}

\\end{letter}

\\end{document}`,
        previewStyle: 'letter'
    },

    // ===== 学术类 =====
    'thesis': {
        title: '毕业论文模板',
        description: '符合高校规范的本科/硕士学位论文模板',
        code: `\\documentclass[12pt,a4paper,openright]{book}
\\usepackage[UTF8]{ctex}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{booktabs}
\\usepackage{listings}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{titletoc}
\\usepackage{fancyhdr}
\\usepackage{setspace}

% 页面设置
\\geometry{top=2.5cm, bottom=2.5cm, left=3cm, right=2.5cm}

% 行距
\\onehalfspacing

% 页眉页脚
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[CO]\\leftmark
\\fancyhead[CE]\\rightmark
\\fancyfoot[C]\\thepage

% 章节标题格式
\\titleformat{\\chapter}[block]
  {\\centering\\bfseries\\Huge}
  {\\chaptername\\ \\thechapter}
  {1em}
  {}

% 代码设置
\\lstset{
    basicstyle=\\ttfamily\\small,
    keywordstyle=\\color{blue},
    commentstyle=\\color{green!70!black},
    stringstyle=\\color{red},
    numbers=left,
    numberstyle=\\tiny,
    frame=single,
    breaklines=true,
    showstringspaces=false
}

\\begin{document}

% ========== 封面 ==========
\\thispagestyle{empty}
\\begin{center}
    \\vspace*{2cm}
    {\\Huge\\bfseries 基于深度学习的图像识别方法研究} \\\\[2cm]
    
    {\\Large 本\ 科\ 毕\ 业\ 论\ 文} \\\\[3cm]
    
    \\begin{tabular}{ll}
    \\textbf{学\qquad 院：} & 计算机学院 \\\\
    \\textbf{专\qquad 业：} & 计算机科学与技术 \\\\
    \\textbf{学生姓名：} & 张三 \\\\
    \\textbf{学\qquad 号：} & 2019001001 \\\\
    \\textbf{指导教师：} & 李教授 \\\\
    \\end{tabular}
    
    \\vfill
    {\\Large 2024年6月}
\\end{center}

\\cleardoublepage

% ========== 摘要 ==========
\\chapter*{摘\\quad 要}
\\addcontentsline{toc}{chapter}{摘要}

随着深度学习技术的快速发展，图像识别在各个领域得到了广泛应用。本文针对当前图像识别方法中存在的问题，提出了一种基于改进卷积神经网络的图像识别方法。

本文的主要工作包括以下几个方面：

\\begin{enumerate}
    \\item 对深度学习和卷积神经网络的基本理论进行了系统梳理，分析了现有方法的优缺点。
    \\item 提出了一种改进的卷积神经网络结构，通过引入注意力机制提升了特征提取能力。
    \\item 在多个公开数据集上进行了实验验证，结果表明本文方法在准确率和效率方面均优于对比方法。
    \\item 设计并实现了一个基于本文方法的图像识别原型系统。
\\end{enumerate}

\\textbf{关键词：} 深度学习；卷积神经网络；图像识别；注意力机制

\\cleardoublepage

% ========== Abstract ==========
\\chapter*{Abstract}
\\addcontentsline{toc}{chapter}{Abstract}

With the rapid development of deep learning technology, image recognition has been widely used in various fields...

\\textbf{Keywords:} Deep Learning; Convolutional Neural Network; Image Recognition; Attention Mechanism

\\cleardoublepage

% ========== 目录 ==========
\\tableofcontents
\\cleardoublepage

% ========== 正文 ==========
\\chapter{绪论}
\\label{chap:introduction}

\\section{研究背景与意义}
\\label{sec:background}

随着信息技术的飞速发展，数字图像数据呈爆炸式增长。如何从海量图像数据中快速准确地提取有用信息，成为计算机视觉领域的重要研究课题。图像识别作为计算机视觉的核心任务之一，在安防监控、医疗诊断、自动驾驶等领域具有广泛的应用前景。

传统的图像识别方法主要依赖人工设计的特征提取算法，如SIFT、HOG等。这些方法在特定场景下取得了一定效果，但存在泛化能力差、对光照和姿态变化敏感等问题。

\\section{国内外研究现状}
\\label{sec:related-work}

\subsection{深度学习发展历程}
深度学习的概念最早由Hinton等人于2006年提出...

\subsection{图像识别研究进展}
近年来，卷积神经网络在图像识别领域取得了突破性进展...

\\section{本文主要工作}
\\label{sec:main-work}

本文主要围绕基于深度学习的图像识别方法展开研究...

\\section{论文章节安排}
\\label{sec:organization}

本文共分为六章，各章内容安排如下：

\\begin{itemize}
    \\item 第1章：绪论。介绍研究背景、意义和国内外研究现状。
    \\item 第2章：相关理论基础。介绍深度学习和卷积神经网络的基本理论。
    \\item 第3章：改进的卷积神经网络方法。详细阐述本文提出的方法。
    \\item 第4章：实验与分析。在多个数据集上验证本文方法的有效性。
    \\item 第5章：系统设计与实现。介绍原型系统的设计与实现。
    \\item 第6章：总结与展望。总结本文工作并展望未来研究方向。
\\end{itemize}

\\chapter{相关理论基础}
\\label{chap:theory}

\\section{深度学习基础}
\\subsection{神经网络基本原理}
人工神经网络是模拟生物神经系统结构和功能的数学模型...

\\subsection{反向传播算法}
反向传播算法是训练神经网络的核心算法...

\\section{卷积神经网络}
\\subsection{卷积层}
卷积层是卷积神经网络的核心组成部分...

\\subsection{池化层}
池化层用于降低特征图的空间维度...

\\chapter{改进的卷积神经网络方法}
\\label{chap:method}

\\section{问题分析}
现有卷积神经网络在处理复杂图像时仍存在以下问题...

\\section{网络结构设计}
\\subsection{整体架构}
本文提出的网络结构如图\\ref{fig:network}所示...

\\begin{figure}[htbp]
    \\centering
    \\setlength{\\fboxsep}{0pt}
    \\framebox[0.8\\textwidth][c]{\\rule{0pt}{4cm}网络结构示意图}
    \\caption{本文提出的网络结构}
    \\label{fig:network}
\\end{figure}

\\subsection{注意力模块}
为了提升网络对重要特征的关注，本文引入了注意力机制...

\\chapter{实验与分析}
\\label{chap:experiment}

\\section{实验设置}
\\subsection{数据集}
本文在以下三个公开数据集上进行实验：

\\begin{table}[htbp]
    \\centering
    \\caption{实验数据集统计}
    \\label{tab:datasets}
    \\begin{tabular}{lccr}
        \\toprule
        数据集 & 类别数 & 训练集 & 测试集 \\\\
        \\midrule
        MNIST & 10 & 60,000 & 10,000 \\\\
        CIFAR-10 & 10 & 50,000 & 10,000 \\\\
        ImageNet & 1000 & 1,281,167 & 50,000 \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}

\\subsection{评价指标}
本文采用准确率(Accuracy)作为主要评价指标...

\\section{实验结果与分析}
\\subsection{对比实验}
本文方法与其他主流方法的对比如表\\ref{tab:comparison}所示...

\\begin{table}[htbp]
    \\centering
    \\caption{不同方法在各数据集上的准确率(\\%)}
    \\label{tab:comparison}
    \\begin{tabular}{lccc}
        \\toprule
        方法 & MNIST & CIFAR-10 & ImageNet \\\\
        \\midrule
        LeNet-5 & 98.9 & 75.2 & - \\\\
        VGG-16 & 99.3 & 91.4 & 73.5 \\\\
        ResNet-50 & 99.5 & 93.6 & 76.1 \\\\
        本文方法 & \\textbf{99.7} & \\textbf{95.2} & \\textbf{78.3} \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}

\\chapter{总结与展望}
\\label{chap:conclusion}

\\section{本文工作总结}
本文围绕基于深度学习的图像识别方法展开了深入研究...

\\section{未来研究展望}
尽管本文方法取得了一定效果，但仍有许多方面值得进一步研究...

% ========== 参考文献 ==========
\\begin{thebibliography}{99}
    \\addcontentsline{toc}{chapter}{参考文献}
    
    \\bibitem{lecun1998gradient}
    LeCun Y, Bottou L, Bengio Y, et al. Gradient-based learning applied to document recognition[J]. Proceedings of the IEEE, 1998, 86(11): 2278-2324.
    
    \\bibitem{krizhevsky2012imagenet}
    Krizhevsky A, Sutskever I, Hinton G E. ImageNet classification with deep convolutional neural networks[C]//Advances in Neural Information Processing Systems. 2012: 1097-1105.
    
    \\bibitem{he2016deep}
    He K, Zhang X, Ren S, et al. Deep residual learning for image recognition[C]//Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition. 2016: 770-778.
    
    \\bibitem{goodfellow2016deep}
    Goodfellow I, Bengio Y, Courville A. Deep Learning[M]. MIT Press, 2016.

    \\bibitem{周志华2016机器学习}
    周志华. 机器学习[M]. 清华大学出版社, 2016.

\\end{thebibliography}

\\cleardoublepage

% ========== 致谢 ==========
\\chapter*{致\\quad 谢}
\\addcontentsline{toc}{chapter}{致谢}

时光荏苒，四年的大学生活即将结束...

\\end{document}`,
        previewStyle: 'thesis'
    },

    'paper': {
        title: 'IEEE期刊论文模板',
        description: 'IEEE Transactions双栏格式，适合SCI/EI期刊投稿',
        code: `\\documentclass[10pt,journal,compsoc]{IEEEtran}
\\usepackage{graphicx}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{booktabs}
\\usepackage{algorithm}
\\usepackage{algorithmic}
\\usepackage{multirow}
\\usepackage{url}

% 正确处理PDF链接
\\ifCLASSINFOpdf
  \\usepackage[pdftex]{hyperref}
\\else
  \\usepackage{hyperref}
\\fi

\\hyphenation{op-tical net-works semi-conduc-tor}

\\begin{document}

\\title{An Efficient Deep Learning Approach for Image Recognition
\\thanks{Manuscript received Month Day, Year; revised Month Day, Year.}}

\\author{Zhang San, Li Si, Member, IEEE, and Wang Wu, Senior Member, IEEE
\\thanks{Z. San and L. Si are with the Department of Computer Science, Tsinghua University, Beijing 100084, China (e-mail: zhangsan@tsinghua.edu.cn).}
\\thanks{W. Wu is with Google Research, Mountain View, CA 94043 USA.}}

\\markboth{IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE,~VOL.~XX, NO.~XX, MONTH YEAR}%
{San et al.: An Efficient Deep Learning Approach for Image Recognition}

\\maketitle

\\begin{abstract}
In this paper, we propose a novel deep learning approach for image recognition. 
Existing convolutional neural networks (CNNs) often suffer from high computational cost 
and limited performance on small datasets. To address these issues, we introduce an 
attention-based feature enhancement module that can be easily integrated into existing 
CNN architectures. Extensive experiments on three benchmark datasets demonstrate that 
our method achieves state-of-the-art performance while maintaining high computational efficiency. 
Specifically, our method improves top-1 accuracy by 2.3\\% on ImageNet compared to the baseline, 
with only 15\\% additional parameters.

\\end{abstract}

\\begin{IEEEkeywords}
Deep learning, convolutional neural networks, image recognition, attention mechanism, 
feature extraction
\\end{IEEEkeywords}

\\section{Introduction}
\\label{sec:introduction}

\\IEEEPARstart{I}{mage} recognition is a fundamental task in computer vision with numerous 
applications including autonomous driving, medical imaging, and face recognition. 
Recent advances in deep learning have significantly improved the performance of image 
recognition systems. Convolutional Neural Networks (CNNs) have become the de facto 
standard for this task due to their remarkable ability to learn hierarchical features 
from raw pixel data.

Despite the success of CNNs, there remain several challenges:

\\begin{enumerate}
\\item Computational efficiency: Deep CNN models require substantial computational resources, 
limiting their deployment on edge devices.

\\item Data efficiency: Current CNNs require large amounts of labeled training data, 
which may not always be available.

\\item Interpretability: The black-box nature of deep models makes it difficult to 
understand their decision-making process.
\\end{enumerate}

To address these challenges, we propose a novel attention-based feature enhancement 
module that can be plugged into existing CNN architectures. Our key contributions 
are summarized as follows:

\\begin{itemize}
\\item We propose a lightweight attention module that enhances important features 
while suppressing irrelevant ones.

\\item We introduce an efficient training strategy that improves data efficiency 
through knowledge distillation.

\\item We conduct extensive experiments on three benchmark datasets, demonstrating 
state-of-the-art performance with minimal computational overhead.
\\end{itemize}

\\section{Related Work}
\\label{sec:related}

\\subsection{Convolutional Neural Networks}
Since the groundbreaking work of Krizhevsky et al. \\cite{krizhevsky2012imagenet}, 
CNNs have dominated image recognition tasks. VGGNet \\cite{simonyan2014very} demonstrated 
that increasing network depth leads to better performance. ResNet \\cite{he2016deep} 
addressed the degradation problem with skip connections, enabling training of much 
deeper networks.

\\subsection{Attention Mechanisms}
Attention mechanisms have been successfully applied in various computer vision tasks. 
SENet \\cite{hu2018squeeze} introduced channel-wise attention to recalibrate feature 
responses. CBAM \\cite{woo2018cbam} combined channel and spatial attention modules.

\\section{Proposed Method}
\\label{sec:method}

\\subsection{Overall Architecture}
The overall architecture of our proposed method is illustrated in Fig. \\ref{fig:arch}. 
Our method takes a standard CNN backbone and inserts our proposed Attention Feature 
Enhancement (AFE) modules at multiple stages.

\\begin{figure}[!t]
\\centering
\\fbox{\\parbox{2.5in}{\\centering\\vspace{0.5in}Network Architecture\\vspace{0.5in}}}
\\caption{Overall architecture of the proposed method.}
\\label{fig:arch}
\\end{figure}

\\subsection{Attention Feature Enhancement Module}
Our AFE module consists of two branches: a channel attention branch and a spatial 
attention branch. The detailed structure is shown in Algorithm \\ref{alg:afe}.

\\begin{algorithm}[!t]
\\caption{Attention Feature Enhancement Module}
\\label{alg:afe}
\\begin{algorithmic}[1]
\\REQUIRE Input feature map $F \\in \\mathbb{R}^{C \\times H \\times W}$
\\ENSURE Enhanced feature map $F' \\in \\mathbb{R}^{C \\times H \\times W}$

\\STATE Compute channel attention: $F_c = \\text{Sigmoid}(\\text{MLP}(\\text{AvgPool}(F) + \\text{MaxPool}(F)))$
\\STATE Apply channel attention: $F_1 = F_c \\otimes F$
\\STATE Compute spatial attention: $F_s = \\text{Sigmoid}(\\text{Conv}([\\text{AvgPool}(F_1); \\text{MaxPool}(F_1)]))$
\\STATE Apply spatial attention: $F_2 = F_s \\otimes F_1$
\\STATE Residual connection: $F' = F + F_2$
\\STATE \\textbf{return} $F'$
\\end{algorithmic}
\\end{algorithm}

\\section{Experiments}
\\label{sec:experiments}

\\subsection{Datasets}
We evaluate our method on three standard benchmark datasets: MNIST, CIFAR-10, and ImageNet-1K. 
Detailed statistics are provided in Table \\ref{tab:datasets}.

\\begin{table}[!t]
\\renewcommand{\\arraystretch}{1.3}
\\caption{Dataset Statistics}
\\label{tab:datasets}
\\centering
\\begin{tabular}{lccc}
\\hline
\\bfseries Dataset & \\bfseries Classes & \\bfseries Train & \\bfseries Test \\\\
\\hline
MNIST & 10 & 60,000 & 10,000 \\\\
CIFAR-10 & 10 & 50,000 & 10,000 \\\\
ImageNet-1K & 1000 & 1.28M & 50K \\\\
\\hline
\\end{tabular}
\\end{table}

\\subsection{Main Results}
Table \\ref{tab:results} shows the comparison between our method and other state-of-the-art methods.

\\begin{table*}[!t]
\\renewcommand{\\arraystretch}{1.3}
\\caption{Comparison with State-of-the-Art Methods on ImageNet-1K}
\\label{tab:results}
\\centering
\\begin{tabular}{lcccc}
\\hline
\\bfseries Method & \\bfseries Top-1 Acc. & \\bfseries Top-5 Acc. & \\bfseries Params & \\bfseries GFLOPs \\\\
\\hline
ResNet-50 \\cite{he2016deep} & 76.1 & 92.9 & 25.6M & 4.1 \\\\
ResNet-101 \\cite{he2016deep} & 77.4 & 93.6 & 44.5M & 7.8 \\\\
SENet-50 \\cite{hu2018squeeze} & 77.6 & 93.7 & 28.1M & 4.3 \\\\
CBAM-ResNet50 \\cite{woo2018cbam} & 77.8 & 93.9 & 28.0M & 4.3 \\\\
\\hline
\\bfseries Ours (ResNet-50) & \\bfseries 78.4 & \\bfseries 94.2 & 29.4M & 4.7 \\\\
\\bfseries Ours (ResNet-101) & \\bfseries 79.6 & \\bfseries 94.8 & 48.1M & 8.5 \\\\
\\hline
\\end{tabular}
\\end{table*}

\\section{Conclusion}
\\label{sec:conclusion}

In this paper, we proposed an efficient deep learning approach for image recognition 
based on a novel attention feature enhancement module. Extensive experiments on three 
benchmark datasets demonstrate that our method achieves state-of-the-art performance 
with minimal additional computational cost. Future work will explore applying our 
method to other vision tasks such as object detection and semantic segmentation.

\\section*{Acknowledgment}
The authors would like to thank the anonymous reviewers for their valuable comments 
and suggestions.

\\bibliographystyle{IEEEtran}
\\bibliography{references}

% 示例参考文献（实际使用时应放在.bib文件中）
\\begin{thebibliography}{15}

\\bibitem{krizhevsky2012imagenet}
A. Krizhevsky, I. Sutskever, and G. E. Hinton, \\lq\\lq ImageNet classification with deep convolutional neural networks,\\rq\\rq\\ in \\textit{Advances in Neural Information Processing Systems}, 2012, pp. 1097--1105.

\\bibitem{simonyan2014very}
K. Simonyan and A. Zisserman, \\lq\\lq Very deep convolutional networks for large-scale image recognition,\\rq\\rq\\ in \\textit{International Conference on Learning Representations}, 2014.

\\bibitem{he2016deep}
K. He, X. Zhang, S. Ren, and J. Sun, \\lq\\lq Deep residual learning for image recognition,\\rq\\rq\\ in \\textit{Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition}, 2016, pp. 770--778.

\\bibitem{hu2018squeeze}
J. Hu, L. Shen, and G. Sun, \\lq\\lq Squeeze-and-excitation networks,\\rq\\rq\\ in \\textit{Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition}, 2018, pp. 7132--7141.

\\bibitem{woo2018cbam}
S. Woo, J. Park, J.-Y. Lee, and I. S. Kweon, \\lq\\lq CBAM: Convolutional block attention module,\\rq\\rq\\ in \\textit{Proceedings of the European Conference on Computer Vision}, 2018, pp. 3--19.

\\end{thebibliography}

\\end{document}`,
        previewStyle: 'paper'
    },

    // ===== 商务类 =====
    'proposal': {
        title: '项目方案策划模板',
        description: '项目立项、投标方案、活动策划通用模板',
        code: `\\documentclass[12pt,a4paper]{article}
\\usepackage[UTF8]{ctex}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{array}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{fancyhdr}
\\usepackage{lastpage}

% 页面设置
\\geometry{top=2.5cm, bottom=2.5cm, left=2.8cm, right=2.8cm}

% 页眉页脚
\\pagestyle{fancy}
\\fancyhf{}
\\lhead{\\small 智能办公系统建设方案}
\\rhead{\\small 第\\thepage 页 / 共\\pageref{LastPage} 页}
\\renewcommand{\\headrulewidth}{0.4pt}

% 颜色定义
\\definecolor{primary}{RGB}{0, 82, 155}
\\definecolor{secondary}{RGB}{0, 120, 180}

\\begin{document}

% ========== 封面 ==========
\\thispagestyle{empty}

\\begin{center}
    \\vspace*{2cm}
    
    \\textcolor{primary}{\\rule{\\textwidth}{3pt}}
    \\vspace{0.5cm}
    
    {\\Huge\\bfseries 智能办公系统建设项目}
    
    \\vspace{0.5cm}
    {\\LARGE\\bfseries 解决方案}
    
    \\vspace{0.3cm}
    \\textcolor{primary}{\\rule{\\textwidth}{3pt}}
    
    \\vspace{1cm}
    {\\Large 版本号：V1.0}
    
    \\vfill
    
    \\begin{tabular}{ll}
    \\textbf{编制单位：} & 某某科技有限公司 \\\\
    \\textbf{编制日期：} & 2024年1月 \\\\
    \\textbf{文档密级：} & 内部机密 \\\\
    \\end{tabular}
    
\\end{center}

\\newpage

% ========== 修订记录 ==========
\\section*{修订记录}
\\addcontentsline{toc}{section}{修订记录}

\\begin{tabular}{|c|c|c|c|}
    \\hline
    版本 & 日期 & 修订人 & 修订内容 \\\\
    \\hline
    V1.0 & 2024-01-15 & 张三 & 初始版本创建 \\\\
    \\hline
    V1.1 & 2024-01-20 & 李四 & 补充技术架构部分 \\\\
    \\hline
    V1.2 & 2024-01-25 & 王五 & 更新项目计划 \\\\
    \\hline
\\end{tabular}

\\newpage

% ========== 目录 ==========
\\tableofcontents
\\newpage

% ========== 正文 ==========
\\section{项目概述}
\\label{sec:overview}

\\subsection{项目背景}
随着企业数字化转型的深入推进，传统办公模式已无法满足现代企业高效协作的需求。为提升办公效率、降低运营成本、优化管理流程，拟建设一套智能化办公系统。

\\subsection{建设目标}
本项目旨在建设一套集办公自动化、知识管理、协作沟通于一体的智能办公平台，实现以下目标：

\\begin{itemize}
    \\item \\textbf{效率提升：} 日常办公效率提升30\%以上
    \\item \\textbf{成本降低：} 行政运营成本降低20\%
    \\item \\textbf{流程优化：} 核心业务流程线上化率达到95\%
    \\item \\textbf{数据驱动：} 建立完整的办公数据分析体系
\\end{itemize}

\\subsection{项目范围}
\\begin{table}[htbp]
    \\centering
    \\caption{项目范围说明}
    \\label{tab:scope}
    \\begin{tabular}{|l|p{10cm}|}
        \\hline
        \\textbf{模块名称} & \\textbf{功能说明} \\\\
        \\hline
        流程管理 & 审批流程、公文流转、任务管理 \\\\
        \\hline
        沟通协作 & 即时通讯、视频会议、文档协作 \\\\
        \\hline
        知识管理 & 文档库、知识库、全文检索 \\\\
        \\hline
        人事管理 & 考勤、请假、报销、员工信息 \\\\
        \\hline
        数据分析 & 办公数据看板、效率分析报表 \\\\
        \\hline
    \\end{tabular}
\\end{table}

\\section{需求分析}
\\label{sec:requirements}

\\subsection{业务需求}
\\subsubsection{流程管理需求}
当前公司审批流程主要通过线下方式进行，存在效率低下、追踪困难等问题...

\\subsubsection{沟通协作需求}
目前团队沟通工具分散，信息孤岛现象严重...

\\subsection{技术需求}
\\begin{itemize}
    \\item 系统应支持至少5000人同时在线使用
    \\item 页面响应时间不超过2秒
    \\item 系统可用性达到99.9\%
    \\item 支持移动端访问（iOS/Android）
\\end{itemize}

\\section{技术方案}
\\label{sec:technical}

\\subsection{总体架构}
系统采用微服务架构设计，整体架构如图\\ref{fig:architecture}所示。

\\begin{figure}[htbp]
    \\centering
    \\setlength{\\fboxsep}{0pt}
    \\framebox[0.9\\textwidth][c]{\\rule{0pt}{5cm}系统架构图}
    \\caption{系统总体架构图}
    \\label{fig:architecture}
\\end{figure}

\\subsection{技术选型}
\\begin{table}[htbp]
    \\centering
    \\caption{技术选型表}
    \\begin{tabular}{|l|l|}
        \\hline
        \\textbf{技术领域} & \\textbf{选型方案} \\\\
        \\hline
        前端框架 & React + TypeScript + Ant Design \\\\
        \\hline
        后端框架 & Spring Boot + Spring Cloud \\\\
        \\hline
        数据库 & MySQL + Redis + Elasticsearch \\\\
        \\hline
        中间件 & RabbitMQ + Nginx \\\\
        \\hline
        部署方式 & Docker + Kubernetes \\\\
        \\hline
    \\end{tabular}
\\end{table}

\\section{项目实施计划}
\\label{sec:plan}

\\subsection{项目阶段划分}
项目总工期为6个月，分为四个阶段实施：

\\begin{table}[htbp]
    \\centering
    \\caption{项目实施计划}
    \\begin{tabular}{|c|l|c|c|}
        \\hline
        \\textbf{阶段} & \\textbf{主要工作} & \\textbf{工期} & \\textbf{里程碑} \\\\
        \\hline
        第一阶段 & 需求调研与设计 & 1个月 & 需求规格说明书 \\\\
        \\hline
        第二阶段 & 系统开发与测试 & 3个月 & 系统测试通过 \\\\
        \\hline
        第三阶段 & 上线部署与培训 & 1个月 & 系统正式上线 \\\\
        \\hline
        第四阶段 & 运维支持与优化 & 1个月 & 项目验收 \\\\
        \\hline
    \\end{tabular}
\\end{table}

\\subsection{里程碑计划}
关键里程碑节点如下：

\\begin{enumerate}
    \\item M1：需求评审通过（第4周）
    \\item M2：设计评审通过（第6周）
    \\item M3：核心功能开发完成（第14周）
    \\item M4：系统测试通过（第18周）
    \\item M5：系统正式上线（第22周）
    \\item M6：项目验收完成（第24周）
\\end{enumerate}

\\section{项目预算}
\\label{sec:budget}

\\begin{table}[htbp]
    \\centering
    \\caption{项目预算明细表}
    \\begin{tabular}{|l|r|r|}
        \\hline
        \\textbf{费用类别} & \\textbf{金额（万元）} & \\textbf{占比} \\\\
        \\hline
        软件开发费用 & 120.0 & 40.0\% \\\\
        \\hline
        硬件设备费用 & 80.0 & 26.7\% \\\\
        \\hline
        实施服务费用 & 50.0 & 16.7\% \\\\
        \\hline
        培训费用 & 20.0 & 6.7\% \\\\
        \\hline
        运维支持费用 & 30.0 & 10.0\% \\\\
        \\hline
        \\textbf{合计} & \\textbf{300.0} & \\textbf{100\%} \\\\
        \\hline
    \\end{tabular}
\\end{table}

\\section{风险分析与应对}
\\label{sec:risk}

\\begin{table}[htbp]
    \\centering
    \\caption{风险分析与应对措施}
    \\begin{tabular}{|l|l|l|}
        \\hline
        \\textbf{风险描述} & \\textbf{影响程度} & \\textbf{应对措施} \\\\
        \\hline
        需求变更频繁 & 高 & 建立需求变更管理流程，设置需求冻结期 \\\\
        \\hline
        技术难度超预期 & 中 & 提前进行技术预研，预留技术缓冲时间 \\\\
        \\hline
        人员流动风险 & 中 & 建立知识传承机制，关键岗位备岗 \\\\
        \\hline
        进度延期 & 中 & 周进度跟踪，关键路径监控 \\\\
        \\hline
    \\end{tabular}
\\end{table}

\\section{预期效益}
\\label{sec:benefits}

\\subsection{经济效益}
\\begin{itemize}
    \\item 预计每年节省人力成本约80万元
    \\item 办公耗材费用降低50\%
    \\item 流程审批效率提升60\%
\\end{itemize}

\\subsection{管理效益}
\\begin{itemize}
    \\item 实现办公流程标准化、规范化
    \\item 提升企业信息化管理水平
    \\item 增强数据驱动决策能力
\\end{itemize}

\\end{document}`,
        previewStyle: 'proposal'
    },

    'business-report': {
        title: '商务报告模板',
        description: '年度报告、数据分析报告、工作总结模板',
        code: `\\documentclass[12pt,a4paper]{article}
\\usepackage[UTF8]{ctex}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{multirow}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{fancyhdr}
\\usepackage{lastpage}
\\usepackage{hyperref}
\\usepackage{float}

% 页面设置
\\geometry{top=2.5cm, bottom=2.5cm, left=2.5cm, right=2.5cm}

% 页眉页脚
\\pagestyle{fancy}
\\fancyhf{}
\\lhead{\\small 2024年度经营分析报告}
\\rhead{\\small 第\\thepage/\\pageref{LastPage}页}
\\cfoot{\\small 机密文件，请勿外传}
\\renewcommand{\\headrulewidth}{0.4pt}
\\renewcommand{\\footrulewidth}{0.4pt}

% 颜色
\\definecolor{titleblue}{RGB}{0, 82, 155}
\\definecolor{highlight}{RGB}{198, 40, 40}

\\begin{document}

% 封面
\\thispagestyle{empty}
\\begin{center}
    \\vspace*{3cm}
    
    \\textcolor{titleblue}{\\Huge\\bfseries 2024年度经营分析报告}
    
    \\vspace{0.5cm}
    {\\Large 年度业绩回顾与未来展望}
    
    \\vspace{1cm}
    \\textcolor{titleblue}{\\rule{8cm}{2pt}}
    
    \\vspace{2cm}
    
    \\begin{tabular}{rl}
    \\textbf{编制部门：} & 战略规划部 \\\\
    \\textbf{编制日期：} & 2025年1月 \\\\
    \\textbf{文档版本：} & V1.0 \\\\
    \\end{tabular}
    
    \\vfill
    \\includegraphics[width=0.3\\textwidth]{logo.png}
\\end{center}

\\newpage

\\tableofcontents
\\newpage

\\section{执行摘要}
\\label{sec:summary}

2024年，公司整体经营状况良好，各项核心指标均超额完成年度目标。全年实现营业收入12.5亿元，同比增长28.6\%；净利润2.8亿元，同比增长35.2\%。

\\begin{table}[H]
    \\centering
    \\caption{2024年核心经营指标完成情况}
    \\begin{tabular}{lrrr}
        \\toprule
        \\textbf{指标} & \\textbf{2024年实际} & \\textbf{2023年同期} & \\textbf{同比增长} \\\\
        \\midrule
        营业收入（亿元） & 12.50 & 9.72 & \\textcolor{highlight}{+28.6\%} \\\\
        净利润（亿元） & 2.80 & 2.07 & \\textcolor{highlight}{+35.2\%} \\\\
        毛利率 & 45.2\% & 42.8\% & \\textcolor{highlight}{+2.4pp} \\\\
        客户数量（万） & 856 & 620 & \\textcolor{highlight}{+38.1\%} \\\\
        员工人数（人） & 1,280 & 980 & +30.6\% \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}

\\section{业务发展情况}
\\label{sec:business}

\\subsection{收入结构分析}
公司收入主要来自三大业务板块，各板块收入占比如下：

\\begin{itemize}
    \\item \\textbf{主营业务A：} 收入6.8亿元，占比54.4\%，同比增长22.3\%
    \\item \\textbf{主营业务B：} 收入4.2亿元，占比33.6\%，同比增长38.5\%
    \\item \\textbf{新兴业务C：} 收入1.5亿元，占比12.0\%，同比增长56.8\%
\\end{itemize}

\\subsection{区域分布}
\\begin{table}[H]
    \\centering
    \\caption{各区域收入贡献}
    \\begin{tabular}{lrrr}
        \\toprule
        \\textbf{区域} & \\textbf{收入（亿元）} & \\textbf{占比} & \\textbf{同比增长} \\\\
        \\midrule
        华东地区 & 4.8 & 38.4\% & +25.3\% \\\\
        华南地区 & 3.2 & 25.6\% & +32.1\% \\\\
        华北地区 & 2.5 & 20.0\% & +28.7\% \\\\
        中西部地区 & 1.5 & 12.0\% & +35.4\% \\\\
        海外市场 & 0.5 & 4.0\% & +85.2\% \\\\
        \\bottomrule
        \\textbf{合计} & \\textbf{12.5} & \\textbf{100\%} & \\textbf{+28.6\%} \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}

\\section{财务状况分析}
\\label{sec:finance}

\\subsection{盈利能力}
公司整体盈利能力持续提升，主要财务指标如下：

\\begin{itemize}
    \\item 毛利率：45.2\%，同比提升2.4个百分点
    \\item 净利率：22.4\%，同比提升1.1个百分点
    \\item ROE：28.5\%，同比提升3.2个百分点
\\end{itemize}

\\subsection{现金流状况}
经营活动现金流净额3.5亿元，同比增长42.3\%，现金流状况良好...

\\section{市场与竞争}
\\label{sec:market}

\\subsection{市场地位}
根据第三方研究机构数据，公司在细分市场的份额从2023年的12.5\%提升至2024年的15.8\%，排名行业第三。

\\subsection{竞争格局}
主要竞争对手情况：

\\begin{table}[H]
    \\centering
    \\caption{主要竞争对手对比}
    \\begin{tabular}{lccc}
        \\toprule
        \\textbf{公司} & \\textbf{市场份额} & \\textbf{营收规模} & \\textbf{核心优势} \\\\
        \\midrule
        A公司 & 22.5\% & 28亿 & 品牌知名度高 \\\\
        B公司 & 18.3\% & 20亿 & 渠道覆盖广 \\\\
        本公司 & 15.8\% & 12.5亿 & 产品创新强 \\\\
        C公司 & 10.2\% & 9亿 & 价格优势 \\\\
        其他 & 33.2\% & - & - \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}

\\section{挑战与机遇}
\\label{sec:swot}

\\subsection{面临的挑战}
\\begin{enumerate}
    \\item 行业竞争加剧，头部企业加大投入
    \\item 人才招聘难度增大，人力成本上升
    \\item 技术迭代加快，研发投入压力大
\\end{enumerate}

\\subsection{发展机遇}
\\begin{enumerate}
    \\item 数字化转型加速，市场空间持续扩大
    \\item 政策支持力度加大，行业环境向好
    \\item 国际化战略机遇，海外市场潜力巨大
\\end{enumerate}

\\section{2025年展望}
\\label{sec:outlook}

\\subsection{经营目标}
2025年公司将继续保持稳健增长，主要目标如下：

\\begin{itemize}
    \\item 营业收入目标：16亿元，同比增长28\%
    \\item 净利润目标：3.8亿元，同比增长35.7\%
    \\item 市场份额目标：达到18\%以上
    \\item 客户数量目标：突破1200万
\\end{itemize}

\\subsection{重点工作}
\\begin{enumerate}
    \\item 持续加大研发投入，保持技术领先优势
    \\item 加速国际化布局，拓展海外市场
    \\item 深化数字化转型，提升运营效率
    \\item 加强人才队伍建设，完善激励机制
\\end{enumerate}

\\section{结论}
\\label{sec:conclusion}

2024年是公司快速发展的一年，各项经营指标均超额完成。展望2025年，尽管面临诸多挑战，但公司所处行业前景广阔，自身核心竞争力持续增强。我们有信心在新的一年里再创佳绩，为股东创造更大价值。

\\end{document}`,
        previewStyle: 'report'
    },

    'report-academic': {
        title: '实验调研报告模板',
        description: '课程实验、调研报告、技术报告标准格式',
        code: `\\documentclass[12pt,a4paper]{article}
\\usepackage[UTF8]{ctex}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{listings}
\\usepackage{xcolor}
\\usepackage{fancyhdr}
\\usepackage{enumitem}

% 页面设置
\\geometry{top=2cm, bottom=2cm, left=2.5cm, right=2.5cm}

% 页眉
\\pagestyle{fancy}
\\fancyhf{}
\\lhead{\\small 数据结构实验报告}
\\rhead{\\small 第\\thepage 页}
\\renewcommand{\\headrulewidth}{0.4pt}

% 代码样式
\\lstset{
    basicstyle=\\ttfamily\\small,
    keywordstyle=\\color{blue},
    commentstyle=\\color{green!70!black},
    stringstyle=\\color{red},
    numbers=left,
    numberstyle=\\tiny,
    frame=single,
    breaklines=true
}

\\begin{document}

% 封面
\\thispagestyle{empty}
\\begin{center}
    \\vspace*{1cm}
    {\\Large\\bfseries 数据结构课程实验报告}
    
    \\vspace{0.5cm}
    {\\Large \\underline{\\quad 快速排序算法性能分析 \\quad}}
    
    \\vspace{1cm}
    
    \\begin{tabular}{ll}
    \\textbf{课程名称：} & 数据结构与算法 \\\\
    \\textbf{实验名称：} & 快速排序算法实现与性能分析 \\\\
    \\textbf{学生姓名：} & 张三 \\\\
    \\textbf{学\\qquad 号：} & 2021001001 \\\\
    \\textbf{班\\qquad 级：} & 计算机2101班 \\\\
    \\textbf{实验日期：} & 2024年3月15日 \\\\
    \\textbf{指导教师：} & 李教授 \\\\
    \\end{tabular}
    
    \\vfill
    {\\small 计算机学院}
\\end{center}

\\newpage

\\section{实验目的}
\\label{sec:purpose}

\\begin{enumerate}
    \\item 深入理解快速排序算法的基本原理和实现方法
    \\item 掌握快速排序算法的时间复杂度分析
    \\item 通过实验对比不同情况下快速排序的性能表现
    \\item 学习算法性能测试和数据分析的方法
\\end{enumerate}

\\section{实验原理}
\\label{sec:principle}

\\subsection{快速排序算法原理}
快速排序（Quick Sort）是由Tony Hoare于1960年提出的一种分治排序算法。其基本思想是：

\\begin{enumerate}
    \\item 从数列中选取一个元素作为基准（pivot）
    \\item 将数列分为两部分，小于基准的放左边，大于基准的放右边
    \\item 对左右两部分递归执行快速排序
\\end{enumerate}

算法的时间复杂度：
\\begin{itemize}
    \\item 平均情况：$O(n \\log n)$
    \\item 最坏情况：$O(n^2)$
    \\item 空间复杂度：$O(\\log n)$
\\end{itemize}

\\subsection{Partition过程}
Partition是快速排序的核心步骤，其伪代码如下：

\\begin{lstlisting}[language=C, caption=Partition算法伪代码]
int partition(int arr[], int low, int high) {
    int pivot = arr[high];    // 选择最后一个元素作为基准
    int i = low - 1;          // i是小于pivot的元素的索引
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
\\end{lstlisting}

\\section{实验环境}
\\label{sec:environment}

\\begin{itemize}
    \\item \\textbf{操作系统：} Windows 11 / macOS 14
    \\item \\textbf{编程语言：} C++ (C++17标准)
    \\item \\textbf{编译器：} GCC 12.0 / Clang 15.0
    \\item \\textbf{CPU：} Intel Core i7-12700 @ 2.1GHz
    \\item \\textbf{内存：} 16GB DDR4
    \\item \\textbf{测试框架：} 自研测试工具
\\end{itemize}

\\section{实验内容}
\\label{sec:content}

\\subsection{实验一：基本实现验证}
\\subsubsection{实验内容}
实现标准的快速排序算法，验证排序结果的正确性。

\\subsubsection{核心代码}
\\begin{lstlisting}[language=C]
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
\\end{lstlisting}

\\subsubsection{测试用例}
\\begin{table}[htbp]
    \\centering
    \\caption{正确性测试用例}
    \\begin{tabular}{|c|l|l|}
        \\hline
        编号 & 输入 & 预期输出 \\\\
        \\hline
        1 & [5, 2, 8, 1, 9] & [1, 2, 5, 8, 9] \\\\
        \\hline
        2 & [1, 2, 3, 4, 5] & [1, 2, 3, 4, 5] \\\\
        \\hline
        3 & [5, 4, 3, 2, 1] & [1, 2, 3, 4, 5] \\\\
        \\hline
        4 & [3, 1, 4, 1, 5] & [1, 1, 3, 4, 5] \\\\
        \\hline
    \\end{tabular}
\\end{table}

\\subsection{实验二：性能测试}
\\subsubsection{测试方案}
分别测试不同数据规模下快速排序的执行时间：

\\begin{itemize}
    \\item 数据规模：1K, 10K, 100K, 1M, 10M
    \\item 数据分布：随机、正序、逆序、近似有序
    \\item 每组测试重复10次，取平均值
\\end{itemize}

\\subsubsection{实验结果}
\\begin{table}[htbp]
    \\centering
    \\caption{不同数据规模下的排序时间（单位：毫秒）}
    \\begin{tabular}{lrrrrr}
        \\toprule
        \\textbf{数据规模} & \\textbf{随机} & \\textbf{正序} & \\textbf{逆序} & \\textbf{近似有序} \\\\
        \\midrule
        1K & 0.05 & 0.08 & 0.07 & 0.06 \\\\
        10K & 0.62 & 1.25 & 1.18 & 0.85 \\\\
        100K & 7.8 & 25.6 & 24.8 & 12.3 \\\\
        1M & 95 & - & - & 156 \\\\
        10M & 1,120 & - & - & 1,850 \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}

\\section{结果分析}
\\label{sec:analysis}

\\subsection{时间复杂度验证}
从实验结果可以看出：

\\begin{enumerate}
    \\item 随机数据下，排序时间基本符合 $O(n \\log n)$ 的增长趋势
    \\item 正序/逆序数据下，性能明显下降，接近 $O(n^2)$
    \\item 近似有序数据的性能介于两者之间
\\end{enumerate}

\\subsection{优化方案讨论}
针对最坏情况，可以采用以下优化策略：

\\begin{itemize}
    \\item \\textbf{三数取中：} 选择首、中、尾三个数的中位数作为基准
    \\item \\textbf{随机化：} 随机选择基准元素
    \\item \\textbf{小数组切换：} 当子数组较小时，改用插入排序
    \\item \\textbf{三路划分：} 将数组分为小于、等于、大于基准三部分
\\end{itemize}

\\section{实验结论}
\\label{sec:conclusion}

通过本次实验，我深入理解了快速排序算法的原理和实现，通过性能测试验证了算法的时间复杂度，并分析了不同数据分布对算法性能的影响。快速排序在平均情况下具有优秀的性能，但在最坏情况下会退化到$O(n^2)$，实际应用中需要通过适当的优化策略来避免最坏情况。

\\section*{思考题}
\\addcontentsline{toc}{section}{思考题}

\\begin{enumerate}
    \\item 为什么快速排序在实际应用中通常比归并排序更快？
    \\item 如何证明快速排序的平均时间复杂度是$O(n \\log n)$？
    \\item 除了三数取中，还有哪些方法可以选择基准元素？
\\end{enumerate}

\\end{document}`,
        previewStyle: 'report-academic'
    }
};
