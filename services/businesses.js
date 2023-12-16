const { ObjectId } = require("mongodb");
const MongodbConnection = require("../db/Mongodb")

const client = MongodbConnection.getInstance().client
const database = client.db(process.env.DB_NAME);
const businessCollection = database.collection(process.env.COLLECTION_BUSINESS);
const sectionsCollection = database.collection(process.env.COLLECTION_SECTION);

const updateBusinessSettings = async (req, res) => {
    const name = req.params.name
    const newThemeSettings = req.body

    delete newThemeSettings['_id']
    delete newThemeSettings['id']


    let response = {
        success: false,
        code: 404,
        data: []
    }

    try {
        const business = await businessCollection.findOne({ name })
        Object.assign(business, newThemeSettings)
        const results = await businessCollection.updateOne({ _id: business._id }, { $set: business })

        if (results.acknowledged) {

            response = {
                success: true,
                code: 200,
                data: {
                    business
                }
            }
        }
        else {
            response = {
                success: false,
                code: 400,
                data: {},
                error: 'Could not update'
            }
        }

    } catch (error) {
        console.log(error);
        response = { success: false, code: 400, data: [], error: String(error) }
    }



    res.json(response)
    return
}

const getBusinessByName = async (req, res) => {
    const name = req.params.name

    let response = {
        success: false,
        code: 404,
        data: []
    }

    try {
        const business = await businessCollection.findOne({ name })
        if (business) {
            response = {
                success: true,
                code: 200,
                data: {
                    business
                }
            }
        }

    } catch (error) {
        response = { success: false, code: 400, data: [], error: String(error) }
    }



    res.json(response)
    return
}

const getBusinessById = async (req, res) => {
    const id = req.params.id

    let response = {
        success: false,
        code: 404,
        data: []
    }

    try {
        const business = await businessCollection.findOne({ business_id: Number(id) })
        console.log(id, business);
        if (business) {
            response = {
                success: true,
                code: 200,
                data: {
                    business
                }
            }
        }

    } catch (error) {
        response = { success: false, code: 400, data: [], error: String(error) }
    }



    res.json(response)
    return
}

const getSections = async (req, res) => {
    const business_id = req.params.id
    let response = {
        success: false,
        code: 404,
        data: []
    }

    try {
        const sections = await sectionsCollection.find({ business_id: Number(business_id) }).toArray()
        if (sections.length > 0) {

            /**
             * Sort sections by order
             */
            sections.sort((a, b) => a.order - b.order)

            response = {
                success: true,
                code: 200,
                data: {
                    sections
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
    getBusinessByName,
    getBusinessById,
    getSections,
    updateBusinessSettings
}