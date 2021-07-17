import React from "react";

import ArticleWidget from "./articleWidget";

class ArticlesList extends React.Component {
    render() {
        return (
            <div className="articles-container">
                {this.props.articles.map(
                    (article, _index, _array) => {
                        return (
                            <ArticleWidget
                                key={article.articleId}
                                article={article}
                                author={this.props.authors.get(article.authorId)}
                                onNicknameClick={this.props.onNicknameClick}/>
                        );
                    }
                )}
            </div>
        );
    }
}

export default ArticlesList;
