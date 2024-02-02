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
    likes?: string[];
    kindProfile?: string | null;
    notifications?: Notification[];
    donate?: Donate;
}

export type HagTag = {
    name: string;
}

export type Notification = {
    uid: string;
    time: string;
    displayName: string;
    avatar: string;
    content: string;
}

export type Donate = {
    title: string;
    QrCode: string;
    description: string;
}