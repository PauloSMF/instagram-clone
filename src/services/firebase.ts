import { firebase } from '../lib/firebase';

//Verificando se existe o nome de usuário no firestore
export async function doesUsernameExist(username: string) {
    const query = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
        //Retornando se há ou não valor
        return query.docs.map((user) => user.data().length > 0);
}

//Recuperando usuário por seu uid no firestore
export async function getUserByUserId(userId: string) {
    const response = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    const user = response.docs.map((item) => ({
        ...item.data(),
        docId: item.id //Enviar o id do item facilita operações CRUD
    }));

    return user;
}