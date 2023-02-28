import { collection, doc, DocumentData, Firestore, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { User } from "../models/user";
const COLLECTION_NAME = "user";

function asMapped(data: DocumentData) {
    let list = []
    data.forEach(
        (item) => {
            list.push({ ...item.data(), id: item.id })
        });
    return list
}

export const create = async (fire: Firestore, { id, ...userData }: User): Promise<User> => {
    await setDoc(doc(fire, COLLECTION_NAME, id), userData)
    return { id, ...userData }
};

export const get = async (fire: Firestore, id: string): Promise<User> => {
    const data = await (await getDoc(doc(fire, COLLECTION_NAME, id))).data()
    return data as User
}

export const getAll = async (fire: Firestore): Promise<User[]> => {
    const data = asMapped((await getDocs(query(collection(fire, COLLECTION_NAME), where("Role", "==", "Manager")))).docs)
    return data
}
