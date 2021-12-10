import { firebase, FieldValue } from '../lib/firebase';

//Verificando se existe o nome de usuário no banco
export async function doesUsernameExist(username: string) {
    const query = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
        //Retornando se há ou não valor
        return query.docs.map((user) => user.data().length > 0);
}