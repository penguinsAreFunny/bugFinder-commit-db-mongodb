/**
 * TODO: write generic MongoDB | should work, setMethods need to iterate over all prototype methods though
 */
import {inject, injectable} from "inversify";
import {Commit} from "bugfinder-localityrecorder-commit";
import {BUGFINDER_DB_COMMIT_MONGODB_TYPES} from "../TYPES";
import {MongoDBConfig} from "./mongoDBConfig";
import {MongoClient, MongoError} from "mongodb";
import {DB, LocalityMap, Dataset, DatasetAP, DatasetAFE} from "bugfinder-framework";
import {Logger} from "ts-logger"

@injectable()
export class CommitsMongoDB<Annotation, Quantification> implements DB<Commit, Annotation, Quantification> {

    /**
     *
     * @param logger
     * @param dbConfig
     */
    constructor(@inject(BUGFINDER_DB_COMMIT_MONGODB_TYPES.logger) private logger: Logger,
                @inject(BUGFINDER_DB_COMMIT_MONGODB_TYPES.mongoDBConfig) public dbConfig: MongoDBConfig) {
    }

    /**
     * Reads CommitPaths from DB configured with mongoDBConfig while considering this.pathsHandling-configuration
     */
    async readLocalities(fromID: string, skip?: number, n?: number): Promise<Commit[]> {
        this.logger?.info(`Reading localities from collection ${fromID} using database ${this.dbConfig.dbName} ` +
            `from ${this.dbConfig.url}...`)
        const localities: Commit[] = await this.read(fromID, skip, n);
        // apply prototype functions to DTO
        localities.forEach(loc => {
            this.setMethods(loc);
        })
        this.logger?.info(`Found ${localities.length} localities in database`);
        return localities;
    }

    async writeLocalities(localities: Commit[], toID: string) {
        this.logger?.info(`Writing ${localities.length} localities to collection ${toID} into database...`)
        await this.writeMany(localities, toID);
    }

    async readAnnotations(fromID: string, skip?: number, n?: number): Promise<LocalityMap<Commit, Annotation>> {
        this.logger?.info(`Reading annotations from collection ${fromID} using database ${this.dbConfig.dbName} ` +
            `from ${this.dbConfig.url}...`)
        const annotations = (await this.read(fromID, skip, n)).map(elem => {
            const key: Commit = elem.key;
            this.setMethods(key);
            return {
                key: key,
                val: elem.val
            }
        });
        const locMap = new LocalityMap<Commit, Annotation>();
        locMap.fromArray(annotations);

        this.logger?.info(`Found ${annotations.length} annotations in database`);
        return locMap;
    }

    async writeAnnotations(annotations: LocalityMap<Commit, Annotation>, toID: string): Promise<void> {
        this.logger?.info(`Writing ${annotations.size()} annotations to collection ${toID} using database ` +
            `${this.dbConfig.dbName} from ${this.dbConfig.url}...`)
        await this.writeMany(annotations.toArray(), toID);
    }

    async readQuantifications(fromID: string, skip?: number, n?: number): Promise<LocalityMap<Commit, Quantification>> {
        this.logger?.info(`Reading quantifications from collection ${fromID} using database ${this.dbConfig.dbName} ` +
            `from ${this.dbConfig.url}...`)
        const quantifications = (await this.read(fromID, skip, n)).map(elem => {
            const key: Commit = elem.key;
            this.setMethods(key);
            return {
                key: key,
                val: elem.val
            }
        });
        const locMap = new LocalityMap<Commit, Quantification>();
        locMap.fromArray(quantifications);

        this.logger?.info(`Found ${quantifications.length} annotations in database`);
        return locMap;
    }

    async writeQuantifications(quantifications: LocalityMap<Commit, Quantification>, toID: string): Promise<void> {
        this.logger?.info(`Writing ${quantifications.size()} quantifications to collection ${toID} using database ` +
            `${this.dbConfig.dbName} from ${this.dbConfig.url}...`)
        await this.writeMany(quantifications.toArray(), toID);
    }

