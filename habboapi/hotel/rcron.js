import { Socket } from 'net';

class rCRON
{
    static send_message(message)
    {
        if(message == null) return false;
        
        let client = new Socket();
        
        client.connect(__config.rCRON.socket_port, __config.rCRON.socket_ip, () =>
        {
            client.write(JSON.stringify(message));
        });
        
        client.on('data', (data) =>
        {
            client.destroy();
            return true;
        });
        
        client.on('error', (data) =>
        {
            return false;
        });
    }

    static alert_user(user_id, message)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || message == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "alertuser",
                "data": {
                    "user_id": user_id,
                    "message": message
                }
            });
        });
    }

    static disconnect_user(user_id, user_name)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || user_name == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "disconnect",
                "data": {
                    "user_id": user_id,
                    "username": user_name
                }
            });
        });
    }

    static forward_user(user_id, room_id)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || room_id == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "forwarduser",
                "data": {
                    "user_id": user_id,
                    "room_id": room_id
                }
            });
        });
    }

    static follow_user(current_id, user_id)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || room_id == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "executecommand",
                "data": {
                    "user_id": current_id,
                    "command": "stalk " + user_id
                }
            });
        });
    }

    static friend_request(user_id, to_id)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || to_id == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "friendrequest",
                "data": {
                    "user_id": user_id,
                    "target_id": to_id
                }
            });
        });
    }

    static give_badge(user_id, badge_code)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || badge_code == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "givebadge",
                "data": {
                    "user_id": user_id,
                    "badge_code": badge_code
                }
            });
        });
    }

    static give_credits(user_id, credits)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || badge_code == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "givecredits",
                "data": {
                    "user_id": user_id,
                    "credits": credits
                }
            });
        });
    }

    static give_pixels(user_id, pixels)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || badge_code == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "givepixels",
                "data": {
                    "user_id": user_id,
                    "pixels": pixels
                }
            });
        });
    }

    static give_points(user_id, points, type)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || badge_code == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "givepoints",
                "data": {
                    "user_id": user_id,
                    "points": points,
                    "tyoe": type
                }
            });
        });
    }

    static hotel_alert(message)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || badge_code == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "hotelalert",
                "data": {
                    "message": message
                }
            });
        });
    }
}

export default rCRON;