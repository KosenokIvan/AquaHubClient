import User from "./user";
import Article from "./article";

import * as err from "../tools/errors";

class AquaHubAPIWorker {
    constructor(serverAddr) {
        this.serverAddr = serverAddr;
    }

    aquaFetch(addr, getArgs={}, options={}) {
        let args = [];
        for (let arg in getArgs) {
            if (getArgs[arg] !== null) {
                if (getArgs[arg] instanceof Array) {
                    for (let value of getArgs[arg]) {
                        args.push(`${arg}=${value}`);
                    }
                } else {
                    args.push(`${arg}=${getArgs[arg]}`);
                }
            }
        }
        let argsString = args.length > 0 ? `?${args.join("&")}` : "";
        return fetch(`${this.serverAddr}/${addr}${argsString}`, options);
    }

    async login(nickname, password) {
        let response = await this.aquaFetch("/login", {}, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                nickname: nickname,
                password: password
            })
        });
        if (response.ok) {
            let token = await response.json();
            return token;
        } else {
            if (response.status === 401) {
                Promise.reject(new err.IncorrectLoginData("Incorrect nickname or password"));
            } else {
                Promise.reject(new err.AquaHubError(`Login error: ${response.status} (${response.statusText})`));
            }
        }
    }

    async getUser(userId) {
        let response = await this.aquaFetch(`users/${userId}`);
        if (response.ok) {
            let jsonUser = await response.json();
            return User.fromJSONObject(jsonUser, this);
        } else {
            if (response.status === 404) {
                Promise.reject(new err.UserNotFoundError(`User ${userId} not found`));
            } else {
                Promise.reject(new err.AquaHubError(`getUser(${userId}) error: ${response.status} (${response.statusText})`));
            }
        }
    }

    async getUsers(
        limit=null,
        offset=null,
        nicknameSearchString=null,
        nicknameSearchMode=null
    ) {
        let response = await this.aquaFetch(
            "users",
            {
                limit: limit,
                offset: offset,
                nickname_search_string: nicknameSearchString,
                nickname_search_mode: nicknameSearchMode
            }
        );
        if (response.ok) {
             let jsonUsers = await response.json();
             let users = jsonUsers.map(
                 (jsonUser, _index, _array) => {
                     return User.fromJSONObject(jsonUser, this);
                 }
             );
             return users;
        } else {
            Promise.reject(new err.AquaHubError(`getUsers error: ${response.status} (${response.statusText})`));
        }
    }

    async getArticle(articleId) {
        let response = await this.aquaFetch(`articles/${articleId}`);
        if (response.ok) {
            let jsonArticle = await response.json();
            return Article.fromJSONObject(jsonArticle, this);
        } else {
            if (response.status === 404) {
                Promise.reject(new err.ArticleNotFoundError(`Article ${articleId} not found`));
            } else {
                Promise.reject(new err.AquaHubError(`getArticle(${articleId}) error: ${response.status} (${response.statusText})`));
            }
        }
    }

    async getArticles(
        limit=null,
        offset=null,
        authorIds=null,
        titleSearchString=null,
        titleSearchMode=null
    ) {
        let response = await this.aquaFetch(
            "articles/",
            {
                limit: limit,
                offset: offset,
                author_ids: authorIds,
                title_search_string: titleSearchString,
                title_search_mode: titleSearchMode
            }
        );
        if (response.ok) {
            let jsonArticles = await response.json();
            let articles = jsonArticles.map(
                (jsonArticle, _index, _array) => {
                    return Article.fromJSONObject(jsonArticle, this);
                }
            );
            return articles;
        } else {
            Promise.reject(new err.AquaHubError(`getArticles error: ${response.status} (${response.statusText})`));
        }
    }
}

export default AquaHubAPIWorker;
