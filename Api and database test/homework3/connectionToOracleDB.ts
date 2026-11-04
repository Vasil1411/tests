import oracledb from 'oracledb';

const dbConfig = {
    user: "stu1501681045",
    password: "fmi",
    connectionString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=195.230.127.185)(PORT=1521))(CONNECT_DATA=(SID=orcluni)))"
};

let clientOpts = {};
export async function connectToOracleDB(query: string) {
    try {
        oracledb.initOracleClient({ libDir: "D:\\PU\\homework3\\instantclient_23_9"});
        const connection = await oracledb.getConnection(dbConfig);
        console.log("Successfully connected to Oracle Database");

        const result = await connection.execute(query, {}, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });
        console.log(result.rows);
        await connection.close();
        return result.rows;
    } catch (err) {
        console.error("Error connecting to Oracle Database: ", err);
        throw err;
    }
}   