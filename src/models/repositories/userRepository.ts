import { db } from "../../clients/db";
import { Contact, UserContactSearch } from "../../dto/contact";

export class UserRepository {
    public async findUserByEmailOrPhone(email: string, phoneNumber: string): Promise<UserContactSearch[]> {
        const getUserContactQuery = `SELECT id, email, phone_number, linked_id, link_precedence 
            FROM contact WHERE email = $1 OR phone_number = $2`;

        const rows = await db.query(getUserContactQuery, [email, phoneNumber]);
        const result = rows.map((row: { id: string; phone_number: string, email: string, linked_id: string; link_precedence: any; }) => {
            return {
                id: row.id,
                phoneNumber: row.phone_number,
                email: row.email,
                linkedId: row.linked_id,
                linkPrecedence: row.link_precedence
            }
        });

        return result;
    }

    public async createUserContact(userContact: Contact) {
        const createContactQuery = `INSERT INTO contact 
            (phone_number, email, linked_id, link_precedence,
            created_at, updated_at, deleted_at) 
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`;

        const rows = await db.query(createContactQuery, [
            userContact.phoneNumber,
            userContact.email,
            userContact.linkedId,
            userContact.linkPrecedence,
            userContact.createdAt,
            userContact.updatedAt,
            userContact.deletedAt
        ]);
        const result = rows[0].id;
        return result
    }
}