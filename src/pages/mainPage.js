import React from "react";

import ArticlesList from "../widgets/articlesList";
// import * as cst from "../tools/constants"

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            authors: new Map(),
            connection_error: false
        }
    }

    render() {
        let content;
        if (!this.state.connection_error) {
            content = (
                <ArticlesList 
                    articles={this.state.articles}
                    authors={this.state.authors}
                    onNicknameClick={this.props.onNicknameClick}/>
            );
        } else {
            content = (
                <div>Connection error!</div>
            );
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
        apiWorker.getArticles().then(
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
        );
        /*fetch(`${cst.SERVER_ADDR}/articles/`).then(
            (response) => {
                if (response.ok) {
                    response.json().then(
                        (articles) => {
                            let authors = new Set();
                            for (let article of articles) {
                                authors.add(article.author_id);
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
                    );
                } else {
                    console.log(`Load articles error: ${response.status} (${response.statusText})`);
                }
            },
            (reason) => {
                console.log(`Http error: "${reason}"`);
                this.setState({
                    connection_error: true
                });
            }
        );*/
    }

    async loadAuthors(authorIds) {
        let apiWorker = this.props.apiWorker;
        let authors = new Map();
        let author;
        for (let authorId of authorIds) {
            author = await apiWorker.getUser(authorId);
            authors.set(authorId, author);
        }
        return authors;
    }
}

export default MainPage;
