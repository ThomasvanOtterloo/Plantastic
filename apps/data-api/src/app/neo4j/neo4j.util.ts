import neo4j, { Driver } from 'neo4j-driver'
import { Neo4jConfig } from './neo4j-config.interface'

export const createDriver = async (config: Neo4jConfig) => {
    const driver: Driver = neo4j.driver(
        `bolt://127.0.0.1:7687`,
        neo4j.auth.basic(config.username, config.password)
    );

    console.log(config.host)

    await driver.getServerInfo();

    return driver;
}
