export type RoleProperties = {
    roleId: string;
    roleName: string;
    roleDescription?: string;
    permissions: any;
    isActive: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export const initialRole: RoleProperties = {
    roleId: "",
    roleName: "",
    roleDescription: "",
    isActive: true,
    isDeleted: false,
    permissions: "",
};