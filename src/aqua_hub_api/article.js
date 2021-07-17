class Article {
    constructor(
        articleId=null,
        authorId,
        title,
        content,
        updateDate,
        apiWorker
    ) {
        this.articleId = articleId;
        this.authorId = authorId;
        this.title = title;
        this.content = content;
        this.updateDate = updateDate;
        this.apiWorker = apiWorker;
    }

    static fromJSONObject(obj, apiWorker=null) {
        return new Article(
            (obj.article_id === undefined ? null : obj.article_id),
            obj.author_id,
            obj.title,
            obj.content,
            obj.update_date,
            apiWorker
        )
    }
}

export default Article;
