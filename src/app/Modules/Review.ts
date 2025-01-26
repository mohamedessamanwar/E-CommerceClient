export interface IReview {
    productId: number
    Rate: number
    comment: string
}
interface ReviewGroupDto {
    rate: number;
    count: number;
}

export interface ReviewUser {
    id: number;
    userId: string;
    userName: string;
    comment: string | null;
    rate: number;
}

export interface ReviewData {
    reviewGroupDtos: ReviewGroupDto[];
    reviewsUsers: ReviewUser[];
    avgRate: number;
}