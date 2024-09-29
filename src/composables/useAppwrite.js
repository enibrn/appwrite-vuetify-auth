import { Client, Account, ID } from 'appwrite';
import { ref } from 'vue';

const user = ref(null);

const sessionIsDeleted = (response) => {
    return response.events &&
        response.events.length >= 2 &&
        response.events[1] === 'users.*.sessions.*.delete';
}

const evaluateUser = async () => {
    console.log("eval user");
    console.log("was", user.value);
    try {
        user.value = await account.get();
    } catch (error) {
        user.value = null;
    }
    console.log("now is", user.value);
};

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_KEY);

const account = new Account(client);
// console.log("eval user fist time");
// await evaluateUser();

client.subscribe('account', async response => {
    if (sessionIsDeleted(response)) {
        user.value = null;
        return;
    }

    await evaluateUser();
});

export default function useAppwrite() {
    return { account, user, ID, evaluateUser };
}
