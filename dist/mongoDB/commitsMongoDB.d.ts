import { Commit } from "bugfinder-localityrecorder-commit";
import { MongoDBConfig } from "./mongoDBConfig";
import { Dataset, DB, LocalityMap, WriteMode } from "bugfinder-framework";
import { Logger } from "ts-logger";
export declare class CommitsMongoDB<Annotation, Quantification> implements DB<Commit, Annotation, Quantification> {
    private logger;
    dbConfig: MongoDBConfig;
    /**
     *
     * @param logger
     * @param dbConfig
     */
    constructor(logger: Logger, dbConfig: MongoDBConfig);
    /**
     * Reads CommitPaths from DB configured with mongoDBConfig while considering this.pathsHandling-configuration
     */
    readLocalities(fromID: string, skip?: number, n?: number): Promise<Commit[]>;
    writeLocalities(localities: Commit[], toID: string, mode?: WriteMode): Promise<void>;
    readAnnotations(fromID: string, skip?: number, n?: number): Promise<LocalityMap<Commit, Annotation>>;
    writeAnnotations(annotations: LocalityMap<Commit, Annotation>, toID: string, mode?: WriteMode): Promise<void>;
    readQuantifications(fromID: string, skip?: number, n?: number): Promise<LocalityMap<Commit, Quantification>>;
    writeQuantifications(quantifications: LocalityMap<Commit, Quantification>, toID: string, mode?: WriteMode): Promise<void>;
    readDataset(fromID: string): Promise<Dataset>;
    /**
     * Writes DatasetAFE to DB at location (collection/table/file/...) toID. With mode = "a" data will be appended.
     * @param toID
     * @param dataset
     * @param mode
     */
    writeDataset(toID: string, dataset: Dataset, mode?: WriteMode): Promise<void>;
    private read;
    write(obj: any, toID: string, mode?: WriteMode): Promise<void>;
    writeMany(objs: any[], toID: string, mode?: WriteMode): Promise<void>;
    /**
     * Returns true if collection is empty. Logs error if error is set to true
     * @param toID
     * @param error
     * @private
     */
    private empty;
    /**
     * Set Methods to CommitPath-Objects as only DTOs are saved in database
     * @param commit
     * @private
     */
    private setMethods;
}
