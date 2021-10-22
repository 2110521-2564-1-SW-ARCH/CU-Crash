from pymongo import MongoClient
import certifi
import logging

logger = logging.getLogger()

client = MongoClient(
    "mongodb+srv://cucrash:cucrash1234@cluster0.rtqnr.mongodb.net/cucrash?retryWrites=true&w=majority", tlsCAFile=certifi.where())

# สู้ๆครับทุกคน


def get_mongo():
    try:
        mongo = client['cucrash']
        logger.info("Connect to mongo success !!!")
        try:
            yield mongo
        finally:
            client.close()
            logger.info("Close MongoDB connection")
    except Exception as e:
        logger.info("Oops!", repr(e))
