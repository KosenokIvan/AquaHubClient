import React from "react";

// import Card from "react-bootstrap/Card";
// import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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
                        <Container className="user-info" fluid>
                            <Row>
                                <h3>@{user.nickname}</h3>
                            </Row>
                            <Row>    
                                <p>{user.description === null ? '' : user.description}</p>
                            </Row>
                        </Container>
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
