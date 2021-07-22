export class AquaHubError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "AquaHubError";
    }
}

export class ConnectionFailedError extends AquaHubError {
    constructor(msg) {
        super(msg);
        this.name = "ConnectionFailedError";
    }
}

export class UnauthorizedError extends AquaHubError {
    constructor(msg) {
        super(msg);
        this.name = "UnauthorizedError";
    }
}

export class IncorrectLoginData extends AquaHubError {
    constructor(msg) {
        super(msg);
        this.name = "IncorrectLoginData";
    }
}

export class UserNotFoundError extends AquaHubError {
    constructor(msg) {
        super(msg);
        this.name = "UserNotFoundError";
    }
}

export class ArticleNotFoundError extends AquaHubError {
    constructor(msg) {
        super(msg);
        this.name = "ArticleNotFoundError";
    }
}
