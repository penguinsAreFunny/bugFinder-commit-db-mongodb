import { Commit } from "bugfinder-localityrecorder-commit";
import { MongoDBConfig } from "./mongoDBConfig";
import { DB, LocalityMap, Dataset, DatasetAP, DatasetAFE } from "bugfinder-framework";
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
    writeLocalities(localities: Commit[], toID: string): Promise<void>;
    readAnnotations(fromID: string, skip?: number, n?: number): Promise<LocalityMap<Commit, Annotation>>;
    writeAnnotations(annotations: LocalityMap<Commit, Annotation>, toID: string): Promise<void>;
    readQuantifications(fromID: string, skip?: number, n?: number): Promise<LocalityMap<Commit, Quantification>>;
    writeQuantifications(quantifications: LocalityMap<Commit, Quantification>, toID: string): Promise<void>;
    readDataset(fromID: string): Promise<Dataset>;
    writeDataset(toID: string, dataset: Dataset): Promise<void>;
    readDatasetAP(fromID: string): Promise<DatasetAP>;
    /**
     * Writes DatasetAP to DB at location (collection/table/file/...) toID. With mode = "a" data will be appended.
     * @param toID
     * @param dataset
     */
    writeDatasetAP(toID: string, dataset: DatasetAP): Promise<void>;
    readDatasetAFE(fromID: string): Promise<DatasetAFE>;
    /**
     * Writes DatasetAFE to DB at location (collection/table/file/...) toID. With mode = "a" data will be appended.
     * @param toID
     * @param dataset
     */
    writeDatasetAFE(toID: string, dataset: DatasetAFE): Promise<void>;
    private read;
    write(obj: any, toID: string): Promise<void>;
    writeMany(objs: any[], toID: string): Promise<void>;
    /**
     * Set Methods to CommitPath-Objects as only DTOs are saved in database
     * @param commitPath
     * @private
     */
    private setMethods;
}
