import { Tag } from "./tag";

export interface Recipe {
    id: number;
    name: string;
    image: string;
    description: string;
    tags: Tag[];
}
