const permissionBits = require('./structures/permissionBits');

/**
 * Utility class helping with calculating permissions of channels, users and roles
 */
class PermissionsProcessor {
    /**
     * Calculate the permission of a role or permission overwrite
     * @param {Number} allowedPermissions - Integer of permissions of a role/permission overwrite (allow param on permission overwrite)
     * @param {Number} [deniedPermissions=0] Integer of denied permissions of a permissions overwrite (deny param on permission overwrite)
     * @return {Object} perms - Object with the calculated perms in a {name:boolean} format. If a permission name does not appear it is not explicitly denied
     */
    calculatePermissions(allowedPermissions, deniedPermissions = 0) {
        let perms = {};
        for (let bit of Object.keys(permissionBits)) {
            if (allowedPermissions & permissionBits[bit]) {
                perms[bit] = true;
            } else if (deniedPermissions & permissionBits[bit]) {
                perms[bit] = false;
            }
        }
        return perms;
    }
}

module.exports = new PermissionsProcessor();
