import type { SEOPageContent } from '@/types/seo';

const stopwatchSEO: SEOPageContent = {
    id: 'stopwatch',
    
    intro: {
        what: '秒表计时器是一款在线精确计时工具，可以精确到毫秒，支持计次功能，适用于各种计时场景。',
        problem: '解决需要精确计时、多圈计时、运动计时等需求。',
        capability: '毫秒级精度、计次记录、清零重置、全屏显示、键盘快捷键。',
        targetUser: '运动员、教练、学生、实验人员、游戏玩家'
    },
    
    targetAudience: [
        '运动员',
        '教练',
        '学生',
        '实验人员',
        '游戏玩家'
    ],
    
    useCases: [
        '运动计时 - 跑步游泳等运动计时',
        '学习计时 - 番茄钟学习法',
        '实验记录 - 实验过程时间记录',
        '游戏计时 - 游戏挑战计时',
        '日常计时 - 各种需要计时的场景'
    ],
    
    coreFeatures: [
        '毫秒级精确计时',
        '多圈计次功能',
        '一键开始/暂停',
        '计次记录显示',
        '清零重置',
        '支持键盘快捷键'
    ],
    
    exampleIO: {
        input: '点击开始按钮开始计时',
        output: '显示：00:05:23.456（5分23秒456毫秒）\n计次记录：第1圈：00:01:23.456'
    },
    
    usageSteps: [
        '点击开始按钮启动计时',
        '点击计次记录分段时间',
        '点击停止或清零结束计时'
    ],
    
    faq: [
        { question: '计时精度如何？', answer: '精确到毫秒级别，满足大多数计时需求。' },
        { question: '可以记录多少圈？', answer: '没有圈数限制，可以记录任意数量的分段时间。' },
        { question: '关闭页面后计时还在吗？', answer: '关闭页面后计时会中断，建议计时期间保持页面打开。' }
    ],
    
    relatedTools: ['countdown-timer', 'world-clock', 'date-calculator']
};

export default stopwatchSEO;
