import axios from 'axios'

class ApiClient{
    constructor(remoteHostUrl){
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "student_token"
    }   

    setToken(token){
        this.token=token
        localStorage.setItem(this.tokenName, token)
    }

    async request({endpoint, method =  `GET`, data={}}){
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type" : "application/json"
        }

        if(this.token){
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try{
            const res = await axios({url, method, data, headers})
            return {data : res.data, error : null}
        }
        catch(error){
            console.error({errorResponse : error.response})
            console.log(error?.response?.data?.error?.message)
            const message = error?.response?.data?.error?.message
            return {data : null, error : message || String(error)}
        }
    }

    // async fetchUserFromToken(){
    //     return await this.request({endpoint :`auth/me` , method : `GET`})
    // }


    async login(credentials){
        return await this.request({endpoint: `auth/login`,
        method : `POST`, data : credentials
        })
    }

    async signup(credentials){
        return await this.request({endpoint: `auth/register`,
        method : `POST`, data : credentials
        })
    }

    async me(){
        return await this.request({endpoint: `auth/me`,
        method : `GET`, data : {}
        }) 
    }

    async fetchProducts(){
        return await this.request({endpoint: `store`,
        method : `GET`, data : {}
        }) 
    }

    async postOrders(credentials){
        return await this.request({endpoint: `orders`,
        method : `POST`, data : credentials
        }) 
    }

    async logoutUser(){
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
    // async nutrition(){
    //     return await this.request({endpoint: `nutrition`,
    //     method : `GET`, data : {}
    //     })
    // }

    // async createNutrition(credentials){
    //     return await this.request({endpoint: `nutrition`,
    // method : `POST`, data : credentials})
    // }

    // async logoutUser(){
    //     this.setToken(null)
    //     localStorage.setItem(this.tokenName, "")
    // }
}

//http://localhost:3001
export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001")