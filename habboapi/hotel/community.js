import Database from '../database';

export default class HotelCommunity
{
    static loadCommunityInfo()
    {
        return new Promise((resolve, reject) =>
        {
            let list = {
                randomGroups: null,
                randomRooms: null,
                randomUsers: null,
                activeRooms: null,
                latestUser: null,
                latestRoom: null
            };

            return this.loadRandomGroups()

            .then((randomGroups) =>
            {
                list.randomGroups = randomGroups;

                return this.loadRandomRooms();
            })

            .then((randomRooms) =>
            {
                list.randomRooms = randomRooms;

                return this.loadRandomUsers();
            })

            .then((randomUsers) =>
            {
                list.randomUsers = randomUsers;

                return this.loadActiveRooms();
            })

            .then((activeRooms) =>
            {
                list.activeRooms = activeRooms;

                return this.loadLatestUser();
            })

            .then((latestUser) =>
            {
                list.latestUser = latestUser;

                return this.loadLatestRoom();
            })

            .then((latestRoom) =>
            {
                list.latestRoom = latestRoom;
                
                return resolve(list);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static loadLeaderboardsInfo()
    {
        return new Promise((resolve, reject) =>
        {
            let list = {
                mostCredits: null,
                mostOnline: null,
                mostRespected: null
            };

            return this.loadMostCredits()

            .then((mostCredits) =>
            {
                list.mostCredits = mostCredits;

                return this.loadMostOnline();
            })

            .then((mostOnline) =>
            {
                list.mostOnline = mostOnline;

                return this.loadMostRespected();
            })

            .then((mostRespected) =>
            {
                list.mostRespected = mostRespected;

                return resolve(list);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static loadRandomGroups()
    {
        return Database.Models.Hotel.Group.Group.loadRandomGroups();
    }

    static loadRandomRooms()
    {
        return Database.Models.Hotel.Room.Room.loadRandomRooms();
    }

    static loadRandomUsers()
    {
        return Database.Models.Hotel.User.User.loadRandomUsers();
    }

    static loadActiveRooms()
    {
        return Database.Models.Hotel.Room.Room.loadActiveRooms();
    }

    static loadLatestUser()
    {
        return Database.Models.Hotel.User.User.loadLatestUser();
    }

    static loadLatestRoom()
    {
        return Database.Models.Hotel.Room.Room.loadLatestRoom();
    }

    static loadMostCredits()
    {
        return Database.Models.Hotel.User.User.loadMostCredits();
    }

    static loadMostOnline()
    {
        return Database.Models.Hotel.User.Settings.loadMostOnline();
    }

    static loadMostRespected()
    {
        return Database.Models.Hotel.User.Settings.loadMostRespected();
    }

    static loadStaffList()
    {
        return Database.Models.Hotel.Permission.Permission.loadStaffList();
    }
}