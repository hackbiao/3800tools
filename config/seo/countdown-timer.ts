import type { SEOPageContent } from '@/types/seo';

const countdownTimerSEO: SEOPageContent = {
    id: 'countdown-timer',
    
    intro: {
        what: '倒计时器是一款在线倒计时工具，支持自定义时间设置，适用于番茄工作法、休息提醒、会议计时等场景。',
        problem: '解决时间管理、定时提醒、活动倒计时等需求。',
        capability: '自定义时间、声音提醒、全屏显示、循环计时、暂停继续。',
        targetUser: '学生、办公人员、健身爱好者、会议主持、游戏玩家'
    },
    
    targetAudience: [
        '学生',
        '办公人员',
        '健身爱好者',
        '会议主持',
        '游戏玩家'
    ],
    
    useCases: [
        '番茄工作法 - 25分钟专注工作',
        '休息提醒 - 定时休息眼睛',
        '会议计时 - 控制会议时长',
        '健身计时 - 运动休息间隔',
        '活动倒计时 - 重要事件倒计时'
    ],
    
    coreFeatures: [
        '自定义倒计时时长',
        '开始/暂停/重置',
        '时间到声音提醒',
        '全屏显示模式',
        '循环计时功能',
        '简洁美观界面'
    ],
    
    exampleIO: {
        input: '设置：25分钟（番茄钟）',
        output: '倒计时显示：24:59 → 24:58 → ... → 00:00（播放提醒音）'
    },
    
    usageSteps: [
        '设置倒计时时长（小时/分钟/秒）',
        '点击开始按钮启动倒计时',
        '时间到达后会有声音提醒'
    ],
    
    faq: [
        { question: '时间到了会有提醒吗？', answer: '是的，倒计时结束时会播放提示音，也支持静音模式。' },
        { question: '可以设置多长的倒计时？', answer: '支持最长99小时59分59秒的倒计时。' },
        { question: '关闭浏览器后还能继续吗？', answer: '关闭页面后倒计时会停止，建议保持页面打开。' }
    ],
    
    relatedTools: ['stopwatch', 'world-clock', 'cron-parser']
};

export default countdownTimerSEO;
