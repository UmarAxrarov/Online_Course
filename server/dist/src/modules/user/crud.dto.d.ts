export declare class CreateDto {
    email: string;
    role: string;
}
export declare class findAllDto {
    page: number;
    limit: number;
    sortField: string;
    sortOrder: string;
}
export declare class UpdateDto {
    name?: string;
    password?: string;
    imageUrl?: string;
}
