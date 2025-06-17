export declare class CreateDto {
    title: string;
    description: string;
    files: {
        images: any[];
        audios: any[];
    };
}
export declare class findAllDto {
    page: number;
    limit: number;
    sortField: string;
    sortOrder: string;
}
