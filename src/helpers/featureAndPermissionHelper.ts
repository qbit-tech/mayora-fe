export type FeaturePermissionType = {[key: string]: {[permission: string]: { value: boolean }}}

export function hasPermission(userPermissions: FeaturePermissionType, feature: string, permission: string) {
  return userPermissions[feature]?.[permission]?.value;
}

export function hasPermissionFromRoles(
  role: any,
  feature: string,
  permission: string,
) {
    let isHasPermission = false;
    // for (const role of roles) {
      // console.log(role.permissions)
      if(role && role.permissions) {
        isHasPermission = hasPermission(role.permissions, feature, permission);
      }
    // }
    return isHasPermission;
  }
