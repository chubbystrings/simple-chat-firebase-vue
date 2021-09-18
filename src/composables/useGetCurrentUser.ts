import { ref } from 'vue';
import { auth, onAuthStateChanged } from '../firebase/config';
import { User } from '@firebase/auth';

const user = ref<User | null>(auth.currentUser)

onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
})

const useGetCurrentUser = () => {
    return { user }
}

export default useGetCurrentUser 