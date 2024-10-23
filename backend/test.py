from pymongo import MongoClient

client = MongoClient('mongodb://gabor_hollbeck:1001@localhost:27018/')
db = client['mydatabase']

# Check if the database is accessible
print(db.list_collection_names())
