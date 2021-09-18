import { ref } from "vue";
import { collection, addDoc, db} from '../firebase/config'

export type COLLECTIONS = "messages" | "users"
const useAddToCollection = (col: COLLECTIONS) => {
    const error = ref('')

    const addDocument = async (document: Record<string, any>) => {
        try {
            await addDoc(collection(db, col), document)
        } catch (err:any) {
            console.log(err)
            error.value = "an error occurred"
        }
    }

    return { error, addDocument}
}

export default useAddToCollection