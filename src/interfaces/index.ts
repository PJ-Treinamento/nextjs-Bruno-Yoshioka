export interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    about: string;
    photo: string;
    pius: Piu[];
    likes: PiuLike[];
    following: User[];
    followers: User[];
    favorites: Piu[];
}

export interface Piu {
    id: string;
    user: User;
    likes: PiuLike[];
    text: string;
    created_at: Date;
    updated_at: Date;
}

export interface PiuLike {
    id: string;
    user: User;
    piu: Piu;
}

export interface AuthContextData {
    user: User;
    token: string;
    login(loginCred: LoginCredentials): void;
    logout(): void;
}

export interface AuthState {
    token: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface InterfaceTimeline {
    pius: Piu[];
    search: string;
    user: User;
}

export interface ProcessedPiu {
    id: string;
    user: User;
    likes: PiuLike[];
    text: string;
    favd: string;
    liked: string;
    mine: boolean;
}

export interface PiuId {
    id: string;
}
