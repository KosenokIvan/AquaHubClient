import React from "react";

// import Card from "react-bootstrap/Card";

import ArticlesList from "../widgets/articlesList";
// import * as cst from "../tools/constants"

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            authors: new Map(),
            connectionError: false
        }
    }

    render() {
        let content;
        let user = this.state.authors.get(this.props.userId);
        if (!this.state.connectionError) {
            content = (
                <>
                    {
                        user !== undefined &&
                        <div className="user-info">
                            <h3>@{user.nickname}</h3>
                            <p>{user.description === null ? '' : user.description}</p>
                        </div>
                    }
                    <ArticlesList 
                        articles={this.state.articles}
                        authors={this.state.authors}
                        onNicknameClick={this.props.onNicknameClick}/>
                </>
            );
        } else {
            content = (
                <div>Connection error!</div>
            );
        }
        return (
            <div className="user-page">
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
        apiWorker.getArticles(null, null, [this.props.userId]).then(
            (articles) => {
                articlesList = articles;
                return this.loadUser(this.props.userId);
            }
        ).then(
            (authors) => {
                this.setState({
                    articles: articlesList,
                    authors: authors
                });
            }
        );
        /*fetch(`${cst.SERVER_ADDR}/articles/?author_ids=${this.props.userId}`).then(
            (response) => {
                if (response.ok) {
                    response.json().then(
                        (articles) => {
                            articlesList = articles;
                            return this.loadUser(this.props.userId);
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
                    connectionError: true
                });
            }
        );*/
    }

    async loadUser(userId) {
        let authors = new Map();
        let apiWorker = this.props.apiWorker;
        let author = await apiWorker.getUser(userId);
        authors.set(userId, author);
        return authors;
    }
}

export default UserPage;
