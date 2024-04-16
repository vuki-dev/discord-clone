export interface UserType {
    id: string,
    name: string,
    email: string,
    created_at: string
}

export interface ServerType {
    id: string,
    name: string,
    image_url: string,
    invite_code: string,
    user_id: string,
    created_at: string,
    updated_at: string
}

export type MemberRole = "ADMIN" | "MODERATOR" | "GUEST"