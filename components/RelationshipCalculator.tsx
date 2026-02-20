import React, { useState, useCallback } from 'react';

const RelationshipCalculator: React.FC = () => {
    const [relationship, setRelationship] = useState<string>('');
    const [path, setPath] = useState<string[]>([]);

    const relationshipData: Record<string, Record<string, string>> = {
        '父': { '父': '爷爷', '母': '奶奶', '兄': '伯父', '弟': '叔叔', '姐': '姑姑', '妹': '姑姑', '子': '兄弟', '女': '姐妹' },
        '母': { '父': '外公', '母': '外婆', '兄': '舅舅', '弟': '舅舅', '姐': '姨妈', '妹': '姨妈', '子': '兄弟', '女': '姐妹' },
        '兄': { '子': '侄子', '女': '侄女' },
        '弟': { '子': '侄子', '女': '侄女' },
        '姐': { '子': '外甥', '女': '外甥女' },
        '妹': { '子': '外甥', '女': '外甥女' },
        '子': { '子': '孙子', '女': '孙女' },
        '女': { '子': '外孙', '女': '外孙女' },
        '夫': { '父': '公公', '母': '婆婆', '兄': '大伯', '弟': '小叔', '姐': '大姑姐', '妹': '小姑子' },
        '妻': { '父': '岳父', '母': '岳母', '兄': '大舅子', '弟': '小舅子', '姐': '大姨子', '妹': '小姨子' },
    };

    const inverseRelations: Record<string, string> = {
        '父': '子', '母': '子', '子': '父', '女': '父',
        '兄': '弟', '弟': '兄', '姐': '妹', '妹': '姐',
        '夫': '妻', '妻': '夫',
        '爷爷': '孙子', '奶奶': '孙子', '外公': '外孙', '外婆': '外孙',
        '孙子': '爷爷', '孙女': '爷爷', '外孙': '外公', '外孙女': '外公',
        '伯父': '侄子', '叔叔': '侄子', '姑姑': '侄子',
        '侄子': '伯父', '侄女': '伯父',
        '舅舅': '外甥', '姨妈': '外甥',
        '外甥': '舅舅', '外甥女': '舅舅',
        '公公': '儿媳', '婆婆': '儿媳',
        '岳父': '女婿', '岳母': '女婿',
    };

    const genderMap: Record<string, 'male' | 'female' | 'neutral'> = {
        '我': 'neutral', '父': 'male', '母': 'female',
        '兄': 'male', '弟': 'male', '姐': 'female', '妹': 'female',
        '子': 'male', '女': 'female',
        '夫': 'male', '妻': 'female',
        '爷爷': 'male', '奶奶': 'female', '外公': 'male', '外婆': 'female',
        '孙子': 'male', '孙女': 'female', '外孙': 'male', '外孙女': 'female',
        '伯父': 'male', '叔叔': 'male', '姑姑': 'female',
        '侄子': 'male', '侄女': 'female',
        '舅舅': 'male', '姨妈': 'female',
        '外甥': 'male', '外甥女': 'female',
        '公公': 'male', '婆婆': 'female', '岳父': 'male', '岳母': 'female',
        '大伯': 'male', '小叔': 'male', '大姑姐': 'female', '小姑子': 'female',
        '大舅子': 'male', '小舅子': 'male', '大姨子': 'female', '小姨子': 'female',
    };

    const calculateRelationship = useCallback((relations: string) => {
        if (!relations.trim()) {
            setRelationship('');
            setPath([]);
            return;
        }

        const relationList = relations.split(/[,，、\s]+/).filter(r => r);
        if (relationList.length === 0) {
            setRelationship('');
            setPath([]);
            return;
        }

        let currentRelation = '我';
        const pathList: string[] = ['我'];

        for (const rel of relationList) {
            const data = relationshipData[currentRelation];
            if (data && data[rel]) {
                currentRelation = data[rel];
            } else if (relationshipData[rel]) {
                currentRelation = rel;
            } else {
                currentRelation = '未知关系';
                break;
            }
            pathList.push(currentRelation);
        }

        setRelationship(currentRelation);
        setPath(pathList);
    }, []);

    const commonRelations = [
        { label: '爸爸的爸爸', value: '父,父' },
        { label: '妈妈的妈妈', value: '母,母' },
        { label: '爸爸的哥哥', value: '父,兄' },
        { label: '妈妈的兄弟', value: '母,兄' },
        { label: '哥哥的儿子', value: '兄,子' },
        { label: '姐姐的女儿', value: '姐,女' },
        { label: '儿子的儿子', value: '子,子' },
        { label: '女儿的儿子', value: '女,子' },
        { label: '老公的爸爸', value: '夫,父' },
        { label: '老婆的妈妈', value: '妻,母' },
    ];

    return (
        <div className="flex w-full flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center mb-8">
                <p className="text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-4xl">亲戚关系计算器</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">计算复杂的亲戚关系称呼，走亲访友必备工具</p>
            </div>

            <div className="w-full max-w-3xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        输入关系链（用逗号或空格分隔）
                    </label>
                    <input
                        type="text"
                        value={relationship === '' ? '' : relationship}
                        onChange={(e) => calculateRelationship(e.target.value)}
                        placeholder="如：父,父 或 爸爸的爸爸"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        关键词：父、母、兄、弟、姐、妹、子、女、夫、妻
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        常见关系
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {commonRelations.map(({ label, value }) => (
                            <button
                                key={label}
                                onClick={() => calculateRelationship(value)}
                                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {relationship && relationship !== '未知关系' && (
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-6 text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">称呼</div>
                        <div className="text-3xl font-bold text-primary">{relationship}</div>
                    </div>
                )}

                {path.length > 1 && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">关系路径</div>
                        <div className="flex flex-wrap items-center gap-2">
                            {path.map((p, index) => (
                                <React.Fragment key={index}>
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-900 dark:text-gray-100">
                                        {p}
                                    </span>
                                    {index < path.length - 1 && (
                                        <span className="text-gray-400">→</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">关系词说明</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div><strong>父</strong>：爸爸</div>
                        <div><strong>母</strong>：妈妈</div>
                        <div><strong>兄</strong>：哥哥</div>
                        <div><strong>弟</strong>：弟弟</div>
                        <div><strong>姐</strong>：姐姐</div>
                        <div><strong>妹</strong>：妹妹</div>
                        <div><strong>子</strong>：儿子</div>
                        <div><strong>女</strong>：女儿</div>
                        <div><strong>夫</strong>：丈夫</div>
                        <div><strong>妻</strong>：妻子</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelationshipCalculator;
