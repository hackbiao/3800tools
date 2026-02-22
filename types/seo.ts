export interface SEOPageContent {
    id: string;
    
    intro: {
        what: string;
        problem: string;
        capability: string;
        targetUser: string;
    };
    
    targetAudience: string[];
    
    useCases: string[];
    
    coreFeatures: string[];
    
    exampleIO: {
        input: string;
        output: string;
    };
    
    usageSteps: string[];
    
    faq: Array<{
        question: string;
        answer: string;
    }>;
    
    relatedTools: string[];
}
