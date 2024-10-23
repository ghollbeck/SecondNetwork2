# backend/friends.py

from database import db, get_user_by_id
from models import User
from fastapi import HTTPException, status
from bson import ObjectId

def search_users(query: str, current_user: User):
    """
    Search for users by username or email.
    """
    if not query:
        return []

    # Perform case-insensitive search on username and email
    regex = {'$regex': query, '$options': 'i'}
    users = db.users.find({
        '$or': [
            {'username': regex},
            {'email': regex}
        ],
        '_id': {'$ne': ObjectId(current_user.id)}
    })

    return [User(**user) for user in users]

def send_friend_request(current_user: User, user_id: str):
    """
    Send a friend request from current_user to user_id.
    """
    if current_user.id == user_id:
        raise HTTPException(status_code=400, detail="Cannot send friend request to yourself.")

    target_user = get_user_by_id(user_id)
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Check if already friends
    if target_user.id in current_user.friends:
        raise HTTPException(status_code=400, detail="User is already your friend.")

    # Check if request already sent
    if target_user.id in current_user.friend_requests_sent:
        raise HTTPException(status_code=400, detail="Friend request already sent.")

    # Check if there's an incoming request from the target user
    if target_user.id in current_user.friend_requests_received:
        raise HTTPException(status_code=400, detail="User has already sent you a friend request.")

    # Add to sent and received requests
    db.users.update_one({'_id': ObjectId(current_user.id)}, {'$push': {'friend_requests_sent': ObjectId(user_id)}})
    db.users.update_one({'_id': ObjectId(user_id)}, {'$push': {'friend_requests_received': ObjectId(current_user.id)}})

def accept_friend_request(current_user: User, requester_id: str):
    """
    Accept a friend request from requester_id to current_user.
    """
    requester = get_user_by_id(requester_id)
    if not requester:
        raise HTTPException(status_code=404, detail="Requester not found.")

    # Check if there is a friend request from requester
    if ObjectId(requester_id) not in current_user.friend_requests_received:
        raise HTTPException(status_code=400, detail="No friend request from this user.")

    # Add each other to friends
    db.users.update_one({'_id': ObjectId(current_user.id)}, {
        '$push': {'friends': ObjectId(requester_id)},
        '$pull': {'friend_requests_received': ObjectId(requester_id)}
    })
    db.users.update_one({'_id': ObjectId(requester_id)}, {
        '$push': {'friends': ObjectId(current_user.id)},
        '$pull': {'friend_requests_sent': ObjectId(current_user.id)}
    })

def reject_friend_request(current_user: User, requester_id: str):
    """
    Reject a friend request from requester_id to current_user.
    """
    requester = get_user_by_id(requester_id)
    if not requester:
        raise HTTPException(status_code=404, detail="Requester not found.")

    # Check if there is a friend request from requester
    if ObjectId(requester_id) not in current_user.friend_requests_received:
        raise HTTPException(status_code=400, detail="No friend request from this user.")

    # Remove the friend request
    db.users.update_one({'_id': ObjectId(current_user.id)}, {'$pull': {'friend_requests_received': ObjectId(requester_id)}})
    db.users.update_one({'_id': ObjectId(requester_id)}, {'$pull': {'friend_requests_sent': ObjectId(current_user.id)}})

def remove_friend(current_user: User, friend_id: str):
    """
    Remove a friend from current_user's friends list.
    """
    friend = get_user_by_id(friend_id)
    if not friend:
        raise HTTPException(status_code=404, detail="Friend not found.")

    # Check if they are friends
    if ObjectId(friend_id) not in current_user.friends:
        raise HTTPException(status_code=400, detail="User is not your friend.")

    # Remove each other from friends list
    db.users.update_one({'_id': ObjectId(current_user.id)}, {'$pull': {'friends': ObjectId(friend_id)}})
    db.users.update_one({'_id': ObjectId(friend_id)}, {'$pull': {'friends': ObjectId(current_user.id)}})

def list_friends(current_user: User):
    """
    List all friends of the current_user.
    """
    friends_ids = current_user.friends
    if not friends_ids:
        return []

    friends = db.users.find({'_id': {'$in': friends_ids}})
    return [User(**friend) for friend in friends]

def list_friend_requests(current_user: User):
    """
    List incoming and outgoing friend requests.
    """
    incoming = current_user.friend_requests_received
    outgoing = current_user.friend_requests_sent

    incoming_requests = db.users.find({'_id': {'$in': incoming}})
    outgoing_requests = db.users.find({'_id': {'$in': outgoing}})

    incoming_users = [User(**user) for user in incoming_requests]
    outgoing_users = [User(**user) for user in outgoing_requests]

    return {
        "incoming": incoming_users,
        "outgoing": outgoing_users
    }
