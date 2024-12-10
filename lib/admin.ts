import { auth } from "@clerk/nextjs/server";

const allowedAdminUserIds = [
    'user_2gxVTroWnli7L5LhcceiLbCN7PA',
];

export const checkIsAdmin = () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    return allowedAdminUserIds.includes(userId);
};