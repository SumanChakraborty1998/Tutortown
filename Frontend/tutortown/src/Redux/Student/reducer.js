import { DELETE_TUTOR_FAILURE, DELETE_TUTOR_REQUEST, DELETE_TUTOR_SUCCESS, GET_TUTOR_FAILURE, GET_TUTOR_REQUEST, GET_TUTOR_SUCCESS, PATCH_TUTOR_FAILURE, PATCH_TUTOR_REQUEST, PATCH_TUTOR_SUCCESS, POST_TUTOR_FAILURE, POST_TUTOR_REQUEST, POST_TUTOR_SUCCESS } from "./actionTypes";

const initState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    tutorData: []
}

export const tutorReducer = (state=initState, {type, payload}) => {

    switch (type) {
        
        case POST_TUTOR_REQUEST :
        return {
            ...state,
            isLoading: true,
            isError: false,
            isSuccess: false
        }    
        
        case POST_TUTOR_SUCCESS :
        return {
            ...state,
            isLoading: false,
            isError: false,
            isSuccess: true
        }

        case POST_TUTOR_FAILURE :
        return {
            ...state,
            isLoading: false,
            isError: true,
            isSuccess: false
        }
        
        case GET_TUTOR_REQUEST :
        return {
            ...state,
            isLoading: true,
            isError: false,
            isSuccess: false
        }    
        
        case GET_TUTOR_SUCCESS :
        const updated = []
        for (let i=payload.length-1; i>=0; i--) {
            updated.push(payload[i])
        }
        return {
            ...state,
            tutorData: updated,
            isLoading: false,
            isError: false,
            isSuccess: true
        }

        case GET_TUTOR_FAILURE :
        return {
            ...state,
            isLoading: false,
            isError: true,
            isSuccess: false
        }

        case DELETE_TUTOR_REQUEST :
        return {
            ...state,
            isLoading: true,
            isError: false,
            isSuccess: false
        }    
        
        case DELETE_TUTOR_SUCCESS :
        return {
            ...state,
            isLoading: false,
            isError: false,
            isSuccess: true
        }

        case DELETE_TUTOR_FAILURE :
        return {
            ...state,
            isLoading: false,
            isError: true,
            isSuccess: false
        }

        case PATCH_TUTOR_REQUEST :
        return {
            ...state,
            isLoading: true,
            isError: false,
            isSuccess: false
        }    
        
        case PATCH_TUTOR_SUCCESS :
        return {
            ...state,
            isLoading: false,
            isError: false,
            isSuccess: true
        }

        case PATCH_TUTOR_FAILURE :
        return {
            ...state,
            isLoading: false,
            isError: true,
            isSuccess: false
        }
    
        default:
        return state;
    }
}