export interface TgUser {
    id: number
    is_bot?: boolean
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    is_premium?: boolean
    added_to_attachment_menu?: boolean
    allows_write_to_pm?: boolean
    photo_url?: string
}

export interface TgInitData {
    auth_date: string
    hash: string
    query_id: string
    user: TgUser
}

export interface UserStoreType {
    initData: TgInitData
}

export interface UserInfoType {
    id: number
    groupId: number
    firstName: string
    lastName: string
    username: string
    isBot: boolean
    languageCode: string
    callName: string
    birthDate: string
    gender: "MALE" | "FEMALE"
    height: number
    initialWeight: number
    currentWeight: number
    neckLength: number
    waistLength: number
    hipsLength: number
    calcFatPercent: number
    calcIdealWeight: number
}
