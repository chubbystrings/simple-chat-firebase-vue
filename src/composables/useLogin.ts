import { ref } from 'vue';
import { auth, signInWithEmailAndPassword } from '../firebase/config';
import errorResponse from '@/utils/errorResponse';


const error = ref('')

const login = async (email: string, password: string) => {
    error.value = ''
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        console.log(userCredentials.user)
    } catch (err: any) {
        const e = errorResponse(err.message)
        console.log(e)
        error.value = e
    }

}

const useLogin = () => {


    return { error, login}

}

export default useLogin