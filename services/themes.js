const MongodbConnection = require("../db/Mongodb")


const getThemes = async (req, res) => {
    const client = MongodbConnection.getInstance().client
    const database = client.db(process.env.DB_NAME);
    const themesCollection = database.collection(process.env.COLLECTION_THEME);



    let response = {
        success: false,
        code: 404,
        data: []
    }

    try {
        const themes = await themesCollection.find({}).toArray();
        if (themes.length > 0) {
            response = {
                success: true,
                code: 200,
                data: {
                    themes: themes
                }
            }
        }

    } catch (error) {
        response = { success: false, code: 400, data: [], error: String(error) }
    }



    res.json(response)
    return
}

module.exports = {
    getThemes
}