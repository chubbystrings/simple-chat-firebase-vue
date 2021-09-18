import { ref } from 'vue';
import { auth, signInWithEmailAndPassword, updateProfile } from '../firebase/config';
import errorResponse from '@/utils/errorResponse';

const error = ref('')


const logout = async () => {
    error.value = ''

    try {
        await auth.signOut()
    } catch (err: any) {
        error.value = errorResponse(err.message)
        console.log(error.value)
    }
}

const useLogout = () => {
    return { error, logout}
}

export default useLogout