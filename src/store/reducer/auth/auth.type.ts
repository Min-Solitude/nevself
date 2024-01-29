export type AuthState = {
    loading: boolean;
    account: User | null;
    profile: User | null;
}

export type User = {
    username?: string;
    email: string;
    purpose: string | null;
    phoneNumber: string;
    uid: string;
    role: string;
    status: string;
    avatar?: string;
    loginBy?: string;
    displayName?: string;
    banner?: string;
    tags?: HagTag[];
    introduction?: string;
}

export type HagTag = {
    name: string;
}