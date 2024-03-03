export type IMutations = {
    registerUser: (name: string, lastName: string, badgeNumber: string, password: string) => Promise<any>
    loginUser: (badgeNumber: string, password: string) => Promise<any>
    deleteUser: (badgeNumber: string) => Promise<any>
}