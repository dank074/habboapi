import ApiPermission from '../../database/models/api/permission';

class Permission
{
    static permission_list(rank_id)
    {
        return new Promise((resolve, reject) =>
        {
            if(rank_id == null) return reject(new Error('invalid_paramemters'));

            return new ApiPermission({rank_id: rank_id}).fetch()

            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_rank'));

                return resolve(result.toJSON());
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
    
    static has_permission(rank_id, permission)
    {
        return new Promise((resolve, reject) =>
        {
            if(rank_id == null || permission == null) return reject(new Error('invalid_paramemters'));
        
            return new ApiPermission({rank_id: rank_id}).fetch()
            
            .then((result) =>
            {
                if(result == null) return reject(new Error('invalid_rank'));

                let permissions = result.toJSON();

                if(permissions[permission] == undefined || permissions[permission] == '0' || null) return reject(new Error('invalid_permission'));

                return resolve(null);
            })
            
            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}

export default Permission;