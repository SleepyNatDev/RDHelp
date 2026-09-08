import { Tag } from "./tag";

export interface Recipe {
    name: string;
    image: string;
    description: string;
    tags: Tag[];
}
