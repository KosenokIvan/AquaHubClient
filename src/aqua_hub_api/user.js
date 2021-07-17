class User {
    constructor(
        userId=null,
        nickname,
        email,
        description,
        registrationDate,
        apiWorker=null
    ) {
        this.userId = userId;
        this.nickname = nickname;
        this.email = email;
        this.description = description;
        this.registrationDate = registrationDate;
        this.apiWorker = apiWorker;
    }

    static fromJSONObject(obj, apiWorker=null) {
        return new User(
            obj.user_id === undefined ? null : obj.user_id,
            obj.nickname,
            obj.email === undefined ? null : obj.email,
            obj.description,
            obj.registration_date,
            apiWorker
        )
    }
}

export default User;
