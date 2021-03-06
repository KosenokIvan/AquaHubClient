import React from "react";

// import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import ArticlesList from "../widgets/articlesList";
import ErrorWidget, {ErrorLink} from "../widgets/errorWidget";
// import * as cst from "../tools/constants"

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            user: null,
            error: null
        }
    }

    render() {
        let content;
        let user = this.state.user;
        let authorsMap = new Map();
        if (user !== null) {
            authorsMap.set(user.userId, user);
        }
        if (this.state.error === null) {
            content = (
                <>
                    {
                        user !== null &&
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
                        authors={authorsMap}
                        onNicknameClick={this.props.onNicknameClick}/>
                </>
            );
        } else {
            content = this.state.error;
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
        let user;
        let authors = new Map();
        let apiWorker = this.props.apiWorker;
        this.loadUser(this.props.userId).then(
            (userObj) => {
                user = userObj;
                authors.set(user.userId, user);
                return apiWorker.getArticles(null, null, [user.userId]);
            }
        ).then(
            (articles) => {
                this.setState({
                    articles: articles,
                    user: user
                });
            }
        ).catch(
            (err) => {
                let errorWidget;
                if (err.name === "UnauthorizedError") {
                    errorWidget = (
                        <ErrorWidget title="Unauthorized">
                            <p>
                                <ErrorLink>Log in</ErrorLink>, for open this page
                            </p>
                        </ErrorWidget>
                    );
                } else {
                    errorWidget = (
                        <ErrorWidget title="Error">
                            <p>Unknown error</p>
                        </ErrorWidget>
                    );
                }
                console.error(`HTTP error: ${err.message}`);
                this.setState({
                    error: errorWidget
                });
            }
        );
    }

    async loadUser(userId) {
        let apiWorker = this.props.apiWorker;
        let author;
        try {
            if (userId === "me") {
                author = await apiWorker.getUserMe();
            } else {
                author = await apiWorker.getUser(userId);
            }
        } catch (error) {
            await Promise.reject(error);
        }
        return author;
    }
}

export default UserPage;
