import { DocumentData } from "@firebase/firestore";
import { ref, watchEffect } from "vue";
import { collection, query, db, onSnapshot, orderBy } from "../firebase/config";
import { COLLECTIONS } from './useAddToCollection';

const useGetCollection = (col: COLLECTIONS) => {
  const error = ref("");
  const documents = ref<DocumentData[]>();

  const q = query(collection(db, col), orderBy("createdAt"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      doc.data().createdAt && messages.push({ ...doc.data(), id: doc.id });
    });
    documents.value = messages
    error.value = ""
  }, (err) => {
      console.log(err.message)
    error.value = "an error occurred"
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe())
  })

  return { error, documents}
};

export default useGetCollection;
