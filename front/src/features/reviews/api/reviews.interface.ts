export interface IAddReview {
  comment: string;
  firstName?: string;
  lastName?: string;
  product_id: number;
  rating: number;
  userEmail: string;
}
