export declare class CreateDto {
    title: string;
    content: string;
    link_or_number: string;
    categories_names: string;
    files: {
        images: any[];
        videos: any[];
    };
}
export declare class findAllDto {
    page: number;
    limit: number;
    sortField: string;
    sortOrder: string;
}
