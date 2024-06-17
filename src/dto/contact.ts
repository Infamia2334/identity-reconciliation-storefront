export interface ContactResponse {
    primaryContactId: number,
    emails: string[],
    phoneNumbers: string[],
    secondaryContactIds: number[]
}

export interface Contact {
    phoneNumber?: String,
    email?: String,
    linkedId?: Number, // the ID of another Contact linked to this one
    linkPrecedence: "secondary"|"primary", // "primary" if it's the first Contact in th
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date,
}

export interface UserContactSearch { 
    id: string; 
    phoneNumber?: string, 
    email?: string, 
    linkedId?: Number;
    linkPrecedence: "secondary"|"primary"; 
}