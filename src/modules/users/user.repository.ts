// UsersRepository.ts
import { BaseRepository } from "../../common";
import { Service } from "typedi";
import { Document, ObjectId } from "mongodb";

@Service()
export class UsersRepository extends BaseRepository {
    protected collectionName: string = 'users';

    async createUser(user: Document): Promise<Document> {
        const [insertedUser] = await this.insertMany([user]);
        return insertedUser;
    }

    async getUserById(id: string): Promise<Document | null> {
        return this.findOne({ filter: { _id: new ObjectId(id) } });
    }

    async getUserByEmail(email: string): Promise<Document | null> {
        return this.findOne({ filter: { email } });
    }

    async updateUserById(id: string, user: Document): Promise<boolean> {
        const result = await this.update(
            { _id: new ObjectId(id) },
            user
        );
        return result.modifiedCount > 0;
    }
}