    async readDataset(fromID: string): Promise<Dataset> {
        const dataset = (await this.read(fromID))[0]
        return dataset[0]
    }

    async writeDataset(toID: string, dataset: Dataset): Promise<void> {
        await this.write(dataset, toID)
    }

    async readDatasetAP(fromID: string): Promise<DatasetAP> {
        const dataset = (await this.read(fromID))[0]
        return dataset[0]
    }

    /**
     * Writes DatasetAP to DB at location (collection/table/file/...) toID. With mode = "a" data will be appended.
     * @param toID
     * @param dataset
     */
    async writeDatasetAP(toID: string, dataset: DatasetAP): Promise<void> {
        await this.write(dataset, toID)
    }

    async readDatasetAFE(fromID: string): Promise<DatasetAFE> {
        const dataset = (await this.read(fromID))[0]
        return dataset[0]
    }

    /**
     * Writes DatasetAFE to DB at location (collection/table/file/...) toID. With mode = "a" data will be appended.
     * @param toID
     * @param dataset
     */
    async writeDatasetAFE(toID: string, dataset: DatasetAFE): Promise<void> {
        await this.write(dataset, toID)
    }

    private async read(fromID: string, skip?: number, n?: number): Promise<any[]> {
        // @formatter:off
        const client: MongoClient   = await MongoClient.connect(this.dbConfig.url, {useUnifiedTopology: true});
        const db                    = client.db(this.dbConfig.dbName);
        const collectionName        = fromID;
        const collection            = db.collection(collectionName);

        const dbContent             = (skip == null && n == null)?
            await collection.find({}).toArray()
            : await collection.find({}).skip(skip).limit(n).toArray()
        // @formatter:on

        await client.close();
        return dbContent;
    }

    async write(obj: any, toID: string) {
        const elementsInCollection = await this.read(toID);

        if (elementsInCollection.length > 0) {
            throw(new MongoError(`Found ${elementsInCollection.length} elements in database collection ${toID}.
                Database collection commits should be empty! Aborting Writing to DB. Please delete all elements 
                in collection ${toID} to prevent redundancy.`))
        }

        // @formatter:off
        const client: MongoClient   = await MongoClient.connect(this.dbConfig.url, {useUnifiedTopology: true});
        const db                    = client.db(this.dbConfig.dbName);
        const collectionName        = toID;
        const collection            = db.collection(collectionName);
        // @formatter:on

        obj["_id"] = undefined;
        await collection.insertOne(obj);
        await client.close();
    }

    async writeMany(objs: any[], toID: string) {
        const elementsInCollection = await this.read(toID);

        if (elementsInCollection.length > 0) {
            throw(new MongoError(`Found ${elementsInCollection.length} elements in database collection ${toID}.
                Database collection commits should be empty! Aborting Writing to DB. Please delete all elements 
                in collection ${toID} to prevent redundancy.`))
        }

        // @formatter:off
        const client: MongoClient   = await MongoClient.connect(this.dbConfig.url, {useUnifiedTopology: true});
        const db                    = client.db(this.dbConfig.dbName);
        const collectionName        = toID;
        const collection            = db.collection(collectionName);
        // @formatter:on

        /**
         * Cleanup _id-field as it will be generated as an unique identifier bei MongoDBMS
         * After reading from DB _id-field might contain old
         */
        for (const obj of objs) {
            obj["_id"] = undefined;
        }

        await collection.insertMany(objs);
        await client.close();
    }

    /**
     * Set Methods to CommitPath-Objects as only DTOs are saved in database
     * @param commitPath
     * @private
     */
    private setMethods(commit: Commit) {
        const properties = Object.getOwnPropertyNames(Commit.prototype)
        const methods = properties.filter(property => {
            const descriptor = Object.getOwnPropertyDescriptor(Commit.prototype, property);
            return !descriptor ?
                false
                : typeof descriptor.value == "function" && property != "constructor" && !property.startsWith("__");
        })

        Commit.prototype.setMethods(commit);
    }


}