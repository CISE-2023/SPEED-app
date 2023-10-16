import { Injectable } from "@nestjs/common";
import { ArticlesRepository } from "./articles.repository";
import { RejectedArticle } from "./schemas/article.schema";

@Injectable()
export class ArticlesService {
    constructor(private readonly articlesRepository: ArticlesRepository) {}

    async getArticles(): Promise<RejectedArticle[]> {
        return this.articlesRepository.find({});
    }

    async getArticleByID(id: string): Promise<RejectedArticle> {
        return this.articlesRepository.findOne({ id });
    }

    async createArticle(id: string, title: string, source: string, publication: number, author: string, volume: string, number: number, doi: string, comments: string): 
    Promise<RejectedArticle> {
        return this.articlesRepository.create({
            id,
            title,
            source,
            publication,
            author,
            volume,
            number,
            doi,
            comments,
        });
    }    
    
    async deleteArticle(id: string): Promise<void> {
        return this.articlesRepository.remove({ id });
    }
}