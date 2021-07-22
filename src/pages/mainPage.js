import React from "react";

import ArticlesList from "../widgets/articlesList";
import ErrorWidget from "../widgets/errorWidget";
// import * as cst from "../tools/constants"

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            authors: new Map(),
            error: null
        }
    }

    render() {
        let content;
        if (this.state.error === null) {
            content = (
                <ArticlesList 
                    articles={this.state.articles}
                    authors={this.state.authors}
                    onNicknameClick={this.props.onNicknameClick}/>
            );
        } else {
            content = this.state.error;
        }
        return (
            <div className="main-page">
                {content}
            </div>
        );
    }

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles() {
        let articlesList;
        let apiWorker = this.props.apiWorker;
        let articles_response = apiWorker.getArticles();
        articles_response.then(
            (articles) => {
                let authors = new Set();
                for (let article of articles) {
                    authors.add(article.authorId);
                }
                articlesList = articles;
                return this.loadAuthors(authors);
            }
        ).then(
            (authors) => {
                this.setState({
                    articles: articlesList,
                    authors: authors
                });
            }
        ).catch(
           (error) => {
                console.error(`Load articles error: ${error.message}`);
                this.setState({
                    error: (<ErrorWidget title="Error">
                                <p>Unknown error</p>
                            </ErrorWidget>)
                });
            } 
        );
    }

    async loadAuthors(authorIds) {
        let apiWorker = this.props.apiWorker;
        let authors = new Map();
        let author;
        for (let authorId of authorIds) {
            try {
                author = await apiWorker.getUser(authorId);
            } catch (error) {
                await Promise.reject(error);
            }
            authors.set(authorId, author);
        }
        return authors;
    }
}

export default MainPage;
