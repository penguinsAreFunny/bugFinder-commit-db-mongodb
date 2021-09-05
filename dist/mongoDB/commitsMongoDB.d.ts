import { Commit } from "bugfinder-localityrecorder-commit";
import { MongoDBConfig } from "./mongoDBConfig";
import { LocalityMap } from "bugfinder-framework";
import { DB } from "bugfinder-framework/dist/00-shared/db/DB";
export declare class CommitsMongoDB<Annotation, Quantification> implements DB<Commit, Annotation, Quantification> {
    dbConfig: MongoDBConfig;
    /**
     *
     * @param dbConfig
     */
    constructor(dbConfig: MongoDBConfig);
    /**
     * Reads CommitPaths from DB configured with mongoDBConfig while considering this.pathsHandling-configuration
     */
    readLocalities(fromID: string, skip?: number, n?: number): Promise<Commit[]>;
    writeLocalities(localities: Commit[], toID: string): Promise<void>;
    readAnnotations(fromID: string, skip?: number, n?: number): Promise<LocalityMap<Commit, Annotation>>;
    writeAnnotations(annotations: LocalityMap<Commit, Annotation>, toID: string): Promise<void>;
    readQuantifications(fromID: string, skip?: number, n?: number): Promise<LocalityMap<Commit, Quantification>>;
    writeQuantifications(quantifications: LocalityMap<Commit, Quantification>, toID: string): Promise<void>;
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
