import type { SEOPageContent } from '@/types/seo';

const pdfToPptSEO: SEOPageContent = {
    id: 'pdf-to-ppt',
    
    intro: {
        what: 'PDF转PPT工具是一款在线PDF转PowerPoint服务，可以将PDF文件转换为可编辑的PPT演示文稿。',
        problem: '解决PDF内容无法编辑、需要修改PDF中的演示内容、PDF转幻灯片需求。',
        capability: '保持原有排版和格式、支持图片和文字提取、转换后可直接编辑。',
        targetUser: '办公人员、培训讲师、销售人员、学生、市场人员'
    },
    
    targetAudience: [
        '办公人员',
        '培训讲师',
        '销售人员',
        '学生',
        '市场人员'
    ],
    
    useCases: [
        '演示修改 - 将PDF转为PPT进行修改',
        '培训材料 - 转换PDF培训文档为PPT',
        '方案汇报 - 修改已有的PDF方案',
        '课件制作 - 将PDF教材转为可编辑课件',
        '商务展示 - 转换合同或方案进行展示'
    ],
    
    coreFeatures: [
        'PDF转PowerPoint格式',
        '保持原有排版',
        '支持图片提取',
        '文字可编辑',
        '批量页面转换',
        '本地处理安全'
    ],
    
    exampleIO: {
        input: '上传一个10页的PDF产品介绍文档',
        output: '生成一个10页的PPTX文件，保留原有排版和图片'
    },
    
    usageSteps: [
        '上传需要转换的PDF文件',
        '点击开始转换按钮',
        '下载转换后的PPT文件'
    ],
    
    faq: [
        { question: '转换后的PPT可以编辑吗？', answer: '是的，转换后的PPTX文件可以在PowerPoint中正常编辑。' },
        { question: '转换会丢失格式吗？', answer: '会尽量保持原有格式，但复杂排版可能需要手动调整。' },
        { question: '支持多大的PDF文件？', answer: '建议上传20MB以内的PDF文件，页面数不限。' }
    ],
    
    relatedTools: ['pdf-to-image', 'table-converter', 'resume-generator']
};

export default pdfToPptSEO;
