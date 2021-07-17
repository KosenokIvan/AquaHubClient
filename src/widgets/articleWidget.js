import React from 'react'

// import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

import dateFormat from '../tools/dateFormat';

class ArticleWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}


	render() {
		let article = this.props.article;
		let author = this.props.author;
		let updateDate = new Date(article.updateDate);
		return (
			<article className="article-widget">
				<Card>
					<Card.Header as="h4"></Card.Header>
					<Card.Body>
						<Card.Title>
							<span 
							className="author-nickname"
							title={`To @${author.nickname} page`}
							onClick={
								() => {
									this.props.onNicknameClick(author);
								}
							}>
								@{author.nickname}
							</span> {article.title}
						</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							{dateFormat(updateDate)}
						</Card.Subtitle>
						<Card.Text>
							{article.content === null ? '' : article.content}
						</Card.Text>
					</Card.Body>
					<Card.Footer></Card.Footer>
				</Card>
			</article>
		);
	}
}


export default ArticleWidget; 
