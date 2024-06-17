import { ContactResponse, UserContactSearch } from "../dto/contact";
import { UserRepository } from "../models/repositories/userRepository";
import moment from 'moment-timezone';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    private async createPrimaryContact(email: string, phoneNumber: string): Promise<ContactResponse> {
        const newContact = await this.userRepository.createUserContact({
            phoneNumber,
            email,
            linkedId: undefined,
            linkPrecedence: "primary",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: undefined,
        });

        return {
            primaryContactId: parseInt(newContact.id, 10),
            emails: [email],
            phoneNumbers: [phoneNumber],
            secondaryContactIds: [],
        };
    }

    private buildContactResponse(userContacts: UserContactSearch[]): ContactResponse {
        const contactResponse: ContactResponse = {
            primaryContactId: 0,
            emails: [],
            phoneNumbers: [],
            secondaryContactIds: [],
        };

        userContacts.forEach(contact => {
            if (contact.email) {
                contactResponse.emails.push(contact.email);
            }
            if (contact.phoneNumber) {
                contactResponse.phoneNumbers.push(contact.phoneNumber);
            }
            if (contact.linkPrecedence === "primary") {
                contactResponse.primaryContactId = parseInt(contact.id, 10);
            } else {
                contactResponse.secondaryContactIds.push(parseInt(contact.id, 10));
            }
        });

        if (contactResponse.primaryContactId === null) {
            throw new Error("No primary contact found");
        }

        return contactResponse;
    }

    private async createSecondaryContact(primaryContactId: number, email: string, phoneNumber: string, contactResponse: ContactResponse): Promise<void> {
        const newSecondaryContact = await this.userRepository.createUserContact({
            phoneNumber,
            email,
            linkedId: primaryContactId,
            linkPrecedence: "secondary",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: undefined,
        });

        contactResponse.emails.push(email);
        contactResponse.phoneNumbers.push(phoneNumber);
        contactResponse.secondaryContactIds.push(parseInt(newSecondaryContact.id, 10));
    }

    private hasCommonFieldWithNewInformation(userContacts: UserContactSearch[], email: string, phoneNumber: string): boolean {
        return userContacts.some(contact =>
            (contact.email === email && contact.phoneNumber !== phoneNumber) ||
            (contact.phoneNumber === phoneNumber && contact.email !== email)
        );
    }

    public async identifyUser(email: string, phoneNumber: string): Promise<ContactResponse> {
        const userContacts = await this.userRepository.findUserByEmailOrPhone(email, phoneNumber);

        if(!Array.isArray(userContacts) || !userContacts.length) {
            return await this.createPrimaryContact(email, phoneNumber);
        }

        const userContactResponse = this.buildContactResponse(userContacts)

        if (this.hasCommonFieldWithNewInformation(userContacts, email, phoneNumber)) {
            await this.createSecondaryContact(
                userContactResponse.primaryContactId,
                email,
                phoneNumber,
                userContactResponse,
            )
        }

        return userContactResponse;
    }
}