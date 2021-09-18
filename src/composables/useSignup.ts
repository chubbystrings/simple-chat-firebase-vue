import { ref } from 'vue';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../firebase/config';
import errorResponse from '@/utils/errorResponse';

const error = ref('')
const signup = async (email: string, password: string, displayName: string) => {
    error.value = '';

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        if (!userCredentials) {
            throw Error("an error occurred")
        }
        console.log(userCredentials.user)
        await updateProfile(auth.currentUser!, { displayName: displayName})
        return userCredentials.user
    } catch (err: any) {
        console.log(typeof err.message)
        const e = errorResponse(err.message)
        error.value = e
    }


}

const useSignup = () => {
    return { error, signup}
}

export default useSignup