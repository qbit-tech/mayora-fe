import { DataNode } from "antd/lib/tree";

export function mapPermissionToTree(featurePermissions: any) {
  const mappedPermissionsTree: DataNode[] = [];
  let checkedKeys: string[] = [];
  const expandedKeys: string[] = [];
  for (const feature in featurePermissions) {
    expandedKeys.push(feature);
    const newCheckedKeys = [...checkedKeys];
    const permissionKeys = Object.keys(featurePermissions[feature]).filter(
      (key) => !key.includes("__")
    );
    const children: DataNode[] = permissionKeys.map((perm) => ({
      title: featurePermissions[feature][perm].__title,
      key: feature + "." + perm,
    }));
    mappedPermissionsTree.push({
      title: featurePermissions[feature].__title,
      key: feature,
      children,
    });
    let isFeatureAllChecked = true;
    for (const perm of permissionKeys) {
      if (featurePermissions[feature][perm].value) {
        newCheckedKeys.push(feature + "." + perm);
      } else {
        isFeatureAllChecked = false;
      }
    }
    if (isFeatureAllChecked && permissionKeys.length > 0) {
      newCheckedKeys.push(feature);
    }

    // setSelectedKeys(newCheckedKeys);
    checkedKeys = [...newCheckedKeys];
  }

  return {
    expandedKeys,
    mappedPermissionsTree,
    checkedKeys,
  };
}

export function mapTreeToPermission(
  checkedKeys: string[],
  defaultPermissions: any
) {
  const newPermissions = { ...defaultPermissions };
  // console.log("newPermissions : ", newPermissions);
  for (const feature in newPermissions) {
    // console.log("feature : ", feature);
    for (const permission in newPermissions[feature]) {
      if (
        permission === "__type" ||
        permission === "__title" ||
        permission === "__description"
      ) {
        continue;
      } else {
        // console.log(feature + " permission : ", permission);
        newPermissions[feature][permission].value = checkedKeys.includes(
          feature + "." + permission
        );
      }
    }
  }

  return newPermissions;
}
