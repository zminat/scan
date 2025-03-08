interface Source {
    id: number;
    groupId: number;
    name: string;
    categoryId: number;
    levelId: number;
}

interface TextContent {
    text?: string;
    markup: string;
}

export interface ScanDoc {
    schemaVersion: string;
    id: string;
    version: number;
    issueDate: string;
    url: string;
    source: Source;
    dedupClusterId: string;
    title: TextContent;
    content: {
        markup: string;
    };
    attributes: {
        isTechNews: boolean;
        isAnnouncement: boolean;
        isDigest: boolean;
        influence: number;
        wordCount: number;
        coverage: {
            value: number;
            state: string;
        };
    };
    language: string;
}

export interface DocumentResponse {
    ok?: ScanDoc;
    fail?: {
        errorCode: string;
        errorMessage: string;
    };
}

export interface DocumentsRequest {
    ids: string[];
}