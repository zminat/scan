export type DocumentAPI = {
    ok: {
        schemaVersion: string,
        id: string,
        version: string,
        issueDate: string,
        url: string,
        author: {
            name: string
        },
        source: {
            id: number,
            groupId: number,
            name: string,
            categoryId: number,
            levelId: number,
            distributionMethodId: number
        },
        dedupClusterId: string,
        plotClusterId: string,
        title: {
            text: string,
            markup: string
        },
        content: {
            markup: string
        },
        entities: {
            companies: [
                {
                    suggestedCompanies: [
                        {
                            sparkId: number,
                            inn: string,
                            ogrn: string,
                            searchPrecision: string
                        }
                    ],
                    resolveInfo: {
                        resolveApproaches: [
                            string
                        ]
                    },
                    tags: [
                        string
                    ],
                    isSpeechAuthor: boolean,
                    localId: number,
                    name: string,
                    entityId: number,
                    isMainRole: boolean
                }
            ],
            people: [
                {
                    rotatedName: string,
                    tags: [
                        string
                    ],
                    isSpeechAuthor: boolean,
                    localId: number,
                    name: string,
                    entityId: number,
                    isMainRole: boolean
                }
            ],
            themes: [
                {
                    localId: number,
                    name: string,
                    entityId: number,
                    tonality: string,
                    participant: {
                        localId: number,
                        type: string
                    }
                }
            ],
            locations: [
                {
                    code: {
                        countryCode: string,
                        regionCode: string
                    },
                    localId: number,
                    name: string,
                    entityId: number,
                    isMainRole: boolean
                }
            ]
        },
        attributes: {
            isTechNews: boolean,
            isAnnouncement: boolean,
            isDigest: boolean,
            isSpeechRecognition: boolean,
            isReducedContent: boolean,
            influence: number,
            wordCount: number,
            coverage: {
                value: number,
                state: string
            }
        },
        language: string
    },
    fail: {
        id: string,
        errorCode: number,
        errorMessage: string
    }
}