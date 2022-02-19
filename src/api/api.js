import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const api = {
    login(id) {
        return instance.get(`/users?id=${id}`)
            .then((response) => {
                return response
            })
            .catch((error) => {
                
                if (error.response) {
                    console.log('response');
                } else if (error.request) {
                    return error.request
                }
            })
    },

    getUser(username) {
        return instance.get(`/users?username=${username}`)
            .then((response) => {
                return response
            })
            .catch((error) => {
                if (error.response) {
                    console.log('response');
                } else if (error.request) {
                    return error.request
                }
            })
    },

    getAllUsers() {
        return instance.get(`/users`)
            .then((response) => {
                return response
            })
            .catch((error) => {
                if (error.response) {
                    console.log('response');
                } else if (error.request) {
                    return error.request
                }
            })
    },

    getUserAlbum(albumId, page) {
        return instance.get(`/photos?albumId=${albumId}&_limit=3&_page=${page}`)
            .then((response) => {
                return response
            })
            .catch((error) => {
                if (error.response) {
                    console.log('response');
                } else if (error.request) {
                    return error.request
                }
            })
    },

    getPhoto(id) {
        return instance.get(`/photos?id=${id}`)
            .then((response) => {
                return response
            })
            .catch((error) => {
                if (error.response) {
                    console.log('response');
                } else if (error.request) {
                    return error.request
                }
            })
    },

    getComments(page) {
        //debugger
        return instance.get(`/comments?_limit=2&_page=${page}`)
            .then((response) => {
                return response
            })
            .catch((error) => {
                if (error.response) {
                    console.log('response');
                } else if (error.request) {
                    return error.request
                }
            })
    },

    getUserById(userId) {
        return instance.get(`/users?id=${userId}`)
            .then((response) => {
                return response
            })
            .catch((error) => {
                if (error.response) {
                    console.log('response');
                } else if (error.request) {
                    return error.request
                }
            })
    },
}

